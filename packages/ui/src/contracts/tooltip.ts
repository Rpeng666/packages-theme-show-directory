import type * as React from 'react'

/**
 * Tooltip contract. `children` is a single trigger element (wrapped via
 * Radix Trigger asChild / pxlkit's child wrapper). className styles the
 * content (default forwards to Radix Content; pixel has no content slot).
 */
export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delay?: number | { open?: number; close?: number }
  sideOffset?: number
  /** 内容样式（default 转发 Radix Content；pixel 无此槽位，忽略） */
  className?: string
}
