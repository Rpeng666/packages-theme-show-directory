import * as React from 'react'
import { cn } from '../../../lib/utils'
import styles from './control-bar.module.css'

/**
 * WorkbenchFooter — 工作台底部控制条（原 app Controls.module.css 的 .controls，
 * 也是工作台页面的"底部 footer"）。
 *
 * 固定底栏：移动端全宽 + 顶边线；md 以上居中悬浮（width:auto + left:50% +
 * translateX(-50%)）+ 圆角渐变描边。样式在 control-bar.module.css（精确复刻）。
 * 控件内容由 app 组合注入（WorkbenchControlItem / Switch / Combobox 等）。
 */
export function WorkbenchFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(styles.bar, className)}>{children}</div>
}

/**
 * WorkbenchControlItem — 单个控件容器（原 app ControlContainer：title + 控件）。
 */
export function WorkbenchControlItem({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(styles.item, className)}>
      <strong className={styles.itemTitle}>{title}</strong>
      <div className={styles.itemControl}>{children}</div>
    </div>
  )
}
