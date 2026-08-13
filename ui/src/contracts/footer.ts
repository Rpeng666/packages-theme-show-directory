import type { ReactNode } from 'react'
import type { Footer } from '../types/landing'

/**
 * Footer contract — the structural skeleton rendered with the theme's chrome.
 * Navigation columns, copyright, social links and agreement links are
 * data-driven (native <a href>, SEO friendly — a server layout can render it).
 * Business slots are injected as children: `brandSlot` (brand logo),
 * `badgesSlot` (external-link badge bar from the database), `localeThemeSlot`
 * (locale selector + theme toggler). LinkComponent is injected so the package
 * has no Next dependency; it falls back to a native <a>.
 */
export interface FooterProps {
  footer: Footer
  /** 品牌槽位（app 注入 BrandLogo） */
  brandSlot?: ReactNode
  /** 外链徽标槽位（app 注入 BadgeBar，数据来自数据库） */
  badgesSlot?: ReactNode
  /** 语言 + 主题切换槽位（app 注入 LocaleSelector / ThemeToggler） */
  localeThemeSlot?: ReactNode
  /** 可选注入：链接渲染。不提供时 fallback 到原生 <a> */
  LinkComponent?: React.ComponentType<{
    href: string
    target?: string
    children: ReactNode
    className?: string
  }>
  className?: string
}
