'use client'

import * as React from 'react'
import { Slider as HeroSlider } from '@heroui/react'
import type { SliderProps } from '@template/ui'

/** Semi Slider — HeroUI Slider (single value) mapped onto the shared props. */
export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  disabled,
  className = '',
}: SliderProps) {
  return (
    <HeroSlider
      {...({ min, max, step, value, onChange, isDisabled: disabled } as any)}
      className={className}
    />
  )
}
