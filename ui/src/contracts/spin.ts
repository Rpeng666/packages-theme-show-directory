import type { ReactNode } from 'react'

/**
 * Spin contract — a loading spinner wrapper. When `spinning` is true it shows
 * the indicator; children render alongside (semi wraps, default keeps inline).
 */
export interface SpinProps {
  spinning?: boolean
  tip?: ReactNode
  size?: 'small' | 'default' | 'large'
  children?: ReactNode
  className?: string
}
