'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';

export interface PresetItem {
  id: string;
  /** Label under the preview. */
  label: string;
  /** Preview swatches (e.g. two colors for a gradient/duotone preset). */
  swatches?: string[];
  /** Optional CSS background to render as the preview thumb. */
  preview?: string;
}

export interface PresetGridProps {
  items: PresetItem[];
  /** Currently selected preset id (highlighted). */
  activeId?: string | null;
  onSelect?: (id: string) => void;
  /** Grid columns (default 2). */
  cols?: 2 | 3;
  /** Swatch aspect — 'square' renders a thumb, 'bar' renders a thin strip. */
  variant?: 'thumb' | 'bar';
  className?: string;
}

/**
 * PresetGrid — a responsive grid of preset cards (label + color-swatch
 * preview). Used by the Looks / PIXEL EFFECT / DUOTONE / Backgrounds panels.
 * Pure presentation; the parent owns the active id + selection.
 */
export function PresetGrid({
  items,
  activeId,
  onSelect,
  cols = 2,
  variant = 'thumb',
  className,
}: PresetGridProps) {
  return (
    <div
      className={cn(
        'grid gap-2',
        cols === 2 ? 'grid-cols-2' : 'grid-cols-3',
        className,
      )}
    >
      {items.map((item) => {
        const active = activeId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item.id)}
            aria-pressed={active}
            className={cn(
              'group flex flex-col gap-1.5 p-1 text-left outline-none',
              'border-2 pxl-corner-sm transition-colors',
              active
                ? 'border-retro-cyan/60 bg-retro-cyan/10'
                : 'border-foreground/10 bg-retro-surface/20 hover:border-foreground/30',
            )}
          >
            <span
              className={cn(
                'block w-full overflow-hidden border-2 border-foreground/10 bg-retro-bg',
                variant === 'bar' ? 'h-5' : 'aspect-[4/3]',
              )}
              aria-hidden
            >
              {item.preview ? (
                <span className="block h-full w-full" style={{ background: item.preview }} />
              ) : (
                <span className="flex h-full w-full">
                  {item.swatches && item.swatches.length > 0 ? (
                    item.swatches.map((c, i) => (
                      <span
                        key={i}
                        className="h-full flex-1"
                        style={{ backgroundColor: c }}
                      />
                    ))
                  ) : (
                    <span className="h-full w-full bg-retro-surface/40" />
                  )}
                </span>
              )}
            </span>
            <span
              className={cn(
                'truncate font-mono text-[10px] uppercase tracking-wide',
                active ? 'text-retro-cyan' : 'text-muted-foreground group-hover:text-foreground',
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
