import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './theme-controls.module.css'

/**
 * WorkbenchThemeControls — 主题浏览页底部工具条骨架（Filter 左 / AddToRaycast 中 / Navigation 右）。
 *
 * 复刻 app themes 页 ThemeControls 的布局（三槽位 + 居中绝对定位）。
 * 内容由 app 注入。
 */
export interface WorkbenchThemeControlsProps {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
  className?: string
  [key: string]: unknown
}

export function WorkbenchThemeControls({ left, center, right, className, ...rest }: WorkbenchThemeControlsProps) {
  return (
    <div className={cn(styles.controls, className)} {...rest}>
      {left ? <div>{left}</div> : null}
      {center ? (
        <div className={styles.center}>
          {center}
        </div>
      ) : null}
      {right ? <div>{right}</div> : null}
    </div>
  )
}
