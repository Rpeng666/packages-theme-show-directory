'use client'

import * as React from 'react'
import type { NavigationProps } from '@template/ui'

export function Navigation({ items, selectedKey, defaultSelectedKey, onSelect, header, footer, collapsible, collapsed, defaultCollapsed, onCollapseChange, className = '' }: NavigationProps) {
  const [sel, setSel] = React.useState<string | undefined>(selectedKey ?? defaultSelectedKey)
  const active = selectedKey ?? sel
  const [coll, setColl] = React.useState<boolean>(collapsed ?? defaultCollapsed ?? false)
  const isCollapsed = collapsed ?? coll
  const render = (list: NavigationProps['items'], depth = 0) => list.map((it) => (
    <div key={it.itemKey}>
      <button type="button" disabled={it.disabled}
        onClick={() => { setSel(it.itemKey); onSelect?.(it.itemKey) }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', borderRadius: 8,
          border: 'none', cursor: 'pointer', fontSize: 13.5, fontWeight: active === it.itemKey ? 650 : 500,
          background: active === it.itemKey ? 'rgba(var(--semi-red-5), 0.1)' : 'transparent',
          color: active === it.itemKey ? 'var(--semi-color-primary)' : 'var(--semi-color-text-1)',
          textAlign: 'left', marginLeft: depth * 12,
        }}>
        {it.icon}{!isCollapsed ? it.text : null}
      </button>
      {it.items && !isCollapsed ? render(it.items, depth + 1) : null}
    </div>
  ))
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 8 }}>
      {header ? <div style={{ padding: '0 12px 8px' }}>{header}</div> : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{render(items)}</div>
      {footer ? <div style={{ padding: '8px 12px 0' }}>{footer}</div> : null}
      {collapsible ? (
        <button type="button" onClick={() => { const nv = !isCollapsed; setColl(nv); onCollapseChange?.(nv) }}
          style={{ marginTop: 8, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--semi-color-border)', background: 'transparent', cursor: 'pointer', fontSize: 12.5, color: 'var(--semi-color-text-2)' }}>
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
      ) : null}
    </div>
  )
}
