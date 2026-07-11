import type { ExternalLink, ExternalLinkPlacement } from '../types';
import type { ExternalLinkService } from '../service';

type LinkInjectorProps = {
  placement: ExternalLinkPlacement;
  service?: ExternalLinkService;
  fetcher?: () => Promise<ExternalLink[]>;
  links?: ExternalLink[];
};

export async function LinkInjector({
  placement,
  service,
  fetcher,
  links: providedLinks,
}: LinkInjectorProps) {
  let links: ExternalLink[] = [];

  try {
    if (providedLinks) {
      links = providedLinks;
    } else if (fetcher) {
      links = await fetcher();
    } else if (service) {
      links = await service.findByPlacement(placement);
    }
  } catch (e: any) {
    console.error('[link-injector] failed to load for', placement, ':', e?.message || e);
    return null;
  }

  if (links.length === 0) return null;

  return (
    <div className="sr-only" aria-hidden="true">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.anchorText}
        </a>
      ))}
    </div>
  );
}
