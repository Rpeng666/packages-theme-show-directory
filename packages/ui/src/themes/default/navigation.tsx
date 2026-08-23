'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { NavigationItem, NavigationProps } from '../../contracts/navigation'

function NavItemButton({
  item,
  active,
  onSelect,
  collapsed,
}: {
  item: NavigationItem
  active?: string
  onSelect: (key: string) => void
  collapsed: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const isActive = active === item.itemKey
  return (
    <li>
      <button
        type="button"
        disabled={item.disabled}
        onClick={() => {
          onSelect(item.itemKey)
          if (item.items?.length) setOpen((o) => !o)
        }}
        title={collapsed ? String(item.text ?? '') : undefined}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm',
          isActive
            ? 'bg-primary/10 font-medium text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          collapsed && 'justify-center px-0',
          item.disabled && 'pointer-events-none opacity-50'
        )}
      >
        {item.icon}
        {!collapsed && <span className="flex-1 truncate text-left">{item.text}</span>}
        {item.items?.length && !collapsed ? (
          <span className={cn('text-xs text-muted-foreground transition-transform', open && 'rotate-90')}>▸</span>
        ) : null}
      </button>
      {item.items?.length && open && !collapsed ? (
        <ul className="ml-3 mt-1 space-y-1 border-l pl-2">
          {item.items.map((sub) => (
            <NavItemButton key={sub.itemKey} item={sub} active={active} onSelect={onSelect} collapsed={collapsed} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

/**
 * Default Navigation — nested button rail with a collapse toggle.
 */
function Navigation({
  items,
  selectedKey,
  defaultSelectedKey,
  onSelect,
  header,
  footer,
  collapsible = true,
  collapsed: collapsedProp,
  defaultCollapsed,
  onCollapseChange,
  className,
}: NavigationProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(Boolean(defaultCollapsed))
  const [internalSelected, setInternalSelected] = React.useState(defaultSelectedKey)
  const collapsed = collapsedProp ?? internalCollapsed
  const active = selectedKey ?? internalSelected

  const select = (key: string) => {
    if (selectedKey === undefined) setInternalSelected(key)
    onSelect?.(key)
  }
  const toggleCollapse = () => {
    const next = !collapsed
    if (collapsedProp === undefined) setInternalCollapsed(next)
    onCollapseChange?.(next)
  }

  return (
    <nav className={cn('flex h-full flex-col border-r', collapsed ? 'w-12' : 'w-56', className)}>
      {header ? <div className="border-b p-3">{header}</div> : null}
      <ul className={cn('flex-1 space-y-1 overflow-y-auto p-2', collapsed && 'space-y-2')}>
        {items.map((item) => (
          <NavItemButton key={item.itemKey} item={item} active={active} onSelect={select} collapsed={collapsed} />
        ))}
      </ul>
      {footer ? <div className="border-t p-3">{footer}</div> : null}
      {collapsible !== false ? (
        <button
          type="button"
          onClick={toggleCollapse}
          className="border-t p-2 text-xs text-muted-foreground hover:bg-muted"
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? '»' : '« Collapse'}
        </button>
      ) : null}
    </nav>
  )
}

export { Navigation }
