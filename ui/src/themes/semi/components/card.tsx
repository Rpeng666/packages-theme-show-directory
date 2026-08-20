'use client'

import * as React from 'react'
import { Card as SemiCard, Tag } from '@douyinfe/semi-ui'
import type { CardProps } from '@template/ui'

/** Semi Tag color vocabulary — maps the shared tone words onto TagColor. */
const TONE_TAG: Record<string, 'green' | 'cyan' | 'amber' | 'red' | 'violet' | 'pink' | 'grey' | 'blue'> = {
  green: 'green',
  cyan: 'cyan',
  gold: 'amber',
  red: 'red',
  purple: 'violet',
  pink: 'pink',
  neutral: 'grey',
  blue: 'blue',
}

/**
 * Semi Card — uses Semi's composable Card via `bodyStyle` slots. `title`/
 * `description`/`icon`/`footer` flat slots map onto header/body/footer; a
 * `href` renders the whole card wrapped in an <a>.
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
  className = '',
  children,
  ...props
}: CardProps) {
  const body = (
    <>
      {(title || description || icon || badge) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
          <div style={{ flex: 1 }}>
            {title && <div style={{ fontWeight: 600, fontSize: 15 }}>{title}</div>}
            {description && (
              <div style={{ color: 'var(--semi-color-text-2)', fontSize: 13, marginTop: 2 }}>
                {description}
              </div>
            )}
          </div>
          {badge && (
            <Tag color={TONE_TAG[badge.tone ?? 'blue'] ?? 'blue'} size="small">
              {badge.label}
            </Tag>
          )}
        </div>
      )}
      {children}
      {media}
    </>
  )

  return (
    <div
      onClick={onClick}
      style={{ height: '100%', cursor: interactive ? 'pointer' : undefined }}
    >
      <SemiCard
        title={undefined}
        className={className}
        style={{ height: '100%', boxShadow: interactive ? 'var(--semi-shadow-elevated)' : undefined }}
        {...(href
          ? {
              // Semi Card has no link; wrap content in an <a> via body slot
              'data-href': href,
            }
          : {})}
      >
        {href ? (
          <a href={href} target={target} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
            {body}
          </a>
        ) : (
          body
        )}
        {footer}
      </SemiCard>
    </div>
  )
}