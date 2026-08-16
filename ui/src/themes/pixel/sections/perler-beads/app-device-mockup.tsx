'use client';

import React from 'react';

import { PixelFloat, PixelSlideIn } from '@pxlkit/ui-kit';
import { cn } from '../../../../lib/utils';

/**
 * Combined desktop + iPhone mockup, built entirely from CSS / retro tokens —
 * no image assets, no canvas (SSR-safe). The screens show a small CSS-grid
 * pixel art (the perler-beads letter-grid palette) so the mock echoes the
 * product.
 */

/** 示例图案颜色字母表（映射到 pxlkit retro hex） */
const COLORS: Record<string, string> = {
  G: '#008C4B', // retro-green
  C: '#24827A', // retro-cyan
  R: '#C83741', // retro-red
  Y: '#B48700', // retro-gold
  P: '#8237C8', // retro-purple
  K: '#C84678', // retro-pink
  W: '#F2F0EB', // retro-bg
  D: '#E6E2DC', // retro-surface
};

function cellHex(ch: string): string {
  if (ch === 'T' || ch === ' ') return 'transparent';
  return COLORS[ch] ?? 'transparent';
}

/** 小型像素画 — CSS grid 逐格绘制（每行一个字母串，T = 透明） */
function MiniPixelArt({
  rows,
  cellClass = 'size-1.5 sm:size-2',
}: {
  rows: string[];
  cellClass?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="grid w-max gap-px"
      style={{ gridTemplateColumns: `repeat(${rows[0]?.length ?? 1}, 1fr)` }}
    >
      {rows.flatMap((row, r) =>
        row.split('').map((ch, c) => (
          <span
            key={`${r}-${c}`}
            className={cn(cellClass, 'block')}
            style={{ backgroundColor: cellHex(ch) }}
          />
        ))
      )}
    </div>
  );
}

/** 迷你画布窗口（桌面屏 / 手机屏共用）：网格底 + 扫描线 + 居中像素画 + 标题栏 */
function MiniScreen({
  pattern,
  label,
  compact = false,
  className,
}: {
  pattern: string[];
  label: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden border-2 border-retro-border/60 bg-retro-bg',
        className
      )}
    >
      {/* 窗口标题栏 */}
      {!compact && (
        <div className="flex items-center gap-1.5 border-b border-retro-border/50 bg-retro-surface/80 px-2 py-1">
          <span className="size-1.5 rounded-full bg-retro-red" />
          <span className="size-1.5 rounded-full bg-retro-gold" />
          <span className="size-1.5 rounded-full bg-retro-green" />
          <span className="ml-1 truncate font-mono text-[9px] uppercase tracking-wider text-retro-muted">
            {label}
          </span>
        </div>
      )}
      {/* 画布区 */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-3">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 scanlines" aria-hidden="true" />
        <MiniPixelArt rows={pattern} />
      </div>
    </div>
  );
}

/* 示例图案（heart / apple / frog — 与社区页示例同源） */
const HEART_PATTERN = [
  'KRRKKRRKKT',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'KRRRRRRRRK',
  'KKRRRRRRKK',
  'TTKRRRRKTT',
  'TTTKKKKTTT',
  'TTTTKKTTTT',
  'TTTTTTTTTT',
  'TTTTTTTTTT',
];

const APPLE_PATTERN = [
  'TTTTGGTTTT',
  'TTGGTTTTTT',
  'TGRRRRRTG',
  'TGRRRRRRG',
  'TGRRRRRRG',
  'TRRRRRRRRG',
  'TGRRRRRRGT',
  'TTGRRRRGT',
  'TTGGGGGTTT',
];

/**
 * 桌面显示器 + 重叠 iPhone 的组合 mockup。
 * - 桌面：外框（pxl-corner 粗边框）→ 屏幕 MiniScreen（heart）→ 底座
 * - iPhone：绝对定位叠在屏幕右下角，略上浮动画
 */
export function PerlerDeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <PixelSlideIn from="up" distance={24}>
        {/* 桌面显示器 */}
        <div className="pxl-corner-md relative border-2 border-retro-border bg-retro-surface p-2 shadow-lg sm:p-3">
          <MiniScreen pattern={HEART_PATTERN} label="PixelBean — perler" />
          {/* 显示器底座 */}
          <div className="mx-auto mt-2 h-2 w-24 border-2 border-t-0 border-retro-border bg-retro-surface/60" />
          <div className="mx-auto h-2 w-36 border-2 border-retro-border bg-retro-card" />
        </div>

        {/* iPhone — 叠在屏幕右下角 */}
        <div className="absolute -bottom-8 -right-2 w-[32%] max-w-[160px] sm:-right-6">
          <PixelFloat distance={10}>
            <div className="pxl-corner-md relative border-2 border-retro-border bg-retro-card p-1.5 shadow-lg">
              {/* 刘海 */}
              <div className="mx-auto mt-1 h-1 w-8 rounded-full bg-retro-text/70" />
              <div className="mt-1.5 overflow-hidden rounded-sm border-2 border-retro-border/60">
                <MiniScreen pattern={APPLE_PATTERN} label="PixelBean" compact />
              </div>
              <div className="mx-auto mt-1 h-0.5 w-10 rounded-full bg-retro-border/60" />
            </div>
          </PixelFloat>
        </div>
      </PixelSlideIn>
    </div>
  );
}
