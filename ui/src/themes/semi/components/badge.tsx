'use client'

import * as React from 'react'
import { Chip } from '@heroui/react'
import type { BadgeProps } from '@template/ui'

/** Hero Chip color from the shared tone word. */
const TONE_COLOR: Record<string, 'success' | 'danger' | 'accent' | 'default'> = {
  green: 'success',
  red: 'danger',
  cyan: 'accent',
  purple: 'accent',
  blue: 'accent',
  pink: 'danger',
  gold: 'default',
  neutral: 'default',
}

/**
 * Semi Badge — a small status pill. Maps the shared variant/tone vocabulary
 * onto HeroUI Chip.
 */
export function Badge({
  variant = 'default',
  tone = 'neutral',
  size = 'md',
  iconLeft,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const color =
    variant === 'destructive' ? 'danger'
    : variant === 'outline' ? 'default'
    : TONE_COLOR[tone] ?? 'default'
  const heroVariant =
    variant === 'outline' ? 'tertiary'
    : variant === 'secondary' ? 'soft'
    : 'primary'

  return (
    <Chip
      {...(props as object)}
      color={color}
      variant={heroVariant as 'primary' | 'soft' | 'tertiary'}
      size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
      className={className}
    >
      {iconLeft}
      {children}
    </Chip>
  )
}
