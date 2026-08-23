'use client'

import * as React from 'react'
import type { StepsProps } from '@template/ui'

export function Steps({ items = [], current = 0, direction = 'horizontal', size = 'default', className = '' }: StepsProps) {
  const vertical = direction === 'vertical'
  return (
    <div className={className} style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', gap: vertical ? 16 : 8 }}>
      {items.map((it, i) => {
        const st = it.status ?? (i < current ? 'finish' : i === current ? 'process' : 'wait')
        const done = st === 'finish'
        const active = st === 'process'
        const dot = <span style={{ width: size === 'small' ? 20 : 24, height: size === 'small' ? 20 : 24, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: size === 'small' ? 11 : 12, fontWeight: 700, background: done || active ? 'var(--app-brand-grad)' : 'var(--semi-color-fill-1)', color: done || active ? '#fff' : 'var(--semi-color-text-3)', flexShrink: 0 }}>{done ? '✓' : i + 1}</span>
        const text = <div><div style={{ fontSize: 13, fontWeight: active ? 650 : 500, color: active ? 'var(--semi-color-text-0)' : 'var(--semi-color-text-1)' }}>{it.title}</div>{it.description ? <div style={{ fontSize: 12, color: 'var(--semi-color-text-3)', marginTop: 2 }}>{it.description}</div> : null}</div>
        return vertical ? (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            {dot}{text}
          </div>
        ) : (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative' }}>
            {i > 0 ? <div style={{ position: 'absolute', top: size === 'small' ? 10 : 12, right: '50%', width: '100%', height: 2, background: done ? 'var(--app-brand-grad)' : 'var(--semi-color-border)' }} /> : null}
            <span style={{ position: 'relative', zIndex: 1 }}>{dot}</span>
            {text}
          </div>
        )
      })}
    </div>
  )
}
