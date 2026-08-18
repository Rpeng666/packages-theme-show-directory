'use client'

import * as React from 'react'
import { Collapse as SemiCollapse } from '@douyinfe/semi-ui'
import type { CollapseProps } from '@template/ui'

const toKeys = (key: unknown): string[] => {
  if (Array.isArray(key)) return key.map(String)
  if (key == null) return []
  return [String(key)]
}

/**
 * Semi Collapse — maps shared CollapsePanelItems onto Semi Collapse.Panel
 * accordion groups. onChange normalizes Semi's string|string[] to string[].
 */
export function Collapse({
  items,
  accordion,
  activeKeys,
  defaultActiveKeys,
  onChange,
  className = '',
}: CollapseProps) {
  return (
    <SemiCollapse
      accordion={accordion}
      activeKey={activeKeys as never}
      defaultActiveKey={defaultActiveKeys as never}
      onChange={(key) => onChange?.(toKeys(key))}
      className={className}
    >
      {items.map((item) => (
        <SemiCollapse.Panel
          key={item.key}
          itemKey={item.key}
          header={item.title}
          extra={item.extra}
          disabled={item.disabled}
        >
          {item.children}
        </SemiCollapse.Panel>
      ))}
    </SemiCollapse>
  )
}
