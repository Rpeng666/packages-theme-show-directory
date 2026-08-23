'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CarouselProps } from '@template/ui'

export function Carousel({ children, autoPlay, interval = 3000, showArrow = true, showIndicator = true, speed = 500, defaultActiveIndex = 0, className = '', style }: CarouselProps) {
  const items = React.Children.toArray(children)
  const [idx, setIdx] = React.useState(defaultActiveIndex)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!autoPlay || items.length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), interval)
    return () => clearInterval(t)
  }, [autoPlay, interval, items.length])
  React.useEffect(() => {
    const el = ref.current
    if (el) el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' })
  }, [idx])
  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <div ref={ref} style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
        {items.map((c, i) => (
          <div key={i} style={{ flex: '0 0 100%', scrollSnapAlign: 'start' }}>{c}</div>
        ))}
      </div>
      {showArrow ? (
        <>
          <button type="button" onClick={() => setIdx((idx - 1 + items.length) % items.length)} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: 999, width: 32, height: 32, color: '#fff', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
          <button type="button" onClick={() => setIdx((idx + 1) % items.length)} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: 999, width: 32, height: 32, color: '#fff', cursor: 'pointer' }}><ChevronRight size={16} /></button>
        </>
      ) : null}
      {showIndicator ? (
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
          {items.map((_, i) => (
            <button key={i} type="button" onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === idx ? 16 : 6, height: 6, borderRadius: 999, border: 'none', background: i === idx ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'width 0.2s' }} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
