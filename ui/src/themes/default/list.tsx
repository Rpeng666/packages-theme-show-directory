'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { ListProps } from '../../contracts/list'

/**
 * Default List — header/footer + dataSource/renderItem, rendered as a
 * vertical list, flex row, or CSS grid (via gridTemplateColumns).
 */
function List<T>({
  dataSource = [],
  renderItem,
  header,
  footer,
  size = 'default',
  layout = 'vertical',
  grid,
  loading,
  emptyContent,
  className,
}: ListProps<T>) {
  const items = dataSource.map((item, index) => renderItem?.(item, index))
  const sizeClass = size === 'small' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-sm'

  let body: React.ReactNode
  if (loading) {
    body = <div className="py-8 text-center text-sm text-muted-foreground">Loading…</div>
  } else if (items.length === 0) {
    body =
      emptyContent ?? (
        <div className="py-8 text-center text-sm text-muted-foreground">No items</div>
      )
  } else if (grid?.column) {
    body = (
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${grid.column}, minmax(0, 1fr))` }}
      >
        {items}
      </div>
    )
  } else if (layout === 'horizontal') {
    body = <div className="flex flex-wrap gap-2">{items}</div>
  } else {
    body = (
      <ul className={cn('divide-y', sizeClass)}>
        {items.map((item, index) => (
          <li key={index} className="py-2">
            {item}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className={cn(sizeClass, className)}>
      {header ? <div className="mb-2 font-semibold">{header}</div> : null}
      {body}
      {footer ? <div className="mt-2 text-xs text-muted-foreground">{footer}</div> : null}
    </div>
  )
}

export { List }
