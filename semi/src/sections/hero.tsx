'use client'

import * as React from 'react'
import { Typography, Space, Image, Avatar as SemiAvatar } from '@douyinfe/semi-ui'
import { SmartIcon } from '../icons'
import type { HeroProps } from '@template/ui'

const { Title, Text } = Typography

const defaultLink = ({ href, target, children, ...p }: any) => (
  <a href={href} target={target} {...p}>{children}</a>
)
const defaultImage = ({ src, alt, ...p }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} {...p} />
)

/**
 * Semi Hero — product-first landing hero using Semi Card/Button/Typography.
 * The shared `highlight_text` split + CTA buttons + image slot render with Semi
 * components; `show_avatars` renders a Semi AvatarGroup.
 */
export function Hero({ section, className, LinkComponent, ImageComponent, ...rest }: HeroProps) {
  const highlight = section.highlight_text ?? ''
  const texts: string[] | null = highlight
    ? (section.title?.split(highlight, 2) ?? []).filter(Boolean)
    : null
  const Link = LinkComponent ?? defaultLink
  const Img = ImageComponent ?? defaultImage
  const buttons = section.buttons ?? []

  return (
    <section id={section.id} className={className} style={{ padding: '72px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 48, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            {section.label && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--semi-color-primary-light-default)', color: 'var(--semi-color-primary)', borderRadius: 999, padding: '4px 14px', fontSize: 13, fontWeight: 500 }}>
                {section.label}
              </div>
            )}
            <Title heading={2} style={{ margin: 0, fontSize: 44, lineHeight: 1.15, letterSpacing: -0.02 }}>
              {texts ? (
                <>
                  {texts[0]}
                  <Text style={{ color: 'var(--semi-color-primary)' }}>{highlight}</Text>
                  {texts.length > 1 ? texts[1] : null}
                </>
              ) : (
                section.title
              )}
            </Title>
            {section.description && (
              <Text type="tertiary" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 520 }} >
                {/* Semi Text renders raw strings; the copy may contain <br/> — split */}
                {String(section.description).split('<br/>').map((p, i) => (
                  <span key={i} style={{ display: 'block' }}>
                    {p}
                  </span>
                ))}
              </Text>
            )}
            {buttons.length > 0 && (
              <Space align="center" spacing={12}>
                {buttons.map((btn, idx) => (
                  <Link key={idx} href={btn.url || ''} target={btn.target}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      {btn.icon ? <SmartIcon name={btn.icon as string} size={16} /> : null}
                      {btn.title}
                    </span>
                  </Link>
                ))}
              </Space>
            )}
            {section.show_avatars && (
              <Space align="center" spacing={-6}>
                <SemiAvatar size="small" style={{ backgroundColor: '#7cc0fa' }}>A</SemiAvatar>
                <SemiAvatar size="small" style={{ backgroundColor: '#6cc6dd' }}>B</SemiAvatar>
                <SemiAvatar size="small" style={{ backgroundColor: '#aab2e0' }}>C</SemiAvatar>
              </Space>
            )}
          </div>

          <div>
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--semi-shadow-elevated)', border: '1px solid var(--semi-color-border)' }}>
              {section.image && (
                <Img
                  src={section.image.src}
                  alt={section.image.alt}
                  width={section.image.width}
                  height={section.image.height}
                  style={{ width: '100%', display: 'block' }}
                />
              )}
            </div>
          </div>
        </div>

        {section.tip && (
          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--semi-color-text-2)' }}>
            {section.tip}
          </div>
        )}
      </div>
    </section>
  )
}