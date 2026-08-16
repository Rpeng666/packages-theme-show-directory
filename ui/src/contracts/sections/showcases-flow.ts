import type { ComponentType, ReactNode } from 'react'
import type { Section } from '../../types/landing'

/** 注入的 Link 组件（next-intl locale-aware） */
export type ShowcasesFlowLink = ComponentType<{
  href: string
  target?: string
  children: ReactNode
  className?: string
}>

/** 注入的图片渲染（next/image 或原生 img） */
export type ShowcasesFlowImage = ComponentType<{
  src: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
}>

export interface ShowcasesFlowProps {
  section: Section
  className?: string
  /** 注入链接渲染；不提供时 fallback 原生 <a> */
  LinkComponent?: ShowcasesFlowLink
  /** 注入图片渲染；不提供时 fallback 原生 <img> */
  ImageComponent?: ShowcasesFlowImage
}
