'use client'

import type { PromoModalProps } from '../../contracts/promo-modal'
import { Dialog } from './dialog'

/**
 * Default PromoModal — reuses the default theme Dialog chrome for the
 * full-screen "go somewhere" overlay. Pure presentation; copy injected.
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
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {stayLabel}
        </button>
        <a
          href={goHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          {goLabel}
        </a>
      </div>
    </Dialog>
  )
}
