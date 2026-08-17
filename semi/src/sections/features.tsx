'use client'

import * as React from 'react'
import { Card, Typography } from '@douyinfe/semi-ui'
import { SmartIcon } from '../icons'
import type { FeaturesProps } from '@template/ui'

const { Title, Paragraph } = Typography

/**
 * Semi Features — responsive feature grid of Semi Cards with an icon chip.
 * Shared `Section.items` carry icon *names*, rendered via the SmartIcon map.
 */
export function Features({ section, className = '' }: FeaturesProps) {
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {section.items?.map((item, idx) => (
            <Card
              key={idx}
              bodyStyle={{ padding: 24 }}
              style={{ height: '100%' }}
              shadows="hover"
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                {item.icon ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      background: 'var(--semi-color-primary-light-default)',
                      color: 'var(--semi-color-primary)',
                      flexShrink: 0,
                    }}
                  >
                    <SmartIcon name={item.icon as string} size={20} />
                  </span>
                ) : null}
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.title}</h3>
                  {item.description ? (
                    <Paragraph type="tertiary" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7 }}>
                      {item.description}
                    </Paragraph>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
