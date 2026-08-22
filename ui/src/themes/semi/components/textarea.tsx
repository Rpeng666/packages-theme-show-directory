'use client'

import * as React from 'react'
import { TextArea as HeroTextarea } from '@heroui/react'
import type { TextareaProps } from '@template/ui'

/** Semi Textarea — field shell + HeroUI Textarea. */
export function Textarea({
  label,
  hint,
  error,
  autosize,
  minRows,
  maxRows,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label ? (
        <label style={{ fontSize: 13, fontWeight: 550, color: 'var(--semi-color-text-1)' }}>{label}</label>
      ) : null}
      <HeroTextarea
        {...(props as any)}
        minRows={minRows ?? (autosize ? 2 : undefined)}
        maxRows={maxRows}
        isInvalid={Boolean(error)}
      />
      {error ? (
        <span style={{ fontSize: 12.5, color: 'rgba(var(--semi-red-5), 1)' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 12.5, color: 'var(--semi-color-text-3)' }}>{hint}</span>
      ) : null}
    </div>
  )
}
