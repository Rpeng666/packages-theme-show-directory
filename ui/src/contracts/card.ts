import type * as React from 'react'

/**
 * Card contract — flat props shaped after pxlkit's PixelCard.
 *
 * The default (shadcn) implementation additionally keeps the 7 composite
 * sub-components (CardHeader/CardTitle/CardDescription/CardContent/
 * CardFooter/CardAction) exported, so the ~17 call sites that compose a card
 * from sub-components keep working unchanged. Those sub-components are
 * layout primitives with a weak theme identity, so they always come from the
 * default theme; only the flat `<Card>` root resolves through the registry.
 */

export interface CardBadge {
  label: string
  tone?: 'green' | 'cyan' | 'gold' | 'red' | 'purple' | 'pink' | 'neutral'
}

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'color' | 'className'> {
  /** 卡片标题（扁平槽位） */
  title?: React.ReactNode
  /** 卡片描述（扁平槽位） */
  description?: React.ReactNode
  /** 头部图标 */
  icon?: React.ReactNode
  /** 底部槽位 */
  footer?: React.ReactNode
  /** 顶部媒体槽位 */
  media?: React.ReactNode
  /** 角标 */
  badge?: CardBadge
  /** 渲染为 `<a href>` 链接卡片 */
  href?: string
  target?: string
  /** hover 抬升 + 键盘可交互 */
  interactive?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  /** 兼容：组合式子组件（CardHeader 等）也渲染进 body */
  children?: React.ReactNode
}
