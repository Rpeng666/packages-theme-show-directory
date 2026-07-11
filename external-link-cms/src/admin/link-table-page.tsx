import type { ExternalLink, ExternalLinkService } from '../service';

type Labels = {
  title?: string;
  empty?: string;
  add?: string;
  edit?: string;
  check?: string;
  delete?: string;
  revalidate?: string;
  columns?: {
    targetUrl?: string;
    anchorText?: string;
    placement?: string;
    status?: string;
    reciprocalStatus?: string;
    linkRel?: string;
    lastChecked?: string;
    createdAt?: string;
  };
};

type Props = {
  service: ExternalLinkService;
  labels?: Labels;
  basePath?: string;
  revalidatePath?: string;
};

export async function LinkTablePage({
  service,
  labels,
  basePath = '/admin/external-links',
  revalidatePath = '/api/revalidate',
}: Props) {
  const links = await service.findAll();
  const l = labels || {};
  const c = l.columns || {};

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{l.title || 'External Links'}</h1>
        <div className="flex gap-2">
          <RevalidateButton label={l.revalidate || 'Revalidate'} path={revalidatePath} />
          <a
            href={`${basePath}/add`}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {l.add || 'Add Link'}
          </a>
        </div>
      </div>

      {links.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          {l.empty || 'No external links yet.'}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-3 py-2 text-left font-medium">{c.targetUrl || 'URL'}</th>
                <th className="px-3 py-2 text-left font-medium">{c.anchorText || 'Anchor'}</th>
                <th className="px-3 py-2 text-left font-medium">{c.placement || 'Placement'}</th>
                <th className="px-3 py-2 text-left font-medium">{c.status || 'Status'}</th>
                <th className="px-3 py-2 text-left font-medium">{c.reciprocalStatus || 'Reciprocal'}</th>
                <th className="px-3 py-2 text-left font-medium">{c.linkRel || 'Link Type'}</th>
                <th className="px-3 py-2 text-left font-medium">{c.lastChecked || 'Last Checked'}</th>
                <th className="px-3 py-2 text-left font-medium">{c.createdAt || 'Created'}</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {links.map((link: ExternalLink) => (
                <tr key={link.id} className="border-t hover:bg-muted/30">
                  <td className="px-3 py-2 max-w-[200px] truncate" title={link.targetUrl}>
                    {link.targetUrl}
                  </td>
                  <td className="px-3 py-2 max-w-[150px] truncate">{link.anchorText || '-'}</td>
                  <td className="px-3 py-2">
                    <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{link.placement}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`rounded px-1.5 py-0.5 text-xs ${link.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {link.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`rounded px-1.5 py-0.5 text-xs ${
                      link.reciprocalStatus === 'verified' ? 'bg-green-100 text-green-700' :
                      link.reciprocalStatus === 'broken' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {link.reciprocalStatus || 'unchecked'}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs">{link.linkRel || '-'}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {link.lastCheckedAt ? new Date(link.lastCheckedAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {new Date(link.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <a href={`${basePath}/${link.id}/edit`} className="text-xs text-blue-600 hover:underline">
                        {l.edit || 'Edit'}
                      </a>
                      <span className="text-muted-foreground">|</span>
                      <a href={`${basePath}/${link.id}/check`} className="text-xs text-blue-600 hover:underline">
                        {l.check || 'Check'}
                      </a>
                      <span className="text-muted-foreground">|</span>
                      <a href={`${basePath}/${link.id}/delete`} className="text-xs text-red-600 hover:underline">
                        {l.delete || 'Delete'}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RevalidateButton({ label, path }: { label: string; path: string }) {
  return (
    <form action={path} method="POST">
      <input type="hidden" name="path" value="/" />
      <input type="hidden" name="type" value="layout" />
      <button
        type="submit"
        className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
      >
        {label}
      </button>
    </form>
  );
}
