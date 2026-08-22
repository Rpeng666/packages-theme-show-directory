'use client'

import * as React from 'react'
import { Space, Divider as SemiDivider } from '@douyinfe/semi-ui'
import type { StackProps, ClusterProps, GridProps, DividerProps } from '@template/ui'

const GAP = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 }

/** Contract alignment words → CSS values. */
const ALIGN: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}
const JUSTIFY: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

/** Semi layout primitives — thin flex/grid wrappers over Space/Divider. */
export function Stack({ direction = 'col', gap = 4, align, justify, wrap, inline, style, children, ...props }: StackProps) {
  return (
    <div
      {...props}
      style={{
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: direction === 'row' ? 'row' : 'column',
        gap: GAP[gap] ?? gap,
        alignItems: align ? ALIGN[align] ?? align : undefined,
        justifyContent: justify ? JUSTIFY[justify] ?? justify : undefined,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Cluster({ gap = 4, align = 'center', justify = 'start', style, children, ...props }: ClusterProps) {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        alignItems: ALIGN[align] ?? align,
        justifyContent: JUSTIFY[justify] ?? justify,
        gap: GAP[gap] ?? gap,
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Grid({ cols = 1, gap = 4, style, children, ...props }: GridProps) {
  const count = typeof cols === 'number' ? cols : (cols.base ?? 1)
  return (
    <div
      {...props}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
        gap: GAP[gap] ?? gap,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Divider({ label, spacing = 'md', className = '' }: DividerProps) {
  if (label) {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <SemiDivider style={{ flex: 1 }} />
        <span style={{ whiteSpace: 'nowrap', color: 'var(--semi-color-text-2)', fontSize: 13 }}>{label}</span>
        <SemiDivider style={{ flex: 1 }} />
      </div>
    )
  }
  return <SemiDivider className={className} />
}