import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './panel.module.css'

/**
 * WorkbenchPanel — 侧滑面板（设置/图标列表等）。
 *
 * 复刻 app icon-generator 的 `.panel`（absolute 定位 + 过渡），含：
 *   - `side`: 'left' | 'right'（面板锚定方向）
 *   - `opened` / `hidden`: 面板显隐（hidden 完全隐藏；opened 移动端滑入）
 *   - `handleIcon` + `onHandleClick`: 移动端面板把手（点击切换 opened）
 *
 * 桌面端为固定面板，移动端滑入 + 遮罩。
 */
export interface WorkbenchPanelProps {
  children: React.ReactNode
  side?: 'left' | 'right'
  opened?: boolean
  hidden?: boolean
  className?: string
  /** 面板把手图标（移动端显示） */
  handleIcon?: React.ReactNode
  /** 把手点击回调（app 切换 opened state） */
  onHandleClick?: () => void
  [key: string]: unknown
}

export function WorkbenchPanel({
  children,
  side = 'left',
  opened = false,
  hidden = false,
  className,
  handleIcon,
  onHandleClick,
  ...rest
}: WorkbenchPanelProps) {
  return (
    <div
      className={cn(
        styles.panel,
        side === 'left' ? styles.icons : styles.options,
        opened && styles.opened,
        hidden && styles.hidden,
        className,
      )}
      {...rest}
    >
      {handleIcon ? (
        <button
          type="button"
          className={cn(
            styles.panelHandle,
            side === 'left' ? styles.panelHandleLeft : styles.panelHandleRight,
            hidden && styles.hidden,
          )}
          onClick={onHandleClick}
          aria-label={side === 'left' ? 'Toggle icons panel' : 'Toggle options panel'}
        >
          {handleIcon}
        </button>
      ) : null}
      {children}
    </div>
  )
}
