import type { ComponentType, ReactNode } from 'react'
import type { Section } from '../../types/landing'

/** 博客文章（展示字段，由 app 从数据库注入） */
export interface BlogPost {
  id?: string
  slug?: string
  title?: string
  description?: string
  image?: string
  created_at?: string
  author_name?: string
  author_image?: string
  url?: string
  target?: string
}

/** 博客分类（由 app 从数据库注入） */
export interface BlogCategory {
  id?: string
  slug?: string
  title?: string
  url?: string
}

/** 注入的 Link 组件，替代 next-intl Link（package 不依赖 Next） */
export type BlogLink = ComponentType<{
  href: string
  target?: string
  children: ReactNode
  className?: string
}>

export interface BlogProps {
  section: Section
  className?: string
  /** 业务数据：全部分类（含 "all"） */
  categories?: BlogCategory[]
  /** 业务数据：当前激活分类 */
  currentCategory?: BlogCategory
  /** 业务数据：文章列表 */
  posts?: BlogPost[]
  /** 可选注入：链接渲染。不提供时 fallback 到原生 <a> */
  LinkComponent?: BlogLink
  /** 可选注入：空态文案（app 翻译注入，package 不硬编码文案） */
  emptyText?: string
}
