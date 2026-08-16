'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { DualCtaProps } from '../../contracts/dual-cta'

/**
 * Default DualCta — two stacked CTA buttons (shadcn-style). Pure presentation;
 * click handlers + labels injected by the app (labels optional, no defaults).
 */
export function DualCta({ onPrimary, onSecondary, primaryLabel, secondaryLabel, className, ...rest }: DualCtaProps) {
  return (
    <div {...rest} className={cn('mt-4 w-full space-y-3 md:max-w-2xl', className)}>
      <button
        type="button"
        onClick={onPrimary}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-primary bg-primary/10 px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-primary shadow-sm transition-all hover:bg-primary/20 hover:shadow-md sm:text-base"
      >
        <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        {primaryLabel}
      </button>

      <button
        type="button"
        onClick={onSecondary}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-amber-700 shadow-sm transition-all hover:bg-amber-100 hover:shadow-md sm:text-base"
      >
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {secondaryLabel}
      </button>
    </div>
  )
}
