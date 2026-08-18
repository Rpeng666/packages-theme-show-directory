'use client'

import * as React from 'react'
import type { StatsProps } from '@template/ui'
import { SectionShell } from './shell'

/**
 * Semi Stats — bold stat band. Each item renders a large number (title) with
 * a label (description), separated by hairlines on desktop.
 */
export function Stats({ section, className = '' }: StatsProps) {
  const items = section.items ?? []

  return (
    <SectionShell id={section.id} className={className} padding="sm">
      <div
        style={{
          position: 'relative',
          borderRadius: 20,
          border: '1px solid var(--semi-color-border)',
          background: 'var(--semi-color-bg-1)',
          overflow: 'hidden',
          padding: '40px 32px',
        }}
      >
        <div className="app-hero-glow" style={{ top: -140, height: 300, opacity: 0.7 }} aria-hidden />
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`,
            gap: 24,
            zIndex: 1,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                textAlign: 'center',
                padding: '0 12px',
                borderLeft: idx === 0 ? 'none' : '1px solid var(--semi-color-border)',
              }}
            >
              <div
                className="app-text-gradient"
                style={{
                  fontSize: 'clamp(34px, 4.5vw, 48px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {item.title}
              </div>
              {item.description ? (
                <div style={{ marginTop: 8, fontSize: 14, color: 'var(--semi-color-text-2)' }}>
                  {item.description}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
