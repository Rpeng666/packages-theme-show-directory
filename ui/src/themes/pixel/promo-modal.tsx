'use client'

import * as React from 'react'

import type { PromoModalProps } from '../../contracts/promo-modal'
/**
 * PromoModal — a full-screen "go somewhere" overlay (e.g. "a new workbench
 * is live"). Pixel retro chrome. Pure presentation; open state + copy are
 * injected by the app, so it's a reusable generic asset (no product coupling).
 */
export function PromoModal({
  isOpen,
  onClose,
  title,
  description,
  stayLabel,
  goLabel,
  goHref,
  closeLabel = 'Close',
  icon,
}: PromoModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-md border-2 border-foreground/15 bg-background p-6 pxl-corner-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground/70 transition-colors hover:text-foreground"
          aria-label={closeLabel}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden>
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center border-2 border-retro-cyan/40 bg-retro-cyan/10 pxl-corner-sm">
            {icon ?? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-6 text-retro-cyan" aria-hidden>
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v8h12V4H4zm-1 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h3 className="font-display text-lg uppercase tracking-wider text-foreground">
            {title}
          </h3>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            {description}
          </p>
          <div className="mt-5 flex w-full gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-foreground/20 bg-retro-surface/30 px-4 py-2.5 font-mono text-sm text-muted-foreground pxl-corner-sm transition-colors hover:bg-retro-surface/50"
            >
              {stayLabel}
            </button>
            <a
              href={goHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 border-2 border-retro-cyan bg-retro-cyan/15 px-4 py-2.5 font-mono text-sm text-retro-cyan pxl-corner-sm transition-colors hover:bg-retro-cyan/25"
            >
              {goLabel}
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden>
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h9.586L11.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
