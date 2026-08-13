'use client'

import { cn } from '../../lib/utils'
import type { LabelProps } from '../../contracts/label'

/**
 * Pixel Label — native <label> in retro mono, matching the pixel form chrome.
 */
export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        'font-mono text-xs font-medium text-retro-muted',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}
