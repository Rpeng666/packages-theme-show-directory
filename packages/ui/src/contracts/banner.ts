import type { ReactNode } from 'react'

/**
 * Banner contract — a prominent feedback banner (errors, warnings, success).
 * semi → Semi Banner, default → a styled div. `description` carries the main
 * copy; children render below it.
 */
export interface BannerProps {
  type?: 'info' | 'success' | 'warning' | 'danger'
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  closable?: boolean
  onClose?: () => void
  /** 是否显示边框（semi 支持；default 忽略） */
  bordered?: boolean
  children?: ReactNode
  className?: string
}
