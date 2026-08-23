import type * as React from 'react'
import type { FieldTone } from './field'

/**
 * Switch contract — normalized callback (onCheckedChange, matching shadcn/Radix
 * and the app's existing call sites). pxlkit's PixelSwitch calls it onChange
 * and requires a label; the pixel impl adapts.
 */
export interface SwitchProps {
  /** 可选 label（pxlkit 必填，无 label 时传空；default 存在时外包 <label>） */
  label?: React.ReactNode
  checked?: boolean
  defaultChecked?: boolean
  /** 归一化回调：pxlkit onChange(next) → Radix onCheckedChange */
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  tone?: FieldTone
  name?: string
  value?: string
  required?: boolean
  id?: string
  className?: string
}
