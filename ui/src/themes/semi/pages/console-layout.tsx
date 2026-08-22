'use client'

import * as React from 'react'
import { Layout as SemiLayout } from '@douyinfe/semi-ui'
import { Nav as SemiNavigation } from '@douyinfe/semi-ui'
import type { ConsoleLayoutProps, ConsoleLayoutNavItem } from '@template/ui'
import { SmartIcon } from '../icons'

const { Sider, Header, Content } = SemiLayout

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
 * workbench). Left rail with brand + Semi Navigation + optional library slot
 * and user footer; top bar with title + actions; scrollable main content.
 * Pure presentational — routing/state come in via callbacks.
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
      allItems.push({
        itemKey: `__group-${gi}`,
        text: (
          <span className="console-nav-group-label">{group.label}</span>
        ),
        disabled: true,
      })
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

  return (
    <SemiLayout
      hasSider
      className={`console-layout ${className}`}
      style={{ height: '100dvh', overflow: 'hidden', background: 'var(--semi-color-bg-0)' }}
    >
      <Sider
        style={{ width: railWidth, 
          background: 'var(--semi-color-bg-1)',
          borderRight: '1px solid var(--semi-color-border)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {brand ? (
          <div className="console-brand">
            {brand.logo ? <span className="console-brand-logo">{brand.logo}</span> : null}
            <div className="console-brand-text">
              {brand.title ? <div className="console-brand-title">{brand.title}</div> : null}
              {brand.subtitle ? <div className="console-brand-subtitle">{brand.subtitle}</div> : null}
            </div>
          </div>
        ) : null}
        <div className="console-nav-scroll">
          {allItems.length > 0 ? (
            <SemiNavigation
              items={allItems}
              selectedKeys={selectedKey != null ? [selectedKey] : undefined}
              isCollapsed={collapsed}
              defaultIsCollapsed={defaultCollapsed}
              onCollapseChange={onCollapseChange}
              onSelect={handleSelect}
              style={{ borderRight: 'none', background: 'transparent' }}
            />
          ) : null}
          {navFooter ? <div className="console-nav-footer">{navFooter}</div> : null}
        </div>
        {footer ? <div className="console-rail-footer">{footer}</div> : null}
      </Sider>
      <SemiLayout style={{ height: '100%', overflow: 'hidden' }}>
        <Header
          className="console-topbar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            height: 60,
            padding: '0 20px',
            background: 'color-mix(in srgb, var(--semi-color-bg-0) 88%, transparent)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--semi-color-border)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          {title ? <div className="console-topbar-title">{title}</div> : null}
          <div style={{ flex: 1 }} />
          {topbar ? <div className="console-topbar-actions">{topbar}</div> : null}
        </Header>
        <Content
          className="console-content"
          style={{
            flex: 1,
            overflowY: contentScroll ? 'auto' : 'hidden',
            overflowX: 'hidden',
            background: 'var(--semi-color-bg-0)',
            padding: 0,
          }}
        >
          {children}
        </Content>
      </SemiLayout>
    </SemiLayout>
  )
}
