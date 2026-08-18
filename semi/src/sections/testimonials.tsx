'use client'

import * as React from 'react'
import type { TestimonialsProps } from '@template/ui'
import type { SectionItem } from '@template/ui'
import { IconStar } from '@douyinfe/semi-icons'
import { CardSurface, SectionHeader, SectionShell } from './shell'

const defaultImage = (props: any) => (
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  <img {...props} />
)

/**
 * Semi Testimonials — responsive quote cards with rating, avatar and name.
 * Cards keep equal height; the quote carries a decorative mark.
 */
export function Testimonials({ section, className = '', ImageComponent }: TestimonialsProps) {
  const Img = ImageComponent ?? defaultImage
  const items = section.items ?? []

  return (
    <SectionShell id={section.id} className={className} padding="md">
      <SectionHeader label={section.label} title={section.title} description={section.description} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {items.map((item: SectionItem, index: number) => {
          const avatarSrc = item.image?.src || (item as any).avatar?.src
          return (
            <CardSurface key={index} style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* quote mark */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: 44,
                    lineHeight: 1,
                    fontWeight: 800,
                    color: 'var(--semi-color-primary-light-default)',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  &ldquo;
                </span>
                {item.rating != null && Number(item.rating) > 0 ? (
                  <span style={{ display: 'inline-flex', gap: 2, color: 'rgba(var(--semi-amber-5), 1)' }} aria-label={`${item.rating} out of 5`}>
                    {Array.from({ length: Math.min(5, Math.round(Number(item.rating))) }, (_, i) => (
                      <IconStar key={i} size="small" />
                    ))}
                  </span>
                ) : null}
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: 'var(--semi-color-text-1)',
                  flex: 1,
                }}
              >
                {item.quote || item.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--semi-color-border)', paddingTop: 16 }}>
                {avatarSrc ? (
                  <span style={{ width: 40, height: 40, borderRadius: 999, overflow: 'hidden', flexShrink: 0, border: '2px solid var(--semi-color-border)' }}>
                    <Img src={avatarSrc} alt={item.image?.alt || item.name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </span>
                ) : (
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      flexShrink: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--app-brand-grad)',
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: 700,
                    }}
                  >
                    {(item.name || '?').charAt(0).toUpperCase()}
                  </span>
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 650, color: 'var(--semi-color-text-0)' }}>{item.name}</div>
                  {item.role || item.title ? (
                    <div style={{ fontSize: 12.5, color: 'var(--semi-color-text-2)' }}>{item.role || item.title}</div>
                  ) : null}
                </div>
              </div>
            </CardSurface>
          )
        })}
      </div>
    </SectionShell>
  )
}
