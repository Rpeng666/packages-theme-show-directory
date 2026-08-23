/**
 * Slider contract — a single-value range slider. semi → Semi Slider,
 * default → native `<input type="range">`. `onChange` receives the numeric
 * value (already rounded to `step`).
 */
export interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number
  onChange?: (value: number) => void
  disabled?: boolean
  /** 拖动时是否显示数值提示（semi tooltip；default 忽略） */
  showTooltip?: boolean
  className?: string
}
