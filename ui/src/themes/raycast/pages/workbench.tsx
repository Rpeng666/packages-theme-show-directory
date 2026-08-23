import * as React from 'react'
import { cn } from '../../../lib/utils'

/**
 * Raycast workbench page shell — the full workbench layout:
 *
 *   <WorkbenchHeader />       工作台顶部 header（fixed）
 *   <main>                   中间区域（children）
 *   <WorkbenchFooter />      工作台底部 footer
 *
 * The header is fixed at the top (50px), so `<main>` carries the top offset.
 * The footer uses mt-auto so it sticks to the bottom of tall viewports.
 * Both header and footer are optional slots — the app can supply its own
 * (e.g. a theme-resolved WorkbenchHeader/WorkbenchFooter) via props.
 */
export interface WorkbenchPageProps {
  /** 顶部 header（默认渲染主题 WorkbenchHeader，可注入） */
  header?: React.ReactNode
  /** 底部 footer（默认渲染主题 WorkbenchFooter，可注入） */
  footer?: React.ReactNode
  /** 中间区域 */
  children: React.ReactNode
  className?: string
}

export function WorkbenchPage({ header, footer, children, className }: WorkbenchPageProps) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {header}
      <main className="flex flex-col flex-1 min-h-0 pt-[50px]">{children}</main>
      {footer}
    </div>
  )
}
