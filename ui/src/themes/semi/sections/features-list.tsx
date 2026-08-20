'use client'

import * as React from 'react'
import type { ReactNode } from 'react'
import type { FeaturesListProps } from '@template/ui'
import { IconArrowRight } from '@douyinfe/semi-icons'
import { SmartIcon } from '../icons'
import { CardSurface, SectionHeader, SectionShell } from './shell'

const defaultImage = ({ src, alt, ...p }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} {...p} />
)

const defaultLink = ({ href, target, children, ...p }: any) => (
  <a href={href} target={target} {...p} style={{ textDecoration: 'none' }}>
    {children}
  </a>
)

/**
 * Semi FeaturesList — card-based feature list. When items carry an image the
 * card renders a media frame; otherwise it's a compact icon + copy card.
 * Supports an optional section-level image + CTA link (FeaturesListProps).
 */
export function FeaturesList({ section, className = '', ImageComponent, LinkComponent }: FeaturesListProps) {
  const Img = ImageComponent ?? defaultImage
  const Link = LinkComponent ?? defaultLink

  return (
    <SectionShell id={section.id} className={className} padding="md" background="muted">
      <SectionHeader label={section.label} title={section.title} description={section.description} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {section.items?.map((item, idx) => {
          const inner: ReactNode = (
            <>
              {item.image?.src ? (
                <div
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid var(--semi-color-border)',
                    marginBottom: 16,
                    aspectRatio: '16 / 10',
                    background: 'var(--semi-color-fill-0)',
                  }}
                >
                  <Img
                    src={item.image.src}
                    alt={item.image.alt || item.title || ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ) : null}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                {item.icon ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      width: 38,
                      height: 38,
                      flexShrink: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      background: 'var(--semi-color-primary-light-default)',
                      color: 'var(--semi-color-primary)',
                    }}
                  >
                    <SmartIcon name={item.icon as string} size={18} />
                  </span>
                ) : null}
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 650, color: 'var(--semi-color-text-0)' }}>
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.65, color: 'var(--semi-color-text-2)' }}>
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </>
          )

          return (
            <CardSurface key={idx} tone="interactive" style={{ padding: 24, height: '100%' }}>
              {inner}
            </CardSurface>
          )
        })}
      </div>

      {section.buttons?.length ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 40 }}>
          {section.buttons.map((btn, idx) => (
            <Link key={idx} href={btn.url || ''} target={btn.target}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 42,
                  padding: '0 20px',
                  borderRadius: 11,
                  fontSize: 14,
                  fontWeight: 600,
                  background: 'var(--app-brand-grad)',
                  color: '#fff',
                  boxShadow: '0 10px 24px -10px rgba(var(--semi-red-5), 0.6)',
                }}
              >
                {btn.icon ? <SmartIcon name={btn.icon as string} size={16} /> : null}
                {btn.title}
                <IconArrowRight style={{ fontSize: 15 }} />
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </SectionShell>
  )
}
