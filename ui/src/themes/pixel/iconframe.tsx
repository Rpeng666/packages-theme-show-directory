'use client'

import * as React from 'react'

import { PixelIconFrame } from '@pxlkit/ui-kit'
import { stripTemplateTokens } from '../../lib/strip-tokens'
import type { IconFrameProps } from '../../contracts/iconframe'

/**
 * Pixel IconFrame — pxlkit's chamfered icon tile with optional corner accent
 * badge. Used by feature-step blocks for per-step icon markers.
 */
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
    <PixelIconFrame
      icon={icon}
      size={size}
      tone={tone}
      shape={shape}
      accent={accent}
      animated={animated}
      className={stripTemplateTokens(className)}
      {...(rest as object)}
    />
  )
}
