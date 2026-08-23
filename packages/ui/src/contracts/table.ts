import type { ReactNode } from 'react'

/**
 * Table contract — a columns/dataSource data table. semi → Semi Table,
 * default → a simple styled `<table>`. `render` in a column wins over
 * `dataIndex`.
 */
export interface TableColumn<T = unknown> {
  key: string
  title: ReactNode
  dataIndex?: string
  render?: (value: unknown, record: T, index: number) => ReactNode
  width?: number | string
  align?: 'left' | 'center' | 'right'
}

export interface TableProps<T = unknown> {
  columns: TableColumn<T>[]
  dataSource?: T[]
  /** 行 key：字段名或函数 */
  rowKey?: string | ((record: T) => string)
  loading?: boolean
  /** 是否显示分页（默认关闭） */
  pagination?: boolean
  size?: 'small' | 'default' | 'middle' | 'large'
  className?: string
}
