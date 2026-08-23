'use client'

import * as React from 'react'

import { Sparkles } from 'lucide-react'
import type { PromoModalProps } from '../../contracts/promo-modal'
import { Dialog } from './dialog'

const PROMO_POINTS = [
  'Unlimited generations',
  'Priority queue',
  'Export in every format',
]

/**
 * PromoModal — upgrade prompt.
 *
 * The Dialog chrome (overlay, title, description, close) comes from the
 * shared Dialog; the body adds an icon mark, a short feature list and a
 * restrained stay / go action row. `isOpen` is controlled by the consumer.
 */
export function PromoModal({
  isOpen,
  onClose,
  title,
  description,
  stayLabel,
  goLabel,
  goHref,
}: PromoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()} title={title} description={description}>
      <div className="flex flex-col items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-primary/10 text-primary">
          <Sparkles className="size-5" strokeWidth={1.6} />
        </div>

        <ul className="flex flex-col gap-2">
          {PROMO_POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  className="size-2.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M2 6l2.5 2.5L10 3" />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          {stayLabel}
        </button>
        <a
          href={goHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {goLabel}
          <svg
            className="size-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </div>
    </Dialog>
  )
}
