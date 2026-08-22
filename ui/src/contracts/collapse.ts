import type { ReactNode } from 'react'

/**
 * Collapse contract — accordion groups of settings. semi → Semi Collapse
 * (Collapse.Panel per item), default → native disclosure panels.
 */
export interface CollapsePanelItem {
  key: string
  title?: ReactNode
  extra?: ReactNode
  children?: ReactNode
  disabled?: boolean
}

export interface CollapseProps {
  items: CollapsePanelItem[]
  /** only one panel open at a time */
  accordion?: boolean
  /** controlled open keys */
  activeKeys?: string[]
  defaultActiveKeys?: string[]
  onChange?: (activeKeys: string[]) => void
  className?: string
}
