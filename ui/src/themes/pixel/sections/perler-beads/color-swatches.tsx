'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerColorSwatchItem {
  key: string;
  color: string;
  isExternal?: boolean;
}

/** Fallback preset palette — always 16 swatches so the grid stays full. */
export const PRESET_SWATCHES: PerlerColorSwatchItem[] = [
  { key: '#000000', color: '#000000' },
  { key: '#2F7FE0', color: '#2F7FE0' }, // Doraemon blue
  { key: '#E53935', color: '#E53935' }, // red
  { key: '#F5C542', color: '#F5C542' }, // yellow
  { key: '#4CAF50', color: '#4CAF50' }, // green
  { key: '#9C27B0', color: '#9C27B0' }, // purple
  { key: '#FF6F61', color: '#FF6F61' }, // coral
  { key: '#00BCD4', color: '#00BCD4' }, // cyan
  { key: '#FFFFFF', color: '#FFFFFF' },
  { key: '#EEEEEE', color: '#EEEEEE' },
  { key: '#9E9E9E', color: '#9E9E9E' },
  { key: '#607D8B', color: '#607D8B' }, // blue-grey
  { key: '#795548', color: '#795548' }, // brown
  { key: '#F8BBD0', color: '#F8BBD0' }, // pink
  { key: '#FF9800', color: '#FF9800' }, // orange
  { key: '#8BC34A', color: '#8BC34A' }, // light green
];

export interface PerlerColorSwatchesProps {
  /** Swatches to show. When empty/short, falls back to the preset palette. */
  colors: PerlerColorSwatchItem[];
  /** Currently selected color. */
  selectedColor: { key: string; color: string; isExternal?: boolean } | null;
  onColorSelect: (swatch: PerlerColorSwatchItem) => void;
  /** Click the "more colors" button. */
  onMoreColors?: () => void;
  /** "More colors" button label. */
  moreLabel?: string;
  /** Label above the swatch row. */
  label?: string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
  className?: string;
}

/**
 * ColorSwatches — a compact color picker: the currently selected color + a
 * grid of common swatches + a "more colors" button. Designed to sit at the top
 * of a settings panel (NOT a standalone sidebar item). Pure presentation;
 * reusable across the pixel-art workbenches.
 */
export function ColorSwatches({
  colors,
  selectedColor,
  onColorSelect,
  onMoreColors,
  moreLabel = 'More colors…',
  label = 'Color',
  className,
}: PerlerColorSwatchesProps) {
  const swatches = colors.length >= 8 ? colors.slice(0, 16) : PRESET_SWATCHES;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-foreground">{label}</span>
        {selectedColor ? (
          <span className="flex items-center gap-1.5 font-mono text-[10px] tabular-nums text-muted-foreground">
            <span
              className="block size-3 border border-foreground/30"
              style={{ backgroundColor: selectedColor.color }}
            />
            {selectedColor.color.toUpperCase()}
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-8 gap-1.5">
        {swatches.map((swatch) => {
          const active = selectedColor?.color.toUpperCase() === swatch.color.toUpperCase();
          return (
            <button
              key={swatch.key}
              type="button"
              onClick={() => onColorSelect(swatch)}
              aria-pressed={active}
              aria-label={swatch.color}
              title={swatch.color}
              className={cn(
                'aspect-square w-full border-2 pxl-corner-sm transition-transform',
                active
                  ? 'scale-110 border-retro-cyan shadow-[0_0_0_2px_rgba(6,182,212,0.4)]'
                  : 'border-foreground/15 hover:scale-105 hover:border-foreground/40',
              )}
              style={{ backgroundColor: swatch.color }}
            />
          );
        })}
      </div>

      {onMoreColors ? (
        <button
          type="button"
          onClick={onMoreColors}
          className="border-2 border-foreground/15 bg-retro-surface/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-retro-cyan/50 hover:text-retro-cyan pxl-corner-sm"
        >
          {moreLabel}
        </button>
      ) : null}
    </div>
  );
}
