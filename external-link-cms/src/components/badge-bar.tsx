import type { CSSProperties } from 'react';

import type { ExternalLink, ExternalLinkPlacement } from '../types';
import type { ExternalLinkService } from '../service';

const GAP_PX = 24;
const MAX_STATIC_WIDTH = 500;
const BADGE_BOX_W = 100;
const BADGE_BOX_H = 28;

type BadgeBarProps = {
  placement: ExternalLinkPlacement;
  variant?: 'marquee' | 'inline';
  service?: ExternalLinkService;
  fetcher?: () => Promise<ExternalLink[]>;
  links?: ExternalLink[];
};

/**
 * Build the inner HTML for a single badge link.
 */
function buildLinkHtml(link: ExternalLink): string {
  return (
    link.badgeHtml ||
    `<a href="${link.targetUrl}" target="_blank" rel="noopener noreferrer"${
      link.badgeAlt ? ` title="${link.badgeAlt}"` : ''
    }><img src="${link.badgeUrl}" alt="${link.badgeAlt || ''}" /></a>`
  );
}

/**
 * Build the full HTML for one badge item (wrapper + link).
 * Uses CSS classes so Tailwind doesn't need to scan dynamic strings.
 */
function buildItemHtml(link: ExternalLink): string {
  return `<div class="elc-badge-item"><div class="elc-badge-item-inner">${buildLinkHtml(
    link,
  )}</div></div>`;
}

export default async function BadgeBar({
  placement,
  variant = 'marquee',
  service,
  fetcher,
  links: providedLinks,
}: BadgeBarProps) {
  let links: ExternalLink[] = [];

  try {
    if (providedLinks) {
      links = providedLinks;
    } else if (fetcher) {
      links = await fetcher();
    } else if (service) {
      links = await service.findBadgesByPlacement(placement);
    }
  } catch (e: any) {
    console.error('[badge-bar] failed to load for', placement, ':', e?.message || e);
    return null;
  }

  if (!links || links.length === 0) return null;

  // Deduplicate by targetUrl to prevent accidental DB dupes
  const seen = new Set<string>();
  links = links.filter((l) => {
    if (seen.has(l.targetUrl)) return false;
    seen.add(l.targetUrl);
    return true;
  });

  if (links.length === 0) return null;

  // --- Inline variant (no marquee) ---
  if (variant === 'inline') {
    const html = links.map(buildItemHtml).join('');
    return (
      <div
        className="flex flex-wrap items-center justify-center gap-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // --- Marquee variant ---
  const totalWidth = links.length * BADGE_BOX_W + (links.length - 1) * GAP_PX;
  const useMarquee = totalWidth > MAX_STATIC_WIDTH;

  // Not enough badges to scroll - show static row
  if (!useMarquee) {
    const html = links.map(buildItemHtml).join('');
    return (
      <div className="border-y border-border/30 bg-muted/20">
        <div
          className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 px-4 py-1"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }

  // Seamless marquee: render items enough times to fill the viewport,
  // then duplicate the entire group once for seamless looping.
  // Minimum 2 copies so the group is at least as wide as the viewport.
  const stride = BADGE_BOX_W + GAP_PX;
  const copyWidth = links.length * stride;
  const TARGET_W = 1200;
  const reps = Math.max(2, Math.ceil(TARGET_W / copyWidth));
  const groupWidth = reps * copyWidth;
  const durationS = Math.max(40, Math.round(groupWidth / 30));

  // Build one group's HTML, then duplicate for seamless scroll.
  // Single dangerouslySetInnerHTML = one entry in RSC payload.
  const groupHtml = Array.from({ length: reps }, () =>
    links.map(buildItemHtml).join(''),
  ).join('');
  const fullHtml = groupHtml + groupHtml;

  return (
    <div
      className="border-y border-border/30 bg-muted/20 py-1"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div className="group overflow-hidden">
        <div
          className="flex w-max animate-marquee-seamless items-center gap-6 group-hover:[animation-play-state:paused]"
          style={
            {
              '--duration': `${durationS}s`,
              '--marquee-distance': `-${groupWidth}px`,
            } as CSSProperties
          }
          dangerouslySetInnerHTML={{ __html: fullHtml }}
        />
      </div>
    </div>
  );
}
