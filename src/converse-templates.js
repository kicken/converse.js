define("converse-templates", [
    "tpl!action",
    "tpl!add_contact_dropdown",
    "tpl!add_contact_form",
    "tpl!change_status_message",
    "tpl!chat_status",
    "tpl!chatarea",
    "tpl!chatbox",
    "tpl!chatroom",
    "tpl!chatroom_form",
    "tpl!chatroom_password_form",
    "tpl!chatroom_nickname_form",
    "tpl!chatroom_sidebar",
    "tpl!chatrooms_tab",
    "tpl!chats_panel",
    "tpl!choose_status",
    "tpl!contacts_panel",
    "tpl!contacts_tab",
    "tpl!controlbox",
    "tpl!controlbox_toggle",
    "tpl!field",
    "tpl!form_captcha",
    "tpl!form_checkbox",
    "tpl!form_input",
    "tpl!form_select",
    "tpl!form_textarea",
    "tpl!form_username",
    "tpl!group_header",
    "tpl!info",
    "tpl!login_panel",
    "tpl!login_tab",
    "tpl!message",
    "tpl!new_day",
    "tpl!occupant",
    "tpl!pending_contact",
    "tpl!pending_contacts",
    "tpl!register_panel",
    "tpl!register_tab",
    "tpl!registration_form",
    "tpl!registration_request",
    "tpl!requesting_contact",
    "tpl!requesting_contacts",
    "tpl!room_description",
    "tpl!room_item",
    "tpl!room_panel",
    "tpl!roster",
    "tpl!roster_item",
    "tpl!search_contact",
    "tpl!select_option",
    "tpl!status_option",
    "tpl!toggle_chats",
    "tpl!toolbar",
    "tpl!toolbar_otr",
    "tpl!trimmed_chat",
    "tpl!vcard",

    // Can be removed together with converse-minimize.js
    // if minimization/trimming features not needed (for example for mobile
    // apps).
    "tpl!chatbox_minimize",
], function () {
    return {
        action:                 arguments[0],
        add_contact_dropdown:   arguments[1],
        add_contact_form:       arguments[2],
        change_status_message:  arguments[3],
        chat_status:            arguments[4],
        chatarea:               arguments[5],
        chatbox:                arguments[6],
        chatroom:               arguments[7],
        chatroom_form:          arguments[8],
        chatroom_password_form: arguments[9],
        chatroom_nickname_form: arguments[10],
        chatroom_sidebar:       arguments[11],
        chatrooms_tab:          arguments[12],
        chats_panel:            arguments[13],
        choose_status:          arguments[14],
        contacts_panel:         arguments[15],
        contacts_tab:           arguments[16],
        controlbox:             arguments[17],
        controlbox_toggle:      arguments[18],
        field:                  arguments[19],
        form_captcha:           arguments[20],
        form_checkbox:          arguments[21],
        form_input:             arguments[22],
        form_select:            arguments[23],
        form_textarea:          arguments[24],
        form_username:          arguments[25],
        group_header:           arguments[26],
        info:                   arguments[27],
        login_panel:            arguments[28],
        login_tab:              arguments[29],
        message:                arguments[30],
        new_day:                arguments[31],
        occupant:               arguments[32],
        pending_contact:        arguments[33],
        pending_contacts:       arguments[34],
        register_panel:         arguments[35],
        register_tab:           arguments[36],
        registration_form:      arguments[37],
        registration_request:   arguments[38],
        requesting_contact:     arguments[39],
        requesting_contacts:    arguments[40],
        room_description:       arguments[41],
        room_item:              arguments[42],
        room_panel:             arguments[43],
        roster:                 arguments[44],
        roster_item:            arguments[45],
        search_contact:         arguments[46],
        select_option:          arguments[47],
        status_option:          arguments[48],
        toggle_chats:           arguments[49],
        toolbar:                arguments[50],
        toolbar_otr:            arguments[51],
        trimmed_chat:           arguments[52],
        vcard:                  arguments[53],
        chatbox_minimize:       arguments[54]
    };
});