'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { ToolHeaderLink, ToolHeaderProps } from '../../contracts/tool-header'

/** 各链接的默认配色（active 态） */
const LINK_COLORS: Record<string, string> = {
  indigo: 'text-retro-cyan',
  rose: 'text-retro-pink',
  gray: 'text-muted-foreground',
}

const LINK_BADGE_COLORS: Record<string, string> = {
  indigo: 'bg-retro-cyan/20 text-retro-cyan border-retro-cyan/40',
  rose: 'bg-retro-pink/20 text-retro-pink border-retro-pink/40',
  gray: 'bg-retro-surface/40 text-muted-foreground border-foreground/20',
}

function LinkIcon({ icon }: { icon: ToolHeaderLink['icon'] }) {
  switch (icon) {
    case 'xiaohongshu':
      return (
        <svg viewBox="0 0 1024 1024" fill="currentColor" className="size-3" aria-hidden>
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m238.8 360.2l-57.7 93.3c-10.1 16.3-31.5 21.3-47.8 11.2l-112.4-69.5c-16.3-10.1-21.3-31.5-11.2-47.8l57.7-93.3c10.1-16.3 31.5-21.3 47.8-11.2l112.4 69.5c16.3 10.1 21.3 31.5 11.2 47.8zM448 496l-57.7 93.3c-10.1 16.3-31.5 21.3-47.8 11.2l-112.4-69.5c-16.3-10.1-21.3-31.5-11.2-47.8l57.7-93.3c10.1-16.3 31.5-21.3 47.8-11.2l112.4 69.5c16.3 10.1 21.3 31.5 11.2 47.8z m248.9 43.2l-57.7 93.3c-10.1 16.3-31.5 21.3-47.8 11.2l-112.4-69.5c-16.3-10.1-21.3-31.5-11.2-47.8l57.7-93.3c10.1-16.3 31.5-21.3 47.8-11.2l112.4 69.5c16.3 10.1 21.3 31.5 11.2 47.8z"/>
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-3" aria-hidden>
          <path fillRule="evenodd" d="M12 0C5.37 0 0 5.48 0 12.25c0 5.42 3.44 10.01 8.2 11.63.6.12.82-.27.82-.6 0-.3-.01-1.08-.02-2.13-3.34.74-4.04-1.65-4.04-1.65-.55-1.44-1.35-1.83-1.35-1.83-1.1-.78.08-.77.08-.77 1.21.09 1.85 1.26 1.85 1.26 1.08 1.9 2.83 1.35 3.52 1.03.11-.81.42-1.35.77-1.66-2.66-.31-5.46-1.36-5.46-6.06 0-1.34.46-2.43 1.22-3.29-.12-.31-.53-1.55.12-3.23 0 0 1-.33 3.29 1.25a10.96 10.96 0 0 1 5.98 0c2.29-1.58 3.29-1.25 3.29-1.25.65 1.68.24 2.92.12 3.23.76.86 1.22 1.95 1.22 3.29 0 4.71-2.81 5.74-5.49 6.05.43.38.81 1.13.81 2.28 0 1.65-.02 2.98-.02 3.39 0 .33.22.72.83.59C20.56 22.25 24 17.67 24 12.25 24 5.48 18.63 0 12 0Z"/>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5" aria-hidden>
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v8h12V4H4zm-1 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      )
  }
}

/**
 * ToolHeader — a generic tool workbench brand header with pixel retro chrome:
 * 16-bead pixel icon + display-face brand/tool titles, slogan, and an
 * outbound-links row. Pure presentation; copy + links injected by the app, so
 * it's a reusable generic asset (no product coupling).
 */
export function ToolHeader({ brand,
  title,
  titleBadge,
  slogan,
  sourceHint,
  links = [],
  className, ...rest }: ToolHeaderProps) {
  return (
    <header {...rest}
      className={cn(
        'relative w-full overflow-hidden border-2 border-foreground/15 bg-retro-surface/40 px-4 py-8 text-center pxl-corner-md shadow-md md:max-w-4xl mt-6 mb-8 sm:mt-8 sm:mb-10',
        className
      )}
    >
      {/* 装饰点阵背景 */}
      <div className="absolute top-0 right-0 grid grid-cols-5 gap-1 opacity-20">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="size-1.5 rounded-sm bg-foreground/40" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 grid grid-cols-5 gap-1 opacity-20">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="size-1.5 rounded-sm bg-foreground/40" />
        ))}
      </div>

      <div className="relative z-10 py-8">
        {/* 16-bead 像素图标 */}
        <div className="mb-6 inline-grid grid-cols-4 gap-2 border-2 border-foreground/20 bg-background p-4 pxl-corner-md shadow-lg">
          {[
            'bg-retro-red', 'bg-retro-cyan', 'bg-retro-gold', 'bg-retro-green',
            'bg-retro-pink', 'bg-retro-cyan', 'bg-retro-gold', 'bg-retro-surface',
            'bg-retro-gold', 'bg-retro-pink', 'bg-retro-green', 'bg-retro-cyan',
            'bg-retro-green', 'bg-retro-gold', 'bg-retro-red', 'bg-retro-pink',
          ].map((color, i) => (
            <div key={i} className="size-5 rounded-sm border-2 border-foreground/10 shadow-sm" style={{ background: color }} />
          ))}
        </div>

        {/* 品牌 + 工具名 */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-display text-4xl font-normal uppercase tracking-wider text-foreground sm:text-6xl">
            {brand}
          </h1>
          <h2 className="font-display text-xl font-normal uppercase tracking-widest text-retro-cyan sm:text-3xl">
            {title}
            {titleBadge && (
              <span className="ml-1 align-middle text-xs font-mono text-muted-foreground">
                {titleBadge}
              </span>
            )}
          </h2>
        </div>

        {slogan && (
          <p className="mt-3 font-mono text-sm tracking-[0.15em] text-muted-foreground sm:text-base">
            {slogan}
          </p>
        )}

        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs">
            {links.map((link, idx) => {
              const activeColor = LINK_COLORS[link.color ?? 'gray']
              return (
                <React.Fragment key={link.href}>
                  {idx > 0 && <span className="text-foreground/20">·</span>}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-1 font-medium transition-colors hover:opacity-80',
                      activeColor
                    )}
                  >
                    <LinkIcon icon={link.icon} />
                    {link.label}
                    {link.badge && (
                      <span
                        className={cn(
                          'border px-1 py-px font-mono text-[9px] font-bold leading-none pxl-corner-sm',
                          LINK_BADGE_COLORS[link.color ?? 'gray']
                        )}
                      >
                        {link.badge}
                      </span>
                    )}
                  </a>
                </React.Fragment>
              )
            })}
          </div>
        )}

        {sourceHint && (
          <p className="mt-2 font-mono text-[10px] text-muted-foreground/70">
            {sourceHint}
          </p>
        )}
      </div>
    </header>
  )
}
