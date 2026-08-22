'use client'

import * as React from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { FeaturesCompareProps } from '@template/ui'
import { SmartIcon } from '../icons'
import { SectionHeader, SectionShell } from './shell'

/**
 * Semi FeaturesCompare — before/after comparison. Expects section.items in
 * pairs: { title, description, icon, image } — the first half is "before"
 * (muted/dimmed) and the second half is "after" (brand highlight).
 * Falls back to a plain two-column feature list when there is no pair layout.
 */
export function FeaturesCompare({ section, className = '' }: FeaturesCompareProps) {
  const items = section.items ?? []
  const half = Math.ceil(items.length / 2)
  const before = items.slice(0, half)
  const after = items.slice(half)

  const renderColumn = (col: typeof before, tone: 'before' | 'after', colTitle?: string) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: 24,
        borderRadius: 18,
        border: '1px solid var(--semi-color-border)',
        background: tone === 'before' ? 'var(--semi-color-fill-0)' : 'var(--semi-color-bg-1)',
        ...(tone === 'after'
          ? { borderColor: 'rgba(var(--semi-red-5), 0.45)', boxShadow: '0 18px 40px -24px rgba(var(--semi-red-5), 0.5)' }
          : {}),
      }}
    >
      {colTitle ? (
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: tone === 'before' ? 'var(--semi-color-text-2)' : 'var(--semi-color-primary)' }}>
          {colTitle}
        </div>
      ) : null}
      {col.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          {tone === 'before' ? (
            <XCircle style={{ color: 'var(--semi-color-text-3)', flexShrink: 0, marginTop: 3, fontSize: 18 }} />
          ) : (
            <CheckCircle2 style={{ color: 'var(--semi-color-primary)', flexShrink: 0, marginTop: 3, fontSize: 18 }} />
          )}
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: tone === 'before' ? 'var(--semi-color-text-1)' : 'var(--semi-color-text-0)' }}>
              {item.title}
            </div>
            {item.description ? (
              <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--semi-color-text-2)', marginTop: 2 }}>
                {item.description}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <SectionShell id={section.id} className={className} padding="md">
      <SectionHeader label={section.label} title={section.title} description={section.description} />

      {before.length && after.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
          {renderColumn(before, 'before', section.extra?.before_label || 'Before')}
          {renderColumn(after, 'after', section.extra?.after_label || 'After')}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: 20,
                borderRadius: 16,
                border: '1px solid var(--semi-color-border)',
                background: 'var(--semi-color-bg-1)',
              }}
            >
              {item.icon ? <SmartIcon name={item.icon as string} size={18} /> : <CheckCircle2 style={{ color: 'var(--semi-color-primary)', fontSize: 18 }} />}
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--semi-color-text-0)' }}>{item.title}</div>
                {item.description ? (
                  <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--semi-color-text-2)', marginTop: 2 }}>
                    {item.description}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  )
}
