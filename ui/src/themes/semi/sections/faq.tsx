'use client'

import * as React from 'react'
import type { FaqProps } from '@template/ui'
import { SectionHeader, SectionShell } from './shell'

/**
 * Semi Faq — calm, fully-expanded question/answer cards.
 *
 * Deliberately restrained: every Q&A is always visible (no accordion), each
 * card is a quiet bordered surface with a bold question over muted answer
 * text. All content stays in the DOM — great for SEO and for skimming.
 */
export function Faq({ section, className = '' }: FaqProps) {
  const items = section.items ?? []

  return (
    <SectionShell id={section.id} className={className} padding="md">
      <SectionHeader
        label={section.label}
        title={section.title}
        description={section.description}
        maxWidth={680}
      />

      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: 14,
              border: '1px solid var(--semi-color-border)',
              background: 'var(--semi-color-bg-1)',
              padding: '20px 22px',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.5,
                fontWeight: 650,
                color: 'var(--semi-color-text-0)',
              }}
            >
              {item.question || item.title}
            </h3>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: 14.5,
                lineHeight: 1.75,
                color: 'var(--semi-color-text-2)',
              }}
            >
              {item.answer || item.description}
            </p>
          </div>
        ))}

        {section.tip ? (
          <p
            style={{
              margin: '8px 0 0',
              textAlign: 'center',
              fontSize: 13,
              color: 'var(--semi-color-text-3)',
            }}
          >
            {section.tip}
          </p>
        ) : null}
      </div>
    </SectionShell>
  )
}
