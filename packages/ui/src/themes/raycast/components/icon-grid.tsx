import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './icon-grid.module.css'

/**
 * WorkbenchIconGrid — 多选图标网格分组（可复用展示/选择器）。
 *
 * 复刻 app ios-icons 页的 icon 网格：分组标题 + 图标网格，每格支持选中态
 * （ring 高亮 + 检查角标）+ 下方标签。数据驱动：
 *
 *   <WorkbenchIconGrid
 *     items={[
 *       { key: 'a-default', label: 'App (Default)',
 *         preview: <Image …/>, selected: isSelected, onToggle: () => … },
 *     ]}
 *     gridCols={4}
 *   />
 */
export interface WorkbenchIconGridItem {
  key: string
  label: string
  /** 副标题（可选） */
  sublabel?: string
  /** 预览内容（图标图片等） */
  preview: React.ReactNode
  /** 是否选中 */
  selected?: boolean
  /** 点击切换 */
  onToggle?: () => void
}

export interface WorkbenchIconGridProps {
  title?: string
  items: WorkbenchIconGridItem[]
  /** 网格列数（默认 4；响应式 2→lg:4） */
  gridCols?: number
  className?: string
  [key: string]: unknown
}

export function WorkbenchIconGrid({ title, items, gridCols = 4, className, ...rest }: WorkbenchIconGridProps) {
  return (
    <article className={cn(styles.group, className)} {...rest}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      <div
        className={styles.grid}
        style={{ '--grid-cols': gridCols } as React.CSSProperties}
      >
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={styles.cell}
            aria-pressed={item.selected}
            onClick={item.onToggle}
          >
            <div className={cn(styles.previewFrame, item.selected ? styles.selected : styles.unselected)}>
              {item.selected ? <span className={styles.checkIcon}><CheckGlyph /></span> : null}
            </div>
            <div className={styles.labels}>
              <p className={styles.label}>{item.label}</p>
              {item.sublabel ? <p className={styles.sublabel}>{item.sublabel}</p> : null}
            </div>
          </button>
        ))}
      </div>
    </article>
  )
}

function CheckGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 8l3.5 3.5 4-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}