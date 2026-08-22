'use client'

import * as React from 'react'
import type { DescriptionsProps } from '@template/ui'

export function Descriptions({ items = [], column = 2, size = 'medium', className = '' }: DescriptionsProps) {
  return (
    <div className={className} style={{ display: 'grid', gridTemplateColumns: `repeat(${column}, minmax(0,1fr))`, gap: size === 'small' ? '8px 20px' : '12px 24px' }}>
      {items.map((it, i) => (
        <div key={i} style={{ gridColumn: it.span ? `span ${it.span}` : undefined }}>
          <div style={{ fontSize: 12.5, color: 'var(--semi-color-text-3)', marginBottom: 2 }}>{it.label}</div>
          <div style={{ color: 'var(--semi-color-text-1)' }}>{it.content}</div>
        </div>
      ))}
    </div>
  )
}
