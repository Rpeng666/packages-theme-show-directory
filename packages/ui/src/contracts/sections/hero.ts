import type { ComponentType, ReactNode } from 'react'
import type { Section } from '../../types/landing'

/** 注入的 Link 组件，替代 next-intl Link（package 不依赖 Next） */
export type SectionLink = ComponentType<{
  href: string
  target?: string
  children: ReactNode
  className?: string
}>

/** 注入的 Image 组件，替代 next/image */
export type SectionImage = ComponentType<any>

export interface HeroProps {
  section: Section
  className?: string
  /** 可选注入：CTA 链接渲染。不提供时 fallback 到原生 <a> */
  LinkComponent?: SectionLink
  /** 可选注入：图片渲染。不提供时 fallback 到原生 <img> */
  ImageComponent?: SectionImage
}
