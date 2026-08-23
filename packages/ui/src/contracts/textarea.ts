import type * as React from 'react'
import type { FieldTone } from './field'

/**
 * Textarea contract — same "field shell" semantics as Input.
 */
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'> {
  label?: React.ReactNode
  hint?: React.ReactNode
  error?: React.ReactNode
  tone?: FieldTone
  /** 自动高度（pxlkit 原生支持；default 忽略或简单映射 rows） */
  autosize?: boolean
  minRows?: number
  maxRows?: number
  showCount?: boolean | { max?: number }
  className?: string
}
