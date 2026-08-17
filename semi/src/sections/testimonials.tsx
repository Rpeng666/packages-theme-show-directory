'use client'

import * as React from 'react'
import { Card, Avatar as SemiAvatar, Typography } from '@douyinfe/semi-ui'
import { IconStar } from '@douyinfe/semi-icons'
import type { TestimonialsProps } from '@template/ui'
import type { SectionItem } from '@template/ui'

const { Title, Paragraph } = Typography

/**
 * Semi Testimonials — responsive grid of Semi Cards with quote, avatar and
 * rating. ImageComponent is injected for lazy images (default LazyImage);
 * it falls back to a native <img>.
 */
export function Testimonials({ section, className = '', ImageComponent }: TestimonialsProps) {
  const Img = ImageComponent ?? defaultImage

  return (
    <section
      id={section.id}
      className={className}
      style={{ padding: '64px 0', background: 'var(--semi-color-bg-0)' }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
          <Title heading={2} style={{ marginBottom: 12 }}>
            {section.title}
          </Title>
          {section.description ? (
            <Paragraph type="tertiary" style={{ fontSize: 15, lineHeight: 1.7 }}>
              {section.description}
            </Paragraph>
          ) : null}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {section.items?.map((item: SectionItem, index: number) => {
            const avatarSrc = item.image?.src || item.avatar?.src
            return (
              <Card
                key={index}
                bodyStyle={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-between' }}
                style={{ height: '100%' }}
                shadows="hover"
              >
                <div>
                  {item.rating != null && Number(item.rating) > 0 ? (
                    <div style={{ display: 'inline-flex', gap: 2, marginBottom: 8, color: 'var(--semi-color-warning)' }} aria-label={`${item.rating} out of 5`}>
                      {Array.from({ length: Math.min(5, Math.round(Number(item.rating))) }, (_, i) => (
                        <IconStar key={i} size="small" />
                      ))}
                    </div>
                  ) : null}
                  <Paragraph type="tertiary" style={{ margin: 0, fontSize: 15, lineHeight: 1.7 }}>
                    {item.quote || item.description}
                  </Paragraph>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {avatarSrc ? (
                    <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                      <Img src={avatarSrc} alt={item.image?.alt || item.avatar?.alt || item.name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <SemiAvatar color="blue" size="small">
                      {(item.name || '?').charAt(0).toUpperCase()}
                    </SemiAvatar>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{item.name}</p>
                    {item.role || item.title ? (
                      <p style={{ margin: 0, fontSize: 12, color: 'var(--semi-color-text-2)' }}>
                        {item.role || item.title}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const defaultImage = (props: any) => (
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  <img {...props} />
)
