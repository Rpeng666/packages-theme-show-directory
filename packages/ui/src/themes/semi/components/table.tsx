'use client'

import * as React from 'react'
import type { TableProps } from '@template/ui'

export function Table<T = unknown>({ columns, dataSource = [], rowKey, loading, pagination, size = 'default', className = '' }: TableProps<T>) {
  const keyOf = (rec: T, i: number) => typeof rowKey === 'function' ? rowKey(rec) : rowKey ? String((rec as Record<string, unknown>)[rowKey]) : String(i)
  const pad = size === 'small' ? 8 : size === 'large' ? 16 : 12
  return (
    <div className={className} style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ padding: `${pad}px 14px`, textAlign: col.align ?? 'left', fontSize: 12.5, fontWeight: 650, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--semi-color-text-2)', borderBottom: '1px solid var(--semi-color-border)', whiteSpace: 'nowrap' }}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length} style={{ padding: 24, textAlign: 'center', color: 'var(--semi-color-text-3)' }}>Loading…</td></tr>
          ) : dataSource.map((rec, i) => (
            <tr key={keyOf(rec, i)} style={{ borderBottom: '1px solid var(--semi-color-border)' }}>
              {columns.map((col) => (
                <td key={col.key} style={{ padding: `${pad}px 14px`, textAlign: col.align ?? 'left', color: 'var(--semi-color-text-1)', width: col.width }}>
                  {col.render ? col.render((rec as Record<string, unknown>)[col.dataIndex ?? ''], rec, i) : String((rec as Record<string, unknown>)[col.dataIndex ?? ''] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && dataSource.length > 10 ? <div style={{ padding: '12px 14px', fontSize: 13, color: 'var(--semi-color-text-3)' }}>{dataSource.length} rows</div> : null}
    </div>
  )
}
