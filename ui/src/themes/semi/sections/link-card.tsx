'use client'

import * as React from 'react'
import { ArrowRight } from 'lucide-react'
import type { LinkCardProps } from '@template/ui'

/**
 * Semi LinkCard — a responsive grid of calm link cards. Border lifts to the
 * brand red on hover with a slight rise; tags render as tiny mono chips.
 */
export function LinkCard({ items, columns = 3, className = '' }: LinkCardProps) {
  const cols = Math.min(Math.max(columns, 1), 3)

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: 16,
      }}
    >
      {items.map((item, idx) => {
        const inner = (
          <React.Fragment>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 650,
                  color: 'var(--semi-color-text-0)',
                }}
              >
                {item.title}
              </h3>
              <ArrowRight
                style={{
                  fontSize: 14,
                  color: 'var(--semi-color-text-3)',
                  flexShrink: 0,
                  marginTop: 3,
                }}
              />
            </div>

            {item.description ? (
              <p
                style={{
                  margin: '6px 0 0',
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: 'var(--semi-color-text-2)',
                }}
              >
                {item.description}
              </p>
            ) : null}

            {item.tags && item.tags.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginTop: 12,
                }}
              >
                {item.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    style={{
                      display: 'inline-flex',
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: 'var(--semi-color-fill-0)',
                      border: '1px solid var(--semi-color-border)',
                      fontSize: 11,
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      color: 'var(--semi-color-text-2)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </React.Fragment>
        )

        const cardStyle: React.CSSProperties = {
          display: 'block',
          borderRadius: 14,
          border: '1px solid var(--semi-color-border)',
          background: 'var(--semi-color-bg-1)',
          padding: '18px 20px',
          textDecoration: 'none',
          transition:
            'border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease',
        }

        if (item.href) {
          return (
            <a
              key={idx}
              href={item.href}
              style={cardStyle}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(var(--semi-red-5), 0.5)'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 12px 28px -18px rgba(var(--semi-red-5), 0.5)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--semi-color-border)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              {inner}
            </a>
          )
        }
        return (
          <div key={idx} style={cardStyle}>
            {inner}
          </div>
        )
      })}
    </div>
  )
}
