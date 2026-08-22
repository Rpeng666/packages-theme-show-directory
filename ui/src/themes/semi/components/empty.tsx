'use client'

import * as React from 'react'
import type { EmptyProps } from '@template/ui'

/** Semi Empty — a quiet empty-state placeholder. */
export function Empty({ description, image, children, className = '' }: EmptyProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '40px 20px',
        textAlign: 'center',
        color: 'var(--semi-color-text-2)',
      }}
    >
      {image ? <div style={{ opacity: 0.7 }}>{image}</div> : null}
      {description ? <p style={{ margin: 0, fontSize: 14 }}>{description}</p> : null}
      {children}
    </div>
  )
}
