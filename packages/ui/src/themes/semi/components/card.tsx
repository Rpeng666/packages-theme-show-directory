'use client'

import * as React from 'react'
import type { CardProps } from '@template/ui'

/**
 * Semi Card — flat-slot card (title/description/icon/media/footer/badge)
 * rendered as a quiet bordered surface. `href` wraps in an <a>; `interactive`
 * lifts the border on hover.
 */
export function Card({
  title,
  description,
  icon,
  footer,
  media,
  badge,
  href,
  target,
  interactive,
  onClick,
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  const body = (
    <div
      {...(props as object)}
      onClick={onClick as never}
      style={{
        position: 'relative',
        borderRadius: 16,
        border: '1px solid var(--semi-color-border)',
        background: 'var(--semi-color-bg-1)',
        padding: padding === 'none' ? 0 : padding === 'sm' ? 12 : padding === 'lg' ? 28 : 20,
        transition: 'border-color 0.18s ease, transform 0.18s ease',
        cursor: interactive ? 'pointer' : undefined,
        ...(interactive ? { ['--card-hover' as string]: 'true' } : {}),
      }}
      className={className}
      onMouseEnter={interactive ? (e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(var(--semi-red-5), 0.5)') : undefined}
      onMouseLeave={interactive ? (e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--semi-color-border)') : undefined}
    >
      {media ? <div style={{ marginBottom: 16 }}>{media}</div> : null}

      {(title || description || icon || badge) ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          {icon ? <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span> : null}
          <div style={{ flex: 1, minWidth: 0 }}>
            {title ? (
              <div style={{ fontWeight: 650, fontSize: 15, color: 'var(--semi-color-text-0)' }}>{title}</div>
            ) : null}
            {description ? (
              <div style={{ color: 'var(--semi-color-text-2)', fontSize: 13, marginTop: 2 }}>
                {description}
              </div>
            ) : null}
          </div>
          {badge ? (
            <span
              style={{
                padding: '2px 10px',
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 650,
                background: 'rgba(var(--semi-red-5), 0.12)',
                color: 'var(--semi-color-primary)',
                border: '1px solid rgba(var(--semi-red-5), 0.25)',
              }}
            >
              {badge.label}
            </span>
          ) : null}
        </div>
      ) : null}

      {children}

      {footer ? (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--semi-color-border)' }}>
          {footer}
        </div>
      ) : null}
    </div>
  )

  if (href) {
    return (
      <a href={href} target={target} style={{ textDecoration: 'none', display: 'block' }}>
        {body}
      </a>
    )
  }
  return body
}
