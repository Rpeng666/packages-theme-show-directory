'use client'

import * as React from 'react'
import { Fragment } from 'react'
import type { ContentHeaderProps } from '@template/ui'

/**
 * Semi ContentHeader — breadcrumb + H1 + tagline + intro for content pages.
 * Restrained typographic hierarchy: breadcrumb muted, H1 bold tracking-tight,
 * intro muted and relaxed.
 */
export function ContentHeader({
  crumbs = [],
  title,
  tagline,
  intro,
  className = '',
}: ContentHeaderProps) {
  return (
    <header className={className}>
      {crumbs.length > 0 ? (
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 24,
            fontSize: 13.5,
            color: 'var(--semi-color-text-2)',
          }}
        >
          {crumbs.map((crumb, idx) => {
            const last = idx === crumbs.length - 1
            return (
              <Fragment key={idx}>
                {idx > 0 ? <span style={{ color: 'var(--semi-color-text-3)' }}>/</span> : null}
                {crumb.href && !last ? (
                  <a
                    href={crumb.href}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--semi-color-primary)')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'inherit')}
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span style={last ? { color: 'var(--semi-color-text-0)', fontWeight: 600 } : undefined}>
                    {crumb.label}
                  </span>
                )}
              </Fragment>
            )
          })}
        </nav>
      ) : null}

      <h1
        style={{
          margin: 0,
          fontSize: 'clamp(28px, 4.5vw, 40px)',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          fontWeight: 800,
          color: 'var(--semi-color-text-0)',
          textWrap: 'balance',
        }}
      >
        {title}
      </h1>

      {tagline ? (
        <p
          style={{
            margin: '10px 0 0',
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--semi-color-text-1)',
          }}
        >
          {tagline}
        </p>
      ) : null}

      {intro ? (
        <p
          style={{
            margin: '14px 0 0',
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--semi-color-text-2)',
          }}
        >
          {intro}
        </p>
      ) : null}
    </header>
  )
}
