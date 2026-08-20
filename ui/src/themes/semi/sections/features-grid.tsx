'use client'

import * as React from 'react'
import type { CSSProperties } from 'react'
import type { FeaturesGridProps } from '@template/ui'
import { SmartIcon } from '../icons'
import { CardSurface, IconChip, SectionHeader, SectionShell } from './shell'

const defaultImage = ({ src, alt, ...p }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} {...p} />
)

/**
 * Semi FeaturesGrid — bento-style feature showcase. The first item renders as
 * a large media card (spanning two columns with an image), the rest as
 * compact cards. Best for 5–7 item feature sets.
 */
export function FeaturesGrid({ section, className = '', ImageComponent }: FeaturesGridProps & { ImageComponent?: any }) {
  const Img = ImageComponent ?? defaultImage
  const items = section.items ?? []

  return (
    <SectionShell id={section.id} className={className} padding="md" background="muted">
      <SectionHeader label={section.label} title={section.title} description={section.description} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          gap: 20,
        }}
      >
        {items.map((item, idx) => {
          const isHero = idx === 0
          const span = isHero ? 4 : 2
          const style: CSSProperties = isHero
            ? { gridColumn: 'span 4', minHeight: 320 }
            : { gridColumn: 'span 2' }

          return (
            <CardSurface
              key={idx}
              tone="interactive"
              style={{ ...style, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              {isHero && item.image?.src ? (
                <div
                  style={{
                    flex: 1,
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid var(--semi-color-border)',
                    minHeight: 180,
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

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {item.icon ? (
                  <IconChip size={42} radius={11} tone="brand">
                    <SmartIcon name={item.icon as string} size={20} />
                  </IconChip>
                ) : null}
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: 'var(--semi-color-text-0)' }}>
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p
                      style={{
                        margin: '6px 0 0',
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: 'var(--semi-color-text-2)',
                      }}
                    >
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </CardSurface>
          )
        })}

        {/* keep the grid balanced when the first card is wide */}
        {items.length > 0 && items.length % 2 === 0 ? (
          <div style={{ gridColumn: 'span 6', height: 0 }} aria-hidden />
        ) : null}
      </div>
    </SectionShell>
  )
}
