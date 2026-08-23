import type { CSSProperties, ReactNode } from 'react'

/**
 * Carousel contract — a rotating banner/card deck. semi → Semi Carousel
 * (built-in arrows + indicators + autoplay), default → scroll-snap strip.
 */
export interface CarouselProps {
  children: ReactNode | ReactNode[]
  autoPlay?: boolean
  /** autoplay interval ms (default 3000) */
  interval?: number
  showArrow?: boolean
  showIndicator?: boolean
  theme?: 'light' | 'primary' | 'dark'
  speed?: number
  defaultActiveIndex?: number
  className?: string
  style?: CSSProperties
}
