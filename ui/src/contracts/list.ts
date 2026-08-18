import type { ReactNode } from 'react'

/**
 * List contract — a data-driven list/grid. semi → Semi List (renderItem +
 * optional grid), default → plain ul/div. Generic over the item type.
 */
export interface ListGrid {
  column?: number
  gutter?: number
}

export interface ListProps<T = unknown> {
  dataSource?: T[]
  renderItem?: (item: T, index: number) => ReactNode
  header?: ReactNode
  footer?: ReactNode
  size?: 'small' | 'default' | 'large'
  layout?: 'vertical' | 'horizontal'
  grid?: ListGrid
  loading?: boolean
  emptyContent?: ReactNode
  className?: string
}
