'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { IconFrameProps } from '../../contracts/iconframe'

/**
 * Default IconFrame — simple rounded icon tile (shadcn flavor). pixel theme
 * swaps to pxlkit's chamfered frame; this is the theme-neutral baseline.
 */
const sizeMap: Record<NonNullable<IconFrameProps['size']>, string> = {
  48: 'size-12',
  56: 'size-14',
  64: 'size-16',
  80: 'size-20',
  112: 'size-28',
}

const shapeMap: Record<NonNullable<IconFrameProps['shape']>, string> = {
  square: 'rounded-md',
  rounded: 'rounded-lg',
  circle: 'rounded-full',
}

const toneMap: Record<string, string> = {
  green: 'bg-primary/10 text-primary',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  gold: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  pink: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  neutral: 'bg-muted text-foreground',
}

export function IconFrame({
  icon,
  size = 56,
  tone = 'neutral',
  shape = 'square',
  accent,
  animated = false,
  className,
  ...rest
}: IconFrameProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center border',
        sizeMap[size],
        shapeMap[shape],
        toneMap[tone],
        animated && 'animate-pulse',
        className,
      )}
      {...rest}
    >
      <span className="inline-flex items-center justify-center" aria-hidden>
        {icon}
      </span>
      {accent && (
        <span
          className={cn(
            'absolute inline-flex h-4 w-4 items-center justify-center',
            (accent.position ?? 'top-right') === 'top-right'
              ? '-top-1.5 -right-1.5'
              : '-right-1.5 -bottom-1.5',
          )}
          aria-hidden
        >
          {accent.icon}
        </span>
      )}
    </div>
  )
}
