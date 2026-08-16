'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { HintBannerProps } from '../../contracts/hint-banner'

/**
 * HintBanner — a generic info banner with pixel retro chrome, up to two hint
 * segments. Pure presentation; the copy is injected by the app (optional, no
 * defaults), so it's a reusable generic asset (no product coupling).
 */
export function HintBanner({ actionHint, recommendHint, className, ...rest }: HintBannerProps) {
  return (
    <div {...rest} className={cn('mb-4 w-full border-2 border-retro-cyan/30 bg-retro-cyan/10 p-3 pxl-corner-sm shadow-sm', className)}>
      <div className="flex flex-col items-start justify-center gap-2 border-2 border-retro-cyan/20 bg-retro-cyan/5 p-2 font-mono text-xs text-muted-foreground pxl-corner-sm sm:flex-row sm:items-center sm:gap-3 sm:text-xs">
        {actionHint && (
          <div className="flex w-full items-center gap-1 sm:w-auto">
            <svg className="size-3.5 shrink-0 text-retro-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="text-retro-cyan">{actionHint}</span>
          </div>
        )}
        {actionHint && recommendHint && (
          <span className="hidden text-foreground/20 sm:inline">|</span>
        )}
        {recommendHint && (
          <div className="flex w-full items-center gap-1 sm:w-auto">
            <svg className="size-3.5 shrink-0 text-retro-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-retro-cyan">{recommendHint}</span>
          </div>
        )}
      </div>
    </div>
  )
}
