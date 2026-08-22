import type { FieldSize } from './field'

/**
 * InputNumber contract — a numeric stepper input. Both themes map the shared
 * value/onChange semantics: semi → Semi InputNumber (onChange passes a number),
 * default → native `<input type="number">`. `onChange` receives the parsed
 * number (or null when the field is emptied / invalid).
 */
export interface InputNumberProps {
  /** 当前数值（受控） */
  value?: number | null
  /** 数值变更（解析后） */
  onChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  /** 高度语义（FieldSize） */
  size?: FieldSize
  placeholder?: string
  id?: string
  className?: string
}
