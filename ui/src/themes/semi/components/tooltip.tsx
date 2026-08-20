'use client'

import * as React from 'react'
import { Tooltip as SemiTooltip, Tag } from '@douyinfe/semi-ui'
import type { TooltipProps } from '@template/ui'

/**
 * Semi Tooltip — wraps children in a Semi Tooltip with the `content` rendered
 * as a small bubble. `side`, `trigger`, `delay` map onto Semi's position.
 */
const POS: Record<string, 'top' | 'bottom' | 'left' | 'right'> = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
}

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
  return (
    <SemiTooltip
      content={<span className={className}>{content}</span>}
      position={POS[side] ?? 'top'}
      trigger={trigger}
      visible={open}
      defaultVisible={defaultOpen}
      onVisibleChange={(v: boolean) => onOpenChange?.(v)}
      mouseEnterDelay={typeof delay === 'number' ? delay / 1000 : Decimal(delay)}
      mouseLeaveDelay={0.1}
      spacing={sideOffset}
    >
      {children}
    </SemiTooltip>
  )
}

function Decimal(delay?: number | { open?: number; close?: number }): number {
  if (typeof delay === 'number') return delay / 1000
  const open = delay?.open
  return open != null ? open / 1000 : 0
}