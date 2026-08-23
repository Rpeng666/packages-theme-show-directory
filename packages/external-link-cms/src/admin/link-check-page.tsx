import type { ExternalLinkService } from '../service';
import { CheckButton } from '../components/check-button';

type Labels = {
  title?: string;
  fields?: {
    targetUrl?: string;
    reciprocalUrl?: string;
    reciprocalStatus?: string;
    linkRel?: string;
    lastChecked?: string;
  };
  checkButton?: {
    check?: string;
    checking?: string;
    status?: string;
    rel?: string;
  };
};

type Props = {
  service: ExternalLinkService;
  linkId: string;
  labels?: Labels;
  apiBase?: string;
};

export async function LinkCheckPage({
  service,
  linkId,
  labels,
  apiBase = '/api/external-links',
}: Props) {
  const l = labels || {};
  const f = l.fields || {};

  const link = await service.findById(linkId);
  if (!link) {
    return <div>Link not found</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{l.title || 'Check Reciprocal Link'}</h1>
      <div className="rounded-lg border p-6 max-w-xl space-y-4">
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">{f.targetUrl || 'Target URL'}:</span>{' '}
            {link.targetUrl}
          </p>
          {link.reciprocalUrl && (
            <p>
              <span className="font-medium">{f.reciprocalUrl || 'Reciprocal URL'}:</span>{' '}
              {link.reciprocalUrl}
            </p>
          )}
          {link.reciprocalStatus && (
            <p>
              <span className="font-medium">{f.reciprocalStatus || 'Reciprocal Status'}:</span>{' '}
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{link.reciprocalStatus}</span>
            </p>
          )}
          {link.linkRel && (
            <p>
              <span className="font-medium">{f.linkRel || 'Link Type'}:</span>{' '}
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{link.linkRel}</span>
            </p>
          )}
          {link.lastCheckedAt && (
            <p>
              <span className="font-medium">{f.lastChecked || 'Last Checked'}:</span>{' '}
              {new Date(link.lastCheckedAt).toLocaleString()}
            </p>
          )}
        </div>
        <CheckButton linkId={link.id} apiBase={apiBase} labels={l.checkButton} />
      </div>
    </div>
  );
}
