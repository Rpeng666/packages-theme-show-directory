'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { HintBannerProps } from '../../contracts/hint-banner'

/**
 * HintBanner — a quiet single-row tip.
 *
 * Restrained style: one hairline-bordered row with a primary icon; the
 * action hint is emphasized, the recommendation is muted. No nested boxes.
 */
export function HintBanner({ actionHint, recommendHint, className, ...rest }: HintBannerProps) {
  return (
    <div
      {...rest}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3',
        className
      )}
    >
      <svg
        className="size-4 shrink-0 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>

      {actionHint && (
        <span className="text-sm font-medium text-foreground">{actionHint}</span>
      )}

      {actionHint && recommendHint && (
        <span className="size-0.5 shrink-0 rounded-full bg-border" />
      )}

      {recommendHint && (
        <span className="text-sm text-muted-foreground">{recommendHint}</span>
      )}
    </div>
  )
}

export default HintBanner
