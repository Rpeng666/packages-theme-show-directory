'use client'

import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './theme-card.module.css'
import { WorkbenchDot } from './dot'

/**
 * WorkbenchThemeCard — 主题选择卡片（预览 + 名称/作者 + 色点 + 选中态）。
 *
 * 复刻 app themes 页 ThemeCard：snap 对齐、选中高亮、自动滚动聚焦。
 * 数据驱动：theme 数据 + 预览（Raycast 缩略图）由 app 注入。
 */
export interface WorkbenchThemeCardData {
  /** 主题名 */
  name?: string
  /** 作者 */
  author?: string
  /** 作者用户名 */
  authorUsername?: string
  /** 主题 slug（唯一标识） */
  slug?: string
  /** 颜色（色点展示） */
  colors?: {
    background?: string
    backgroundSecondary?: string
    text?: string
    selection?: string
    loader?: string
  }
}

export interface WorkbenchThemeCardProps {
  theme?: WorkbenchThemeCardData
  selected?: boolean
  onSelect?: () => void
  /** 预览内容（Raycast 缩略图等） */
  preview?: React.ReactNode
  /** 是否自动滚动聚焦（默认 true） */
  scrollIntoView?: boolean
  className?: string
  [key: string]: unknown
}

export function WorkbenchThemeCard({
  theme,
  selected = false,
  onSelect,
  preview,
  scrollIntoView = true,
  className,
  ...rest
}: WorkbenchThemeCardProps) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (selected && scrollIntoView) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }, [selected, scrollIntoView])

  const colors = theme?.colors
  const authorName = theme?.author || theme?.authorUsername

  return (
    <button
      ref={ref}
      type="button"
      className={cn(styles.card, selected && styles.selected, className)}
      onClick={onSelect}
      {...rest}
    >
      <div className={styles.preview}>
        <div className={styles.previewInner}>{preview}</div>
      </div>

      <div className={styles.meta}>
        <div className={styles.title}>
          <span className={styles.name}>{theme?.name}</span>
          {authorName ? <span className={styles.author}>by {authorName}</span> : null}
        </div>

        <div className={styles.dots}>
          {colors?.background ? <WorkbenchDot color={colors.background} colorSecondary={colors.backgroundSecondary} /> : null}
          {colors?.text ? <WorkbenchDot color={colors.text} /> : null}
          {colors?.selection ? <WorkbenchDot color={colors.selection} /> : null}
          {colors?.loader ? <WorkbenchDot color={colors.loader} /> : null}
        </div>
      </div>
    </button>
  )
}
