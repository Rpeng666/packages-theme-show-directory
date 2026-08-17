'use client'

import * as React from 'react'
import { Typography } from '@douyinfe/semi-ui'
import { Button } from '../components/button'
import { SmartIcon } from '../icons'
import type { CtaLink, CtaProps } from '@template/ui'

const { Title } = Typography

/**
 * Semi CTA — full-width Semi-toned panel with title/description + buttons.
 * Link is injected (LinkComponent) so the package has no Next dependency; it
 * falls back to a native <a> when omitted.
 */
export function Cta({ section, className = '', LinkComponent }: CtaProps) {
  const Link = LinkComponent ?? defaultLink

  return (
    <section
      id={section.id}
      className={className}
      style={{ padding: '56px 0', background: 'var(--semi-color-bg-0)' }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            padding: '40px 48px',
            borderRadius: 20,
            background: 'var(--semi-color-primary-light-default)',
            border: '1px solid var(--semi-color-primary-light-hover)',
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <Title heading={3} style={{ margin: 0 }}>
              {section.title}
            </Title>
            {section.description ? (
              <div
                style={{ marginTop: 8, fontSize: 15, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            ) : null}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {section.buttons?.map((button, idx) => (
              <Button
                key={idx}
                size={button.size || 'default'}
                variant={button.variant || 'default'}
              >
                <Link href={button.url || ''} target={button.target || '_self'} className="semi-cta-link">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'inherit', textDecoration: 'none' }}>
                    {button.icon ? <SmartIcon name={button.icon as string} size={16} /> : null}
                    {button.title}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const defaultLink: CtaLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className} style={{ color: 'inherit', textDecoration: 'none' }}>
    {children}
  </a>
)
