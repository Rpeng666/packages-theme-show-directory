'use client'

import * as React from 'react'
import type { DropdownProps } from '@template/ui'

export function Dropdown({ trigger, items, align = 'end', className = '' }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <span onClick={() => setOpen((v) => !v)} style={{ cursor: 'pointer' }}>{trigger}</span>
      {open ? (
        <div role="menu" style={{ position: 'absolute', top: 'calc(100% + 6px)', right: align === 'end' ? 0 : undefined, left: align === 'start' ? 0 : undefined, minWidth: 180, borderRadius: 12, border: '1px solid var(--semi-color-border)', background: 'var(--semi-color-bg-2)', boxShadow: '0 12px 32px -12px rgba(0,0,0,0.5)', padding: 6, zIndex: 50 }}>
          {items.map((it, i) => {
            if (it.href) {
              return <a key={i} href={it.href} target={it.target} onClick={() => setOpen(false)} style={{ display: 'block', padding: '8px 12px', borderRadius: 8, fontSize: 13.5, color: 'var(--semi-color-text-1)', textDecoration: 'none' }}>{it.children}</a>
            }
            if (it.children === undefined) return <div key={i} style={{ height: 1, background: 'var(--semi-color-border)', margin: '4px 8px' }} />
            return (
              <button key={i} type="button" role="menuitem" onClick={() => { it.onSelect?.(); setOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13.5, color: 'var(--semi-color-text-1)', textAlign: 'left' }}>
                {it.children}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
