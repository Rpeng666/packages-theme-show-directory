import type { ComponentType, ReactNode } from 'react'
import type { Section } from '../../types/landing'

/** 注入的 Link 组件，替代 next-intl Link（package 不依赖 Next） */
export type CtaLink = ComponentType<{
  href: string
  target?: string
  children: ReactNode
  className?: string
}>

export interface CtaProps {
  section: Section
  className?: string
  /** 可选注入：CTA 链接渲染。不提供时 fallback 到原生 <a> */
  LinkComponent?: CtaLink
}
