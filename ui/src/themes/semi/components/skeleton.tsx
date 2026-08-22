'use client'

import * as React from 'react'
import { Skeleton as SemiSkeleton } from '@douyinfe/semi-ui'
import type { SkeletonProps } from '@template/ui'

export function Skeleton(props: SkeletonProps) {
  const { className = '', style, ...rest } = props
  return (
    <SemiSkeleton
      placeholder={
        <div className={className} style={{ width: '100%', ...style }} {...(rest as any)}>
          <SemiSkeleton.Image style={{ width: '100%', height: 80, borderRadius: 8 }} />
        </div>
      }
      loading
    />
  )
}