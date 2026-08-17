import type { ReactNode } from 'react'

/**
 * Tabs contract — item-based tabs (NOT the shadcn compound Tabs in the app
 * shim; this is a registry-resolved primitive with a lean items API). Both
 * themes render active tab content via `onChange`/`activeKey`.
 */
export interface TabsItem {
  key: string
  label: ReactNode
  /** 惰性渲染：当前激活项的 content 直接内联 */
  content?: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabsItem[]
  activeKey?: string
  onChange?: (key: string) => void
  /** 视觉样式（semi: line/button/card/bar；default 忽略） */
  type?: 'line' | 'card' | 'button' | 'segment'
  size?: 'small' | 'medium' | 'large'
  className?: string
}
