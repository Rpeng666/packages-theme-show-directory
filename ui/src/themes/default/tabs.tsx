'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { TabsProps } from '../../contracts/tabs'

/**
 * Default Tabs — item-based tabs rendered as a segmented button row (the
 * shadcn look without the radix compound API). Active tab's `content` renders
 * below.
 */
function Tabs({
  items,
  activeKey,
  onChange,
  type: _type,
  size = 'medium',
  className,
}: TabsProps) {
  const active = activeKey ?? items[0]?.key
  const activeItem = items.find((it) => it.key === active)
  return (
    <div className={cn('w-full', className)}>
      <div
        role="tablist"
        className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
      >
        {items.map((it) => (
          <button
            key={it.key}
            role="tab"
            type="button"
            aria-selected={active === it.key}
            disabled={it.disabled}
            onClick={() => onChange?.(it.key)}
            className={cn(
              'inline-flex h-8 items-center justify-center rounded-sm px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
              active === it.key
                ? 'bg-background text-foreground shadow-sm'
                : 'hover:text-foreground'
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
      {activeItem?.content != null && (
        <div className="mt-4">{activeItem.content}</div>
      )}
    </div>
  )
}

export { Tabs }
