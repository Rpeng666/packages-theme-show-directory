'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { DescriptionsProps } from '../../contracts/descriptions'

/**
 * Default Descriptions — a definition-list grid. Rows break at `column`
 * items per row (responsive: 1 col on small screens).
 */
function Descriptions({
  items,
  column = 1,
  size = 'medium',
  className,
}: DescriptionsProps) {
  const cols = Math.max(1, Math.min(column, 4))
  return (
    <dl
      className={cn(
        'grid gap-x-6 gap-y-3',
        size === 'small' && 'text-xs',
        size === 'large' && 'text-base',
        className
      )}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {items.map((it, i) => (
        <div key={it.key ?? i} className="min-w-0">
          <dt className="text-muted-foreground">{it.label}</dt>
          <dd className="mt-0.5 break-words font-medium">{it.content}</dd>
        </div>
      ))}
    </dl>
  )
}

export { Descriptions }
