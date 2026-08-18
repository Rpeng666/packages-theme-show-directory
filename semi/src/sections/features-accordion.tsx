'use client'

import * as React from 'react'
import { useState } from 'react'
import { IconChevronDown } from '@douyinfe/semi-icons'
import type { FeaturesAccordionProps } from '@template/ui'
import { SmartIcon } from '../icons'
import { SectionHeader, SectionShell } from './shell'

/**
 * Semi FeaturesAccordion — interactive two-pane section: left is a list of
 * expandable items (single-open), right is a live preview of the active item
 * (image or icon panel). Semi chrome, controlled state.
 */
export function FeaturesAccordion({ section, className = '' }: FeaturesAccordionProps) {
  const items = section.items ?? []
  const [activeIdx, setActiveIdx] = useState(0)
  const active = items[activeIdx]

  return (
    <SectionShell id={section.id} className={className} padding="md" background="muted">
      <SectionHeader label={section.label} title={section.title} description={section.description} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 32,
          alignItems: 'center',
        }}
      >
        {/* Accordion list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {items.map((item, idx) => {
            const open = activeIdx === idx
            return (
              <div
                key={idx}
                style={{
                  borderRadius: 14,
                  border: open
                    ? '1px solid rgba(var(--semi-red-5), 0.45)'
                    : '1px solid var(--semi-color-border)',
                  background: open ? 'var(--semi-color-bg-1)' : 'var(--semi-color-bg-1)',
                  boxShadow: open ? '0 12px 30px -18px rgba(0,0,0,0.5)' : 'none',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  aria-expanded={open}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: '100%',
                    padding: '16px 18px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 15,
                    fontWeight: 600,
                    color: open ? 'var(--semi-color-primary)' : 'var(--semi-color-text-0)',
                    textAlign: 'left',
                  }}
                >
                  {item.icon ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        width: 30,
                        height: 30,
                        flexShrink: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 9,
                        background: open
                          ? 'var(--semi-color-primary-light-default)'
                          : 'var(--semi-color-fill-0)',
                        color: open ? 'var(--semi-color-primary)' : 'var(--semi-color-text-2)',
                      }}
                    >
                      <SmartIcon name={item.icon as string} size={15} />
                    </span>
                  ) : null}
                  <span style={{ flex: 1 }}>{item.title}</span>
                  <IconChevronDown
                    style={{
                      width: 16,
                      height: 16,
                      color: 'var(--semi-color-text-2)',
                      transform: open ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>
                {open ? (
                  <div
                    style={{
                      padding: '0 18px 18px 60px',
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: 'var(--semi-color-text-2)',
                      animation: 'app-reveal 0.35s ease both',
                    }}
                  >
                    {item.description}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {/* Preview */}
        <div
          style={{
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid var(--semi-color-border)',
            aspectRatio: '16 / 10',
            background: 'var(--semi-color-fill-0)',
            boxShadow: '0 30px 60px -30px rgba(0,0,0,0.5)',
          }}
        >
          {active?.image?.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={active.image.src}
              alt={active.image.alt || active.title || ''}
              loading="lazy"
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
                gap: 12,
                color: 'var(--semi-color-text-3)',
              }}
            >
              {active?.icon ? <SmartIcon name={active.icon as string} size={44} /> : null}
              <span style={{ fontSize: 14 }}>{active?.title}</span>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  )
}
