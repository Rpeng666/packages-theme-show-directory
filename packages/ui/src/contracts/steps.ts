import type { ReactNode } from 'react'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

/**
 * Steps contract — a step indicator for multi-stage flows (e.g. upload →
 * process → download). `current` is 0-based; semi → Semi Steps,
 * default → a simple flex row of numbered circles.
 */
export interface StepsItem {
  title: ReactNode
  description?: ReactNode
  /** 覆盖状态（不传则按 current 推断） */
  status?: StepStatus
}

export interface StepsProps {
  items: StepsItem[]
  /** 0-based 当前步 */
  current?: number
  direction?: 'horizontal' | 'vertical'
  size?: 'small' | 'default'
  className?: string
}
