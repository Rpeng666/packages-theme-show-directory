'use client'

import * as React from 'react'
import type { CSSProperties, ReactNode } from 'react'

/**
 * ToolWorkspace — the "studio canvas" frame that wraps every interactive tool.
 * A gradient-topped glass card with a slim header bar (tool title + status
 * badge) and a generous body. Tools render inside with their own inner layout;
 * the frame keeps the rhythm consistent across Resize / Compress / Extract /
 * Preview / Download.
 */
export interface ToolWorkspaceProps {
  title?: ReactNode
  /** status / trust badge shown in the header bar (e.g. "Runs in your browser") */
  badge?: ReactNode
  /** small helper line under the body (e.g. privacy tip) */
  footer?: ReactNode
  children: ReactNode
  maxWidth?: number
  className?: string
  style?: CSSProperties
}

export function ToolWorkspace({
  title,
  badge,
  footer,
  children,
  maxWidth = 1080,
  className = '',
  style,
}: ToolWorkspaceProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        maxWidth,
        margin: '0 auto',
        padding: '0 24px 8px',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
          border: '1px solid var(--semi-color-border)',
          background: 'var(--semi-color-bg-1)',
          boxShadow: '0 30px 80px -40px rgba(0,0,0,0.55)',
        }}
      >
        {/* gradient accent line on top */}
        <div
          aria-hidden
          style={{
            height: 3,
            background: 'var(--app-brand-grad)',
            opacity: 0.9,
          }}
        />

        {/* header bar */}
        {(title || badge) ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
              padding: '14px 22px',
              borderBottom: '1px solid var(--semi-color-border)',
              background: 'var(--semi-color-fill-0)',
            }}
          >
            {title ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <span
                  aria-hidden
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: 'rgba(var(--semi-green-5), 1)',
                    boxShadow: '0 0 0 4px rgba(var(--semi-green-5), 0.15)',
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 650,
                    color: 'var(--semi-color-text-0)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title}
                </span>
              </div>
            ) : null}
            {badge ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--semi-color-primary)',
                  background: 'var(--semi-color-primary-light-default)',
                  border: '1px solid var(--semi-color-border)',
                }}
              >
                {badge}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* body */}
        <div style={{ position: 'relative', padding: '28px 20px 32px' }}>{children}</div>

        {/* footer hint */}
        {footer ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
              padding: '12px 22px',
              borderTop: '1px solid var(--semi-color-border)',
              background: 'var(--semi-color-fill-0)',
              fontSize: 13,
              color: 'var(--semi-color-text-3)',
              textAlign: 'center',
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
