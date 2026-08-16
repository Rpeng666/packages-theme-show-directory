'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { UploadZoneProps } from '../../contracts/upload-zone'

/**
 * Default UploadZone — shadcn-style dashed drop target. Pure presentation;
 * drag/click callbacks + copy injected by the app.
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
          'flex w-full max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 p-6 text-center transition-all duration-300 sm:p-8',
          isMounted
            ? 'cursor-pointer hover:border-primary hover:bg-primary/5'
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
          <p className="text-sm text-muted-foreground sm:text-base">
            {primaryText}
            {clickLabel && (
              <span className="font-semibold text-primary">{clickLabel}</span>
            )}
          </p>
        )}
        {formatHint && (
          <p className="mt-1 text-xs text-muted-foreground/70">{formatHint}</p>
        )}
      </div>

      {showTip && (
        <div className="w-full max-w-md rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
          <p className="flex items-start text-amber-800">
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
