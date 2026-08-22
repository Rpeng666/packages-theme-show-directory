'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { CollapseProps } from '../../contracts/collapse'

/**
 * Default Collapse — button-headed disclosure panels (accordion when
 * `accordion`). Mirrors the active-keys contract.
 */
function Collapse({
  items,
  accordion,
  activeKeys,
  defaultActiveKeys = [],
  onChange,
  className,
}: CollapseProps) {
  const [internalKeys, setInternalKeys] = React.useState<string[]>(defaultActiveKeys)
  const keys = activeKeys ?? internalKeys

  const toggle = (key: string) => {
    let next: string[]
    if (accordion) {
      next = keys.includes(key) ? [] : [key]
    } else {
      next = keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key]
    }
    if (activeKeys === undefined) setInternalKeys(next)
    onChange?.(next)
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => {
        const open = keys.includes(item.key)
        return (
          <div key={item.key} className="overflow-hidden rounded-md border bg-card">
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => toggle(item.key)}
              className={cn(
                'flex w-full items-center justify-between gap-2 px-4 py-3 text-sm font-medium',
                item.disabled && 'pointer-events-none opacity-50'
              )}
            >
              <span className="flex-1 text-left">{item.title}</span>
              {item.extra}
              <span
                className={cn(
                  'text-xs text-muted-foreground transition-transform',
                  open && 'rotate-180'
                )}
              >
                ▾
              </span>
            </button>
            {open ? <div className="border-t px-4 py-3 text-sm">{item.children}</div> : null}
          </div>
        )
      })}
    </div>
  )
}

export { Collapse }
