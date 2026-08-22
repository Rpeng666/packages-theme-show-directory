'use client'

import * as React from 'react'
import { Avatar as HeroAvatar } from '@heroui/react'
import type { AvatarProps } from '@template/ui'

/** Semi Avatar — HeroUI Avatar with the shared name/src/size vocabulary. */
export function Avatar({ name, src, size = 'md', shape = 'circle', className = '' }: AvatarProps) {
  return (
    <HeroAvatar
      {...({ src, name, size: size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md', radius: shape === 'rounded' ? 'md' : 'full' } as any)}
      className={className}
    />
  )
}
