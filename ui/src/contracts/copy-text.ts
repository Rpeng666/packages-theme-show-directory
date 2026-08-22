import type { ReactNode } from 'react'

/**
 * CopyText contract — copyable text with a built-in copy affordance. semi →
 * Semi Typography.Text (copyable), default → span + copy button.
 */
export interface CopyTextProps {
  children?: ReactNode
  /** text to copy; falls back to the string children */
  text?: string
  copyable?: boolean
  type?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger' | 'success' | 'link'
  strong?: boolean
  code?: boolean
  className?: string
}
