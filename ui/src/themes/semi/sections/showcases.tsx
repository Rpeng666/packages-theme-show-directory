'use client'

import * as React from 'react'
import { ArrowRight, Edit2 } from 'lucide-react'
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
 * Semi Showcases — template inspiration wall. Each card shows a real
 * thumbnail with a hover lift + image zoom + "Open in editor" action chip.
 * When `onOpen` is injected (business handoff), cards act as buttons that
 * preload the thumbnail into the workbench; otherwise they link out via the
 * injected LinkComponent.
 */
export function Showcases({
  section,
  className = '',
  LinkComponent,
  ImageComponent,
  onOpen,
}: ShowcasesProps) {
  const Link = LinkComponent ?? defaultLink
  const Img = ImageComponent ?? defaultImage
  const items = section.items ?? []

  const card = (item: any, idx: number) => {
    const overlay = (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 6,
          padding: 18,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0) 62%)',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700 }}>{item.title}</div>
        {item.description ? (
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.55,
              opacity: 0.85,
              maxWidth: 320,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </div>
        ) : null}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            alignSelf: 'flex-start',
            marginTop: 6,
            padding: '5px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            background: onOpen ? 'var(--app-brand-grad)' : 'rgba(255,255,255,0.16)',
            color: '#fff',
            backdropFilter: 'blur(4px)',
            boxShadow: onOpen ? '0 8px 20px -8px rgba(var(--semi-red-5), 0.8)' : 'none',
            transition: 'transform 0.2s ease',
          }}
          className="wb-showcase-chip"
        >
          {onOpen ? <Pencil2 style={{ fontSize: 13 }} /> : null}
          {item.cta || (onOpen ? 'Open in Editor' : 'View')}
          <ArrowRight style={{ fontSize: 13 }} />
        </span>
      </div>
    )

    const body = (
      <div
        style={{
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid var(--semi-color-border)',
          aspectRatio: '16 / 11',
          background: 'var(--semi-color-fill-0)',
          transition:
            'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease, border-color 0.28s ease',
        }}
        className="wb-showcase-card"
      >
        {item.image?.src ? (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <Img
              src={item.image.src}
              alt={item.image.alt || item.title || ''}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: 'cover',
                transform: 'scale(1.001)',
                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="wb-showcase-img"
            />
          </div>
        ) : null}
        {overlay}
      </div>
    )

    if (onOpen) {
      return (
        <button
          key={idx}
          type="button"
          onClick={() =>
            onOpen({
              title: item.title,
              url: item.url,
              target: item.target,
              imageSrc: item.image?.src,
            })
          }
          aria-label={item.title ? `Open ${item.title} in the editor` : 'Open in editor'}
          style={{
            padding: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            textAlign: 'left',
            borderRadius: 16,
          }}
        >
          {body}
        </button>
      )
    }

    return (
      <Link key={idx} href={item.url || ''} target={item.target}>
        {body}
      </Link>
    )
  }

  return (
    <SectionShell id={section.id} className={className} padding="md">
      <style>{`
        .wb-showcase-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 56px -24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);
          border-color: rgba(var(--semi-red-5), 0.35);
        }
        .wb-showcase-card:hover .wb-showcase-img {
          transform: scale(1.06);
        }
        .wb-showcase-card:hover .wb-showcase-chip {
          transform: translateY(-2px);
        }
      `}</style>
      <SectionHeader label={section.label} title={section.title} description={section.description} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {items.map((item, idx) => card(item, idx))}
      </div>
    </SectionShell>
  )
}
