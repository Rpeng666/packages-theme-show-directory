'use client'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import type { StatsProps } from '@template/ui'
import { SectionShell } from './shell'

/**
 * Parse a stat title into a countable number + literal shell.
 * Only titles shaped like "50K+", "+38%" or "3" animate; compound strings
 * such as "1280×720" are left untouched (two number blocks would look odd
 * counting up independently).
 */
function parseCounter(title: unknown): { prefix: string; num: number; suffix: string } | null {
  const raw = String(title ?? '').trim()
  const m = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/)
  if (!m) return null
  const num = Number(m[2])
  if (!Number.isFinite(num) || num <= 0) return null
  return { prefix: m[1], num, suffix: m[3] }
}

/**
 * Rolling number animation — counts 0 → target once when the band scrolls
 * into view. Respects prefers-reduced-motion (no animation).
 */
function CountUpNumber({ title, started }: { title: unknown; started: boolean }) {
  const parsed = parseCounter(title)
  const [display, setDisplay] = useState(parsed ? 0 : null)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (!parsed) return
    const { num } = parsed
    if (!started) return

    const reduced = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(num)
      return
    }

    const duration = 1400
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      // easeOutExpo — fast start, soft landing
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(Math.round(num * eased))
      if (p < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [started, parsed])

  if (!parsed) {
    return <>{String(title ?? '')}</>
  }
  return (
    <>
      {parsed.prefix}
      {display ?? parsed.num}
      {parsed.suffix}
    </>
  )
}

/**
 * Semi Stats — bold stat band. Each item renders a large number (title) with
 * a label (description), separated by hairlines on desktop. Numbers count up
 * on first scroll into view.
 */
export function Stats({ section, className = '' }: StatsProps) {
  const items = section.items ?? []
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Safety net: if the IntersectionObserver never fires (headless capture,
  // hydration edge case, unusual viewport), force the numbers to their final
  // value after a short delay so the band never renders "0K+".
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <SectionShell id={section.id} className={className} padding="sm">
      <div
        ref={rootRef}
        style={{
          position: 'relative',
          borderRadius: 20,
          border: '1px solid var(--semi-color-border)',
          background: 'var(--semi-color-bg-1)',
          overflow: 'hidden',
          padding: '40px 32px',
        }}
      >
        <div className="app-hero-glow" style={{ top: -140, height: 300, opacity: 0.7 }} aria-hidden />
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, minmax(0, 1fr))`,
            gap: 24,
            zIndex: 1,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                textAlign: 'center',
                padding: '0 12px',
                borderLeft: idx === 0 ? 'none' : '1px solid var(--semi-color-border)',
              }}
            >
              <div
                className="app-text-gradient"
                style={{
                  fontSize: 'clamp(34px, 4.5vw, 48px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  minHeight: '1.2em',
                  // compound strings (e.g. "1280×720") are wide — shrink to fit
                  ...(typeof item.title === 'string' && item.title.length > 6
                    ? { fontSize: 'clamp(26px, 3.2vw, 38px)', whiteSpace: 'nowrap' }
                    : {}),
                }}
              >
                <CountUpNumber title={item.title} started={started} />
              </div>
              {item.description ? (
                <div style={{ marginTop: 8, fontSize: 14, color: 'var(--semi-color-text-2)' }}>
                  {item.description}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
