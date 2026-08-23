'use client'

import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './dock.module.css'
import { WorkbenchDot } from './dot'

/**
 * WorkbenchDock — 桌面 Dock 骨架（主题名/作者 + 色点）。
 *
 * 复刻 app themes 页 Dock：毛玻璃底栏 + 主题名 + 渐变分隔 + 主题色点。
 * 数据驱动：主题名/作者/色点由 app 注入。
 */
export interface WorkbenchDockProps {
  /** 主题名 */
  name?: string
  /** 作者 */
  author?: string
  /** 主题色点 */
  colors?: {
    background?: string
    backgroundSecondary?: string
    text?: string
    selection?: string
    loader?: string
  }
  className?: string
  [key: string]: unknown
}

export function WorkbenchDock({ name, author, colors, className, ...rest }: WorkbenchDockProps) {
  return (
    <div
      className={cn(styles.dock, className)}
      {...rest}
    >
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        {author ? <div className={styles.author}>by {author}</div> : null}
      </div>

      <div className={styles.divider} />

      <div className={styles.dots}>
        {colors?.background ? <WorkbenchDot size={18} color={colors.background} colorSecondary={colors.backgroundSecondary} /> : null}
        {colors?.text ? <WorkbenchDot size={18} color={colors.text} /> : null}
        {colors?.selection ? <WorkbenchDot size={18} color={colors.selection} /> : null}
        {colors?.loader ? <WorkbenchDot size={18} color={colors.loader} /> : null}
      </div>
    </div>
  )
}