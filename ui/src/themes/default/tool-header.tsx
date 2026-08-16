'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { ToolHeaderLink, ToolHeaderProps } from '../../contracts/tool-header'

/** 各链接的默认配色（active 态） */
const LINK_COLORS: Record<string, string> = {
  indigo: 'text-primary',
  rose: 'text-rose-600',
  gray: 'text-muted-foreground',
}

const LINK_BADGE_COLORS: Record<string, string> = {
  indigo: 'bg-primary/10 text-primary border-primary/30',
  rose: 'bg-rose-600/10 text-rose-600 border-rose-600/30',
  gray: 'bg-muted text-muted-foreground border-border',
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
 * Default ToolHeader — shadcn-style tool workbench brand header. Pure
 * presentation; copy + links injected by the app (no hardcoded text).
 */
export function ToolHeader({ brand,
  title,
  titleBadge,
  slogan,
  sourceHint,
  links = [],
  headingLevel: Heading = 'h1',
  className, ...rest }: ToolHeaderProps) {
  const TitleTag = Heading === 'h1' ? 'h2' : 'h3';
  return (
    <header {...rest} className={cn('mt-6 mb-8 w-full text-center sm:mt-8 sm:mb-10', className)}>
      <div className="mb-4 inline-flex items-center gap-3">
        {/* 16-bead 像素图标（默认主题用点缀方块） */}
        <div className="grid grid-cols-4 gap-1 rounded-md border border-border bg-muted/30 p-2 shadow-sm">
          {[
            'bg-red-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-green-500',
            'bg-pink-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-muted',
            'bg-yellow-500', 'bg-pink-500', 'bg-green-500', 'bg-cyan-500',
            'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-pink-500',
          ].map((color, i) => (
            <div key={i} className="size-4 rounded-sm border border-border/60" style={{ background: color }} />
          ))}
        </div>
      </div>

      <Heading className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">{brand}</Heading>
      <TitleTag className="mt-1 text-xl font-semibold tracking-tight text-primary sm:text-3xl">
        {title}
        {titleBadge && (
          <span className="ml-2 align-middle rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {titleBadge}
          </span>
        )}
      </TitleTag>

      {slogan && (
        <p className="mt-3 text-sm tracking-wide text-muted-foreground sm:text-base">{slogan}</p>
      )}

      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-sm">
          {links.map((link, idx) => (
            <React.Fragment key={link.href}>
              {idx > 0 && <span className="text-muted-foreground/30">·</span>}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-1.5 font-medium transition-colors hover:opacity-80',
                  LINK_COLORS[link.color ?? 'gray']
                )}
              >
                <LinkIcon icon={link.icon} />
                {link.label}
                {link.badge && (
                  <span
                    className={cn(
                      'rounded-full border px-1.5 py-px text-[10px] font-semibold leading-none',
                      LINK_BADGE_COLORS[link.color ?? 'gray']
                    )}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            </React.Fragment>
          ))}
        </div>
      )}

      {sourceHint && (
        <p className="mt-2 text-[11px] text-muted-foreground/70">{sourceHint}</p>
      )}
    </header>
  )
}
