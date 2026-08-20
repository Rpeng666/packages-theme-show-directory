'use client'

import * as React from 'react'
import type { CSSProperties } from 'react'
import type { FeaturesProps } from '@template/ui'
import { SmartIcon } from '../icons'
import { CardSurface, IconChip, SectionHeader, SectionShell } from './shell'

const ACCENT: Record<string, CSSProperties> = {
  brand: { background: 'var(--semi-color-primary-light-default)', color: 'var(--semi-color-primary)' },
  green: { background: 'rgba(var(--semi-green-0), 0.8)', color: 'rgba(var(--semi-green-6), 1)' },
  amber: { background: 'rgba(var(--semi-amber-0), 0.8)', color: 'rgba(var(--semi-amber-6), 1)' },
  blue: { background: 'rgba(var(--semi-blue-0), 0.8)', color: 'rgba(var(--semi-blue-6), 1)' },
  violet: { background: 'rgba(var(--semi-violet-0), 0.8)', color: 'rgba(var(--semi-violet-6), 1)' },
  teal: { background: 'rgba(var(--semi-teal-0), 0.8)', color: 'rgba(var(--semi-teal-6), 1)' },
}

const TONE_ORDER = ['brand', 'green', 'amber', 'blue', 'violet', 'teal'] as const

/**
 * Semi Features — responsive grid of hover-lift cards with an icon chip,
 * title and description. Icons use the SmartIcon vocabulary from section
 * data; accent tones rotate when the data doesn't specify one.
 */
export function Features({ section, className = '' }: FeaturesProps) {
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
        {section.items?.map((item, idx) => {
          const tone = (item.tone || TONE_ORDER[idx % TONE_ORDER.length]) as keyof typeof ACCENT
          const chip = ACCENT[tone] ?? ACCENT.brand
          return (
            <CardSurface key={idx} tone="interactive" style={{ padding: 24, height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                {item.icon ? (
                  <IconChip size={46} radius={12} style={chip}>
                    <SmartIcon name={item.icon as string} size={22} />
                  </IconChip>
                ) : null}
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 650, color: 'var(--semi-color-text-0)' }}>
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p
                      style={{
                        margin: '8px 0 0',
                        fontSize: 14,
                        lineHeight: 1.7,
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
      </div>
    </SectionShell>
  )
}
