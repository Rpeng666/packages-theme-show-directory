'use client'

import * as React from 'react'
import type { FeaturesStepProps } from '@template/ui'
import { SmartIcon } from '../icons'
import { SectionHeader, SectionShell } from './shell'

/**
 * Semi FeaturesStep — "how it works" numbered steps with a connecting line.
 * Each step renders a number badge + icon + title + description.
 */
export function FeaturesStep({ section, className = '' }: FeaturesStepProps) {
  const items = section.items ?? []

  return (
    <SectionShell id={section.id} className={className} padding="md">
      <SectionHeader label={section.label} title={section.title} description={section.description} />

      <div style={{ position: 'relative' }}>
        {/* connecting line (desktop) */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 34,
            left: '10%',
            right: '10%',
            height: 2,
            background: 'linear-gradient(90deg, var(--semi-color-primary), rgba(var(--semi-red-5),0.15))',
            opacity: 0.35,
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`,
            gap: 20,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 14,
                padding: '0 8px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 68,
                  height: 68,
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--semi-color-bg-1)',
                  border: '1px solid var(--semi-color-border)',
                  boxShadow: '0 10px 24px -12px rgba(0,0,0,0.4)',
                  color: 'var(--semi-color-primary)',
                }}
              >
                {item.icon ? <SmartIcon name={item.icon as string} size={26} /> : <span style={{ fontSize: 22, fontWeight: 800 }}>{idx + 1}</span>}
                <span
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 26,
                    height: 26,
                    borderRadius: 999,
                    background: 'var(--app-brand-grad)',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 14px -4px rgba(var(--semi-red-5), 0.7)',
                  }}
                >
                  {idx + 1}
                </span>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 650, color: 'var(--semi-color-text-0)' }}>
                  {item.title}
                </h3>
                {item.description ? (
                  <p
                    style={{
                      margin: '6px 0 0',
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: 'var(--semi-color-text-2)',
                    }}
                  >
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
