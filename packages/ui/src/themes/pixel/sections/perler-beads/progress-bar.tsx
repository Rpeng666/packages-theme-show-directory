'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerProgressBarProps {
  progressPercentage: number;
  recommendedCell?: { row: number; col: number } | null;
  colorInfo?: {
    color: string;
    name: string;
    total: number;
    completed: number;
  };
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads progress bar — pixel retro chrome. Pure presentation.
 */
export function ProgressBar({ progressPercentage, recommendedCell, t = defaultPerlerT }: PerlerProgressBarProps) {
  const progressDots = Array.from({ length: 7 }, (_, index) => {
    const threshold = (index + 1) * (100 / 7);
    const isFilled = progressPercentage >= threshold;
    return (
      <div
        key={index}
        className={cn(
          'size-3 rounded-full border-2',
          isFilled ? 'border-retro-cyan bg-retro-cyan/60' : 'border-foreground/20 bg-retro-surface/40'
        )}
      />
    );
  });

  return (
    <div className="flex h-10 items-center justify-between border-b-2 border-foreground/10 bg-retro-surface/30 px-4 py-2">
      <div className="flex items-center gap-2">
        {progressDots}
        <span className="ml-2 font-mono text-sm font-medium text-foreground">{progressPercentage}%</span>
      </div>
      <div className="font-mono text-xs text-muted-foreground">
        {recommendedCell ? (
          <span>{t('fmNextCell', { row: recommendedCell.row + 1, col: recommendedCell.col + 1 })}</span>
        ) : (
          <span>{t('fmColorDone')}</span>
        )}
      </div>
    </div>
  );
}
