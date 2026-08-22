'use client'

import * as React from 'react'
import type { CtaLink, CtaProps } from '@template/ui'
import { SmartIcon } from '../icons'
import { SectionShell } from './shell'

const defaultLink: CtaLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className} style={{ color: 'inherit', textDecoration: 'none' }}>
    {children}
  </a>
)

/**
 * Semi CTA — a quiet brand-tinted panel: soft red wash, centred headline +
 * description, and restrained primary/outline buttons. Link is injected
 * (LinkComponent) so the package has no Next dependency; it falls back to a
 * native <a> when omitted.
 */
export function Cta({ section, className = '', LinkComponent }: CtaProps) {
  const Link = LinkComponent ?? defaultLink

  return (
    <SectionShell id={section.id} className={className} padding="md" maxWidth={1080}>
      <div
        style={{
          borderRadius: 24,
          border: '1px solid rgba(var(--semi-red-5), 0.28)',
          background: 'rgba(var(--semi-red-5), 0.055)',
          padding: '52px 32px',
          textAlign: 'center',
        }}
      >
        {section.label ? (
          <div style={{ marginBottom: 14 }}>
            <span
              style={{
                display: 'inline-flex',
                padding: '4px 12px',
                borderRadius: 999,
                fontSize: 11.5,
                fontWeight: 650,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--semi-color-primary)',
                background: 'var(--semi-color-primary-light-default)',
                border: '1px solid var(--semi-color-border)',
              }}
            >
              {section.label}
            </span>
          </div>
        ) : null}

        {section.title ? (
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(26px, 4vw, 38px)',
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              fontWeight: 750,
              color: 'var(--semi-color-text-0)',
              textWrap: 'balance',
            }}
          >
            {section.title}
          </h2>
        ) : null}

        {section.description ? (
          <p
            style={{
              margin: '14px auto 0',
              maxWidth: 520,
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--semi-color-text-2)',
            }}
            dangerouslySetInnerHTML={{ __html: section.description }}
          />
        ) : null}

        {section.buttons?.length ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 12,
              marginTop: 28,
            }}
          >
            {section.buttons.map((button, idx) => {
              const primary = button.variant !== 'outline' && button.variant !== 'ghost'
              return (
                <Link
                  key={idx}
                  href={button.url || ''}
                  target={button.target || '_self'}
                  className="semi-cta-link"
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      height: 44,
                      padding: '0 22px',
                      borderRadius: 12,
                      fontSize: 14.5,
                      fontWeight: 650,
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      ...(primary
                        ? {
                            background: 'var(--app-brand-grad)',
                            color: '#fff',
                            boxShadow: '0 10px 24px -12px rgba(var(--semi-red-5), 0.6)',
                          }
                        : {
                            background: 'var(--semi-color-bg-1)',
                            color: 'var(--semi-color-text-0)',
                            border: '1px solid var(--semi-color-border)',
                          }),
                    }}
                  >
                    {button.icon ? <SmartIcon name={button.icon as string} size={16} /> : null}
                    {button.title}
                  </span>
                </Link>
              )
            })}
          </div>
        ) : null}

        {section.tip ? (
          <p style={{ margin: '18px 0 0', fontSize: 13, color: 'var(--semi-color-text-3)' }}>{section.tip}</p>
        ) : null}
      </div>
    </SectionShell>
  )
}
