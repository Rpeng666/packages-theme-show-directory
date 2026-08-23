'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { CopyTextProps } from '../../contracts/copy-text'

const typeColor: Record<string, string> = {
  primary: 'text-foreground',
  secondary: 'text-muted-foreground',
  tertiary: 'text-muted-foreground/70',
  warning: 'text-amber-500',
  danger: 'text-red-500',
  success: 'text-green-500',
  link: 'text-primary underline underline-offset-2',
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

/**
 * Default CopyText — span with a copy button (navigator.clipboard).
 */
function CopyText({
  children,
  text,
  copyable = true,
  type,
  strong,
  code,
  className,
}: CopyTextProps) {
  const [copied, setCopied] = React.useState(false)
  const value = text ?? (typeof children === 'string' ? children : '')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 align-middle',
        typeColor[type ?? 'primary'],
        strong && 'font-semibold',
        code && 'rounded bg-muted px-1.5 py-0.5 font-mono text-xs',
        className
      )}
    >
      <span className="min-w-0 break-all">{children}</span>
      {copyable ? (
        <button
          type="button"
          onClick={copy}
          aria-label="Copy"
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      ) : null}
    </span>
  )
}

export { CopyText }
