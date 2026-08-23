import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './toolbar-actions.module.css'

/**
 * WorkbenchToolbarActions — 工作台顶部工具栏（固定顶栏，替代 NavigationActions 容器）。
 *
 * 自带 fixed 定位（top-0 / h-[50px]），复刻原 NavigationActions 的角色；
 * 左侧动作（Undo/Redo 等）、中间文件名、右侧动作（Export/Info 等）三槽位。
 * 业务内容由 app 注入：
 *
 *   <WorkbenchToolbarActions
 *     left={<><Button>Undo</Button><Button>Redo</Button></>}
 *     center={<div contentEditable>icon.png</div>}
 *     right={<><InfoDialog /><ExportButton /></>}
 *   />
 */
export interface WorkbenchToolbarActionsProps {
  /** 左侧动作区（Undo/Redo 等） */
  left?: React.ReactNode
  /** 中间内容（文件名等） */
  center?: React.ReactNode
  /** 右侧动作区（Export/Info 等） */
  right?: React.ReactNode
  /** 是否显示左/中/右之间的分隔线（默认 true） */
  dividers?: boolean
  className?: string
  [key: string]: unknown
}

export function WorkbenchToolbarActions({
  left,
  center,
  right,
  dividers = true,
  className,
  ...rest
}: WorkbenchToolbarActionsProps) {
  return (
    <div
      className={cn(styles.toolbar, className)}
      {...rest}
    >
      {left ? (
        <div className={cn(styles.actions, styles.actionsLeft)}>
          {left}
          {dividers ? <div className={styles.separator} /> : null}
        </div>
      ) : null}

      {center ? <div className={styles.center}>{center}</div> : null}

      {right ? (
        <div className={cn(styles.actions, styles.actionsRight)}>
          {dividers ? <div className={styles.separator} /> : null}
          {right}
        </div>
      ) : null}
    </div>
  )
}
