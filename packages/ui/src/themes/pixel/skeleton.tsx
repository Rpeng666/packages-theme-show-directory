'use client'

import * as React from "react"

import { PixelSkeleton } from "@pxlkit/ui-kit"
import { stripTemplateTokens } from "../../lib/strip-tokens"
import type { SkeletonProps } from "../../contracts/skeleton"

/* ── className size-class → CSS value (Tailwind v4 --spacing multiplier) ── */

const spacingStep = 0.25 // rem per Tailwind spacing unit

/** Map a `h-*`/`w-*`/`size-*` token to its CSS length, if recognizable. */
function sizeClassToCss(token: string): string | undefined {
  // only exact h-*/w-*/size-* prefixes — never flex-1, gap-4, max-w-*, …
  if (!/^(h|w|size)-/.test(token)) return undefined
  const raw = token.slice(token.indexOf('-') + 1)

  if (raw === 'full') return '100%'
  if (/^\d+$/.test(raw)) return `${Number(raw) * spacingStep}rem`

  return undefined
}

/**
 * Pixel-theme skeleton — PixelSkeleton injects width/height as inline style
 * (inline style beats className utilities), so a caller's `h-6 w-40` must be
 * promoted to width/height props and removed from the className (the
 * surface-specific strip handles the rest).
 */
function Skeleton({
  className,
  style,
  ...props
}: SkeletonProps) {
  let width: string | undefined
  let height: string | undefined
  let rounded = false

  const tokens = className?.split(/\s+/) ?? []
  const kept: string[] = []

  for (const token of tokens) {
    const axis = token.startsWith('h-')
      ? 'h'
      : token.startsWith('w-')
        ? 'w'
        : token.startsWith('size-')
          ? 'both'
          : token === 'rounded-lg' || token === 'rounded-md' || token === 'rounded-full'
            ? 'rounded'
            : undefined

    if (axis === 'h') {
      const v = sizeClassToCss(token)
      if (v) height = v
      else kept.push(token)
    } else if (axis === 'w') {
      const v = sizeClassToCss(token)
      if (v) width = v
      else kept.push(token)
    } else if (axis === 'both') {
      const v = sizeClassToCss(token)
      if (v) { width = v; height = v }
      else kept.push(token)
    } else if (axis === 'rounded') {
      rounded = true
    } else {
      kept.push(token)
    }
  }

  return (
    <PixelSkeleton
      width={width}
      height={height}
      rounded={rounded}
      style={style}
      className={stripTemplateTokens(kept.join(' '))}
      {...props}
    />
  )
}

export { Skeleton }
