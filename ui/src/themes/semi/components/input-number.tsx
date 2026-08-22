'use client'

import * as React from 'react'
import type { InputNumberProps } from '@template/ui'

export function InputNumber({ value, onChange, min, max, step, disabled, size = 'md', placeholder, id, className = '' }: InputNumberProps) {
  return (
    <input
      type="number"
      id={id}
      value={value ?? ''}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value === '' ? null : Number(e.target.value))}
      className={className}
      style={{
        height: size === 'sm' ? 30 : size === 'lg' ? 42 : 36, padding: '0 10px', borderRadius: 10,
        border: '1px solid var(--semi-color-border)', background: 'var(--semi-color-bg-1)',
        color: 'var(--semi-color-text-0)', fontSize: 14, outline: 'none', fontVariantNumeric: 'tabular-nums',
      }}
    />
  )
}
