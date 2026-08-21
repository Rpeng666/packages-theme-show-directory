'use client'

import * as React from 'react'
import { Tabs as SemiTabs } from '@douyinfe/semi-ui'
import type { TabsProps } from '@template/ui'

const TYPE = { line: 'line', card: 'card', button: 'button', segment: 'button' } as const

/**
 * Semi Tabs — maps the item-based TabsProps onto Semi Tabs (TabPane children).
 * `type` maps line/card/button; `segment` collapses to Semi's button style.
 */
export function Tabs({
  items,
  activeKey,
  onChange,
  type = 'line',
  size = 'medium',
  className = '',
}: TabsProps) {
  return (
    <SemiTabs
      // Only forward activeKey when it's actually set. Passing activeKey={undefined}
      // makes Semi treat the tabs as controlled-with-undefined, which leaves every
      // pane inactive (content hidden). Omitting it lets Semi default to the first
      // pane and manage switching internally.
      {...(activeKey !== undefined ? { activeKey } : {})}
      onChange={onChange}
      type={TYPE[type as keyof typeof TYPE] ?? 'line'}
      size={size}
      className={className}
    >
      {items.map((it) => (
        <SemiTabs.TabPane key={it.key} itemKey={it.key} tab={it.label} disabled={it.disabled}>
          {it.content}
        </SemiTabs.TabPane>
      ))}
    </SemiTabs>
  )
}
