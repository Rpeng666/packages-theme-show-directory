'use client'

import * as React from 'react'
import { Slider as SemiSlider } from '@douyinfe/semi-ui'
import type { SliderProps } from '@template/ui'

/**
 * Semi Slider — maps the shared SliderProps onto Semi Slider. Single-value:
 * Semi's onChange may hand a number or a [min,max] pair (range); the contract
 * expects a single number.
 */
export function Slider({
  min,
  max,
  step,
  value,
  onChange,
  disabled,
  showTooltip = true,
  className = '',
}: SliderProps) {
  return (
    <SemiSlider
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(v) => {
        if (onChange) onChange(v == null ? 0 : Array.isArray(v) ? v[0] : v)
      }}
      disabled={disabled}
      tooltipVisible={showTooltip}
      className={className}
    />
  )
}
