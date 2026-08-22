'use client'

import * as React from 'react'
import type { ConsoleLayoutProps, ConsoleLayoutNavItem } from '@template/ui'
import { SmartIcon } from '../icons'

function toNavItems(items: ConsoleLayoutNavItem[] | undefined): any[] {
  if (!items) return []
  return items.map((item) => ({
    itemKey: item.key,
    text: item.label,
    icon: item.icon ? <SmartIcon name={item.icon} size={18} /> : undefined,
    disabled: item.disabled,
    items: item.children ? toNavItems(item.children) : undefined,
  }))
}

/**
 * ConsoleLayout — application-console shell (chat / settings / admin /
 * workbench). Left rail + top bar + scrollable main. Pure presentational —
 * routing/state come in via callbacks.
 */
export function ConsoleLayout({
  brand,
  nav,
  navFooter,
  footer,
  topbar,
  title,
  railWidth = 264,
  collapsed,
  defaultCollapsed,
  onCollapseChange,
  selectedKey,
  onNavigate,
  contentScroll = true,
  children,
  className = '',
}: ConsoleLayoutProps) {
  const allItems: any[] = []
  ;(nav ?? []).forEach((group, gi) => {
    if (group.label) {
      allItems.push({ itemKey: `__group-${gi}`, text: <span className="console-nav-group-label">{group.label}</span>, disabled: true })
    }
    allItems.push(...toNavItems(group.items))
  })

  const handleSelect = (data: { itemKey?: string | number }) => {
    const key = String(data.itemKey)
    if (key.startsWith('__group-')) return
    const flat = (nav ?? []).flatMap((g) => g.items)
    const item = flat.find((i) => i.key === key)
    if (item && onNavigate) onNavigate(item)
  }

  const isCollapsed = collapsed ?? defaultCollapsed ?? false

  return (
    <div className={`console-layout ${className}`} style={{ display: 'flex', height: '100dvh', overflow: 'hidden', background: 'var(--semi-color-bg-0)' }}>
      {/* Left rail */}
      <div style={{ width: isCollapsed ? 64 : railWidth, background: 'var(--semi-color-bg-1)', borderRight: '1px solid var(--semi-color-border)', display: 'flex', flexDirection: 'column', height: '100%', transition: 'width 0.2s' }}>
        {brand ? (
          <div className="console-brand" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px' }}>
            {brand.logo ? <span className="console-brand-logo">{brand.logo}</span> : null}
            {!isCollapsed ? (
              <div className="console-brand-text">
                {brand.title ? <div className="console-brand-title" style={{ fontSize: 14, fontWeight: 700 }}>{brand.title}</div> : null}
                {brand.subtitle ? <div className="console-brand-subtitle" style={{ fontSize: 11.5, color: 'var(--semi-color-text-3)' }}>{brand.subtitle}</div> : null}
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="console-nav-scroll" style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
          {allItems.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {allItems.map((it, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={it.disabled}
                  onClick={() => !it.disabled && handleSelect(it)}
                  title={it.text}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 12px', borderRadius: 8,
                    border: 'none', cursor: it.disabled ? 'default' : 'pointer', fontSize: 13.5, textAlign: 'left',
                    background: selectedKey === it.itemKey ? 'rgba(var(--semi-red-5), 0.12)' : 'transparent',
                    color: selectedKey === it.itemKey ? 'var(--semi-color-primary)' : it.disabled ? 'var(--semi-color-text-3)' : 'var(--semi-color-text-1)',
                    fontWeight: selectedKey === it.itemKey ? 650 : 500,
                  }}
                >
                  {it.icon}
                  {!isCollapsed ? <span style={{ flex: 1 }}>{it.text}</span> : null}
                </button>
              ))}
            </div>
          ) : null}
          {navFooter ? <div className="console-nav-footer" style={{ paddingTop: 8 }}>{navFooter}</div> : null}
        </div>
        {footer ? <div className="console-rail-footer" style={{ padding: 12 }}>{footer}</div> : null}
      </div>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="console-topbar" style={{ display: 'flex', alignItems: 'center', gap: 12, height: 60, padding: '0 20px', background: 'color-mix(in srgb, var(--semi-color-bg-0) 88%, transparent)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--semi-color-border)', flexShrink: 0 }}>
          {title ? <div className="console-topbar-title" style={{ fontSize: 15, fontWeight: 650 }}>{title}</div> : null}
          <div style={{ flex: 1 }} />
          {topbar ? <div className="console-topbar-actions">{topbar}</div> : null}
        </div>
        <div className="console-content" style={{ flex: 1, overflowY: contentScroll ? 'auto' : 'hidden', overflowX: 'hidden', background: 'var(--semi-color-bg-0)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
