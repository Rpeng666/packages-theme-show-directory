import type { ComponentType, ReactNode } from 'react'

/** 博客文章详情（展示字段，由 app 从数据库注入） */
export interface BlogDetailPost {
  id?: string
  slug?: string
  title?: string
  description?: string
  image?: string
  content?: string
  created_at?: string
  author_name?: string
  author_role?: string
  author_image?: string
  url?: string
  target?: string
  /** 正文槽位数据（app 注入渲染好的正文，可选） */
  body?: ReactNode
  /** 目录数据（app 注入 fumadocs TOCItemType，可选） */
  toc?: TocItem[]
}

/** 相关文章（由 app 从数据库注入） */
export interface RelatedPost {
  slug: string
  title: string
  description: string
  image?: string
}

/** 目录项（app 注入 fumadocs TOCItemType；package 不依赖 fumadocs，用同形宽松类型） */
export interface TocItem {
  title: ReactNode
  url: string
  depth: number
}

export interface BlogDetailProps {
  /** 文章数据（业务注入） */
  post: BlogDetailPost
  /** 相关文章列表（业务注入） */
  relatedPosts?: RelatedPost[]
  /** 目录槽位（app 注入 fumadocs TOC —— 重度 client 依赖，package 不拥有） */
  tocSlot?: ReactNode
  /** 正文内容槽位（app 注入 Markdown/MDX 渲染 —— 重度依赖，package 不拥有） */
  contentSlot?: ReactNode
  /** 可选注入：链接渲染。不提供时 fallback 到原生 <a> */
  LinkComponent?: ComponentType<{
    href: string
    target?: string
    children: ReactNode
    className?: string
  }>
}
