import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './floating-action-bar.module.css'

/**
 * WorkbenchFloatingActionBar — 移动端悬浮操作条（底部居中，毛玻璃）。
 *
 * 复刻 app prompts 页 `.floatingActionBar`：md 以下显示，按钮含图标+文字、
 * primary 变体。app 注入按钮内容：
 *
 *   <WorkbenchFloatingActionBar
 *     actions={[
 *       { key: 'add', label: 'Add to Raycast', icon: <Plus/>, primary: true, onClick: … },
 *       { key: 'copy', label: 'Copy JSON', icon: <Copy/>, onClick: … },
 *     ]}
 *   />
 */
export interface WorkbenchFloatingAction {
  key: string
  label: string
  icon?: React.ReactNode
  primary?: boolean
  onClick?: () => void
}

export interface WorkbenchFloatingActionBarProps {
  actions: WorkbenchFloatingAction[]
  className?: string
}

export function WorkbenchFloatingActionBar({ actions, className }: WorkbenchFloatingActionBarProps) {
  return (
    <div className={cn(styles.bar, className)}>
      {actions.map((action) => (
        <button
          key={action.key}
          type="button"
          className={styles.button}
          data-variant={action.primary ? 'primary' : undefined}
          onClick={action.onClick}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  )
}
