'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { SpinProps } from '../../contracts/spin'

const sizeClass: Record<string, string> = {
  small: 'h-4 w-4 border-2',
  default: 'h-6 w-6 border-2',
  large: 'h-8 w-8 border-[3px]',
}

/**
 * Default Spin — a CSS border spinner. When `spinning` is false it renders
 * children directly (no overlay).
 */
function Spin({
  spinning = true,
  tip,
  size = 'default',
  children,
  className,
}: SpinProps) {
  if (!spinning) return <>{children}</>
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <span
        role="status"
        aria-label="loading"
        className={cn(
          'animate-spin rounded-full border-primary border-t-transparent',
          sizeClass[size]
        )}
      />
      {tip != null && <span className="text-xs text-muted-foreground">{tip}</span>}
    </div>
  )
}

export { Spin }
