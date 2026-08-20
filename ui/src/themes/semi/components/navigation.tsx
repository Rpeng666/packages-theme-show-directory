'use client'

import * as React from 'react'
import { Nav as SemiNavigation } from '@douyinfe/semi-ui'
import type { NavigationProps } from '@template/ui'

/**
 * Semi Navigation — maps shared NavigationItems onto Semi Navigation's
 * itemKey/text/icon items (nested items become sub-menus). onSelect
 * normalizes to the selected item key. (Semi exports this as `Nav`.)
 */
export function Navigation({
  items,
  selectedKey,
  defaultSelectedKey,
  onSelect,
  header,
  footer,
  collapsed,
  defaultCollapsed,
  onCollapseChange,
  className = '',
}: NavigationProps) {
  return (
    <SemiNavigation
      items={items as never}
      selectedKeys={selectedKey != null ? [selectedKey] : undefined}
      defaultSelectedKeys={defaultSelectedKey != null ? [defaultSelectedKey] : undefined}
      onSelect={(data) => onSelect?.(String(data.itemKey))}
      header={header}
      footer={footer}
      isCollapsed={collapsed}
      defaultIsCollapsed={defaultCollapsed}
      onCollapseChange={onCollapseChange}
      className={className}
    />
  )
}
