import type { FieldTone } from './field'

/**
 * Progress contract. showValue defaults to false to match the app's current
 * usage (generator renders its own percentage text beside the bar) — pass
 * true explicitly to show it.
 */
export interface ProgressProps {
  value: number
  tone?: FieldTone
  label?: React.ReactNode
  /** 是否显示百分比文本，默认 false */
  showValue?: boolean
  indeterminate?: boolean
  className?: string
}
