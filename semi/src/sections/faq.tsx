'use client'

import * as React from 'react'
import { Collapse, Typography } from '@douyinfe/semi-ui'
import type { FaqProps } from '@template/ui'

const { Title, Paragraph } = Typography

/**
 * Semi FAQ — single-open Collapse over the section's question/answer items,
 * with the section tip rendered as a footnote. Matches the default FAQ
 * semantics (single-open accordion) in Semi chrome.
 */
export function Faq({ section, className = '' }: FaqProps) {
  return (
    <section
      id={section.id}
      className={className}
      style={{ padding: '64px 0', background: 'var(--semi-color-bg-0)' }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title heading={2} style={{ marginBottom: 12 }}>
            {section.title}
          </Title>
          {section.description ? (
            <Paragraph type="tertiary" style={{ fontSize: 15, lineHeight: 1.7 }}>
              {section.description}
            </Paragraph>
          ) : null}
        </div>

        <Collapse
          accordion
          style={{
            borderRadius: 12,
            border: '1px solid var(--semi-color-border)',
            background: 'var(--semi-color-bg-1)',
            overflow: 'hidden',
          }}
        >
          {section.items?.map((item, idx) => (
            <Collapse.Panel
              key={idx}
              itemKey={String(idx)}
              header={item.question || item.title || ''}
            >
              <Paragraph type="tertiary" style={{ margin: 0, fontSize: 15, lineHeight: 1.7 }}>
                {item.answer || item.description || ''}
              </Paragraph>
            </Collapse.Panel>
          ))}
        </Collapse>

        {section.tip ? (
          <div
            style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--semi-color-text-2)' }}
            dangerouslySetInnerHTML={{ __html: section.tip }}
          />
        ) : null}
      </div>
    </section>
  )
}
