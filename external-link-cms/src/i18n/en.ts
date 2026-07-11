export const en = {
  list: {
    title: 'External Links',
    empty: 'No external links yet.',
    buttons: {
      add: 'Add Link',
      delete: 'Delete',
      edit: 'Edit',
      check: 'Check Reciprocal',
      revalidate: 'Revalidate Cache',
    },
  },
  add: {
    title: 'Add External Link',
    buttons: { submit: 'Create' },
  },
  edit: {
    title: 'Edit External Link',
    buttons: { submit: 'Save' },
  },
  check: {
    title: 'Check Reciprocal Link',
  },
  fields: {
    target_url: 'Target URL',
    target_url_tip: 'The URL to link to. Auto-filled from badge HTML if provided.',
    anchor_text: 'Anchor Text',
    anchor_text_tip: 'Link text visible to crawlers (1-200 chars). Optional for badge links.',
    placement: 'Placement',
    placement_tip: 'Where the link appears in the HTML',
    status: 'Status',
    created_at: 'Created At',
    badge_html: 'Badge HTML',
    badge_html_tip: 'Paste the full badge HTML snippet here. All fields below will be auto-filled from it.',
    reciprocal_url: 'Reciprocal URL',
    reciprocal_url_tip: 'The partner page URL where they link back to us. Defaults to target URL if empty.',
    reciprocal_status: 'Reciprocal',
    link_rel: 'Link Type',
    last_checked: 'Last Checked',
  },
  options: {
    home: 'Homepage',
    partner: 'Partner Page',
    all: 'Both Pages',
    active: 'Active',
    paused: 'Paused',
    footer: 'Footer Marquee',
  },
};

export default en;
