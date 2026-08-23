import type { ReactNode } from 'react'
import type { HeaderProps } from './header'

/**
 * PageShell contract — the page skeleton that composes Header + content +
 * Footer using the theme's layout primitives. Header comes from @template/ui
 * (with business slots injected); footer is a ReactNode slot (app renders it,
 * since it binds BadgeBar/Copyright business).
 */
export interface PageShellProps {
  /** Header 数据 + 业务注入（见 HeaderProps） */
  header: HeaderProps
  /** 页脚（ReactNode slot —— app 从 getThemeBlock 渲染后传入） */
  footer?: ReactNode
  /** 内容区上方横幅（如 badgeMarquee） */
  banner?: ReactNode
  /** 页面内容 */
  children: ReactNode
  className?: string
}
