'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { TableProps } from '../../contracts/table'

/**
 * Default Table — a simple styled `<table>` over the columns/dataSource
 * contract. `render` wins over `dataIndex` per column.
 */
function Table({
  columns,
  dataSource = [],
  rowKey,
  loading,
  pagination: _pagination,
  size = 'default',
  className,
}: TableProps<any>) {
  const keyOf = (record: Record<string, unknown>, i: number): string => {
    if (typeof rowKey === 'function') return rowKey(record)
    if (rowKey) return String(record[rowKey] ?? i)
    return String(i)
  }
  return (
    <div className={cn('w-full overflow-auto', className)}>
      <table
        className={cn(
          'w-full caption-bottom text-sm',
          size === 'small' && 'text-xs'
        )}
      >
        <thead>
          <tr className="border-b bg-muted/50">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={cn(
                  'h-10 px-3 text-left align-middle font-medium text-muted-foreground',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right'
                )}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((record, i) => (
            <tr key={keyOf(record, i)} className="border-b last:border-0 hover:bg-muted/40">
              {columns.map((col) => {
                const value =
                  col.dataIndex != null
                    ? (record as Record<string, unknown>)[col.dataIndex]
                    : undefined
                return (
                  <td
                    key={col.key}
                    className={cn(
                      'p-3 align-middle',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right'
                    )}
                  >
                    {col.render ? col.render(value, record, i) : (value as React.ReactNode)}
                  </td>
                )
              })}
            </tr>
          ))}
          {dataSource.length === 0 && !loading && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-sm text-muted-foreground"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {loading && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Loading…
        </div>
      )}
    </div>
  )
}

export { Table }
