'use client'

import * as React from 'react'
import type { RelatedLinksProps } from '@template/ui'

/**
 * Semi RelatedLinks — quiet pill links for internal linking on content pages.
 */
export function RelatedLinks({ title, links, className = '' }: RelatedLinksProps) {
  if (links.length === 0) return null
  return (
    <section className={className}>
      {title ? (
        <h2
          style={{
            margin: '0 0 14px',
            fontSize: 12.5,
            fontWeight: 650,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--semi-color-text-2)',
          }}
        >
          {title}
        </h2>
      ) : null}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid var(--semi-color-border)',
              background: 'var(--semi-color-bg-1)',
              fontSize: 13.5,
              fontWeight: 550,
              color: 'var(--semi-color-text-1)',
              textDecoration: 'none',
              transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement
              el.style.borderColor = 'rgba(var(--semi-red-5), 0.45)'
              el.style.color = 'var(--semi-color-primary)'
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement
              el.style.borderColor = 'var(--semi-color-border)'
              el.style.color = 'var(--semi-color-text-1)'
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
