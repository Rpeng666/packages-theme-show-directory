'use client'

import * as React from 'react'
import type { LayoutShellProps } from '@template/ui'

export function LayoutShell(props: LayoutShellProps) {
  const { children, className = '' } = props as any
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {children}
    </div>
  )
}
