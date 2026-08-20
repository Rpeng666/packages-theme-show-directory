'use client'

import * as React from 'react'
import { Divider } from '@douyinfe/semi-ui'
import type { FooterProps } from '@template/ui'
import type { NavItem } from '@template/ui'

/**
 * Semi Footer — data-driven columns / copyright / social / agreement using
 * Semi chrome. Business slots are injected: `brandSlot` (brand logo),
 * `badgesSlot` (external-link badge bar from the database), `localeThemeSlot`
 * (locale + theme togglers). LinkComponent is injected so the package has no
 * Next dependency; it falls back to a native <a>.
 */
export function Footer({
  footer,
  brandSlot,
  badgesSlot,
  localeThemeSlot,
  LinkComponent,
  className = '',
}: FooterProps) {
  const navColumns = footer.nav?.items ?? []
  const Link = LinkComponent ?? defaultLink

  return (
    <footer
      id={footer.id}
      className={`${footer.className || ''} ${className}`}
      style={{
        borderTop: '1px solid var(--semi-color-border)',
        padding: '40px 0',
        overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr',
            gap: 48,
            marginBottom: 32,
          }}
        >
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {brandSlot}
            {footer.brand?.description ? (
              <p
                style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--semi-color-text-2)' }}
                dangerouslySetInnerHTML={{ __html: footer.brand.description }}
              />
            ) : null}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 16,
            }}
          >
            {navColumns.map((item, idx) => (
              <div key={idx} style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
                {item.url ? (
                  <Link href={item.url || ''} target={item.target || ''} className="semi-footer-col-title">
                    <span style={{ fontWeight: 600, color: 'var(--semi-color-text-0)' }}>{item.title}</span>
                  </Link>
                ) : (
                  <span style={{ fontWeight: 600, color: 'var(--semi-color-text-0)' }}>{item.title}</span>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {item.children?.map((subItem: NavItem, iidx: number) => (
                    <Link
                      key={iidx}
                      href={subItem.url || ''}
                      target={subItem.target || ''}
                      className="semi-footer-link"
                    >
                      <span style={{ color: 'var(--semi-color-text-2)' }}>{subItem.title || ''}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {badgesSlot ? <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>{badgesSlot}</div> : null}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 24, marginBottom: 16 }}>
          {localeThemeSlot}
        </div>

        <Divider margin={0} />

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 16 }}>
          {footer.copyright ? (
            <p style={{ margin: 0, fontSize: 13, color: 'var(--semi-color-text-2)' }} dangerouslySetInnerHTML={{ __html: footer.copyright }} />
          ) : footer.brand ? (
            <p style={{ margin: 0, fontSize: 13, color: 'var(--semi-color-text-2)' }}>
              © {new Date().getFullYear()}{' '}
              <a href={footer.brand.url || ''} target={footer.brand.target || ''} style={{ color: 'var(--semi-color-primary)' }}>
                {footer.brand.title || ''}
              </a>
              , All rights reserved
            </p>
          ) : null}

          {footer.agreement ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {footer.agreement?.items.map((item: NavItem, index: number) => (
                <Link
                  key={index}
                  href={item.url || ''}
                  target={item.target || ''}
                  className="semi-footer-link"
                >
                  <span style={{ color: 'var(--semi-color-text-2)', fontSize: 13, textDecoration: 'underline' }}>{item.title || ''}</span>
                </Link>
              ))}
            </div>
          ) : null}

          {footer.social ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {footer.social?.items.map((item: NavItem, index: number) => (
                <a
                  key={index}
                  href={item.url || ''}
                  target={item.target || ''}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--semi-color-border)',
                    color: 'var(--semi-color-text-2)',
                    fontSize: 13,
                    textDecoration: 'none',
                  }}
                  aria-label={item.title || 'Social media link'}
                >
                  {item.title || ''}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

function defaultLink({ href, target, children, className }: { href: string; target?: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target={target} className={className} style={{ textDecoration: 'none' }}>
      {children}
    </a>
  )
}
