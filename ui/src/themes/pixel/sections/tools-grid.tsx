'use client';

import { PixelCard } from '@pxlkit/ui-kit';
import { cn } from '../../../lib/utils';
import { PixelIcon } from '../../../components/pixel-icon';
import type { ToolsGridProps, ToolGridLink } from '../../../contracts/sections/tools-grid';
import type { SectionItem } from '../../../types/landing';

export interface ToolItem extends SectionItem {
  url: string;
}

/*
 * Pixel tools-grid — chamfered tool cards (PixelCard interactive) on a retro
 * grid. Same data contract as the default tools-grid block; each item's
 * icon/title/description/url maps onto the PixelCard. The CTA chip + hover
 * lift come from PixelCard's `interactive` + `href` (keyboard accessible,
 * focus ring included) instead of hand-rolled markup.
 */
export function ToolsGrid({ section, className, LinkComponent }: ToolsGridProps) {
  const items = (section.items || []) as ToolItem[];

  return (
    <section
      id={section.id || 'tools'}
      className={cn('bg-background py-12 md:py-20', section.className, className)}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 text-center">
          {section.label ? (
            <span className="pxl-corner-sm border-2 border-foreground/15 bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-secondary-foreground">
              {section.label}
            </span>
          ) : null}
          {section.sr_only_title ? (
            <h1 className="font-display text-foreground text-xl font-normal uppercase tracking-wider text-balance md:text-2xl">
              {section.sr_only_title}
            </h1>
          ) : null}
          {section.title ? (
            <h2 className="font-display text-foreground mt-3 text-lg font-normal uppercase tracking-wider md:text-xl">
              {section.title}
            </h2>
          ) : null}
          {section.description ? (
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-balance md:text-base">
              {section.description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <ToolCard key={idx} item={item} LinkComponent={LinkComponent} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ item, LinkComponent }: { item: ToolItem; LinkComponent?: ToolsGridProps['LinkComponent'] }) {
  const Link = LinkComponent ?? defaultLink;
  return (
    <Link
      href={item.url || '#'}
      target={item.target || '_self'}
      className="group block focus:outline-none"
    >
      <PixelCard className="flex h-full flex-col border-foreground/15">
        <div className="flex items-center gap-3">
          {item.icon ? (
            <span className="pxl-corner-sm border-2 border-foreground/15 bg-secondary text-secondary-foreground flex size-9 shrink-0 items-center justify-center shadow-sm">
              <PixelIcon name={item.icon as string} size={18} />
            </span>
          ) : null}
          <h3 className="font-display min-w-0 text-[13px] font-normal uppercase tracking-wider break-words">
            {item.title}
          </h3>
        </div>
        {item.description ? (
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed break-words">
            {item.description}
          </p>
        ) : null}
        <span className="text-primary font-display mt-5 inline-flex items-center gap-1.5 text-[11px] font-normal uppercase tracking-wider">
          Open tool
          <PixelIcon name="arrow-right" size={12} />
        </span>
      </PixelCard>
    </Link>
  );
}

const defaultLink: ToolGridLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className}>
    {children}
  </a>
);
