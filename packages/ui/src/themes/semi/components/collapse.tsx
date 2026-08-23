'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import type { CollapseProps } from '@template/ui'

export function Collapse({ items = [], defaultActiveKeys, activeKeys, onChange, accordion = true, className = '' }: CollapseProps) {
  const [openKeys, setOpenKeys] = React.useState<string[]>(defaultActiveKeys ?? [])
  const active = activeKeys ?? openKeys
  const toggle = (k: string) => {
    const next = accordion ? (active.includes(k) ? [] : [k]) : active.includes(k) ? active.filter((x) => x !== k) : [...active, k]
    if (activeKeys === undefined) setOpenKeys(next)
    onChange?.(next)
  }
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((it) => {
        const open = active.includes(it.key)
        return (
          <div key={it.key} style={{ borderRadius: 12, border: '1px solid var(--semi-color-border)', background: 'var(--semi-color-bg-1)', overflow: 'hidden' }}>
            <button type="button" disabled={it.disabled} onClick={() => toggle(it.key)} aria-expanded={open}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '14px 16px', border: 'none', background: 'transparent', cursor: it.disabled ? 'default' : 'pointer', fontSize: 14.5, fontWeight: 600, color: 'var(--semi-color-text-0)', textAlign: 'left' }}>
              <span style={{ flex: 1 }}>{it.title}</span>
              {it.extra}
              <ChevronDown size={15} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--semi-color-text-3)' }} />
            </button>
            {open ? <div style={{ padding: '0 16px 14px', fontSize: 13.5, lineHeight: 1.7, color: 'var(--semi-color-text-2)' }}>{it.children}</div> : null}
          </div>
        )
      })}
    </div>
  )
}
