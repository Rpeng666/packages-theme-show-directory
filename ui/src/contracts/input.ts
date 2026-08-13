import type * as React from 'react'
import type { FieldTone, FieldSize } from './field'

/**
 * Input contract — a "field shell" semantic layer.
 * pxlkit's PixelInput has FieldShell (label/hint/error) built in; shadcn keeps
 * label external. The contract exposes shell slots that each theme renders
 * naturally — callers never see the shell difference.
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color' | 'prefix'> {
  /** 字段壳 label */
  label?: React.ReactNode
  hint?: React.ReactNode
  error?: React.ReactNode
  /** 高度语义（pxlkit Size；default 映射 h-8/h-9/h-11） */
  size?: FieldSize
  tone?: FieldTone
  /** 壳内左/右槽位 */
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  /** legacy alias for prefix */
  icon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  showCount?: boolean | { max?: number }
  loading?: boolean
  className?: string
}
