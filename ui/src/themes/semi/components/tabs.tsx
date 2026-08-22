'use client'

import * as React from 'react'
import { Tabs as HeroTabs, Tab as HeroTab } from '@heroui/react'
import type { TabsProps } from '@template/ui'

/** Semi Tabs — item-based Tabs mapped onto HeroUI Tabs. */
export function Tabs({
  items,
  activeKey,
  onChange,
  type = 'line',
  size = 'medium',
  className = '',
}: TabsProps) {
  return (
    <HeroTabs
      {...({
        selectedKey: activeKey,
        onSelectionChange: (key: React.Key) => onChange?.(String(key)),
        size: size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md',
        color: 'primary',
        variant: type === 'card' ? 'solid' : 'underlined',
        className,
      } as any)}
    >
      {items.map((it) => (
        <HeroTab key={it.key} {...({ title: it.label, isDisabled: it.disabled } as any)}>
          {it.content}
        </HeroTab>
      ))}
    </HeroTabs>
  )
}
