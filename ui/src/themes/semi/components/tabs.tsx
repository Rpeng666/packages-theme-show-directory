'use client'

import * as React from 'react'
import type { TabsProps } from '@template/ui'

/**
 * Semi Tabs — a simple item-based tab bar + panel. Underline for `line`,
 * filled pills for `card`/`button`/`segment`.
 */
export function Tabs({
  items,
  activeKey,
  onChange,
  type = 'line',
  size = 'medium',
  className = '',
}: TabsProps) {
  const [internalKey, setInternalKey] = React.useState<string | undefined>(
    items[0]?.key,
  )
  const active = activeKey ?? internalKey

  const pick = (key: string) => {
    if (activeKey === undefined) setInternalKey(key)
    onChange?.(key)
  }

  const pad = size === 'small' ? '7px 12px' : size === 'large' ? '10px 18px' : '8px 14px'
  const pill = type === 'card' || type === 'button' || type === 'segment'

  return (
    <div className={className}>
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: pill ? 4 : 2,
          flexWrap: 'wrap',
          background: pill ? 'var(--semi-color-fill-0)' : 'transparent',
          padding: pill ? 4 : 0,
          borderRadius: pill ? 10 : 0,
          width: 'fit-content',
        }}
      >
        {items.map((it) => {
          const isActive = active === it.key
          return (
            <button
              key={it.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={it.disabled}
              onClick={() => pick(it.key)}
              style={{
                padding: pad,
                borderRadius: pill ? 8 : 0,
                border: 'none',
                cursor: it.disabled ? 'default' : 'pointer',
                fontSize: size === 'small' ? 12.5 : size === 'large' ? 15 : 13.5,
                fontWeight: isActive ? 650 : 500,
                background: pill ? (isActive ? 'var(--semi-color-bg-1)' : 'transparent') : 'transparent',
                color: it.disabled ? 'var(--semi-color-text-3)' : isActive ? 'var(--semi-color-primary)' : 'var(--semi-color-text-1)',
                boxShadow: pill && isActive ? '0 1px 4px rgba(0,0,0,0.2)' : 'none',
                borderBottom: !pill && isActive ? '2px solid var(--semi-color-primary)' : '2px solid transparent',
                transition: 'color 0.15s',
              }}
            >
              {it.label}
            </button>
          )
        })}
      </div>
      {items.map((it) => (
        <div key={it.key} role="tabpanel" hidden={active !== it.key} style={{ paddingTop: pill ? 16 : 20 }}>
          {it.content}
        </div>
      ))}
    </div>
  )
}
