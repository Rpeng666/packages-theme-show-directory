'use client'

import * as React from 'react'
import type { CSSProperties } from 'react'
import { IconArrowRight } from '@douyinfe/semi-icons'
import type { ToolsGridProps } from '@template/ui'
import { SmartIcon } from '../icons'
import { CardSurface, IconChip, SectionHeader, SectionShell } from './shell'

const defaultLink = ({ href, target, children, ...p }: any) => (
  <a href={href} target={target} {...p} style={{ textDecoration: 'none' }}>
    {children}
  </a>
)

const TONES: CSSProperties[] = [
  { background: 'rgba(var(--semi-red-0), 0.8)', color: 'rgba(var(--semi-red-5), 1)' },
  { background: 'rgba(var(--semi-amber-0), 0.8)', color: 'rgba(var(--semi-amber-6), 1)' },
  { background: 'rgba(var(--semi-green-0), 0.8)', color: 'rgba(var(--semi-green-6), 1)' },
  { background: 'rgba(var(--semi-blue-0), 0.8)', color: 'rgba(var(--semi-blue-6), 1)' },
  { background: 'rgba(var(--semi-violet-0), 0.8)', color: 'rgba(var(--semi-violet-6), 1)' },
  { background: 'rgba(var(--semi-teal-0), 0.8)', color: 'rgba(var(--semi-teal-6), 1)' },
]

/**
 * Semi ToolsGrid — clickable tool cards (Resize / Compress / Extract / …).
 * Each card shows an icon chip, title, description and a "Free/Pro" tag plus
 * arrow affordance. Whole card links through the injected LinkComponent.
 */
export function ToolsGrid({ section, className = '', LinkComponent }: ToolsGridProps) {
  const Link = LinkComponent ?? defaultLink
  const items = section.items ?? []

  return (
    <SectionShell id={section.id} className={className} padding="md">
      <SectionHeader label={section.label} title={section.title} description={section.description} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {items.map((item, idx) => {
          const b = item.badge as unknown
          const isPro =
            (item as any).pro === true ||
            (typeof b === 'object' && b !== null && (b as any).tone === 'pro') ||
            b === 'pro'
          return (
            <Link key={idx} href={item.url || ''} target={item.target}>
              <CardSurface tone="interactive" style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  {item.icon ? (
                    <IconChip size={46} radius={12} style={TONES[idx % TONES.length]}>
                      <SmartIcon name={item.icon as string} size={22} />
                    </IconChip>
                  ) : null}
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      ...(isPro
                        ? { background: 'var(--app-brand-grad)', color: '#fff' }
                        : { background: 'rgba(var(--semi-green-0), 0.8)', color: 'rgba(var(--semi-green-6), 1)' }),
                    }}
                  >
                    {isPro ? 'PRO' : 'FREE'}
                  </span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: 'var(--semi-color-text-0)' }}>
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.65, color: 'var(--semi-color-text-2)' }}>
                      {item.description}
                    </p>
                  ) : null}
                </div>
                <span
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--semi-color-primary)',
                  }}
                >
                  {item.cta || 'Open tool'}
                  <IconArrowRight style={{ fontSize: 15 }} />
                </span>
              </CardSurface>
            </Link>
          )
        })}
      </div>
    </SectionShell>
  )
}
