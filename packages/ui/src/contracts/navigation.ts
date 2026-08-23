import type { ReactNode } from 'react'

/**
 * Navigation contract — a vertical/horizontal rail menu. semi → Semi
 * Navigation (built-in collapse trigger, sub-menu items), default → nested
 * button list. `onSelect` fires with the selected item's key.
 */
export interface NavigationItem {
  itemKey: string
  text?: ReactNode
  icon?: ReactNode
  items?: NavigationItem[]
  disabled?: boolean
}

export interface NavigationProps {
  items: NavigationItem[]
  /** controlled selected key */
  selectedKey?: string
  defaultSelectedKey?: string
  onSelect?: (key: string) => void
  header?: ReactNode
  footer?: ReactNode
  /** show the collapse toggle (semi always shows its own trigger) */
  collapsible?: boolean
  /** controlled collapsed state */
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapseChange?: (collapsed: boolean) => void
  className?: string
}
