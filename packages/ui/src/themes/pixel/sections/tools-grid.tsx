'use client';

import * as React from 'react';

import { PixelCard } from '@pxlkit/ui-kit';
import { cn } from '../../../lib/utils';
import { PixelIcon } from '../../../components/pixel-icon';
import type { ToolsGridProps, ToolGridLink } from '../../../contracts/sections/tools-grid';
import type { SectionItem } from '../../../types/landing';

export interface ToolItem extends SectionItem {
  url: string;
  /** Catalog category key (generation/palette/sprite/image/craft) - drives the filter chips. */
  category?: string;
}

/*
 * Pixel tools-grid — chamfered tool cards (PixelCard interactive) on a retro
 * grid. Same data contract as the default tools-grid block; each item's
 * icon/title/description/url maps onto the PixelCard. The CTA chip + hover
 * lift come from PixelCard's `interactive` + `href` (keyboard accessible,
 * focus ring included) instead of hand-rolled markup.
 */
export function ToolsGrid({ section, className, LinkComponent, ...rest }: ToolsGridProps) {
  const items = (section.items || []) as ToolItem[];
  // Search + category filter (client-side) - with 39+ tools a flat grid is a
  // wall of links; users need to find a tool by task, not by scrolling.
  // Optional section data injected from locale by the app:
  //   search_placeholder / all_label / category_labels ({category -> label}).
  const [query, setQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  const categoryLabels = (section as { category_labels?: Record<string, string> }).category_labels ?? {};
  const searchPlaceholder = (section as { search_placeholder?: string }).search_placeholder ?? 'Search tools…';
  const allLabel = (section as { all_label?: string }).all_label ?? 'All';

  const categories = React.useMemo(() => {
    const seen: string[] = [];
    for (const item of items) {
      if (item.category && !seen.includes(item.category)) seen.push(item.category);
    }
    return seen;
  }, [items]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeCategory && item.category !== activeCategory) return false;
      if (!q) return true;
      return (
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q)
      );
    });
  }, [items, query, activeCategory]);

  return (
    <section {...rest}
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

        {/* Search + category filter */}
        {items.length > 6 && (
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="relative w-full max-w-md">
              <PixelIcon name="search" size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="w-full border-2 border-foreground/15 bg-retro-surface/30 py-2 pl-9 pr-3 font-mono text-sm text-foreground outline-none focus:border-retro-cyan/50 pxl-corner-sm"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={cn(
                  'border-2 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider transition-colors pxl-corner-sm',
                  activeCategory === null
                    ? 'border-retro-cyan/60 bg-retro-cyan/10 text-retro-cyan'
                    : 'border-foreground/15 bg-retro-surface/30 text-muted-foreground hover:text-foreground',
                )}
              >
                {allLabel}
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === c ? null : c)}
                  className={cn(
                    'border-2 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider transition-colors pxl-corner-sm',
                    activeCategory === c
                      ? 'border-retro-cyan/60 bg-retro-cyan/10 text-retro-cyan'
                      : 'border-foreground/15 bg-retro-surface/30 text-muted-foreground hover:text-foreground',
                  )}
                >
                  {categoryLabels[c] ?? c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, idx) => (
            <ToolCard key={item.url || idx} item={item} LinkComponent={LinkComponent} />
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
