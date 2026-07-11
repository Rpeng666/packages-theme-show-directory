import type { ExternalLinkModel } from './model';
export type { ExternalLink, ExternalLinkPlacement, ExternalLinkStatus } from './types';
import { parseBadgeHtml } from './badge-html';
import type {
  ExternalLink,
  ExternalLinkPlacement,
  ExternalLinkStatus,
  LinkRel,
  ReciprocalStatus,
  ServiceConfig,
} from './types';

export { parseBadgeHtml } from './badge-html';

export type ExternalLinkService = {
  create: (data: {
    placement: ExternalLinkPlacement;
    targetUrl: string;
    anchorText?: string;
    status?: ExternalLinkStatus;
    badgeUrl?: string;
    badgeAlt?: string;
    badgeWidth?: number;
    badgeHeight?: number;
    badgeHtml?: string;
    reciprocalUrl?: string;
  }) => Promise<ExternalLink>;
  update: (id: string, data: any) => Promise<ExternalLink | null>;
  remove: (id: string) => Promise<void>;
  findAll: () => Promise<ExternalLink[]>;
  findByPlacement: (placement: ExternalLinkPlacement) => Promise<ExternalLink[]>;
  findById: (id: string) => Promise<ExternalLink | null>;
  findBadgesByPlacement: (placement: ExternalLinkPlacement) => Promise<ExternalLink[]>;
  checkReciprocal: (link: ExternalLink) => Promise<{ status: ReciprocalStatus; rel: LinkRel }>;
  parseBadgeHtml: typeof parseBadgeHtml;
};

export function createService(
  model: ExternalLinkModel,
  config: ServiceConfig
): ExternalLinkService {
  function revalidateExternalLinkPaths() {
    for (const locale of config.locales) {
      const prefix = locale === config.defaultLocale ? '' : `/${locale}`;
      config.revalidatePath(`${prefix}/`, 'page');
      config.revalidatePath(`${prefix}/partner`, 'page');
      config.revalidatePath(`${prefix}/`, 'layout');
    }
  }

  async function create(data: Parameters<ExternalLinkService['create']>[0]): Promise<ExternalLink> {
    const link = await model.create(data);
    revalidateExternalLinkPaths();
    return link;
  }

  async function update(id: string, data: any): Promise<ExternalLink | null> {
    const link = await model.update(id, data);
    revalidateExternalLinkPaths();
    return link;
  }

  async function remove(id: string): Promise<void> {
    await model.delete(id);
    revalidateExternalLinkPaths();
  }

  async function checkReciprocal(
    link: ExternalLink
  ): Promise<{ status: ReciprocalStatus; rel: LinkRel }> {
    const ourHost = (() => {
      try {
        return new URL(config.appUrl).host.replace(/^www\./, '');
      } catch {
        return '';
      }
    })();

    if (!ourHost) {
      return { status: 'unchecked', rel: 'unknown' };
    }

    const checkUrl = link.reciprocalUrl || link.targetUrl;
    if (!checkUrl) {
      return { status: 'unchecked', rel: 'unknown' };
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(checkUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)',
          Accept: 'text/html',
        },
        redirect: 'follow',
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const result = { status: 'broken' as ReciprocalStatus, rel: 'unknown' as LinkRel };
        await model.updateReciprocalStatus(link.id, {
          reciprocalStatus: result.status,
          linkRel: result.rel,
          lastCheckedAt: new Date(),
        });
        return result;
      }

      const html = await res.text();

      const linkRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*(?:rel=["']([^"']*)["'])?[^>]*>/gi;
      let found = false;
      let isNofollow = false;

      let match: RegExpExecArray | null;
      while ((match = linkRegex.exec(html)) !== null) {
        const href = match[1] || '';
        const rel = (match[2] || '').toLowerCase();

        try {
          const hrefHost = new URL(href, checkUrl).host.replace(/^www\./, '');
          if (hrefHost === ourHost || href.includes(ourHost)) {
            found = true;
            if (rel.includes('nofollow')) {
              isNofollow = true;
            } else {
              isNofollow = false;
              break;
            }
          }
        } catch {
          // invalid URL, skip
        }
      }

      const status: ReciprocalStatus = found ? 'verified' : 'broken';
      const rel: LinkRel = found ? (isNofollow ? 'nofollow' : 'dofollow') : 'unknown';

      await model.updateReciprocalStatus(link.id, {
        reciprocalStatus: status,
        linkRel: rel,
        lastCheckedAt: new Date(),
      });

      return { status, rel };
    } catch (e) {
      console.error('[checkReciprocal] error checking', checkUrl, e);
      const result = { status: 'broken' as ReciprocalStatus, rel: 'unknown' as LinkRel };
      await model.updateReciprocalStatus(link.id, {
        reciprocalStatus: result.status,
        linkRel: result.rel,
        lastCheckedAt: new Date(),
      });
      return result;
    }
  }

  return {
    create,
    update,
    remove,
    findAll: model.findAll,
    findByPlacement: model.findByPlacement,
    findById: model.findById,
    findBadgesByPlacement: model.findBadgesByPlacement,
    checkReciprocal,
    parseBadgeHtml,
  };
}
