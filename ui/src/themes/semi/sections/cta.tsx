'use client'

import * as React from 'react'
import { IconArrowRight } from '@douyinfe/semi-icons'
import type { CtaLink, CtaProps } from '@template/ui'
import { SmartIcon } from '../icons'
import { SectionShell } from './shell'

const defaultLink: CtaLink = ({ href, target, children, className }) => (
  <a href={href} target={target} className={className} style={{ color: 'inherit', textDecoration: 'none' }}>
    {children}
  </a>
)

/**
 * Semi CTA — full-width brand panel with spotlight glow, headline, and action
 * buttons. Uses the shared SectionShell so the vertical rhythm matches the
 * rest of the page. Link is injected (LinkComponent) so the package has no
 * Next dependency; it falls back to a native <a> when omitted.
 */
export function Cta({ section, className = '', LinkComponent }: CtaProps) {
  const Link = LinkComponent ?? defaultLink

  return (
    <SectionShell id={section.id} className={className} padding="md" maxWidth={1080}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 28,
          border: '1px solid rgba(var(--semi-red-5), 0.35)',
          background:
            'radial-gradient(120% 160% at 50% 0%, rgba(var(--semi-red-5), 0.16), transparent 55%), var(--semi-color-bg-1)',
          padding: '64px 32px',
          textAlign: 'center',
        }}
      >
        {/* decorative glow */}
        <div
          className="app-hero-glow"
          style={{ top: -160, height: 320, opacity: 0.9 }}
          aria-hidden
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          {section.label ? (
            <div style={{ marginBottom: 18 }}>
              <span
                style={{
                  display: 'inline-flex',
                  padding: '5px 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
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
                fontSize: 'clamp(30px, 5vw, 46px)',
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                fontWeight: 800,
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
                margin: '16px auto 0',
                maxWidth: 560,
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--semi-color-text-2)',
              }}
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          ) : null}

          {section.buttons?.length ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 32 }}>
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
                        height: 46,
                        padding: '0 24px',
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 650,
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        ...(primary
                          ? {
                              background: 'var(--app-brand-grad)',
                              color: '#fff',
                              boxShadow: '0 14px 30px -12px rgba(var(--semi-red-5), 0.7)',
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
                      <IconArrowRight style={{ fontSize: 15 }} />
                    </span>
                  </Link>
                )
              })}
            </div>
          ) : null}

          {section.tip ? (
            <p style={{ margin: '20px 0 0', fontSize: 13, color: 'var(--semi-color-text-3)' }}>{section.tip}</p>
          ) : null}
        </div>
      </div>
    </SectionShell>
  )
}
