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

function BadgeItem({ link }: { link: ExternalLink }) {
  const html =
    link.badgeHtml ||
    `<a href="${link.targetUrl}" target="_blank" rel="noopener noreferrer"${
      link.badgeAlt ? ` title="${link.badgeAlt}"` : ''
    }><img src="${link.badgeUrl}" alt="${link.badgeAlt || ''}" /></a>`;

  return (
    <div
      className="flex shrink-0 items-center justify-center opacity-50 transition-opacity duration-300 hover:opacity-100"
      style={{ width: `${BADGE_BOX_W}px`, height: `${BADGE_BOX_H}px` }}
    >
      <div
        className="flex h-full w-full items-center justify-center overflow-hidden [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
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

  const items = links.map((link) => <BadgeItem key={link.id} link={link} />);

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4">{items}</div>
    );
  }

  const totalWidth = links.length * BADGE_BOX_W + (links.length - 1) * GAP_PX;
  const useMarquee = totalWidth > MAX_STATIC_WIDTH;

  if (!useMarquee) {
    return (
      <div className="border-y border-border/30 bg-muted/20">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 px-4 py-1">
          {items}
        </div>
      </div>
    );
  }

  const stride = BADGE_BOX_W + GAP_PX;
  const copyWidth = links.length * stride;
  const TARGET_W = 1920;
  const reps = Math.max(1, Math.ceil(TARGET_W / copyWidth));
  const groupItems = Array.from({ length: reps }, () => items).flat();
  const groupCount = reps * links.length;
  const periodPx = groupCount * stride;
  const durationS = Math.max(40, Math.round(periodPx / 30));

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
              '--marquee-distance': `-${periodPx}px`,
            } as CSSProperties
          }
        >
          {groupItems}
          {groupItems}
        </div>
      </div>
    </div>
  );
}
