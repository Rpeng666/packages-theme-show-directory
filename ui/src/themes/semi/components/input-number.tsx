'use client'

import * as React from 'react'
import { InputNumber as SemiInputNumber } from '@douyinfe/semi-ui'
import type { InputNumberProps } from '@template/ui'

const SIZE = { sm: 'small', md: 'default', lg: 'large' } as const

/**
 * Semi InputNumber — maps the shared InputNumberProps onto Semi InputNumber.
 * Semi's onChange passes (value, e); the contract normalizes to a number|null.
 */
export function InputNumber({
  value,
  onChange,
  size = 'md',
  min,
  max,
  step,
  disabled,
  placeholder,
  id,
  className = '',
}: InputNumberProps) {
  return (
    <SemiInputNumber
      value={value ?? undefined}
      onChange={(v: number | string | null) => {
        if (onChange) {
          onChange(typeof v === 'string' ? (v === '' ? null : Number.parseFloat(v) || null) : v)
        }
      }}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      size={SIZE[size as keyof typeof SIZE] ?? 'default'}
      placeholder={placeholder}
      id={id}
      className={className}
    />
  )
}
