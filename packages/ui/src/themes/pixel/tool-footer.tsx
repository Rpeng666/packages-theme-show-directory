'use client'

import type { ToolFooterProps } from '../../contracts/tool-footer'

/**
 * ToolFooter — minimal workbench footer with an optional action (donation /
 * CTA) button + copyright line. Pixel retro chrome. Pure presentation; copy
 * and click are injected, so it's a generic asset (no product coupling).
 */
export function ToolFooter({ copyright, action, className, ...rest }: ToolFooterProps) {
  return (
    <footer {...rest}
      className={
        className ??
        'mt-10 mb-6 w-full border-t-2 border-foreground/15 bg-retro-surface/20 py-6 text-center pxl-corner-md shadow-inner md:max-w-4xl'
      }
    >
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mx-auto mb-5 flex items-center justify-center border-2 border-retro-pink bg-retro-pink/15 px-6 py-2.5 font-mono text-sm text-retro-pink pxl-corner-md shadow-lg transition-all duration-300 hover:bg-retro-pink/25 hover:shadow-xl"
        >
          <svg className="mr-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 8h1a2 2 0 0 1 2 2v1c0 1.1-.9 2-2 2h-1" fill="#f9a8d4" />
            <path d="M6 8h12v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8z" fill="#f9a8d4" />
            <path d="M6 8V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1" fill="#f472b6" />
            <path d="M12 16v-4" stroke="#7d2a5a" />
            <path d="M9.5 14.5L9 16" stroke="#7d2a5a" />
            <path d="M14.5 14.5L15 16" stroke="#7d2a5a" />
          </svg>
          <span>{action.label}</span>
        </button>
      )}
      {copyright && (
        <p className="font-mono text-xs font-medium text-muted-foreground sm:text-sm">
          {copyright}
        </p>
      )}
    </footer>
  )
}
