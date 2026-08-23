'use client'

import { PixelDropdown } from '@pxlkit/ui-kit'
import type { DropdownProps } from '../../contracts/dropdown'

/**
 * Pixel Dropdown — pxlkit's PixelDropdown (items[] sugar), mapped to the flat
 * DropdownProps contract. `trigger` renders via the compositional Trigger so
 * arbitrary nodes (avatar button, icon) can open the menu.
 */
export function Dropdown({ trigger, items }: DropdownProps) {
  return (
    <PixelDropdown.Root>
      <PixelDropdown.Trigger>{trigger}</PixelDropdown.Trigger>
      <PixelDropdown.Content>
        {items.map((item, idx) => {
          if (item.separator) {
            return <PixelDropdown.Separator key={item.value || idx} />
          }
          if (item.href) {
            return (
              <PixelDropdown.Item
                key={item.value || idx}
                onSelect={() => {
                  if (item.href) window.location.href = item.href
                }}
              >
                {item.children}
              </PixelDropdown.Item>
            )
          }
          return (
            <PixelDropdown.Item
              key={item.value || idx}
              disabled={item.disabled}
              onSelect={item.onSelect}
            >
              {item.children}
            </PixelDropdown.Item>
          )
        })}
      </PixelDropdown.Content>
    </PixelDropdown.Root>
  )
}
