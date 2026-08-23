import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './theme-switcher.module.css'

/**
 * WorkbenchThemeSwitcher — 横向主题切换滑轨（snap 滚动 + 首尾留白）。
 *
 * 复刻 app themes 页 ThemeSwitcher。数据驱动：themes + 当前激活主题，
 * 卡片由 renderCard 注入（通常为 WorkbenchThemeCard）。
 */
export interface WorkbenchThemeSwitcherProps {
  /** 全部主题 */
  themes: { slug?: string; appearance?: 'light' | 'dark' }[]
  /** 当前激活主题 slug */
  activeSlug?: string
  /** 渲染卡片（app 注入 WorkbenchThemeCard 等） */
  renderCard: (theme: { slug?: string; appearance?: 'light' | 'dark' }, selected: boolean) => React.ReactNode
  /** 高度（默认 200px） */
  height?: number
  className?: string
  [key: string]: unknown
}

export function WorkbenchThemeSwitcher({
  themes,
  activeSlug,
  renderCard,
  height = 200,
  className,
  ...rest
}: WorkbenchThemeSwitcherProps) {
  return (
    <div
      className={cn(styles.switcher, className)}
      style={{ height }}
      {...rest}
    >
      <div aria-hidden className={styles.edge} />
      {themes.map((theme) => (
        <React.Fragment key={theme.slug ?? 'unnamed'}>
          {renderCard(theme, theme.slug === activeSlug)}
        </React.Fragment>
      ))}
      <div aria-hidden className={styles.edge} />
    </div>
  )
}
