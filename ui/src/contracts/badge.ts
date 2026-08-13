import type * as React from 'react'

/**
 * Badge contract — the semantic vocabulary both themes implement.
 * Mirrors the existing shadcn template words so ~10 call sites don't churn.
 */
export type BadgeVariant =
  | 'default' // 实底强调
  | 'secondary' // 弱实底
  | 'destructive' // 危险/错误
  | 'outline' // 描边
  | 'solid' // pixel：同 default 但允许 tone 指定强调色

export interface BadgeProps
  extends Omit<
    React.HTMLAttributes<HTMLSpanElement>,
    'color' | 'className'
  > {
  variant?: BadgeVariant
  /** 渲染为子元素根节点（Radix Slot 语义） */
  asChild?: boolean
  /** 强调色 tone（pixel 原生，配合 variant="solid" 用；default 忽略） */
  tone?: 'green' | 'cyan' | 'gold' | 'red' | 'purple' | 'pink' | 'neutral'
  /** 尺寸（pixel 原生；default 忽略） */
  size?: 'sm' | 'md' | 'lg'
  /** 前置图标（pixel 原生；default 忽略） */
  iconLeft?: React.ReactNode
  className?: string
  children?: React.ReactNode
}
