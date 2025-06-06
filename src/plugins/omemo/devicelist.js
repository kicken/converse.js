import { Model } from "@converse/skeletor";
import { getOpenPromise } from "@converse/openpromise";
import { _converse, api, converse, errors, log, parsers, u } from "@converse/headless";

const { Strophe, stx, sizzle } = converse.env;

class DeviceList extends Model {
    get idAttribute() {
        return "jid";
    }

    async initialize() {
        super.initialize();
        this.initialized = getOpenPromise();
        await this.initDevices();
        this.initialized.resolve();
    }

    initDevices() {
        this.devices = new _converse.exports.Devices();
        const bare_jid = _converse.session.get("bare_jid");
        const id = `converse.devicelist-${bare_jid}-${this.get("jid")}`;
        u.initStorage(this.devices, id);
        return this.fetchDevices();
    }

    /**
     * @param {import('./devices').default} collection
     */
    async onDevicesFound(collection) {
        if (collection.length === 0) {
            let ids = [];
            try {
                ids = await this.fetchDevicesFromServer();
            } catch (e) {
                if (e === null) {
                    log.error(`Timeout error while fetching OMEMO devices for ${this.get("jid")}`);
                    this.destroy();
                } else if (u.isElement(e) && (await parsers.parseErrorStanza(e)) instanceof errors.ItemNotFoundError) {
                    log.debug(`No OMEMO devices found for ${this.get("jid")}`);
                } else {
                    log.error(`Could not fetch OMEMO devices for ${this.get("jid")}`);
                    log.error(e);
                    this.destroy();
                }
            }
            const bare_jid = _converse.session.get("bare_jid");
            if (this.get("jid") === bare_jid) {
                this.publishCurrentDevice(ids);
            }
        }
    }

    fetchDevices() {
        if (this._devices_promise === undefined) {
            this._devices_promise = new Promise((resolve) => {
                this.devices.fetch({
                    success: (c) => resolve(this.onDevicesFound(c)),
                    error: (_, e) => {
                        log.error(e);
                        resolve();
                    },
                });
            });
        }
        return this._devices_promise;
    }

    /**
     * @returns {Promise<string>}
     */
    async getOwnDeviceId() {
        const { omemo_store } = _converse.state;
        let device_id = omemo_store.get("device_id");
        if (!this.devices.get(device_id)) {
            // Generate a new bundle if we cannot find our device
            await omemo_store.generateBundle();
            device_id = omemo_store.get("device_id");
        }
        return device_id;
    }

    /**
     * @param {string[]} device_ids
     */
    async publishCurrentDevice(device_ids) {
        const bare_jid = _converse.session.get("bare_jid");
        if (this.get("jid") !== bare_jid) {
            return; // We only publish for ourselves.
        }
        await api.omemo.session.restore();

        if (!_converse.state.omemo_store) {
            // Happens during tests. The connection gets torn down
            // before publishCurrentDevice has time to finish.
            log.debug("publishCurrentDevice: omemo_store is not defined, likely a timing issue");
            return;
        }
        if (!device_ids.includes(await this.getOwnDeviceId())) {
            return this.publishDevices();
        }
    }

    /**
     * @returns {Promise<import('./device').default[]>}
     */
    async fetchDevicesFromServer() {
        const bare_jid = _converse.session.get("bare_jid");
        const stanza = stx`
            <iq type='get' from='${bare_jid}' to='${this.get("jid")}' xmlns="jabber:client">
                <pubsub xmlns='${Strophe.NS.PUBSUB}'>
                    <items node='${Strophe.NS.OMEMO_DEVICELIST}'/>
                </pubsub>
            </iq>`;

        const iq = await api.sendIQ(stanza);
        const selector = `list[xmlns="${Strophe.NS.OMEMO}"] device`;
        const device_ids = sizzle(selector, iq).map((d) => d.getAttribute("id"));
        const jid = this.get("jid");
        return Promise.all(device_ids.map((id) => this.devices.create({ id, jid }, { promise: true })));
    }

    /**
     * Sends an IQ stanza to the current user's "devices" PEP node to
     * ensure that all devices are published for potential chat partners to see.
     * See: https://xmpp.org/extensions/attic/xep-0384-0.3.0.html#usecases-announcing
     */
    publishDevices() {
        const item = stx`
            <item id='current'>
                <list xmlns='${Strophe.NS.OMEMO}'>
                    ${this.devices.filter((d) => d.get("active")).map((d) => stx`<device id='${d.get("id")}'/>`)}
                </list>
            </item>`;
        const options = { access_model: "open" };
        return api.pubsub.publish(null, Strophe.NS.OMEMO_DEVICELIST, item, options, false);
    }

    /**
     * @param {string[]} device_ids
     */
    async removeOwnDevices(device_ids) {
        const bare_jid = _converse.session.get("bare_jid");
        if (this.get("jid") !== bare_jid) {
            throw new Error("Cannot remove devices from someone else's device list");
        }
        await Promise.all(
            device_ids
                .map((id) => this.devices.get(id))
                .map(
                    (d) =>
                        new Promise((resolve) =>
                            d.destroy({
                                success: resolve,
                                error: (_, e) => {
                                    log.error(e);
                                    resolve();
                                },
                            })
                        )
                )
        );
        return this.publishDevices();
    }
}

export default DeviceList;
