'use client'

import * as React from 'react'
import { Carousel as SemiCarousel } from '@douyinfe/semi-ui'
import type { CarouselProps } from '@template/ui'

/**
 * Semi Carousel — shared CarouselProps over Semi Carousel. autoPlay →
 * {interval, hoverToPause}; theme/speed/defaultActiveIndex pass through.
 */
export function Carousel({
  children,
  autoPlay,
  interval = 3000,
  showArrow = true,
  showIndicator = true,
  theme = 'light',
  speed = 600,
  defaultActiveIndex,
  className = '',
  style,
}: CarouselProps) {
  return (
    <SemiCarousel
      autoPlay={autoPlay ? { interval, hoverToPause: true } : false}
      showArrow={showArrow}
      showIndicator={showIndicator}
      theme={theme as never}
      speed={speed}
      defaultActiveIndex={defaultActiveIndex}
      className={className}
      style={style}
    >
      {children}
    </SemiCarousel>
  )
}
