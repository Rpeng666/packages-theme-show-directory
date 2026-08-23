'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import type { BannerProps } from '@template/ui'

const TONE: Record<string, string> = {
  info: 'rgba(var(--semi-blue-5), 0.1)',
  success: 'rgba(var(--semi-green-5), 0.1)',
  warning: 'rgba(255, 180, 60, 0.1)',
  danger: 'rgba(var(--semi-red-5), 0.1)',
}
const EDGE: Record<string, string> = {
  info: 'rgba(var(--semi-blue-5), 0.4)',
  success: 'rgba(var(--semi-green-5), 0.4)',
  warning: 'rgba(255, 180, 60, 0.45)',
  danger: 'rgba(var(--semi-red-5), 0.4)',
}

export function Banner({ type = 'info', title, description, icon, closable, onClose, bordered = true, children, className = '' }: BannerProps) {
  return (
    <div className={className} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 12, background: TONE[type] ?? TONE.info, border: bordered ? `1px solid ${EDGE[type] ?? EDGE.info}` : 'none' }}>
      {icon ? <span style={{ flexShrink: 0 }}>{icon}</span> : null}
      <div style={{ flex: 1 }}>
        {title ? <div style={{ fontWeight: 650, fontSize: 14, color: 'var(--semi-color-text-0)' }}>{title}</div> : null}
        {description ? <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--semi-color-text-2)', marginTop: 2 }}>{description}</div> : null}
        {children}
      </div>
      {closable ? (
        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--semi-color-text-2)', padding: 2 }}>
          <X size={14} />
        </button>
      ) : null}
    </div>
  )
}
