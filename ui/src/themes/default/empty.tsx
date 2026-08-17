'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { EmptyProps } from '../../contracts/empty'

/**
 * Default Empty — a centered empty-state placeholder.
 */
function Empty({ description, image, children, className }: EmptyProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-10 text-center', className)}>
      {image ?? (
        <div className="text-3xl opacity-50" aria-hidden>
          🗂
        </div>
      )}
      {description != null && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  )
}

export { Empty }
