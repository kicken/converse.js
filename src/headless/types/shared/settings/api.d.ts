export namespace settings_api {
    /**
     * Allows new configuration settings to be specified, or new default values for
     * existing configuration settings to be specified.
     *
     * Note, calling this method *after* converse.initialize has been
     * called will *not* change the initialization settings provided via
     * `converse.initialize`.
     *
     * @method api.settings.extend
     * @param {object} settings The configuration settings
     * @example
     * api.settings.extend({
     *    'enable_foo': true
     * });
     *
     * // The user can then override the default value of the configuration setting when
     * // calling `converse.initialize`.
     * converse.initialize({
     *     'enable_foo': false
     * });
     */
    function extend(settings: object): void;
    /**
     * @method _converse.api.settings.get
     * @param {string} [key]
     * @returns {*} Value of the particular configuration setting, or all
     *  settings if no key was specified.
     * @example api.settings.get("play_sounds");
     */
    function get(key?: string): any;
    /**
     * Set one or many configuration settings.
     *
     * Note, this is not an alternative to calling {@link converse.initialize}, which still needs
     * to be called. Generally, you'd use this method after Converse is already
     * running and you want to change the configuration on-the-fly.
     *
     * @method _converse.api.settings.set
     * @param { Object | string } [settings_or_key]
     *  An object containing configuration settings.
     *  Alternatively to passing in an object, you can pass in a key and a value.
     * @param { string } [value]
     * @example api.settings.set("play_sounds", true);
     * @example
     * api.settings.set({
     *     "play_sounds": true,
     *     "hide_offline_users": true
     * });
     */
    function set(settings_or_key?: any | string, value?: string): void;
    namespace listen {
        /**
         * Register an event listener for the passed in event.
         * @method _converse.api.settings.listen.on
         * @param { ('change') } name - The name of the event to listen for.
         *  Currently there is only the 'change' event.
         * @param { Function } handler - The event handler function
         * @param { Object } [context] - The context of the `this` attribute of the
         *  handler function.
         * @example api.settings.listen.on('change', callback);
         */
        function on(name: ("change"), handler: Function, context?: any): void;
        /**
         * To stop listening to an event, you can use the `not` method.
         * @method _converse.api.settings.listen.not
         * @param { String } name The event's name
         * @param { Function } handler The callback method that is to no longer be called when the event fires
         * @example api.settings.listen.not('change', callback);
         */
        function not(name: string, handler: Function): void;
    }
}
export type Model = import("@converse/skeletor").Model;
//# sourceMappingURL=api.d.ts.map