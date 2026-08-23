'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { cn } from '../../lib/utils'
import type { DropdownProps } from '../../contracts/dropdown'

/**
 * Default Dropdown — shadcn DropdownMenu mapped to the flat DropdownProps
 * items[] contract (avatar menu use case: links + actions + separators).
 */
export function Dropdown({ trigger, items, align = 'end', className }: DropdownProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          className={cn(
            'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
            className
          )}
        >
          {items.map((item, idx) => {
            if (item.separator) {
              return (
                <DropdownMenuPrimitive.Separator
                  key={item.value || idx}
                  className="bg-muted -mx-1 my-1 h-px"
                />
              )
            }
            if (item.href) {
              return (
                <DropdownMenuPrimitive.Item key={item.value || idx} asChild>
                  <a
                    href={item.href}
                    target={item.target}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground"
                  >
                    {item.children}
                  </a>
                </DropdownMenuPrimitive.Item>
              )
            }
            return (
              <DropdownMenuPrimitive.Item
                key={item.value || idx}
                disabled={item.disabled}
                onSelect={item.onSelect}
                className="focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:opacity-50"
              >
                {item.children}
              </DropdownMenuPrimitive.Item>
            )
          })}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
