import type { ComponentType, ReactNode } from 'react'

/** 相关文章（由 app 从数据库注入） */
export interface RelatedPost {
  slug: string
  title: string
  description: string
  image?: string
}

export interface RelatedPostsProps {
  /** 相关文章列表（业务注入） */
  posts: RelatedPost[]
  /** 可选注入：链接渲染。不提供时 fallback 到原生 <a> */
  LinkComponent?: ComponentType<{
    href: string
    target?: string
    children: ReactNode
    className?: string
  }>
  className?: string
}

/** 文章页 CTA（数据由 app 从配置注入） */
export interface BlogCtaData {
  headline: string
  sub: string
  href: string
  ctaLabel?: string
}

export interface BlogToolCtaProps {
  /** CTA 数据（业务注入） */
  cta: BlogCtaData
  /** 可选注入：链接渲染。不提供时 fallback 到原生 <a> */
  LinkComponent?: ComponentType<{
    href: string
    target?: string
    children: ReactNode
    className?: string
  }>
  className?: string
}
