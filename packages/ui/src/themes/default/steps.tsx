'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { StepsProps } from '../../contracts/steps'

const STATUS: Record<string, string> = {
  wait: 'border-muted-foreground/40 text-muted-foreground',
  process: 'border-primary bg-primary text-primary-foreground',
  finish: 'border-primary bg-primary/10 text-primary',
  error: 'border-destructive bg-destructive text-white',
}

/**
 * Default Steps — a simple horizontal flex of numbered circles with connectors.
 */
function Steps({
  items,
  current = 0,
  direction = 'horizontal',
  size = 'default',
  className,
}: StepsProps) {
  const vertical = direction === 'vertical'
  return (
    <ol
      className={cn(
        'flex gap-0',
        vertical ? 'flex-col' : 'items-center',
        className
      )}
    >
      {items.map((it, i) => {
        const status = it.status ?? (i < current ? 'finish' : i === current ? 'process' : 'wait')
        return (
          <li key={i} className={cn('flex items-center gap-3', !vertical && 'flex-1 last:flex-none')}>
            <div className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold',
                  STATUS[status],
                  size === 'small' && 'h-6 w-6 text-xs'
                )}
              >
                {status === 'finish' ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <div className={cn('flex flex-col items-center gap-0.5', !vertical && 'text-center')}>
                <span className="text-sm font-medium">{it.title}</span>
                {it.description != null && (
                  <span className="text-xs text-muted-foreground">{it.description}</span>
                )}
              </div>
            </div>
            {!vertical && i < items.length - 1 && (
              <span
                className={cn(
                  'mx-2 h-px flex-1 bg-border',
                  i < current && 'bg-primary'
                )}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

export { Steps }
