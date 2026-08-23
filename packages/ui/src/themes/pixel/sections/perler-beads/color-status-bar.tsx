'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerColorStatusBarProps {
  currentColor: string;
  colorInfo?: {
    color: string;
    name: string;
    total: number;
    completed: number;
  };
  progressPercentage: number;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads color status bar — pixel retro chrome. Pure presentation.
 */
export function ColorStatusBar({ currentColor, colorInfo, progressPercentage, t = defaultPerlerT }: PerlerColorStatusBarProps) {
  if (!colorInfo) {
    return (
      <div className="flex h-12 items-center border-b-2 border-foreground/10 bg-retro-surface/30 px-4 py-2">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{t('cpSelectFirst')}</div>
      </div>
    );
  }

  const estimatedTime = Math.ceil((colorInfo.total - colorInfo.completed) * 0.1);

  return (
    <div className="flex h-12 items-center justify-between border-b-2 border-foreground/10 bg-retro-surface/30 px-4 py-2">
      <div className="flex items-center gap-3">
        <div
          className="size-8 rounded-full border-2 border-foreground/30"
          style={{ backgroundColor: currentColor }}
        />
        <div className="px-2 font-mono text-sm font-bold text-foreground">{colorInfo.name}</div>
        <div className="flex flex-col">
          <div className="font-mono text-sm font-medium text-foreground">
            {colorInfo.completed}/{colorInfo.total}
          </div>
          <div className="text-xs text-muted-foreground">{t('fmEstimated', { minutes: estimatedTime })}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono text-lg font-bold text-retro-cyan">{progressPercentage}%</div>
      </div>
    </div>
  );
}
