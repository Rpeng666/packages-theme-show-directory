import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './sidebar.module.css'

/**
 * WorkbenchSidebarNav — 侧栏分类导航列表。
 *
 * 复刻 app prompts 页 `.sidebarNav` + `.sidebarNavItem`（含激活态 + 数量 badge）。
 * 数据驱动：items 注入 label/icon/badge/active/onSelect。
 */
export interface WorkbenchSidebarNavItem {
  /** 导航项 key（用于 React key） */
  key: string
  /** 显示文本 */
  label: string
  /** 图标（app 注入） */
  icon?: React.ReactNode
  /** 右侧数量 badge */
  badge?: number
  /** 是否激活 */
  active?: boolean
  /** 点击回调 */
  onSelect?: () => void
}

export function WorkbenchSidebarNav({
  title = 'Categories',
  items,
  className,
}: {
  title?: string
  items: WorkbenchSidebarNavItem[]
  className?: string
}) {
  return (
    <nav className={cn(styles.nav, className)}>
      <p className={styles.navTitle}>{title}</p>
      {items.map((item) => (
        <a
          key={item.key}
          href="#"
          onClick={(e) => {
            e.preventDefault()
            item.onSelect?.()
          }}
          className={styles.navItem}
          data-active={item.active ? 'true' : 'false'}
        >
          {item.icon}
          {item.label}
          {typeof item.badge === 'number' ? <span className={styles.badge}>{item.badge}</span> : null}
        </a>
      ))}
    </nav>
  )
}
