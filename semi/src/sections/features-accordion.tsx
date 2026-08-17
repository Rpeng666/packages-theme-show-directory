'use client'

import * as React from 'react'
import { useState } from 'react'
import { Collapse, Typography } from '@douyinfe/semi-ui'
import { SmartIcon } from '../icons'
import type { FeaturesAccordionProps } from '@template/ui'

const { Title, Paragraph } = Typography

/**
 * Semi FeaturesAccordion — Semi Collapse list of feature items with a live
 * preview of the active item's image. Accordion (single-open) keeps the
 * pattern tight, matching the shared section's intent.
 */
export function FeaturesAccordion({ section, className = '' }: FeaturesAccordionProps) {
  const items = (section.items || []) as Array<{
    title?: string
    description?: string
    icon?: string
    image?: { src?: string; alt?: string }
  }>
  const [activeKey, setActiveKey] = useState('0')
  const activeIdx = Number(activeKey) || 0

  return (
    <section
      id={section.id}
      className={className}
      style={{ padding: '64px 0', background: 'var(--semi-color-bg-0)' }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
          <Title heading={2} style={{ marginBottom: 12 }}>
            {section.title}
          </Title>
          {section.description ? (
            <Paragraph type="tertiary" style={{ fontSize: 15, lineHeight: 1.7 }}>
              {section.description}
            </Paragraph>
          ) : null}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 40, alignItems: 'stretch' }}>
          <Collapse
            accordion
            activeKey={activeKey}
            onChange={(key) => setActiveKey(String(key))}
            style={{ background: 'transparent', borderRadius: 12, border: '1px solid var(--semi-color-border)', overflow: 'hidden' }}
          >
            {items.map((item, idx) => (
              <Collapse.Panel
                key={idx}
                itemKey={String(idx)}
                header={
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    {item.icon ? <SmartIcon name={item.icon} size={16} /> : null}
                    {item.title}
                  </span>
                }
              >
                <Paragraph type="tertiary" style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
                  {item.description}
                </Paragraph>
              </Collapse.Panel>
            ))}
          </Collapse>

          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <div
              style={{
                width: '100%',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid var(--semi-color-border)',
                background: 'var(--semi-color-fill-0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {items[activeIdx]?.image?.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={items[activeIdx].image.src}
                  alt={items[activeIdx].image.alt || items[activeIdx].title || ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              ) : items[activeIdx]?.icon ? (
                <SmartIcon name={items[activeIdx].icon} size={40} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
