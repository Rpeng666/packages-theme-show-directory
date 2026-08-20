'use client'

import * as React from 'react'
import { Dropdown as SemiDropdown } from '@douyinfe/semi-ui'
import type { DropdownProps, DropdownItem } from '@template/ui'

const POS: Record<string, 'bottomLeft' | 'bottom' | 'bottomRight'> = {
  start: 'bottomLeft',
  center: 'bottom',
  end: 'bottomRight',
}

export function Dropdown({ trigger, items, align = 'end', className = '' }: DropdownProps) {
  return (
    <SemiDropdown
      position={POS[align] ?? 'bottomRight'}
      className={className}
      render={
        <SemiDropdown.Menu>
          {items.map((item: DropdownItem, idx: number) =>
            item.separator ? (
              <SemiDropdown.Divider key={idx} />
            ) : (
              <SemiDropdown.Item
                key={idx}
                disabled={item.disabled}
                onClick={item.onSelect}
              >
                {item.href ? (
                  <a href={item.href} target={item.target} style={{ color: 'inherit' }}>{item.children}</a>
                ) : (
                  item.children
                )}
              </SemiDropdown.Item>
            )
          )}
        </SemiDropdown.Menu>
      }
    >
      {trigger}
    </SemiDropdown>
  )
}