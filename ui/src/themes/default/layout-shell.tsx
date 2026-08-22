'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { LayoutShellProps } from '../../contracts/layout-shell'

/**
 * Default LayoutShell — CSS flex shell: optional rail + stacked
 * header/content/footer. Purely structural; no chrome.
 */
function LayoutShell({
  sider,
  header,
  children,
  footer,
  siderWidth = 240,
  className,
  style,
}: LayoutShellProps) {
  return (
    <div className={cn('flex w-full', className)} style={style}>
      {sider ? (
        <aside className="shrink-0 border-r" style={{ width: siderWidth }}>
          {sider}
        </aside>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        {header ? <header className="border-b px-4 py-3">{header}</header> : null}
        <main className="flex-1">{children}</main>
        {footer ? <footer className="border-t px-4 py-3">{footer}</footer> : null}
      </div>
    </div>
  )
}

export { LayoutShell }
