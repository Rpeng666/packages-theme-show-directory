'use client'

import * as React from 'react'
import { useState } from 'react'
import { IconChevronDown } from '@douyinfe/semi-icons'
import type { FaqProps } from '@template/ui'
import { SectionHeader, SectionShell } from './shell'

/**
 * Semi Faq — single-open accordion of question/answer cards. Answers open
 * with a subtle reveal; tip renders as a footnote under the list.
 */
export function Faq({ section, className = '' }: FaqProps) {
  const items = section.items ?? []
  const [openIdx, setOpenIdx] = useState<number | null>(items.length ? 0 : null)

  return (
    <SectionShell id={section.id} className={className} padding="md" background="muted">
      <SectionHeader label={section.label} title={section.title} description={section.description} maxWidth={680} />

      <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, idx) => {
          const open = openIdx === idx
          return (
            <div
              key={idx}
              style={{
                borderRadius: 14,
                border: open ? '1px solid rgba(var(--semi-red-5), 0.4)' : '1px solid var(--semi-color-border)',
                background: 'var(--semi-color-bg-1)',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : idx)}
                aria-expanded={open}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: '18px 20px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: 'var(--semi-color-text-0)',
                }}
              >
                <span style={{ flex: 1 }}>{item.question || item.title}</span>
                <span
                  style={{
                    display: 'inline-flex',
                    width: 26,
                    height: 26,
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 999,
                    background: open ? 'var(--semi-color-primary-light-default)' : 'var(--semi-color-fill-0)',
                    color: open ? 'var(--semi-color-primary)' : 'var(--semi-color-text-2)',
                    transition: 'transform 0.2s ease',
                    transform: open ? 'rotate(180deg)' : 'none',
                  }}
                >
                  <IconChevronDown style={{ fontSize: 14 }} />
                </span>
              </button>
              {open ? (
                <div
                  style={{
                    padding: '0 20px 20px',
                    fontSize: 14.5,
                    lineHeight: 1.75,
                    color: 'var(--semi-color-text-2)',
                    animation: 'app-reveal 0.3s ease both',
                  }}
                >
                  {item.answer || item.description}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      {section.tip ? (
        <p
          style={{
            margin: '28px 0 0',
            textAlign: 'center',
            fontSize: 13.5,
            color: 'var(--semi-color-text-2)',
          }}
          dangerouslySetInnerHTML={{ __html: section.tip }}
        />
      ) : null}
    </SectionShell>
  )
}
