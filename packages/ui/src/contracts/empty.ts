import type { ReactNode } from 'react'

/**
 * Empty contract — a centered empty-state placeholder (icon/image + copy).
 * Children are rendered below the description (e.g. a CTA button).
 */
export interface EmptyProps {
  description?: ReactNode
  /** 占位图标/插画（semi 提供默认；default 用 emoji/svg） */
  image?: ReactNode
  children?: ReactNode
  className?: string
}
