'use client'

import * as React from 'react'
import { Typography, Avatar as SemiAvatar } from '@douyinfe/semi-ui'
import type { LabelProps, AvatarProps } from '@template/ui'

const { Text } = Typography

export function Label({ children, ...props }: LabelProps) {
  return (
    <label {...props} style={{ fontSize: 13, color: 'var(--semi-color-text-2)', display: 'inline-block', ...props.style }}>
      {children}
    </label>
  )
}

const SIZE = { sm: 'small', md: 'default', lg: 'extra-extra-large' } as const

export function Avatar({ name, src, size = 'md', shape = 'circle', className = '' }: AvatarProps) {
  const alt = name?.charAt(0)?.toUpperCase() ?? '?'
  return (
    <SemiAvatar
      src={src}
      size={SIZE[size] as any}
      className={className}
      shape={shape === 'rounded' ? 'square' : 'circle'}
      alt={name}
    >
      {!src ? <Text strong>{alt}</Text> : null}
    </SemiAvatar>
  )
}