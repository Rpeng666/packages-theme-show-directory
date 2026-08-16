'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerColorInfo {
  color: string;
  name: string;
  total: number;
  completed: number;
}

export interface PerlerColorPanelProps {
  colors: PerlerColorInfo[];
  currentColor: string;
  onColorSelect: (color: string) => void;
  onClose: () => void;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads color panel — pixel retro chrome. Owns only search/sort UI
 * state; the app injects color data + selection callback.
 */
export function ColorPanel({ colors, currentColor, onColorSelect, onClose, t = defaultPerlerT }: PerlerColorPanelProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'progress' | 'name' | 'total'>('progress');

  const filteredAndSortedColors = colors
    .filter(
      (color) =>
        color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.color.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'progress': {
          const pa = (a.completed / a.total) * 100;
          const pb = (b.completed / b.total) * 100;
          return pa - pb;
        }
        case 'name':
          return a.name.localeCompare(b.name);
        case 'total':
          return b.total - a.total;
        default:
          return 0;
      }
    });

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/60">
      <div className="flex max-h-[80vh] w-full flex-col border-t-2 border-foreground/15 bg-background pxl-corner-t-md">
        <div className="flex justify-center py-2">
          <div className="h-1 w-10 rounded-full bg-foreground/20" />
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder={t('cpSearch')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-foreground/20 bg-background py-2 pl-10 pr-4 font-mono text-sm text-foreground outline-none focus:border-retro-cyan pxl-corner-sm placeholder:text-muted-foreground/50"
            />
            <svg
              className="absolute left-3 top-2.5 size-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="px-4 pb-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'progress' | 'name' | 'total')}
            className="w-full border-2 border-foreground/20 bg-background p-2 font-mono text-sm text-foreground outline-none focus:border-retro-cyan pxl-corner-sm"
          >
            <option value="progress">{t('cpSortProgress')}</option>
            <option value="name">{t('cpSortName')}</option>
            <option value="total">{t('cpSortCount')}</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {filteredAndSortedColors.map((colorInfo) => {
            const progressPercentage = Math.round((colorInfo.completed / colorInfo.total) * 100);
            const isSelected = colorInfo.color === currentColor;
            const isCompleted = progressPercentage === 100;

            return (
              <button
                key={colorInfo.color}
                type="button"
                onClick={() => onColorSelect(colorInfo.color)}
                className={cn(
                  'mb-2 w-full border-2 p-3 pxl-corner-sm transition-all',
                  isSelected
                    ? 'border-retro-cyan bg-retro-cyan/10'
                    : 'border-foreground/15 bg-retro-surface/20 hover:border-foreground/40',
                  isCompleted && 'opacity-60'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 shrink-0 rounded-full border-2 border-foreground/30"
                      style={{ backgroundColor: colorInfo.color }}
                    />
                    <div className="text-left">
                      <div className="font-mono text-sm font-bold text-foreground">{colorInfo.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {colorInfo.completed}/{colorInfo.total} ({progressPercentage}%)
                      </div>
                    </div>
                  </div>
                  {isCompleted && <span className="font-mono text-xs text-retro-green">{t('done')}</span>}
                </div>
              </button>
            );
          })}
          {filteredAndSortedColors.length === 0 && (
            <div className="py-4 text-center font-mono text-xs text-muted-foreground">{t('cpNoMatch')}</div>
          )}
        </div>

        <div className="border-t-2 border-foreground/10 p-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full border-2 border-foreground/20 bg-retro-surface/30 py-2 font-mono text-sm text-foreground pxl-corner-sm transition-all hover:bg-retro-surface/50"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
