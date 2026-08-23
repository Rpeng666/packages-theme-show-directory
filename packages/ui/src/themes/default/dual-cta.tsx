'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { DualCtaProps } from '../../contracts/dual-cta'

/**
 * DualCta — primary + secondary action pair.
 *
 * Restrained editor style: the primary CTA is a solid `primary` button with
 * an arrow affordance; the secondary is a quiet outline button. Side by side
 * on wide screens, stacked on narrow. No uppercase, no accent colors beyond
 * the semantic primary token.
 */

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
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
        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {primaryLabel}
        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <button
        type="button"
        onClick={onSecondary}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
      >
        {secondaryLabel}
      </button>
    </div>
  )
}

export default DualCta
