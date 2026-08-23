'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { ColorPickerProps } from '../../contracts/color-picker'

/**
 * Default ColorPicker — native `<input type="color">` with a live swatch and
 * hex readout. The hidden input is opened by clicking the labeled swatch row.
 */
function ColorPicker({
  value,
  defaultValue,
  onChange,
  disabled,
  className,
  id,
}: ColorPickerProps) {
  const [internal, setInternal] = React.useState(value ?? defaultValue)
  React.useEffect(() => {
    if (value != null) setInternal(value)
  }, [value])
  const hex = internal ?? '#ffffff'

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-md border bg-card px-2 py-1.5',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      <span className="h-5 w-5 rounded border shadow-xs" style={{ backgroundColor: hex }} />
      <input
        id={id}
        type="color"
        disabled={disabled}
        value={hex}
        className="h-0 w-0 opacity-0"
        onChange={(e) => {
          setInternal(e.target.value)
          onChange?.(e.target.value)
        }}
      />
      <span className="font-mono text-xs text-muted-foreground">{hex.toUpperCase()}</span>
    </label>
  )
}

export { ColorPicker }
