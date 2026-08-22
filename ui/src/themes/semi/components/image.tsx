'use client'

import * as React from 'react'
import { Image as SemiImage } from '@douyinfe/semi-ui'
import type { ImageProps } from '@template/ui'

/**
 * Semi Image — Semi's built-in viewer (click to zoom / rotate / download)
 * via the `preview` prop. Sizing is controlled by width/height/style.
 */
export function Image({
  src,
  alt,
  width,
  height,
  preview = true,
  fallback,
  className = '',
  style,
}: ImageProps) {
  return (
    <SemiImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      preview={preview}
      fallback={fallback}
      className={className}
      style={style}
    />
  )
}
