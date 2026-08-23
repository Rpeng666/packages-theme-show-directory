'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { CarouselProps } from '../../contracts/carousel'

/**
 * Default Carousel — horizontal scroll-snap strip with dot indicators.
 * Autoplay advances the active slide on an interval.
 */
function Carousel({
  children,
  autoPlay,
  interval = 3000,
  showArrow = true,
  showIndicator = true,
  defaultActiveIndex = 0,
  className,
  style,
}: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const items = React.Children.toArray(children)
  const [active, setActive] = React.useState(defaultActiveIndex)

  const scrollTo = React.useCallback(
    (index: number) => {
      const track = trackRef.current
      const slide = track?.children[index] as HTMLElement | undefined
      if (track && slide) {
        track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' })
      }
      setActive(index)
    },
    []
  )

  React.useEffect(() => {
    if (!autoPlay || items.length < 2) return
    const id = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % items.length
        scrollTo(next)
        return next
      })
    }, interval)
    return () => window.clearInterval(id)
  }, [autoPlay, interval, items.length, scrollTo])

  return (
    <div className={cn('relative', className)} style={style}>
      {showArrow && items.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => scrollTo((active - 1 + items.length) % items.length)}
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-card p-1 text-xs shadow-xs hover:bg-muted"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => scrollTo((active + 1) % items.length)}
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-card p-1 text-xs shadow-xs hover:bg-muted"
          >
            ›
          </button>
        </>
      ) : null}
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none]"
      >
        {items.map((item, index) => (
          <div key={index} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
      {showIndicator !== false && items.length > 1 ? (
        <div className="mt-2 flex justify-center gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                index === active ? 'w-4 bg-primary' : 'w-1.5 bg-border hover:bg-muted-foreground'
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { Carousel }
