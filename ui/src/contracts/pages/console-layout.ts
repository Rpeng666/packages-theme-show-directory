import type { ReactNode } from 'react'

/**
 * ConsoleLayout contract — an application-console page shell (chat, settings,
 * admin, workbench). Left rail with brand + navigation + custom footer slot,
 * top bar with title + actions, scrollable main content. semi → Semi
 * Layout/Navigation, default → CSS grid. Pure presentational: routing and
 * state are supplied by the caller via callbacks.
 */
export interface ConsoleLayoutNavItem {
  /** stable key — reported to onNavigate */
  key: string
  label?: ReactNode
  /** icon name from the shared SmartIcon vocabulary */
  icon?: string
  /** optional navigation target (consumed by the caller's onNavigate) */
  url?: string
  target?: string
  disabled?: boolean
  children?: ConsoleLayoutNavItem[]
}

export interface ConsoleLayoutNavGroup {
  /** group label rendered above items (optional) */
  label?: ReactNode
  items: ConsoleLayoutNavItem[]
}

export interface ConsoleLayoutBrand {
  title?: ReactNode
  subtitle?: ReactNode
  logo?: ReactNode
}

export interface ConsoleLayoutProps {
  /** brand block at the top of the rail */
  brand?: ConsoleLayoutBrand
  /** primary navigation groups (rendered as collapsible rail menu) */
  nav?: ConsoleLayoutNavGroup[]
  /** extra block between nav and footer (conversation library, shortcuts) */
  navFooter?: ReactNode
  /** rail footer (user card, sign out) */
  footer?: ReactNode
  /** actions rendered on the right of the top bar */
  topbar?: ReactNode
  /** top bar title / breadcrumb */
  title?: ReactNode
  /** rail width in px (default 260) */
  railWidth?: number
  /** controlled collapsed state */
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapseChange?: (collapsed: boolean) => void
  /** selected nav key (controlled) */
  selectedKey?: string
  /** fired when a nav item is selected */
  onNavigate?: (item: ConsoleLayoutNavItem) => void
  /** let the content area scroll (default true); set false when the child
   *  manages its own scroll (e.g. chat with a docked composer) */
  contentScroll?: boolean
  children?: ReactNode
  className?: string
}
