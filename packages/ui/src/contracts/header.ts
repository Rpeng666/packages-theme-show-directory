import type { ReactNode } from 'react'
import type { NavItem, Button } from '../types/common'

/**
 * Header contract — the structural skeleton (nav, layout, actions) rendered
 * with the theme's chrome. Nav links are data-driven native <a href> (SEO
 * friendly, no function props — so a server layout can render it). Business
 * slots (brand logo, locale selector, sign user, theme toggler) are injected
 * as children by the server layout: `brandSlot` (left) and `actions` (right).
 */
export interface HeaderProps {
  nav?: NavItem[]
  /** 左侧品牌槽位（app 注入 BrandLogo —— client 组件，作为 children 传入） */
  brandSlot?: ReactNode
  /** CTA 按钮数据（走主题的 Button） */
  actions?: Button[]
  /** 右侧业务槽位（app 注入 LocaleSelector/SignUser/ThemeToggler） */
  business?: ReactNode
  className?: string
}
