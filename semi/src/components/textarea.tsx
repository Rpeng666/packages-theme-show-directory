'use client'

import * as React from 'react'
import { TextArea as SemiTextArea } from '@douyinfe/semi-ui'
import type { TextareaProps } from '@template/ui'

/**
 * Semi TextArea — maps shared TextareaProps onto Semi TextArea. `autosize`
 * maps to Semi autosize; showCount/addon slots supported.
 */
export function Textarea({
  label,
  hint,
  error,
  tone: _tone,
  autosize,
  minRows,
  maxRows,
  showCount,
  className = '',
  ...props
}: TextareaProps) {
  const area = (
    <SemiTextArea
      {...(props as any)}
      autosize={autosize ? true : undefined}
      rows={!autosize ? (props.rows as any) : undefined}
      showClear={false}
      count={typeof showCount === 'object' ? showCount.max : undefined}
      className={className}
    />
  )

  if (!label && !hint && !error) return area

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <label style={{ fontSize: 13, color: 'var(--semi-color-text-2)' }}>{label}</label>}
      {area}
      {error && <span style={{ fontSize: 12, color: 'var(--semi-color-danger)' }}>{error}</span>}
      {!error && hint && <span style={{ fontSize: 12, color: 'var(--semi-color-text-3)' }}>{hint}</span>}
    </div>
  )
}