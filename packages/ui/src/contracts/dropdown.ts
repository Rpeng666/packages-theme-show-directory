import type * as React from 'react'

/**
 * Dropdown contract — a trigger + menu with items, separators, and optional
 * subcontent. pixel → PixelDropdown (compositional), default → shadcn
 * DropdownMenu. The contract exposes a flat items[] shape for the sign-user
 * use case (avatar menu with links + actions).
 */
export interface DropdownItem {
  value: string
  /** 菜单项内容（文本/图标/自定义节点）—— separator 项不需要 */
  children?: React.ReactNode
  /** 点击回调（无 href 时） */
  onSelect?: () => void
  /** 渲染为链接（href + target） */
  href?: string
  target?: string
  /** 分隔线 */
  separator?: boolean
  disabled?: boolean
}

export interface DropdownProps {
  /** 触发器 */
  trigger: React.ReactNode
  /** 菜单项（含 separator 项） */
  items: DropdownItem[]
  /** 对齐方向 */
  align?: 'start' | 'center' | 'end'
  className?: string
}
