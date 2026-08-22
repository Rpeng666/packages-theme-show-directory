'use client'

import * as React from 'react'
import type { SizeTableProps } from '@template/ui'

/**
 * Semi SizeTable — a quiet, readable dimensions table. Mono numbers for the
 * exact sizes, muted ratio column, format names as links when href is present.
 */
export function SizeTable({ title, rows, className = '' }: SizeTableProps) {
  return (
    <div
      className={className}
      style={{
        borderRadius: 16,
        border: '1px solid var(--semi-color-border)',
        background: 'var(--semi-color-bg-1)',
        padding: '24px 26px',
      }}
    >
      {title ? (
        <h2
          style={{
            margin: '0 0 18px',
            fontSize: 19,
            fontWeight: 700,
            color: 'var(--semi-color-text-0)',
          }}
        >
          {title}
        </h2>
      ) : null}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th style={thStyle}>Format</th>
              <th style={thStyle}>Dimensions</th>
              <th style={{ ...thStyle, color: 'var(--semi-color-text-2)' }}>Ratio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{ borderTop: '1px solid var(--semi-color-border)' }}
              >
                <td style={tdStyle}>
                  {row.href ? (
                    <a
                      href={row.href}
                      style={{ color: 'var(--semi-color-text-0)', fontWeight: 600, textDecoration: 'none' }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--semi-color-primary)')}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--semi-color-text-0)')}
                    >
                      {row.name}
                    </a>
                  ) : (
                    <span style={{ fontWeight: 600, color: 'var(--semi-color-text-0)' }}>{row.name}</span>
                  )}
                </td>
                <td style={{ ...tdStyle, fontVariantNumeric: 'tabular-nums', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                  {row.width} × {row.height}
                </td>
                <td style={{ ...tdStyle, color: 'var(--semi-color-text-2)', fontVariantNumeric: 'tabular-nums' }}>
                  {row.ratio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: 12.5,
  fontWeight: 650,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--semi-color-text-2)',
}

const tdStyle: React.CSSProperties = {
  padding: '12px',
}
