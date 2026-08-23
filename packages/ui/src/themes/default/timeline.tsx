'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { TimelineItem, TimelineProps } from '../../contracts/timeline'

const typeDot: Record<NonNullable<TimelineItem['type']>, string> = {
  default: 'bg-muted-foreground',
  ongoing: 'bg-primary animate-pulse',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
}

/**
 * Default Timeline — vertical dot list with time stamps on the right.
 */
function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn('space-y-4 border-l pl-4', className)}>
      {items.map((item, index) => (
        <li key={index} className="relative">
          <span
            className={cn(
              'absolute -left-[21px] top-1 h-2 w-2 rounded-full',
              item.color ? undefined : typeDot[item.type ?? 'default'],
              item.color ? undefined : 'bg-none'
            )}
            style={item.color ? { backgroundColor: item.color } : undefined}
          />
          <div className="flex items-baseline justify-between gap-3">
            <div className="text-sm">{item.content}</div>
            {item.time ? (
              <div className="shrink-0 text-xs text-muted-foreground">{item.time}</div>
            ) : null}
          </div>
          {item.extra ? (
            <div className="mt-0.5 text-xs text-muted-foreground">{item.extra}</div>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

export { Timeline }
