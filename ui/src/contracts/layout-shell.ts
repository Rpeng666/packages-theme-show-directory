import type { CSSProperties, ReactNode } from 'react'

/**
 * LayoutShell contract — an application shell with an optional left rail
 * (sider), top bar (header), main content area and footer. semi → Semi Layout
 * (Layout.Sider / Layout.Header / Layout.Content), default → CSS flex/grid.
 * Composes the page chrome; content slots are provided by the caller.
 */
export interface LayoutShellProps {
  /** left rail content */
  sider?: ReactNode
  /** top bar content */
  header?: ReactNode
  /** main content */
  children?: ReactNode
  /** bottom content */
  footer?: ReactNode
  /** rail width in px (default 240) */
  siderWidth?: number
  className?: string
  style?: CSSProperties
}
