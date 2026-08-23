'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { InputNumberProps } from '../../contracts/input-number'

const sizeClass: Record<string, string> = {
  sm: 'h-8',
  md: 'h-9',
  lg: 'h-11',
}

/**
 * Default InputNumber — native `<input type="number">` styled like the shadcn
 * input. onChange parses to number|null (empty/invalid → null).
 */
function InputNumber({
  value,
  onChange,
  min,
  max,
  step,
  disabled,
  size = 'md',
  placeholder,
  id,
  className,
}: InputNumberProps) {
  return (
    <input
      id={id}
      type="number"
      min={min}
      max={max}
      step={step}
      value={value ?? ''}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => {
        if (!onChange) return
        const v = e.target.value
        if (v === '') return onChange(null)
        const n = Number.parseFloat(v)
        onChange(Number.isFinite(n) ? n : null)
      }}
      className={cn(
        'border-input placeholder:text-muted-foreground flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        sizeClass[size],
        className
      )}
    />
  )
}

export { InputNumber }
