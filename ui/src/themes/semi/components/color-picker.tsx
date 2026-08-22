'use client'

import * as React from 'react'
import { ColorPicker as SemiColorPicker } from '@douyinfe/semi-ui'
import type { ColorPickerProps } from '@template/ui'

const toColorValue = (hex: string | undefined) => {
  if (!hex) return undefined
  try {
    return SemiColorPicker.colorStringToValue(hex)
  } catch {
    return undefined
  }
}

/**
 * Semi ColorPicker — hex-string contract over Semi's ColorPicker (onChange
 * passes a ColorValue; normalized to `.hex`). Keeps an internal mirror so an
 * external value swap (e.g. applying a template) re-syncs the popover.
 */
export function ColorPicker({
  value,
  defaultValue,
  onChange,
  showAlpha,
  className = '',
}: ColorPickerProps) {
  const [internal, setInternal] = React.useState(toColorValue(value))
  React.useEffect(() => {
    setInternal(toColorValue(value))
  }, [value])

  return (
    <SemiColorPicker
      value={(value != null ? internal : undefined) as never}
      defaultValue={toColorValue(defaultValue) as never}
      onChange={(v) => {
        setInternal(v)
        onChange?.(v.hex)
      }}
      alpha={Boolean(showAlpha)}
      defaultFormat="hex"
      className={className}
    />
  )
}
