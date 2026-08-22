import type { ReactNode } from 'react'

/**
 * Descriptions contract — a label/content key-value list. semi → Semi
 * Descriptions, default → a definition-list grid.
 */
export interface DescriptionsItem {
  key?: string
  label: ReactNode
  content: ReactNode
  span?: number
}

export interface DescriptionsProps {
  items: DescriptionsItem[]
  /** 每行列数（默认 1） */
  column?: number
  size?: 'small' | 'medium' | 'large'
  className?: string
}
