'use client'

import * as React from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { HeroProps } from '@template/ui'
import { SmartIcon } from '../icons'
import { SectionShell, SectionEyebrow } from './shell'

const defaultLink = ({ href, target, children, ...p }: any) => (
  <a href={href} target={target} {...p} style={{ textDecoration: 'none' }}>
    {children}
  </a>
)
const defaultImage = ({ src, alt, ...p }: any) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} {...p} />
)

function BrowserDot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: 999,
        background: color,
        display: 'inline-block',
      }}
    />
  )
}

/**
 * Product mockup — a browser window showing a thumbnail-editor UI. The
 * section image (or a generated placeholder) fills the 16:9 canvas, framed
 * by a left tool rail and a right settings panel so it reads as a real tool.
 */
function ProductMockup({ image, Img }: { image: HeroProps['section']['image']; Img: any }) {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid var(--semi-color-border)',
        background: 'var(--semi-color-bg-1)',
        boxShadow: '0 40px 80px -32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Browser top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          borderBottom: '1px solid var(--semi-color-border)',
          background: 'var(--semi-color-bg-2)',
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <BrowserDot color="#ff5f57" />
          <BrowserDot color="#febc2e" />
          <BrowserDot color="#28c840" />
        </div>
        <div
          style={{
            flex: 1,
            margin: '0 8px',
            padding: '3px 12px',
            borderRadius: 999,
            background: 'var(--semi-color-fill-0)',
            fontSize: 11,
            color: 'var(--semi-color-text-2)',
            textAlign: 'center',
          }}
        >
          thumbnailresizer.com/resize
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 10px',
            borderRadius: 999,
            background: 'var(--semi-color-primary-light-default)',
            color: 'var(--semi-color-primary)',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          <CheckCircle2 style={{ fontSize: 12 }} />
          Free
        </div>
      </div>

      {/* Tool body */}
      <div style={{ display: 'flex', minHeight: 300 }}>
        {/* Left rail */}
        <div
          style={{
            width: 56,
            flexShrink: 0,
            borderRight: '1px solid var(--semi-color-border)',
            background: 'var(--semi-color-bg-2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            padding: '14px 0',
          }}
        >
          {['IconCrop', 'IconImage', 'IconLayers', 'IconText', 'IconUpload'].map((name, i) => {
            const active = i === 0
            return (
              <span
                key={name}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  color: active ? 'var(--semi-color-primary)' : 'var(--semi-color-text-2)',
                  background: active ? 'var(--semi-color-primary-light-default)' : 'transparent',
                }}
              >
                <SmartIcon name={name} size={16} />
              </span>
            )
          })}
        </div>

        {/* Canvas */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            background: 'var(--semi-color-fill-0)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 460,
              aspectRatio: '16 / 9',
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--semi-color-border)',
              background: '#111',
              boxShadow: '0 18px 40px -18px rgba(0,0,0,0.6)',
            }}
          >
            {image?.src ? (
              <Img
                src={image.src}
                alt={image.alt || ''}
                width={image.width}
                height={image.height}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  background: 'linear-gradient(135deg, rgba(var(--semi-red-4),0.85), rgba(var(--semi-red-6),0.9))',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <SmartIcon name="IconPlay" size={28} />
                1280 × 720
              </div>
            )}
            {/* dimension badge */}
            <div
              style={{
                position: 'absolute',
                left: 10,
                bottom: 10,
                padding: '3px 10px',
                borderRadius: 999,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                fontSize: 11,
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
              }}
            >
              1280 × 720 · 16:9
            </div>
          </div>
        </div>

        {/* Right settings */}
        <div
          style={{
            width: 168,
            flexShrink: 0,
            borderLeft: '1px solid var(--semi-color-border)',
            background: 'var(--semi-color-bg-2)',
            padding: 14,
            display: 'none',
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--semi-color-text-2)', marginBottom: 10 }}>Settings</div>
          {['1280 × 720', '640 × 480', '480 × 360', '320 × 180'].map((s, i) => (
            <div
              key={s}
              style={{
                padding: '6px 10px',
                marginBottom: 6,
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                color: i === 0 ? 'var(--semi-color-primary)' : 'var(--semi-color-text-1)',
                background: i === 0 ? 'var(--semi-color-primary-light-default)' : 'var(--semi-color-fill-0)',
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Semi Hero — display-grade landing hero. Two-column: announcement + display
 * headline (highlight text in brand gradient) + CTA buttons + avatars, beside
 * a browser product mockup. Decorative glow + grid pattern behind.
 */
export function Hero({ section, className, LinkComponent, ImageComponent, ...rest }: HeroProps) {
  const highlight = section.highlight_text ?? ''
  const texts: string[] | null = highlight
    ? (section.title?.split(highlight, 2) ?? []).filter(Boolean)
    : null
  const Link = LinkComponent ?? defaultLink
  const Img = ImageComponent ?? defaultImage
  const buttons = section.buttons ?? []
  const announcement = (section as any).announcement

  return (
    <SectionShell
      id={section.id}
      className={className}
      padding="lg"
      style={{ overflow: 'hidden' }}
    >
      {/* decorative layers */}
      <div className="app-hero-glow" aria-hidden />
      <div className="app-grid-pattern" aria-hidden />

      <div
        className="semi-two-col-grid"
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
          {announcement?.text || section.label ? (
            <a
              href={announcement?.url || '#'}
              target={announcement?.target || '_self'}
              style={{ textDecoration: 'none' }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: 'var(--semi-color-primary-light-default)',
                  border: '1px solid var(--semi-color-primary-light-hover)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--semi-color-primary)',
                }}
              >
                {announcement?.text || section.label}
                {announcement?.text ? <ArrowRight style={{ fontSize: 14 }} /> : null}
              </span>
            </a>
          ) : null}

          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(38px, 6vw, 60px)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              fontWeight: 800,
              color: 'var(--semi-color-text-0)',
              textWrap: 'balance',
            }}
          >
            {texts ? (
              <>
                {texts[0]}
                <span className="app-text-gradient">{highlight}</span>
                {texts.length > 1 ? texts[1] : null}
              </>
            ) : (
              section.title
            )}
          </h1>

          {section.description ? (
            <span
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'var(--semi-color-text-2)',
                maxWidth: 520,
              }}
            >
              {String(section.description).split('<br/>').map((p, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {p}
                </span>
              ))}
            </span>
          ) : null}

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
            {buttons.map((btn, idx) => {
              const v = btn.variant as string
              const isPrimary = !v || v === 'default' || v === 'primary'
              return (
                <Link key={idx} href={btn.url || ''} target={btn.target}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      height: 46,
                      padding: '0 22px',
                      borderRadius: 12,
                      fontSize: 15,
                      fontWeight: 600,
                      textDecoration: 'none',
                      ...(isPrimary
                        ? {
                            background: 'var(--app-brand-grad)',
                            color: '#fff',
                            boxShadow: '0 12px 28px -10px rgba(var(--semi-red-5), 0.7)',
                          }
                        : {
                            background: 'var(--semi-color-bg-1)',
                            color: 'var(--semi-color-text-0)',
                            border: '1px solid var(--semi-color-border)',
                          }),
                    }}
                  >
                    {btn.icon ? <SmartIcon name={btn.icon as string} size={17} /> : null}
                    {btn.title}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Avatars + tip */}
          {(section.show_avatars || section.tip) ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
              {section.show_avatars ? (
                <div style={{ display: 'flex' }}>
                  {['#f93920', '#ff7a45', '#ffc53d', '#52c41a'].map((c, i) => (
                    <span
                      key={i}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 999,
                        background: c,
                        border: '2px solid var(--semi-color-bg-0)',
                        marginLeft: i === 0 ? 0 : -8,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#fff',
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                  ))}
                </div>
              ) : null}
              {section.tip ? (
                <span style={{ fontSize: 13, color: 'var(--semi-color-text-2)' }}>{section.tip}</span>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Product mockup */}
        <div style={{ position: 'relative' }}>
          <ProductMockup image={section.image} Img={Img} />
          {/* floating stat chip */}
          <div
            style={{
              position: 'absolute',
              right: -14,
              top: -18,
              padding: '10px 16px',
              borderRadius: 14,
              background: 'var(--semi-color-bg-1)',
              border: '1px solid var(--semi-color-border)',
              boxShadow: '0 18px 40px -16px rgba(0,0,0,0.5)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--semi-color-text-0)',
            }}
          >
            <span style={{ color: 'var(--semi-color-primary)' }}>1.2M+</span> thumbnails resized
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
