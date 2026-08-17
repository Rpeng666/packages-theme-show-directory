'use client'

import * as React from 'react'
import type { BoxProps, IconFrameProps } from '@template/ui'

const PAD = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }
const RADIUS = { none: 0, sm: 6, md: 12, lg: 20, full: 999 }
const TONE_BG: Record<string, string> = {
  green: 'rgba(0, 200, 150, .12)',
  cyan: 'rgba(0, 160, 233, .12)',
  gold: 'rgba(250, 173, 20, .14)',
  red: 'rgba(247, 84, 49, .12)',
  purple: 'rgba(116, 87, 242, .12)',
  pink: 'rgba(242, 82, 154, .12)',
  neutral: 'rgba(128, 145, 158, .12)',
}

/** Semi Box — a simple themed container. */
export function Box({
  tone = 'neutral',
  variant = 'outline',
  padding = 'md',
  radius = 'md',
  style,
  children,
  ...props
}: BoxProps) {
  const isSolid = variant === 'solid'
  const isGhost = variant === 'ghost'
  const css: React.CSSProperties = {
    padding: PAD[padding] ?? PAD.md,
    borderRadius: RADIUS[radius] ?? RADIUS.md,
    display: 'block',
    ...style,
  }
  if (isSolid) css.background = TONE_BG[tone]
  else if (variant === 'soft') css.background = TONE_BG[tone]
  else if (isGhost) css.background = 'transparent'
  return (
    <div {...props} style={css}>
      {children}
    </div>
  )
}

const IFRAME_SIZE = { 48: 48, 56: 56, 64: 64, 80: 80, 112: 112 }
const IFRAME_RADIUS = { square: 8, rounded: 16, circle: 999 }

/** Semi IconFrame — a square/rounded container framing an icon. */
export function IconFrame({
  icon,
  size = 56,
  tone = 'neutral',
  shape = 'square',
  accent,
  animated,
  style,
  className = '',
  ...props
}: IconFrameProps) {
  const side = IFRAME_SIZE[size] ?? 56
  const bg = TONE_BG[tone] ?? TONE_BG.neutral
  return (
    <div
      {...props}
      className={className}
      style={{
        position: 'relative',
        width: side,
        height: side,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bg,
        borderRadius: IFRAME_RADIUS[shape] ?? 8,
        animation: animated ? 'semi-iconframe-breathe 2s ease-in-out infinite' : undefined,
        ...style,
      }}
    >
      {icon}
      {accent && (
        <span
          style={{
            position: 'absolute',
            top: accent.position === 'bottom-right' ? undefined : -4,
            bottom: accent.position === 'bottom-right' ? -4 : undefined,
            right: -4,
            display: 'inline-flex',
          }}
        >
          {accent.icon}
        </span>
      )}
    </div>
  )
}