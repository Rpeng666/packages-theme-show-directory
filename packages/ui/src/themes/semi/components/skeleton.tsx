'use client'

import * as React from 'react'
import type { SkeletonProps } from '@template/ui'

/** Semi Skeleton — a quiet shimmering placeholder block. */
export function Skeleton({ className = '', style, ...props }: SkeletonProps) {
  return (
    <div
      {...props}
      className={className}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        background: 'var(--semi-color-fill-1)',
      }}
    />
  )
}
