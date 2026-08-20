'use client'

import * as React from 'react'
import type { CSSProperties, ReactNode } from 'react'

/* ------------------------------------------------------------------ */
/* SectionShell — consistent vertical rhythm + container for sections  */
/* ------------------------------------------------------------------ */

export interface SectionShellProps {
  /** DOM anchor id for the rendered <section> — required so anchor navigation / scroll-margin target the section (sections pass `section.id`) */
  id: string
  className?: string
  children: ReactNode
  /** Section vertical padding */
  padding?: 'sm' | 'md' | 'lg' | 'none'
  /** Surface treatment */
  background?: 'default' | 'muted' | 'primary-soft' | 'transparent'
  /** Max content width (px) */
  maxWidth?: number
  style?: CSSProperties
}

const PADDING: Record<NonNullable<SectionShellProps['padding']>, string> = {
  none: '0',
  sm: '48px 0',
  md: '80px 0',
  lg: '112px 0',
}

const BACKGROUND: Record<NonNullable<SectionShellProps['background']>, CSSProperties> = {
  default: {},
  muted: { background: 'var(--semi-color-fill-0)' },
  'primary-soft': { background: 'var(--semi-color-primary-light-default)' },
  transparent: { background: 'transparent' },
}

/**
 * Shared section scaffold for the Semi theme. Every marketing section renders
 * through this so the vertical rhythm, container width and background
 * vocabulary stay consistent across the whole site.
 */
export function SectionShell({
  id,
  className = '',
  children,
  padding = 'md',
  background = 'default',
  maxWidth = 1120,
  style,
  ...rest
}: SectionShellProps & Record<string, unknown>) {
  return (
    <section
      id={id}
      className={className}
      {...(rest as any)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: PADDING[padding],
        ...BACKGROUND[background],
        ...style,
      }}
    >
      <div
        style={{
          maxWidth,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* SectionEyebrow — small uppercase pill above section titles         */
/* ------------------------------------------------------------------ */

export function SectionEyebrow({
  children,
  tone = 'brand',
}: {
  children: ReactNode
  tone?: 'brand' | 'neutral'
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 14px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: tone === 'brand' ? 'var(--semi-color-primary)' : 'var(--semi-color-text-2)',
        background: tone === 'brand' ? 'var(--semi-color-primary-light-default)' : 'var(--semi-color-fill-0)',
        border: '1px solid var(--semi-color-border)',
      }}
    >
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* SectionHeader — eyebrow + display title + description              */
/* ------------------------------------------------------------------ */

export interface SectionHeaderProps {
  label?: ReactNode
  title?: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
  className?: string
  maxWidth?: number
  /** render title as h1 (for page-level hero-like headers) */
  as?: 'h1' | 'h2' | 'h3'
  titleStyle?: CSSProperties
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className = '',
  maxWidth = 720,
  as = 'h2',
  titleStyle,
}: SectionHeaderProps) {
  const centered = align === 'center'
  const Tag = as
  return (
    <div
      className={className}
      style={{
        maxWidth,
        margin: centered ? '0 auto' : undefined,
        textAlign: centered ? 'center' : 'left',
        marginBottom: 52,
      }}
    >
      {label ? (
        <div style={{ marginBottom: 16 }}>
          <SectionEyebrow>{label}</SectionEyebrow>
        </div>
      ) : null}
      {title ? (
        <Tag
          style={{
            margin: 0,
            fontSize: 'clamp(28px, 4.5vw, 42px)',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            fontWeight: 700,
            color: 'var(--semi-color-text-0)',
            textWrap: 'balance',
            ...titleStyle,
          }}
        >
          {title}
        </Tag>
      ) : null}
      {description ? (
        <p
          style={{
            margin: '16px 0 0',
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--semi-color-text-2)',
            textWrap: 'pretty',
          }}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* CardSurface — the shared card chrome (border, radius, hover lift)  */
/* ------------------------------------------------------------------ */

export interface CardSurfaceProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** visual emphasis */
  tone?: 'default' | 'featured' | 'interactive'
  onClick?: () => void
  href?: string
  target?: string
}

export function CardSurface({
  children,
  className = '',
  style,
  tone = 'default',
  onClick,
  href,
  target,
}: CardSurfaceProps) {
  const base: CSSProperties = {
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    background: 'var(--semi-color-bg-1)',
    border: '1px solid var(--semi-color-border)',
    borderRadius: 16,
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
    textDecoration: 'none',
    ...style,
  }

  if (tone === 'featured') {
    base.border = '1px solid var(--semi-color-primary)'
    base.boxShadow = '0 8px 30px -12px rgba(var(--semi-red-5), 0.45)'
  }

  const hover: CSSProperties =
    tone === 'interactive'
      ? {
          cursor: 'pointer',
          // hover handled via CSS class below (inline styles can't do :hover)
        }
      : {}

  const cls = ['semi-card-surface', tone === 'interactive' ? 'semi-card-surface--hover' : '', className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} target={target} className={cls} style={{ ...base, ...hover }} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <div className={cls} style={{ ...base, ...hover }} onClick={onClick}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* IconChip — rounded square icon container used across cards         */
/* ------------------------------------------------------------------ */

export function IconChip({
  children,
  size = 44,
  radius = 12,
  tone = 'brand',
  style,
}: {
  children: ReactNode
  size?: number
  radius?: number
  tone?: 'brand' | 'neutral' | 'gradient'
  style?: CSSProperties
}) {
  const bg: CSSProperties =
    tone === 'brand'
      ? { background: 'var(--semi-color-primary-light-default)', color: 'var(--semi-color-primary)' }
      : tone === 'gradient'
        ? {
            background: 'linear-gradient(135deg, rgba(var(--semi-red-4),1), rgba(var(--semi-red-6),1))',
            color: '#fff',
          }
        : { background: 'var(--semi-color-fill-0)', color: 'var(--semi-color-text-1)' }

  return (
    <span
      style={{
        display: 'inline-flex',
        width: size,
        height: size,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius,
        fontSize: size * 0.46,
        ...bg,
        ...style,
      }}
    >
      {children}
    </span>
  )
}
