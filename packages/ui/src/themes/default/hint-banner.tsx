'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { HintBannerProps } from '../../contracts/hint-banner'

/**
 * Default HintBanner — shadcn-style info banner with up to two hint segments.
 * Pure presentation; copy injected by the app (optional, no defaults).
 */
export function HintBanner({ actionHint, recommendHint, className, ...rest }: HintBannerProps) {
  return (
    <div {...rest} className={cn('mb-4 w-full rounded-lg border border-primary/30 bg-primary/5 p-3', className)}>
      <div className="flex flex-col items-start justify-center gap-2 rounded-md border border-primary/20 bg-primary/5 p-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-3">
        {actionHint && (
          <div className="flex w-full items-center gap-1 sm:w-auto">
            <svg className="size-3.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="text-primary">{actionHint}</span>
          </div>
        )}
        {actionHint && recommendHint && (
          <span className="hidden text-muted-foreground/30 sm:inline">|</span>
        )}
        {recommendHint && (
          <div className="flex w-full items-center gap-1 sm:w-auto">
            <svg className="size-3.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-primary">{recommendHint}</span>
          </div>
        )}
      </div>
    </div>
  )
}
