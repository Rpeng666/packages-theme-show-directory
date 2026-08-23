'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDown } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button } from './button'
import type { HeaderProps } from '../../contracts/header'

/*
 * Default theme header — shadcn visual language, HeaderProps contract.
 *
 * Data-driven native <a href> nav (SEO friendly, no function props — a server
 * layout can render it). Business slots are injected as children: `brandSlot`
 * (left) and `business` (right). Dropdown submenus use Radix
 * NavigationMenu with a simplified inline panel (no animated viewport).
 */
export function Header({ nav,
  brandSlot,
  actions,
  business,
  className, ...rest }: HeaderProps) {
  const navItems = nav ?? []

  return (
    <header {...rest}
      className={cn(
        'relative z-50 border-b border-border/60 bg-background/80 backdrop-blur-md',
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Left: brand */}
        <div className="flex items-center gap-6">{brandSlot}</div>

        {/* Center/left: desktop nav */}
        <nav className="hidden md:block">
          <NavigationMenuPrimitive.Root
            className="relative flex items-center"
          >
            <NavigationMenuPrimitive.List className="flex list-none items-center gap-1">
              {navItems.map((item, idx) => {
                const hasDropdown = item.children && item.children.length > 0
                return (
                  <NavigationMenuPrimitive.Item key={idx}>
                    {hasDropdown ? (
                      <>
                        <NavigationMenuPrimitive.Trigger className="group inline-flex h-8 w-max items-center justify-center gap-1 rounded-md px-4 py-1 text-sm text-muted-foreground font-medium outline-none transition-[color,background-color] hover:bg-foreground/5 hover:text-foreground data-[state=open]:bg-foreground/5 data-[state=open]:text-foreground">
                          {item.title}
                          <ChevronDown
                            className="size-3 opacity-75 transition-transform duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                          />
                        </NavigationMenuPrimitive.Trigger>
                        <NavigationMenuPrimitive.Content className="absolute left-0 top-full mt-1.5 w-max rounded-lg border bg-popover p-1.5 text-popover-foreground shadow-lg">
                          <ul className="w-56 space-y-0.5">
                            {item.children?.map((subItem, iidx) => (
                              <li key={iidx}>
                                <a
                                  href={subItem.url || ''}
                                  target={subItem.target || '_self'}
                                  className="flex flex-col gap-0.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground"
                                >
                                  <span className="font-medium">
                                    {subItem.title}
                                  </span>
                                  {subItem.description && (
                                    <span className="line-clamp-1 text-xs text-muted-foreground">
                                      {subItem.description}
                                    </span>
                                  )}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuPrimitive.Content>
                      </>
                    ) : (
                      <a
                        href={item.url || ''}
                        target={item.target || '_self'}
                        className="inline-flex h-8 items-center justify-center rounded-md px-4 py-1 text-sm text-muted-foreground font-medium transition-colors hover:bg-foreground/5 hover:text-foreground"
                      >
                        {item.title}
                      </a>
                    )}
                  </NavigationMenuPrimitive.Item>
                )
              })}
            </NavigationMenuPrimitive.List>
          </NavigationMenuPrimitive.Root>
        </nav>

        {/* Right: business slots + CTA actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {business}
          {actions?.map((action, idx) => (
            <Button
              key={idx}
              asChild
              variant={action.variant === 'outline' ? 'outline' : 'default'}
              size="sm"
            >
              <a
                href={action.url || ''}
                target={action.target || '_self'}
              >
                {action.title}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </header>
  )
}
