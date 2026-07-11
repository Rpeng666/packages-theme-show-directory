declare const en: {
    list: {
        title: string;
        empty: string;
        buttons: {
            add: string;
            delete: string;
            edit: string;
            check: string;
            revalidate: string;
        };
    };
    add: {
        title: string;
        buttons: {
            submit: string;
        };
    };
    edit: {
        title: string;
        buttons: {
            submit: string;
        };
    };
    check: {
        title: string;
    };
    fields: {
        target_url: string;
        target_url_tip: string;
        anchor_text: string;
        anchor_text_tip: string;
        placement: string;
        placement_tip: string;
        status: string;
        created_at: string;
        badge_html: string;
        badge_html_tip: string;
        reciprocal_url: string;
        reciprocal_url_tip: string;
        reciprocal_status: string;
        link_rel: string;
        last_checked: string;
    };
    options: {
        home: string;
        partner: string;
        all: string;
        active: string;
        paused: string;
        footer: string;
    };
};

export { en as default, en };
