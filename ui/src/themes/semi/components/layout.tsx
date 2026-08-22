'use client'

import * as React from 'react'
import type { StackProps, ClusterProps, GridProps, DividerProps } from '@template/ui'

const GAP: Record<number, number> = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 }

export function Stack({ direction = 'col', gap = 4, align, justify, wrap, inline, style, children, ...props }: StackProps) {
  return (
    <div {...(props as object)} style={{ display: inline ? 'inline-flex' : 'flex', flexDirection: direction === 'row' ? 'row' : 'column', gap: GAP[gap] ?? 16, alignItems: align, justifyContent: justify, flexWrap: wrap ? 'wrap' : undefined, ...style }}>
      {children}
    </div>
  )
}

export function Cluster({ gap = 4, align = 'center', justify = 'start', style, children, ...props }: ClusterProps) {
  return (
    <div {...(props as object)} style={{ display: 'flex', flexWrap: 'wrap', gap: GAP[gap] ?? 16, alignItems: align, justifyContent: justify, ...style }}>
      {children}
    </div>
  )
}

export function Grid({ cols = 1, gap = 4, style, children, ...props }: GridProps) {
  const n = typeof cols === 'number' ? cols : (cols.base ?? 1)
  return (
    <div {...(props as object)} style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gap: GAP[gap] ?? 16, ...style }}>
      {children}
    </div>
  )
}

export function Divider({ label, spacing = 'md', className = '' }: DividerProps) {
  const space = spacing === 'none' ? 0 : spacing === 'sm' ? 12 : spacing === 'lg' ? 40 : 24
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 12, margin: `${space}px 0` }}>
      <div style={{ flex: 1, height: 1, background: 'var(--semi-color-border)' }} />
      {label ? <span style={{ fontSize: 12.5, color: 'var(--semi-color-text-3)', whiteSpace: 'nowrap' }}>{label}</span> : null}
      {label ? <div style={{ flex: 1, height: 1, background: 'var(--semi-color-border)' }} /> : null}
    </div>
  )
}
