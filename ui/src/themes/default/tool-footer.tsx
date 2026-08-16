'use client'

import type { ToolFooterProps } from '../../contracts/tool-footer'

/**
 * Default ToolFooter — minimal workbench footer with an optional action
 * button + copyright line (shadcn-style chrome).
 */
export function ToolFooter({ copyright, action, ...rest }: ToolFooterProps) {
  return (
    <footer {...rest} className="mt-10 border-t py-6 text-center text-sm text-muted-foreground">
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mx-auto mb-5 inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          {action.label}
        </button>
      )}
      {copyright && <p className="text-xs">{copyright}</p>}
    </footer>
  )
}
