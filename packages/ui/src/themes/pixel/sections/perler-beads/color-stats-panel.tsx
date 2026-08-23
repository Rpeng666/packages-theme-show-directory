'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import type { PerlerColorSystem } from '../../../../contracts/perler-beads/types';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerColorCountInfo {
  color: string;
  count: number;
}

export interface PerlerColorStatsPanelRef {
  /** 展开"已排除的颜色"列表（供外部触发器调用） */
  expandExcludedColors: () => void;
}

export interface PerlerColorStatsPanelProps {
  totalBeadCount: number;
  colorCounts: Record<string, PerlerColorCountInfo>;
  excludedColorKeys: Set<string>;
  selectedColorSystem: PerlerColorSystem;
  onExportShoppingList: () => void;
  onToggleExcludeColor: (hexKey: string) => void;
  onRestoreColor: (hexKey: string) => void;
  onRestoreAllColors: () => void;
  /** 色号显示函数（app 注入：hex → 色号 key） */
  displayColorKey?: (hex: string, system: PerlerColorSystem) => string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads color stats panel — pixel retro chrome. Pure presentation;
 * color data + exclude/restore + export callbacks are injected by the app.
 */
export function ColorStatsPanel({
  totalBeadCount,
  colorCounts,
  excludedColorKeys,
  selectedColorSystem,
  onExportShoppingList,
  onToggleExcludeColor,
  onRestoreColor,
  onRestoreAllColors,
  displayColorKey = defaultDisplayColorKey,
  t = defaultPerlerT,
  ref,
}: PerlerColorStatsPanelProps & { ref?: React.Ref<PerlerColorStatsPanelRef> }) {
  const [showExcludedColors, setShowExcludedColors] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    expandExcludedColors: () => setShowExcludedColors(true),
  }), []);

  const entries = Object.keys(colorCounts)
    .map((hexKey) => {
      const isExcluded = excludedColorKeys.has(hexKey);
      const info = colorCounts[hexKey];
      return {
        hexKey,
        isExcluded,
        count: info.count,
        colorHex: info.color,
        displayColorKey: displayColorKey(hexKey, selectedColorSystem),
        pct: totalBeadCount > 0 ? (info.count / totalBeadCount) * 100 : 0,
      };
    })
    .sort((a, b) => {
      const regex = /^([A-Z]+)(\d+)$/;
      const matchA = a.hexKey.match(regex);
      const matchB = b.hexKey.match(regex);
      if (matchA && matchB) {
        const prefixA = matchA[1];
        const numA = parseInt(matchA[2], 10);
        const prefixB = matchB[1];
        const numB = parseInt(matchB[2], 10);
        if (prefixA !== prefixB) return prefixA.localeCompare(prefixB);
        return numA - numB;
      }
      return a.hexKey.localeCompare(b.hexKey);
    });

  const excludedList = Array.from(excludedColorKeys)
    .map((hexKey) => {
      const colorData = entries.find((e) => e.hexKey === hexKey);
      return { hexKey, colorHex: colorData?.colorHex || hexKey };
    })
    .sort((a, b) => {
      const regex = /^([A-Z]+)(\d+)$/;
      const matchA = a.hexKey.match(regex);
      const matchB = b.hexKey.match(regex);
      if (matchA && matchB) {
        const prefixA = matchA[1];
        const numA = parseInt(matchA[2], 10);
        const prefixB = matchB[1];
        const numB = parseInt(matchB[2], 10);
        if (prefixA !== prefixB) return prefixA.localeCompare(prefixB);
        return numA - numB;
      }
      return a.hexKey.localeCompare(b.hexKey);
    });

  return (
    <div className="mt-6 w-full border-2 border-foreground/15 bg-retro-surface/20 p-4 pxl-corner-md shadow-md color-stats-panel">
      {/* 标题 */}
      <h3 className="mb-1 text-center font-display text-lg uppercase tracking-wider text-foreground">{t('csTitle')}</h3>
      {/* 副标题 */}
      <p className="mb-3 text-center text-xs text-muted-foreground">
        {t('csSubtitle', { total: totalBeadCount })}
      </p>

      {/* 采购清单导出（突破功能） */}
      <div className="mb-3 flex justify-center">
        <button
          type="button"
          onClick={onExportShoppingList}
          className="inline-flex items-center gap-1.5 border-2 border-retro-green/40 bg-retro-green/15 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-retro-green transition-all hover:bg-retro-green/25 pxl-corner-sm"
          title={t('csExportListTitle')}
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          {t('csExportList')}
        </button>
      </div>

      <ul className="max-h-60 space-y-1 overflow-y-auto pr-2 text-sm">
        {entries.map(({ hexKey, isExcluded, count, colorHex, displayColorKey: dk, pct }) => (
          <li
            key={hexKey}
            onClick={() => onToggleExcludeColor(hexKey)}
            className={cn(
              'relative flex cursor-pointer items-center justify-between overflow-hidden rounded-sm p-1.5 transition-colors',
              isExcluded
                ? 'bg-retro-red/10 opacity-70 hover:bg-retro-red/20'
                : 'hover:bg-retro-surface/40'
            )}
            title={isExcluded ? t('csClickRestore', { key: dk }) : t('csClickExclude', { key: dk })}
          >
            {/* 占比条 */}
            <div
              className="absolute inset-y-0 left-0 bg-retro-cyan/10"
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
            <div className={cn('relative flex items-center gap-2', isExcluded && 'line-through')}>
              <span
                className="inline-block size-4 shrink-0 rounded-sm border-2 border-foreground/30"
                style={{ backgroundColor: isExcluded ? '#666' : colorHex }}
              />
              <span className={cn('font-mono font-medium', isExcluded ? 'text-retro-red' : 'text-foreground')}>
                {dk}
              </span>
            </div>
            <span className={cn('relative text-xs', isExcluded ? 'text-retro-red line-through' : 'text-muted-foreground')}>
              {t('csPerBead', { count, pct: pct.toFixed(1) })}
            </span>
          </li>
        ))}
      </ul>

      {excludedColorKeys.size > 0 && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowExcludedColors((prev) => !prev)}
            className="flex w-full items-center justify-between border-2 border-foreground/20 bg-retro-surface/30 px-2 py-1.5 pxl-corner-sm text-xs text-muted-foreground transition-colors hover:bg-retro-surface/50"
          >
            <span>{t('csExcludedCount', { count: excludedColorKeys.size })}</span>
            <svg
              className={cn('size-4 transition-transform', showExcludedColors && 'rotate-180')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showExcludedColors && (
            <div className="mt-2 border-2 border-foreground/10 bg-retro-surface/30 p-2 pxl-corner-sm">
              <div className="max-h-40 overflow-y-auto">
                {excludedList.length > 0 ? (
                  <ul className="space-y-1">
                    {excludedList.map(({ hexKey, colorHex }) => (
                      <li
                        key={hexKey}
                        className="flex items-center justify-between p-1 transition-colors hover:bg-retro-surface/40"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block size-4 shrink-0 rounded-sm border-2 border-foreground/30"
                            style={{ backgroundColor: colorHex }}
                          />
                          <span className="font-mono text-xs text-foreground">
                            {displayColorKey(hexKey, selectedColorSystem)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRestoreColor(hexKey)}
                          className="rounded-sm px-2 py-0.5 text-xs text-retro-cyan transition-colors hover:bg-retro-cyan/20"
                        >
                          {t('restore')}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="py-2 text-center text-xs text-muted-foreground">{t('csNoExcluded')}</p>
                )}
              </div>

              <button
                type="button"
                onClick={onRestoreAllColors}
                className="mt-2 w-full border-2 border-retro-cyan/40 bg-retro-cyan/15 px-2 py-1 pxl-corner-sm text-xs text-retro-cyan transition-colors hover:bg-retro-cyan/25"
              >
                {t('csRestoreAll')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const defaultDisplayColorKey: NonNullable<
  PerlerColorStatsPanelProps['displayColorKey']
> = (hex: string) => hex.toUpperCase();
