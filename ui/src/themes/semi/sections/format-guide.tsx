'use client'

import * as React from 'react'
import type { FormatGuideProps } from '@template/ui'

/**
 * Semi FormatGuide — a format deep-dive: use case paragraph, a best-practices
 * checklist, and an amber "the mistake creators make" callout. Used on the
 * image-size guide pages (one per format).
 */
export function FormatGuide({
  name,
  dimensions,
  useCase,
  bestPractices = [],
  commonMistake,
  className = '',
}: FormatGuideProps) {
  return (
    <section className={className}>
      {name ? (
        <h2
          style={{
            margin: 0,
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'var(--semi-color-text-0)',
          }}
        >
          {name}
          {dimensions ? (
            <span
              style={{
                marginLeft: 10,
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--semi-color-text-2)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {dimensions}
            </span>
          ) : null}
        </h2>
      ) : null}

      {useCase ? (
        <p
          style={{
            margin: '10px 0 0',
            fontSize: 15,
            lineHeight: 1.75,
            color: 'var(--semi-color-text-2)',
          }}
        >
          {useCase}
        </p>
      ) : null}

      {bestPractices.length > 0 ? (
        <div style={{ marginTop: 16 }}>
          <h3
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 650,
              color: 'var(--semi-color-text-1)',
            }}
          >
            Best practices
          </h3>
          <ul
            style={{
              margin: '8px 0 0',
              paddingLeft: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontSize: 14.5,
              lineHeight: 1.6,
              color: 'var(--semi-color-text-2)',
            }}
          >
            {bestPractices.map((bp, i) => (
              <li key={i}>{bp}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {commonMistake ? (
        <div
          style={{
            marginTop: 16,
            borderRadius: 12,
            border: '1px solid rgba(255, 180, 60, 0.35)',
            background: 'rgba(255, 180, 60, 0.06)',
            padding: '14px 18px',
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 650,
              color: 'var(--semi-color-text-1)',
            }}
          >
            The mistake creators make
          </span>
          <p
            style={{
              margin: '4px 0 0',
              fontSize: 14,
              lineHeight: 1.65,
              color: 'var(--semi-color-text-2)',
            }}
          >
            {commonMistake}
          </p>
        </div>
      ) : null}
    </section>
  )
}
