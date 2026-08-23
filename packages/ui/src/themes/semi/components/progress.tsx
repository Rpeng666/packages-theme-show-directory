'use client'

import * as React from 'react'
import type { ProgressProps } from '@template/ui'

/** Semi Progress — a thin brand bar with an optional value label. */
export function Progress({ value, label, showValue, indeterminate, className = '' }: ProgressProps) {
  const clamped = Math.min(Math.max(value, 0), 100)
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label || showValue ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--semi-color-text-2)' }}>
          <span>{label}</span>
          {showValue ? <span style={{ fontVariantNumeric: 'tabular-nums' }}>{Math.round(clamped)}%</span> : null}
        </div>
      ) : null}
      <div
        style={{
          height: 6,
          borderRadius: 999,
          overflow: 'hidden',
          background: 'var(--semi-color-fill-1)',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 999,
            background: 'var(--app-brand-grad)',
            width: indeterminate ? '100%' : `${clamped}%`,
            transition: 'width 0.3s ease',
            ...(indeterminate
              ? { animation: 'semi-progress-indeterminate 1.2s ease-in-out infinite' }
              : {}),
          }}
        />
      </div>
      <style>{`@keyframes semi-progress-indeterminate { 0%{transform:translateX(-100%)} 50%{transform:translateX(0)} 100%{transform:translateX(100%)} }`}</style>
    </div>
  )
}
