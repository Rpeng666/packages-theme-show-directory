'use client'

import * as React from 'react'
import { Chip } from '@heroui/react'
import type { TagProps } from '@template/ui'

/** Hero Chip color from the shared semi color word. */
const COLOR_MAP: Record<string, 'success' | 'danger' | 'accent' | 'default'> = {
  green: 'success',
  red: 'danger',
  amber: 'default',
  orange: 'default',
  blue: 'accent',
  cyan: 'accent',
  purple: 'accent',
  violet: 'accent',
  pink: 'danger',
  grey: 'default',
  neutral: 'default',
  white: 'default',
}

/**
 * Semi Tag — a small label chip (HeroUI Chip). `color` maps semi color words
 * onto Hero's palette; `type` maps solid/light/outline/ghost onto variants.
 */
export function Tag({
  color = 'grey',
  size = 'default',
  closable = false,
  onClose,
  type = 'light',
  className = '',
  children,
  ...props
}: TagProps) {
  const heroColor = COLOR_MAP[color] ?? 'default'
  const heroVariant =
    type === 'solid' ? 'primary'
    : type === 'outline' ? 'secondary'
    : type === 'ghost' ? 'tertiary'
    : 'soft'

  return (
    <Chip
      {...(props as any)}
      color={heroColor as never}
      variant={heroVariant as never}
      size={(size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md') as never}
      onClose={closable ? (() => onClose?.(undefined as never)) : undefined}
      className={className}
    >
      {children}
    </Chip>
  )
}
