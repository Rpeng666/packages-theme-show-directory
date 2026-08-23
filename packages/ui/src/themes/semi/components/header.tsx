'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Dropdown } from './dropdown'
import type { HeaderProps, DropdownItem } from '@template/ui'

/**
 * Semi Header — sticky glass chrome matching the Semi Hero's visual language.
 *
 * Nav is data-driven native <a href> (SEO friendly, no function props — a
 * server layout can render it). `brandSlot` (left) and `business` (right) are
 * injected as children. Dropdown submenus use Semi Dropdown.Menu. The desktop
 * nav collapses below 768px via the scoped style block.
 *
 * Styling follows the Hero: a borderless translucent sticky bar with backdrop
 * blur (page content and the hero glow bleed through as you scroll), dark
 * nav links with brand-red hover, and CTA actions built in the hero's button
 * language (40px, radius 12, brand gradient + red glow) instead of Semi's
 * default 6px-radius buttons. No bottom border — the bar sits flush on the
 * same plain canvas as the hero, like the hero's own borderless language.
 */
export function Header({ nav, brandSlot, actions, business, className = '' }: HeaderProps) {
  const navItems = nav ?? []

  return (
    <>
      <style>{`
        @media (max-width: 767px){ .semi-hdr-nav{display:none!important} }
        .semi-hdr-link{ color: var(--semi-color-text-1); }
        .semi-hdr-link:hover{ color: var(--semi-color-primary); }
      `}</style>
      <header
        className={className}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'color-mix(in srgb, var(--semi-color-bg-1) 64%, transparent)',
          backdropFilter: 'blur(12px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            height: 64,
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {/* Left: brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>{brandSlot}</div>

          {/* Desktop nav */}
          <nav className="semi-hdr-nav" style={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item, idx) => {
              const hasDropdown = !!(item.children && item.children.length > 0)
              const linkStyle: React.CSSProperties = {
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '0 16px',
                height: 40,
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }
              if (hasDropdown) {
                const items: DropdownItem[] = (item.children ?? []).map((sub, iidx) => ({
                  value: sub.url || String(iidx),
                  children: (
                    <span>
                      <span style={{ fontWeight: 500, display: 'block' }}>{sub.title}</span>
                      {sub.description ? (
                        <span style={{ display: 'block', fontSize: 12, color: 'var(--semi-color-text-2)' }}>
                          {sub.description}
                        </span>
                      ) : null}
                    </span>
                  ),
                  href: sub.url,
                  target: sub.target,
                }))
                return (
                  <Dropdown
                    key={idx}
                    align="center"
                    trigger={
                      <a href={item.url || '#'} className="semi-hdr-link" style={linkStyle}>
                        {item.title}
                        <ChevronDown style={{ width: 14, height: 14 }} />
                      </a>
                    }
                    items={items}
                  />
                )
              }
              return (
                <a
                  key={idx}
                  href={item.url || ''}
                  target={item.target || '_self'}
                  className="semi-hdr-link"
                  style={linkStyle}
                >
                  {item.title}
                </a>
              )
            })}
          </nav>

          {/* Right: business slots + CTA actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {business}
            {actions?.map((action, idx) => {
              const v = action.variant as string
              const isPrimary = !v || v === 'default' || v === 'primary'
              return (
                <a
                  key={idx}
                  href={action.url || ''}
                  target={action.target || '_self'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    height: 40,
                    padding: '0 20px',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    ...(isPrimary
                      ? {
                          background: 'var(--app-brand-grad)',
                          color: '#fff',
                          boxShadow: '0 8px 20px -8px rgba(var(--semi-red-5), 0.7)',
                        }
                      : {
                          background: 'var(--semi-color-bg-1)',
                          color: 'var(--semi-color-text-0)',
                          border: '1px solid var(--semi-color-border)',
                        }),
                  }}
                >
                  {action.title}
                </a>
              )
            })}
          </div>
        </div>
      </header>
    </>
  )
}
