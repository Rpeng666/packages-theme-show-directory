'use client'

import { PixelAvatar } from '@pxlkit/ui-kit'
import type { AvatarProps } from '../../contracts/avatar'

/**
 * Pixel Avatar — pxlkit's avatar (chamfered frame, initials fallback).
 */
export function Avatar({ name, src, size = 'md', shape }: AvatarProps) {
  return (
    <PixelAvatar
      name={name}
      src={src}
      size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
      shape={shape === 'rounded' ? 'rounded' : 'circle'}
    />
  )
}
