import type { CSSProperties, ReactNode } from 'react'

/**
 * Image contract — an image with optional click-to-zoom viewer. semi → Semi
 * Image (built-in preview: zoom / rotate / download), default → native img.
 */
export interface ImageProps {
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  /** click to open the built-in viewer (semi) */
  preview?: boolean
  /** rendered when the source fails to load */
  fallback?: ReactNode
  className?: string
  style?: CSSProperties
}
