'use client'

import { cn } from '../../lib/utils'
import type { LabelProps } from '../../contracts/label'

/**
 * Default Label — shadcn-styled form label (native <label>).
 */
export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}
