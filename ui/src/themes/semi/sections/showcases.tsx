'use client'

import * as React from 'react'
import { IconArrowRight } from '@douyinfe/semi-icons'
import type { ShowcasesProps } from '@template/ui'
import { SectionHeader, SectionShell } from './shell'

const defaultLink = ({ href, target, children, ...p }: any) => (
  <a href={href} target={target} {...p} style={{ textDecoration: 'none' }}>
    {children}
  </a>
)
const defaultImage = ({ src, alt, fill, ...p }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    {...p}
    style={{
      ...(fill
        ? { position: 'absolute', inset: 0, width: '100%', height: '100%' }
        : {}),
      ...p.style,
    }}
    loading="lazy"
  />
)

/**
 * Semi Showcases — masonry-ish gallery of showcase cards. Each card shows an
 * image with a hover overlay (title + description + arrow) and links out via
 * the injected LinkComponent.
 */
export function Showcases({ section, className = '', LinkComponent, ImageComponent }: ShowcasesProps) {
  const Link = LinkComponent ?? defaultLink
  const Img = ImageComponent ?? defaultImage
  const items = section.items ?? []

  return (
    <SectionShell id={section.id} className={className} padding="md">
      <SectionHeader label={section.label} title={section.title} description={section.description} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {items.map((item, idx) => (
          <Link key={idx} href={item.url || ''} target={item.target}>
            <div
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--semi-color-border)',
                aspectRatio: '16 / 11',
                background: 'var(--semi-color-fill-0)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 22px 44px -22px rgba(0,0,0,0.55)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {item.image?.src ? (
                <Img
                  src={item.image.src}
                  alt={item.image.alt || item.title || ''}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : null}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: 6,
                  padding: 18,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0) 60%)',
                  color: '#fff',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700 }}>{item.title}</div>
                {item.description ? (
                  <div style={{ fontSize: 13, lineHeight: 1.55, opacity: 0.85, maxWidth: 320 }}>{item.description}</div>
                ) : null}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    marginTop: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  {item.cta || 'View'}
                  <IconArrowRight style={{ fontSize: 14 }} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionShell>
  )
}

