'use client'

import * as React from 'react'
import type { ImageProps } from '@template/ui'

export function Image({ src, alt, width, height, preview, fallback, className = '', style }: ImageProps) {
  const [failed, setFailed] = React.useState(false)
  if (failed && fallback) return <>{fallback}</>
  return (
    <img src={src} alt={alt ?? ''} width={width} height={height} className={className} style={style} loading="lazy" onError={() => setFailed(true)} onClick={preview ? () => window.open(src, '_blank') : undefined} />
  )
}
