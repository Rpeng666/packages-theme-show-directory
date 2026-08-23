'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { DualCtaProps } from '../../contracts/dual-cta'

/**
 * DualCta (pixel) — primary + secondary action pair in the retro style.
 *
 * Primary is a solid retro-cyan button with a forward arrow; secondary is a
 * quiet retro-gold outline. Side by side on wide screens, stacked on narrow.
 * Keeps the pixel language: pxl-corner corners, mono font, hard shadows.
 */

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export function DualCta({
  onPrimary,
  onSecondary,
  primaryLabel = 'Get started',
  secondaryLabel = 'Learn more',
  className,
  ...rest
}: DualCtaProps) {
  return (
    <div
      {...rest}
      className={cn(
        'flex w-full flex-col gap-3 sm:flex-row sm:items-center md:max-w-2xl',
        className
      )}
    >
      <button
        type="button"
        onClick={onPrimary}
        className="group inline-flex items-center justify-center gap-2 border-2 border-retro-cyan bg-retro-cyan px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-retro-bg pxl-corner-md shadow-md transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
      >
        {primaryLabel}
        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <button
        type="button"
        onClick={onSecondary}
        className="inline-flex items-center justify-center gap-2 border-2 border-retro-gold/50 bg-transparent px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-retro-gold pxl-corner-md shadow-md transition-all duration-150 hover:bg-retro-gold/10"
      >
        {secondaryLabel}
      </button>
    </div>
  )
}

export default DualCta
