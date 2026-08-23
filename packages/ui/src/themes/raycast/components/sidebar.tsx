import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './sidebar.module.css'

/**
 * WorkbenchSidebar — 工作台左侧固定导航栏骨架。
 *
 * 复刻 app prompts 页 `.sidebar`：fixed 左侧 320px 栏 + 圆角容器 + 内容滚动。
 * 上部分（导航）与下部分（选中汇总/操作）由 app 注入：
 *
 *   <WorkbenchSidebar top={<NavItem list…/>} bottom={<SelectionSummary…/>} />
 */
export interface WorkbenchSidebarProps {
  /** 上半部分内容（分类导航等） */
  top?: React.ReactNode
  /** 下半部分内容（选中汇总/操作按钮等） */
  bottom?: React.ReactNode
  className?: string
  [key: string]: unknown
}

export function WorkbenchSidebar({ top, bottom, className, ...rest }: WorkbenchSidebarProps) {
  return (
    <div className={cn(styles.sidebar, className)} {...rest}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.scroll}>{top}</div>
          {bottom ? <div className={styles.bottom}>{bottom}</div> : null}
        </div>
      </div>
    </div>
  )
}
