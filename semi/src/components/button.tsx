'use client'

import * as React from 'react'
import { Button as SemiButton, Spin } from '@douyinfe/semi-ui'
import type { ButtonProps } from '@template/ui'

/**
 * Semi Button — maps the shared `variant`/`size` vocabulary onto Semi's
 * Button `theme`/`size`. `tone` (pixel-native) is ignored; `asChild` forces a
 * primary rendering (Slot semantics like shadcn) since Semi has no asChild.
 */
export function Button({
  variant = 'default',
  size = 'default',
  asChild = false,
  loading = false,
  tone: _tone,
  iconLeft: _iconLeft,
  iconRight: _iconRight,
  fullWidth: _fullWidth,
  className = '',
  children,
  type: _nativeType,
  ...props
}: ButtonProps) {
  const destructive = variant === 'destructive'
  const theme: 'solid' | 'light' | 'borderless'
    = variant === 'ghost' || variant === 'link' ? 'borderless'
    : variant === 'outline' || variant === 'secondary' ? 'light'
    : 'solid'

  const semiSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'default'

  return (
    <SemiButton
      {...props}
      theme={theme}
      type={destructive ? 'danger' : 'primary'}
      size={semiSize}
      loading={loading}
      block={_fullWidth}
      className={className}
      icon={loading ? <Spin size="small" /> : undefined}
    >
      {children}
    </SemiButton>
  )
}