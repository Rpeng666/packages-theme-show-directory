'use client'

import * as React from 'react'
import { Spinner } from '@heroui/react'
import type { SpinProps } from '@template/ui'

/** Semi Spin — HeroUI Spinner, optionally wrapping children. */
export function Spin({ spinning = true, tip, size = 'default', children, className = '' }: SpinProps) {
  const spinner = (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <Spinner size={size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'md'} />
      {tip ? <span style={{ fontSize: 13, color: 'var(--semi-color-text-2)' }}>{tip}</span> : null}
    </div>
  )
  if (!children) return spinning ? spinner : null
  return (
    <div style={{ position: 'relative' }}>
      <div style={spinning ? { opacity: 0.4, pointerEvents: 'none' } : undefined}>{children}</div>
      {spinning ? <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{spinner}</div> : null}
    </div>
  )
}
