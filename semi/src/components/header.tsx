'use client'

import * as React from 'react'
import { IconChevronDown } from '@douyinfe/semi-icons'
import { Button } from './button'
import { Dropdown } from './dropdown'
import type { HeaderProps, DropdownItem } from '@template/ui'

/**
 * Semi Header — sticky chrome using Semi chrome tokens + Button + Dropdown.
 *
 * Nav is data-driven native <a href> (SEO friendly, no function props — a
 * server layout can render it). `brandSlot` (left) and `business` (right) are
 * injected as children. Dropdown submenus use Semi Dropdown.Menu. The desktop
 * nav collapses below 768px via the scoped style block.
 */
export function Header({ nav, brandSlot, actions, business, className = '' }: HeaderProps) {
  const navItems = nav ?? []

  return (
    <>
      <style>{'@media (max-width: 767px){ .semi-hdr-nav{display:none!important} }'}</style>
      <header
        className={className}
        style={{
          position: 'relative',
          zIndex: 50,
          background: 'var(--semi-color-bg-1)',
          borderBottom: '1px solid var(--semi-color-border)',
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
                borderRadius: 6,
                fontSize: 14,
                color: 'var(--semi-color-text-2)',
                fontWeight: 500,
                textDecoration: 'none',
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
                      <a href={item.url || '#'} style={linkStyle}>
                        {item.title}
                        <IconChevronDown style={{ width: 14, height: 14 }} />
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
            {actions?.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant === 'outline' ? 'outline' : 'default'}
                size="sm"
              >
                <a
                  href={action.url || ''}
                  target={action.target || '_self'}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {action.title}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </header>
    </>
  )
}
