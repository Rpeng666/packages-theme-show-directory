'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { UploadZoneProps } from '../../contracts/upload-zone'

/**
 * UploadZone — a generic dashed drop target with pixel retro chrome: icon +
 * primary copy (with an optional clickable label), format hint and an optional
 * tip box. Pure presentation; drag/click callbacks + copy injected by the app,
 * so it's a reusable generic asset (no product coupling).
 */
export function UploadZone({ isMounted,
  onDrop,
  onDragOver,
  onClick,
  primaryText,
  clickLabel,
  formatHint,
  showTip = false,
  tipText,
  className, ...rest }: UploadZoneProps) {
  return (
    <div {...rest} className={cn('flex w-full flex-col items-center gap-3', className)}>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragOver}
        onClick={isMounted ? onClick : undefined}
        className={cn(
          'flex w-full max-w-md flex-col items-center justify-center border-2 border-dashed border-foreground/30 bg-retro-surface/20 p-6 text-center pxl-corner-md shadow-sm transition-all duration-300 sm:p-8',
          isMounted
            ? 'cursor-pointer hover:border-retro-cyan hover:bg-retro-cyan/5 hover:shadow-md'
            : 'cursor-wait'
        )}
        style={{ minHeight: '130px' }}
      >
        <svg
          className="mb-2 h-10 w-10 text-muted-foreground sm:mb-3 sm:h-12 sm:w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        {(primaryText || clickLabel) && (
          <p className="font-mono text-xs text-muted-foreground sm:text-sm">
            {primaryText}
            {clickLabel && (
              <span className="font-semibold text-retro-cyan">{clickLabel}</span>
            )}
          </p>
        )}
        {formatHint && (
          <p className="mt-1 font-mono text-xs text-muted-foreground/70">{formatHint}</p>
        )}
      </div>

      {showTip && (
        <div className="w-full max-w-md border-2 border-retro-gold/30 bg-retro-gold/10 p-3 pxl-corner-sm shadow-sm">
          <p className="flex items-start font-mono text-xs text-retro-gold">
            <svg className="mr-1.5 mt-0.5 size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tipText}</span>
          </p>
        </div>
      )}
    </div>
  )
}
