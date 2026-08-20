'use client'

import * as React from 'react'
import { Table as SemiTable } from '@douyinfe/semi-ui'
import type { TableProps } from '@template/ui'

/**
 * Semi Table — maps the columns/dataSource TableProps onto Semi Table. The
 * contract's column shape (title/dataIndex/render/width/align) is Semi's own,
 * so it passes through directly. `large` collapses to Semi's `default`.
 */
export function Table({
  columns,
  dataSource = [],
  rowKey,
  loading,
  pagination = false,
  size = 'default',
  className = '',
}: TableProps<any>) {
  return (
    <SemiTable
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      loading={loading}
      pagination={pagination ? { pageSize: 10 } : false}
      size={size === 'large' ? 'default' : size}
      className={className}
    />
  )
}
