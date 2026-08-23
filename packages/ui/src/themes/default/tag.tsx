'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { TagProps } from '../../contracts/tag'

/**
 * Default Tag — a shadcn-badge-style chip. `color`/`type` are Semi semantics
 * ignored here (default derives styling from the badge palette).
 */
function Tag({
  children,
  color: _color,
  size = 'default',
  type: _type,
  closable,
  onClose,
  className,
  ...rest
}: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(
        'inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium',
        size === 'large' ? 'px-2.5 py-1 text-sm' : '',
        size === 'small' ? 'px-1.5 text-[11px]' : '',
        className
      )}
      {...rest}
    >
      {children}
      {closable && (
        <button
          type="button"
          aria-label="close"
          onClick={onClose}
          className="-mr-0.5 ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  )
}

export { Tag }
