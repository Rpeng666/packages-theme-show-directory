'use client'

import * as React from 'react'
import { Tooltip as HeroTooltip } from '@heroui/react'
import type { TooltipProps } from '@template/ui'

/** Semi Tooltip — HeroUI Tooltip with the shared side/trigger vocabulary. */
export function Tooltip({
  content,
  children,
  side = 'top',
  trigger = 'hover',
  open,
  defaultOpen,
  onOpenChange,
  delay,
  sideOffset,
  className = '',
}: TooltipProps) {
  const placement = (side === 'right' ? 'right' : side === 'left' ? 'left' : side === 'bottom' ? 'bottom' : 'top') as never
  const delayMs = typeof delay === 'number' ? delay : delay?.open
  return (
    <HeroTooltip
      {...({ content, placement, delay: delayMs, offset: sideOffset } as any)}
      isOpen={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      trigger={trigger === 'click' ? 'focus' : 'hover'}
      className={className}
    >
      {children}
    </HeroTooltip>
  )
}
