'use client'

import * as React from 'react'
import type { ListProps } from '@template/ui'

/** Semi List — a quiet list of renderItem results. */
export function List<T = unknown>({
  dataSource = [],
  renderItem,
  header,
  footer,
  size = 'default',
  className = '',
}: ListProps<T>) {
  return (
    <div className={className} style={{ width: '100%' }}>
      {header ? (
        <div style={{ padding: '10px 4px', fontSize: 14, fontWeight: 600, color: 'var(--semi-color-text-1)' }}>{header}</div>
      ) : null}
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {dataSource.map((item, index) => (
          <li
            key={index}
            style={{
              padding: size === 'small' ? '8px 4px' : '12px 4px',
              borderBottom: index < dataSource.length - 1 ? '1px solid var(--semi-color-border)' : 'none',
            }}
          >
            {renderItem ? renderItem(item, index) : String(item)}
          </li>
        ))}
      </ul>
      {footer ? (
        <div style={{ padding: '10px 4px', fontSize: 13, color: 'var(--semi-color-text-3)' }}>{footer}</div>
      ) : null}
    </div>
  )
}
