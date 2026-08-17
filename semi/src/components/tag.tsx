'use client'

import * as React from 'react'
import { Tag as SemiTag } from '@douyinfe/semi-ui'
import type { TagProps } from '@template/ui'

const SIZE = { small: 'small', default: 'default', large: 'large' } as const

/**
 * Semi Tag — maps the shared TagProps onto Semi Tag. Color words pass straight
 * through (Semi's Tag color union); `type` maps to Semi's solid/light/outline/
 * ghost.
 */
export function Tag({
  color,
  size = 'default',
  closable,
  onClose,
  type = 'light',
  children,
  className = '',
  ...rest
}: TagProps) {
  return (
    <SemiTag
      {...(rest as any)}
      color={color}
      size={SIZE[size as keyof typeof SIZE] ?? 'default'}
      closable={closable}
      onClose={onClose}
      type={type}
      className={className}
    >
      {children}
    </SemiTag>
  )
}
