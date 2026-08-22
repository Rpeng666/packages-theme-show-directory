'use client'

import * as React from 'react'
import type { ReactNode } from 'react'
import type { FeaturesFlowProps } from '@template/ui'
import { CheckCircle2 } from 'lucide-react'
import { SmartIcon } from '../icons'
import { SectionShell } from './shell'

const defaultImage = ({ src, alt, ...p }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} {...p} />
)

function MediaFrame({ src, alt, Img, ratio = '4 / 3' }: { src?: string; alt?: string; Img: any; ratio?: string }) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid var(--semi-color-border)',
        boxShadow: '0 30px 60px -30px rgba(0,0,0,0.5)',
        background: 'var(--semi-color-fill-0)',
        aspectRatio: ratio,
      }}
    >
      {src ? (
        <Img src={src} alt={alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--semi-color-text-3)',
            fontSize: 14,
          }}
        >
          Image
        </div>
      )}
    </div>
  )
}

/**
 * Semi FeaturesFlow — alternating image + copy row. `image_position` controls
 * whether the image sits left or right. Great for single "what is it" rows.
 */
export function FeaturesFlow({ section, className = '', ImageComponent }: FeaturesFlowProps) {
  const Img = ImageComponent ?? defaultImage
  const isImageRight = section.image_position === 'right'
  const copy = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {section.label ? (
        <span
          style={{
            display: 'inline-flex',
            width: 'max-content',
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--semi-color-primary)',
            background: 'var(--semi-color-primary-light-default)',
          }}
        >
          {section.label}
        </span>
      ) : null}
      <h2
        style={{
          margin: 0,
          fontSize: 'clamp(26px, 3.6vw, 36px)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          fontWeight: 700,
          color: 'var(--semi-color-text-0)',
          textWrap: 'balance',
        }}
      >
        {section.title}
      </h2>
      {section.description ? (
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: 'var(--semi-color-text-2)' }}>
          {section.description}
        </p>
      ) : null}
      {section.items?.length ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
          {section.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              {item.icon ? (
                <span
                  style={{
                    display: 'inline-flex',
                    width: 30,
                    height: 30,
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 9,
                    background: 'var(--semi-color-primary-light-default)',
                    color: 'var(--semi-color-primary)',
                    fontSize: 15,
                  }}
                >
                  <SmartIcon name={item.icon as string} size={16} />
                </span>
              ) : (
                <CheckCircle2 style={{ color: 'var(--semi-color-primary)', marginTop: 2, fontSize: 18 }} />
              )}
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--semi-color-text-0)' }}>{item.title}</div>
                {item.description ? (
                  <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--semi-color-text-2)' }}>{item.description}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )

  return (
    <SectionShell id={section.id} className={className} padding="md">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 56,
          alignItems: 'center',
        }}
      >
        {isImageRight ? (
          <>
            {copy}
            <MediaFrame src={section.image?.src} alt={section.image?.alt} Img={Img} />
          </>
        ) : (
          <>
            <MediaFrame src={section.image?.src} alt={section.image?.alt} Img={Img} />
            {copy}
          </>
        )}
      </div>
    </SectionShell>
  )
}
