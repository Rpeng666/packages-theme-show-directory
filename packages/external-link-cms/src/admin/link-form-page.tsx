import type { ExternalLinkService } from '../service';
import { parseBadgeHtml } from '../badge-html';

type Labels = {
  title?: string;
  submit?: string;
  fields?: {
    badgeHtml?: string;
    badgeHtmlTip?: string;
    targetUrl?: string;
    targetUrlTip?: string;
    anchorText?: string;
    anchorTextTip?: string;
    placement?: string;
    placementTip?: string;
    status?: string;
    reciprocalUrl?: string;
    reciprocalUrlTip?: string;
  };
  options?: {
    home?: string;
    partner?: string;
    all?: string;
    footer?: string;
    active?: string;
    paused?: string;
  };
};

type Props = {
  service: ExternalLinkService;
  mode: 'create' | 'edit';
  linkId?: string;
  labels?: Labels;
  basePath?: string;
  redirectPath?: string;
};

export async function LinkFormPage({
  service,
  mode,
  linkId,
  labels,
  basePath = '/admin/external-links',
  redirectPath,
}: Props) {
  const l = labels || {};
  const f = l.fields || {};
  const o = l.options || {};

  let link = null;
  if (mode === 'edit' && linkId) {
    link = await service.findById(linkId);
    if (!link) {
      return <div>Link not found</div>;
    }
  }

  const action = mode === 'edit' ? `${basePath}/${linkId}/edit` : `${basePath}/add`;
  const redirect = redirectPath || basePath;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        {l.title || (mode === 'edit' ? 'Edit External Link' : 'Add External Link')}
      </h1>
      <form action={action} method="POST" className="max-w-xl space-y-4">
        <input type="hidden" name="redirect" value={redirect} />

        <div className="space-y-1">
          <label className="text-sm font-medium">{f.badgeHtml || 'Badge HTML'}</label>
          <p className="text-xs text-muted-foreground">{f.badgeHtmlTip || 'Paste the full badge HTML snippet. Fields below auto-fill from it.'}</p>
          <textarea
            name="badgeHtml"
            rows={5}
            defaultValue={link?.badgeHtml || ''}
            placeholder='<a href="https://example.com" target="_blank"><img src="https://example.com/badge.svg" alt="Example" width="150" height="44" /></a>'
            className="w-full rounded-md border p-2 font-mono text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">{f.targetUrl || 'Target URL'}</label>
          <p className="text-xs text-muted-foreground">{f.targetUrlTip || 'The URL to link to.'}</p>
          <input
            type="url"
            name="targetUrl"
            defaultValue={link?.targetUrl || ''}
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">{f.anchorText || 'Anchor Text'}</label>
          <p className="text-xs text-muted-foreground">{f.anchorTextTip || 'Link text visible to crawlers.'}</p>
          <input
            type="text"
            name="anchorText"
            defaultValue={link?.anchorText || ''}
            maxLength={200}
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">{f.placement || 'Placement'}</label>
            <select name="placement" defaultValue={link?.placement || 'footer'} className="w-full rounded-md border p-2 text-sm">
              <option value="home">{o.home || 'Homepage'}</option>
              <option value="partner">{o.partner || 'Partner Page'}</option>
              <option value="all">{o.all || 'Both Pages'}</option>
              <option value="footer">{o.footer || 'Footer'}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">{f.status || 'Status'}</label>
            <select name="status" defaultValue={link?.status || 'active'} className="w-full rounded-md border p-2 text-sm">
              <option value="active">{o.active || 'Active'}</option>
              <option value="paused">{o.paused || 'Paused'}</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">{f.reciprocalUrl || 'Reciprocal URL'}</label>
          <p className="text-xs text-muted-foreground">{f.reciprocalUrlTip || 'Partner page URL where they link back to us. Defaults to target URL if empty.'}</p>
          <input
            type="url"
            name="reciprocalUrl"
            defaultValue={link?.reciprocalUrl || ''}
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {l.submit || (mode === 'edit' ? 'Save' : 'Create')}
        </button>
      </form>
    </div>
  );
}
