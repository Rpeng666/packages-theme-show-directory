'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';

export interface PerlerColorStatusBarProps {
  currentColor: string;
  colorInfo?: {
    color: string;
    name: string;
    total: number;
    completed: number;
  };
  progressPercentage: number;
}

/**
 * Perler-beads color status bar — pixel retro chrome. Pure presentation.
 */
export function ColorStatusBar({ currentColor, colorInfo, progressPercentage }: PerlerColorStatusBarProps) {
  if (!colorInfo) {
    return (
      <div className="flex h-12 items-center border-b-2 border-foreground/10 bg-retro-surface/30 px-4 py-2">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">请选择颜色</div>
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
          <div className="text-xs text-muted-foreground">预计还需 {estimatedTime}分钟</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono text-lg font-bold text-retro-cyan">{progressPercentage}%</div>
      </div>
    </div>
  );
}
