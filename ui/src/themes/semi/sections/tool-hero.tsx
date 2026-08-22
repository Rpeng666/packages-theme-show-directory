'use client'

import * as React from 'react'
import type { CSSProperties } from 'react'
import { ArrowLeft } from 'lucide-react'
import type { ToolHeroProps, ToolHeroBadge, ToolHeroMeta } from '@template/ui'
import { SmartIcon } from '../icons'
import { SectionShell } from './shell'

const defaultLink = ({ href, target, children, ...p }: any) => (
  <a href={href} target={target} {...p} style={{ textDecoration: 'none' }}>
    {children}
  </a>
)

/**
 * Semi ToolHero — page-level hero for tool / feature pages (Resize, Compress,
 * Extract, Preview, Download…). Richer than the marketing Hero: it carries a
 * back link, a category eyebrow, Free/Pro badges and a row of "how it works"
 * meta chips. The headline supports a gradient highlight via
 * `highlight_text`, matching the landing hero vocabulary.
 */
export function ToolHero({ section, className = '', LinkComponent }: ToolHeroProps) {
  const Link = LinkComponent ?? defaultLink
  const title = section.title
  const highlight = section.highlight_text
  const badges: ToolHeroBadge[] = section.badges ?? []
  const meta: ToolHeroMeta[] = section.meta ?? []

  const titleNode =
    title && highlight ? (
      <>
        {title}
        {highlight ? (
          <>
            {' '}
            <span className="app-text-gradient">{highlight}</span>
          </>
        ) : null}
      </>
    ) : (
      title
    )

  return (
    <SectionShell id={section.id} className={className} padding="md" maxWidth={1080}>
      {/* ambient background */}
      <div className="app-grid-pattern" aria-hidden />
      <div className="app-hero-glow" style={{ top: -200, height: 420, opacity: 0.7 }} aria-hidden />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
        {section.back ? (
          <div style={{ marginBottom: 16 }}>
            <Link
              href={section.back.url || '/'}
              target="_self"
              className="semi-toolhero-back"
              aria-label={section.back.label}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--semi-color-text-2)',
                  transition: 'color 0.2s ease',
                }}
              >
                <ArrowLeft style={{ fontSize: 15 }} />
                {section.back.label}
              </span>
            </Link>
          </div>
        ) : null}

        {(section.eyebrow || section.label) ? (
          <div style={{ marginBottom: 14 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 14px',
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 650,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--semi-color-primary)',
                background: 'var(--semi-color-primary-light-default)',
                border: '1px solid var(--semi-color-border)',
              }}
            >
              {section.eyebrow || section.label}
            </span>
          </div>
        ) : null}

        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(28px, 4.5vw, 46px)',
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            fontWeight: 800,
            color: 'var(--semi-color-text-0)',
            textWrap: 'balance',
          }}
        >
          {titleNode}
        </h1>

        {section.description ? (
          <p
            style={{
              margin: '14px auto 0',
              maxWidth: 600,
              fontSize: 15.5,
              lineHeight: 1.65,
              color: 'var(--semi-color-text-2)',
              textWrap: 'pretty',
            }}
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        ) : null}

        {badges.length ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 18 }}>
            {badges.map((badge, idx) => (
              <BadgePill key={idx} badge={badge} />
            ))}
          </div>
        ) : null}

        {meta.length ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
              marginTop: 14,
            }}
          >
            {meta.map((m, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '6px 12px',
                  borderRadius: 999,
                  fontSize: 12.5,
                  fontWeight: 550,
                  color: 'var(--semi-color-text-1)',
                  background: 'var(--semi-color-bg-1)',
                  border: '1px solid var(--semi-color-border)',
                }}
              >
                {m.icon ? <SmartIcon name={m.icon} size={14} /> : null}
                {m.text}
              </span>
            ))}
          </div>
        ) : null}

        {section.tip ? (
          <p style={{ margin: '14px 0 0', fontSize: 12.5, color: 'var(--semi-color-text-3)' }}>{section.tip}</p>
        ) : null}
      </div>
    </SectionShell>
  )
}

function BadgePill({ badge }: { badge: ToolHeroBadge }) {
  const tone = badge.tone ?? 'neutral'
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 12px',
    borderRadius: 999,
    fontSize: 12.5,
    fontWeight: 650,
  }
  if (tone === 'free') {
    base.background = 'rgba(var(--semi-green-0), 0.85)'
    base.color = 'rgba(var(--semi-green-6), 1)'
    base.border = '1px solid rgba(var(--semi-green-4), 0.35)'
  } else if (tone === 'pro') {
    base.background = 'var(--app-brand-grad)'
    base.color = '#fff'
    base.boxShadow = '0 8px 20px -8px rgba(var(--semi-red-5), 0.8)'
  } else {
    base.background = 'var(--semi-color-fill-0)'
    base.color = 'var(--semi-color-text-1)'
    base.border = '1px solid var(--semi-color-border)'
  }
  return <span style={base}>{badge.label}</span>
}
