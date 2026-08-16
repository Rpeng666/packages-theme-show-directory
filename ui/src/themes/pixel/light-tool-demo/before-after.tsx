'use client';

import * as React from 'react';

import { cn } from '../../../lib/utils';

/**
 * BeforeAfter - draggable before/after comparison for the light-tool demos.
 * Stacks the original and the processed result, clips the result by a
 * draggable divider so users can inspect the effect at pixel level (that
 * inspection is the whole point of these tools). Pure presentation.
 */
export interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  className,
}: BeforeAfterProps) {
  const [pos, setPos] = React.useState(50);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) updateFromClientX(e.clientX);
  };
  const stop = () => {
    draggingRef.current = false;
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        'relative touch-none select-none overflow-hidden border-2 border-foreground/10 bg-retro-bg pxl-corner-sm',
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerLeave={stop}
    >
      {/* Before (original) fills the box; result is clipped on top. */}
      <img
        src={beforeSrc}
        alt={beforeLabel ?? 'before'}
        draggable={false}
        className="max-h-72 w-full object-contain [image-rendering:pixelated]"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={afterSrc}
          alt={afterLabel ?? 'after'}
          draggable={false}
          className="max-h-72 w-full object-contain [image-rendering:pixelated]"
        />
      </div>

      {/* Divider handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-retro-cyan"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-retro-cyan bg-background/90 font-mono text-[10px] text-retro-cyan">
          ↔
        </span>
      </div>

      {beforeLabel ? (
        <span className="pointer-events-none absolute bottom-1.5 left-1.5 bg-background/80 px-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {beforeLabel}
        </span>
      ) : null}
      {afterLabel ? (
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 bg-background/80 px-1.5 font-mono text-[10px] uppercase tracking-wider text-retro-cyan">
          {afterLabel}
        </span>
      ) : null}
    </div>
  );
}
