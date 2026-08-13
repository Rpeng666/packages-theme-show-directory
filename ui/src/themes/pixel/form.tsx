'use client'

import type * as React from 'react'

import { PixelSelect, PixelToggle, PixelToggleGroup, PixelBareTextarea } from '@pxlkit/ui-kit'
import type { SelectProps, ToggleProps, ToggleGroupProps, BareTextareaProps } from '../../contracts/form'

/** Pixel Select — pxlkit PixelSelect (fully custom dropdown + keyboard nav). */
export function Select(props: SelectProps) {
  return (
    <PixelSelect
      {...(props as unknown as React.ComponentProps<typeof PixelSelect>)}
    />
  )
}

/** Pixel Toggle — pxlkit PixelToggle (pressed state via group or standalone). */
export function Toggle(props: ToggleProps) {
  const { value, pressed, className, children, ...rest } = props
  return (
    <PixelToggle value={value} pressed={pressed} className={className} {...(rest as object)}>
      {children}
    </PixelToggle>
  )
}

/** Pixel ToggleGroup — pxlkit PixelToggleGroup (single/multiple, roving focus). */
export function ToggleGroup(props: ToggleGroupProps) {
  return <PixelToggleGroup {...(props as unknown as React.ComponentProps<typeof PixelToggleGroup>)} />
}

/** Pixel BareTextarea — pxlkit PixelBareTextarea (unstyled textarea passthrough). */
export function BareTextarea(props: BareTextareaProps) {
  return <PixelBareTextarea {...props} />
}
