'use client'

import * as React from 'react'
import type { ColorPickerProps } from '@template/ui'

export function ColorPicker({ value, onChange, disabled, className = '' }: ColorPickerProps) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <input type="color" value={value} disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--semi-color-border)', background: 'var(--semi-color-bg-1)', padding: 2, cursor: 'pointer' }} />
      <span style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--semi-color-text-2)' }}>{value}</span>
    </span>
  )
}
