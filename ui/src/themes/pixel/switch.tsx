'use client'

import * as React from "react"

import { PixelSwitch } from "@pxlkit/ui-kit"
import type { SwitchProps } from "../../contracts/switch"

/**
 * Pixel-theme switch — adapts the contract onto pxlkit's PixelSwitch.
 * Contract's onCheckedChange → pxlkit's onChange; label is required in
 * pxlkit, so an absent label passes '' (renders an empty span). PixelSwitch
 * has no className slot — template tokens are dropped.
 */
function Switch({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  tone,
  className: _className,
  ...props
}: SwitchProps) {
  return (
    <PixelSwitch
      label={label as string ?? ''}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onCheckedChange}
      tone={tone}
      {...props}
    />
  )
}

export { Switch }
