'use client'

import * as React from 'react'
import { Spin as SemiSpin } from '@douyinfe/semi-ui'
import type { SpinProps } from '@template/ui'

const SIZE = { small: 'small', default: 'middle', large: 'large' } as const

/**
 * Semi Spin — maps the shared SpinProps onto Semi Spin. size words map
 * small/default/large → Semi's small/middle/large.
 */
export function Spin({
  spinning = true,
  tip,
  size = 'default',
  children,
  className = '',
}: SpinProps) {
  return (
    <SemiSpin
      spinning={spinning}
      tip={tip}
      size={SIZE[size as keyof typeof SIZE] ?? 'middle'}
      className={className}
    >
      {children}
    </SemiSpin>
  )
}
