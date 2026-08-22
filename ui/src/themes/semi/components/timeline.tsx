'use client'

import * as React from 'react'
import type { TimelineProps } from '@template/ui'

export function Timeline({ items = [], mode = 'left', className = '' }: TimelineProps) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: it.color ?? 'var(--semi-color-primary)', marginTop: 5, flexShrink: 0 }} />
            {i < items.length - 1 ? <div style={{ flex: 1, width: 2, background: 'var(--semi-color-border)', marginTop: 4 }} /> : null}
          </div>
          <div style={{ flex: 1, paddingBottom: i < items.length - 1 ? 4 : 0 }}>
            {it.time ? <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--semi-color-text-0)' }}>{it.time}</div> : null}
            <div style={{ fontSize: 13.5, color: 'var(--semi-color-text-1)', marginTop: it.time ? 2 : 0 }}>{it.content}</div>
            {it.extra ? <div style={{ fontSize: 13, color: 'var(--semi-color-text-2)', marginTop: 4 }}>{it.extra}</div> : null}
          </div>
        </div>
      ))}
    </div>
  )
}
