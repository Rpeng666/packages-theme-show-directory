'use client'

import * as React from 'react'
import { Tag } from '@douyinfe/semi-ui'
import type { BadgeProps } from '@template/ui'

/**
 * Semi Badge — thin wrapper around Semi Tag. `tone` (pixel-native) maps to
 * Semi Tag color; `variant` chooses the Tag `color`+`type`.
 */
const TONE_COLOR: Record<string, [string, 'solid' | 'light' | 'outline']> = {
  green: ['green', 'light'],
  cyan: ['blue', 'light'],
  gold: ['amber', 'light'],
  red: ['red', 'light'],
  purple: ['violet', 'light'],
  pink: ['pink', 'light'],
  neutral: ['grey', 'light'],
}

export function Badge({
  variant = 'default',
  tone = 'neutral',
  size: _size,
  iconLeft: _iconLeft,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const [color, baseType] = TONE_COLOR[tone] ?? TONE_COLOR.neutral
  const type = variant === 'outline' ? 'outline' : variant === 'secondary' ? 'light' : baseType
  const styles: React.CSSProperties = {}
  if (variant === 'destructive') styles.color = 'var(--semi-color-danger)'
  return (
    <Tag color={color} type={type} className={className} style={styles} {...(props as any)}>
      {children}
    </Tag>
  )
}