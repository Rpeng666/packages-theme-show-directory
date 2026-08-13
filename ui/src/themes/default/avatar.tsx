'use client'

import { cn } from '../../lib/utils'
import type { AvatarProps } from '../../contracts/avatar'

/**
 * Default Avatar — shadcn-style avatar with image + initials fallback.
 */
const sizeMap = {
  sm: 'size-6 text-[10px]',
  md: 'size-8 text-xs',
  lg: 'size-12 text-base',
} as const

export function Avatar({ name, src, size = 'md', shape, className }: AvatarProps) {
  const round = shape === 'rounded' ? 'rounded-lg' : 'rounded-full'
  return (
    <span
      className={cn(
        'bg-muted relative inline-flex shrink-0 items-center justify-center overflow-hidden align-middle',
        sizeMap[size],
        round,
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="aspect-square size-full object-cover" />
      ) : (
        <span className="flex size-full items-center justify-center font-medium text-foreground">
          {name?.charAt(0) || 'U'}
        </span>
      )}
    </span>
  )
}
