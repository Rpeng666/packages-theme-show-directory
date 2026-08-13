'use client'

import * as React from "react"

import { PixelProgress } from "@pxlkit/ui-kit"
import type { ProgressProps } from "../../contracts/progress"

/**
 * Pixel-theme progress — adapts the contract onto pxlkit's PixelProgress
 * (HP-segment bar on pixel surface). showValue is passed explicitly (contract
 * defaults false, pxlkit defaults true) to avoid double percentage display.
 */
function Progress({
  value,
  tone,
  label,
  showValue = false,
  indeterminate,
  className: _className,
}: ProgressProps) {
  return (
    <PixelProgress
      value={value}
      tone={tone}
      label={label as string | undefined}
      showValue={showValue}
      indeterminate={indeterminate}
    />
  )
}

export { Progress }
