'use client'

import * as React from 'react'
import type { LogosProps } from '@template/ui'
import { SectionShell } from './shell'

const defaultImage = ({ src, alt, ...p }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} {...p} />
)

/**
 * Semi Logos — infinite marquee of "trusted by" marks. Items may carry an
 * image (logo) or just a title (text mark). The track duplicates once for a
 * seamless loop.
 */
export function Logos({ section, className = '', ImageComponent }: LogosProps & { ImageComponent?: any }) {
  const Img = ImageComponent ?? defaultImage
  const items = section.items ?? []
  if (!items.length) return null

  const track = [...items, ...items]

  return (
    <SectionShell id={section.id} className={className} padding="sm">
      {section.title ? (
        <p
          style={{
            margin: '0 0 28px',
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--semi-color-text-2)',
          }}
        >
          {section.title}
        </p>
      ) : null}
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}>
        <div className="app-marquee-track" style={{ gap: 56 }}>
          {track.map((item, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                height: 36,
                whiteSpace: 'nowrap',
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--semi-color-text-3)',
                filter: 'grayscale(1)',
                opacity: 0.85,
              }}
            >
              {item.image?.src ? (
                <Img
                  src={item.image.src}
                  alt={item.image.alt || item.title || ''}
                  style={{ height: 26, width: 'auto', display: 'block' }}
                />
              ) : null}
              {item.title || item.text}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
