'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { SliderProps } from '../../contracts/slider'

/**
 * Default Slider — native `<input type="range">` with a simple accent-color
 * track. showTooltip is a Semi affordance and ignored here.
 */
function Slider({
  min,
  max,
  step,
  value,
  onChange,
  disabled,
  showTooltip: _showTooltip,
  className,
}: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value ?? 0}
      disabled={disabled}
      onChange={(e) => {
        if (onChange) onChange(Number(e.target.value))
      }}
      className={cn('w-full accent-primary', className)}
    />
  )
}

export { Slider }
