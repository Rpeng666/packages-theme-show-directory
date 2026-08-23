'use client';

import * as React from 'react';

export interface PerlerTooltipData {
  x: number;
  y: number;
  key: string;
  color: string;
}

export interface PerlerGridTooltipProps {
  tooltipData: PerlerTooltipData | null;
  /** 色号显示函数（app 注入：hex → 色号 key） */
  displayColorKey?: (color: string) => string;
}

/**
 * Perler-beads grid tooltip — pixel retro chrome. Pure presentation; the app
 * injects the hex → 色号 key display function.
 */
export function GridTooltip({ tooltipData, displayColorKey }: PerlerGridTooltipProps) {
  if (!tooltipData) return null;

  return (
    <div
      className="pointer-events-none absolute z-50 flex items-center gap-1.5 border-2 border-foreground/30 bg-retro-bg pxl-corner-sm px-2 py-1 font-mono text-xs text-foreground shadow-md"
      style={{
        left: `${tooltipData.x}px`,
        top: `${tooltipData.y - 25}px`,
        transform: 'translate(-50%, -100%)',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        className="inline-block size-3 shrink-0 border border-foreground/40 pxl-corner-xs"
        style={{ backgroundColor: tooltipData.color }}
      />
      <span className="font-semibold">{displayColorKey?.(tooltipData.color) || tooltipData.key}</span>
    </div>
  );
}
