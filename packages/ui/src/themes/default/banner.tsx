'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { BannerProps } from '../../contracts/banner'

const typeClass: Record<string, string> = {
  info: 'border-blue-200 bg-blue-50 text-blue-800',
  success: 'border-green-200 bg-green-50 text-green-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  danger: 'border-red-200 bg-red-50 text-red-800',
}

/**
 * Default Banner — a simple colored feedback strip (shadcn-style).
 */
function Banner({
  type = 'info',
  title,
  description,
  icon,
  closable,
  onClose,
  bordered = true,
  children,
  className,
}: BannerProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex items-start gap-3 rounded-lg border p-3 text-sm',
        typeClass[type],
        !bordered && 'border-transparent',
        className
      )}
    >
      {icon != null && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div className="min-w-0 flex-1">
        {description ?? title}
        {children != null && <div className="mt-2">{children}</div>}
      </div>
      {closable && (
        <button
          type="button"
          aria-label="close"
          onClick={onClose}
          className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export { Banner }
