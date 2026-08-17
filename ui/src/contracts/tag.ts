import type { ReactNode } from 'react'

/**
 * Tag contract — a small label chip. `color` takes theme-native color words
 * (semi: green/blue/red/purple/... ; default ignores and derives from tone).
 * `closable` renders a close icon that calls `onClose`.
 */
export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** 主题色词（semi 映射到 Tag 颜色；default 用 badge 语义） */
  color?: string
  size?: 'small' | 'default' | 'large'
  /** 可关闭 */
  closable?: boolean
  onClose?: (e: React.MouseEvent) => void
  /** 填充样式（semi: solid/light/outline/ghost；default 忽略） */
  type?: 'solid' | 'light' | 'outline' | 'ghost'
  children?: ReactNode
}
