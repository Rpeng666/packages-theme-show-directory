'use client'

import * as React from "react"

import { PixelTooltip } from "@pxlkit/ui-kit"
import type { TooltipProps } from "../../contracts/tooltip"

/**
 * Pixel-theme tooltip — adapts the contract onto pxlkit's PixelTooltip
 * (floating-ui based, self-contained). className has no content slot in
 * pxlkit, so it's dropped.
 */
function Tooltip({
  content,
  children,
  side = "top",
  trigger = "hover",
  open,
  defaultOpen,
  onOpenChange,
  delay,
  sideOffset,
  className: _className,
}: TooltipProps) {
  return (
    <PixelTooltip
      content={content}
      position={side}
      trigger={trigger}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delay={delay}
      sideOffset={sideOffset}
    >
      {children}
    </PixelTooltip>
  )
}

export { Tooltip }
