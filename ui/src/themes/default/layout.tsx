'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { StackProps, ClusterProps, GridProps, DividerProps } from '../../contracts/layout'

const gapMap: Record<number, string> = {
  0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4',
  5: 'gap-5', 6: 'gap-6', 8: 'gap-8', 10: 'gap-10', 12: 'gap-12', 16: 'gap-16',
}

const alignMap: Record<string, string> = {
  start: 'items-start', center: 'items-center', end: 'items-end',
  stretch: 'items-stretch', baseline: 'items-baseline',
}

const justifyMap: Record<string, string> = {
  start: 'justify-start', center: 'justify-center', end: 'justify-end',
  between: 'justify-between', around: 'justify-around', evenly: 'justify-evenly',
}

/** Default Stack — flex column/row div. */
export function Stack({
  direction = 'col',
  gap = 4,
  align,
  justify,
  wrap,
  inline,
  className,
  ...rest
}: StackProps) {
  return (
    <div
      className={cn(
        inline ? 'inline-flex' : 'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && 'flex-wrap',
        className
      )}
      {...rest}
    />
  )
}

/** Default Cluster — inline-flex wrap div. */
export function Cluster({
  gap = 4,
  align = 'center',
  justify,
  className,
  ...rest
}: ClusterProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center',
        gapMap[gap],
        align && alignMap[align],
        justify && justifyMap[justify],
        className
      )}
      {...rest}
    />
  )
}

/** Default Grid — CSS grid div. */
export function Grid({
  cols,
  gap = 4,
  className,
  style,
  ...rest
}: GridProps) {
  let colClasses = ''
  if (typeof cols === 'number') {
    colClasses = `grid-cols-${cols}`
  } else if (cols && typeof cols === 'object') {
    // responsive breakpoints: { base: 1, sm: 2, md: 3, lg: 4, xl: 5 }
    const parts: string[] = []
    if (cols.base) parts.push(`grid-cols-${cols.base}`)
    if (cols.sm) parts.push(`sm:grid-cols-${cols.sm}`)
    if (cols.md) parts.push(`md:grid-cols-${cols.md}`)
    if (cols.lg) parts.push(`lg:grid-cols-${cols.lg}`)
    if (cols.xl) parts.push(`xl:grid-cols-${cols.xl}`)
    colClasses = parts.join(' ')
  }
  return (
    <div
      className={cn('grid', gapMap[gap], colClasses || undefined, className)}
      style={style}
      {...rest}
    />
  )
}

/** Default Divider — horizontal rule. */
export function Divider({ label, spacing = 'sm', className }: DividerProps) {
  const pad = spacing === 'lg' ? 'py-10' : spacing === 'md' ? 'py-6' : spacing === 'sm' ? 'py-3' : ''
  if (label) {
    return (
      <div className={cn('flex items-center gap-3 text-xs text-muted-foreground', pad, className)}>
        <span className="bg-border h-px flex-1" />
        {label}
        <span className="bg-border h-px flex-1" />
      </div>
    )
  }
  return <div className={cn('bg-border h-px', pad, className)} />
}
