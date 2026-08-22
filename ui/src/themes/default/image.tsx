'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { ImageProps } from '../../contracts/image'

/**
 * Default Image — native img with error fallback. `preview` is not supported
 * by the default theme (semi theme provides the built-in viewer).
 */
function Image({ src, alt, width, height, fallback, className, style }: ImageProps) {
  const [failed, setFailed] = React.useState(false)
  if (failed && fallback) return <>{fallback}</>
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setFailed(true)}
      className={cn('object-contain', className)}
      style={style}
    />
  )
}

export { Image }
