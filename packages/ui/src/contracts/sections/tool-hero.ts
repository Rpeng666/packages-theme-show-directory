import type { ComponentType, ReactNode } from 'react'
import type { Section } from '../../types/landing'

/** 注入的 Link 组件，替代 next-intl Link（package 不依赖 Next） */
export type ToolHeroLink = ComponentType<{
  href: string
  target?: string
  children: ReactNode
  className?: string
}>

/** 工具页 hero 顶部徽章（Free / Pro / Neutral） */
export interface ToolHeroBadge {
  label?: string
  tone?: 'free' | 'pro' | 'neutral'
}

/** 工具页 hero 底部特性元信息 chip（icon + text） */
export interface ToolHeroMeta {
  icon?: string
  text?: string
}

/**
 * ToolHero — 工具/功能落地页的页级 hero。
 * 在 Hero 之上叠加工具语境：返回链接、分类 eyebrow、Free/Pro 徽章、特性 meta chips。
 */
export interface ToolHeroProps {
  section: Section & {
    highlight_text?: string
    eyebrow?: string
    back?: { label?: string; url?: string }
    badges?: ToolHeroBadge[]
    meta?: ToolHeroMeta[]
  }
  className?: string
  LinkComponent?: ToolHeroLink
}
