'use client'

import * as React from 'react'
import { Upload } from 'lucide-react'
import type { UploadZoneProps } from '@template/ui'

export function UploadZone({ isMounted, onDrop, onDragOver, onClick, onFile, primaryText, clickLabel, formatHint, showTip = true, tipText, className = '' }: UploadZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (!isMounted) return
    const onPaste = (e: ClipboardEvent) => {
      const f = e.clipboardData?.files?.[0]
      if (f) onFile?.(f)
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [isMounted, onFile])
  return (
    <div
      className={className}
      onClick={() => { onClick(); inputRef.current?.click() }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      role="button"
      tabIndex={0}
      style={{ border: '2px dashed var(--semi-color-border)', borderRadius: 16, padding: '48px 24px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s', background: 'var(--semi-color-fill-0)' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(var(--semi-red-5), 0.5)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--semi-color-border)')}
    >
      <Upload size={28} style={{ color: 'var(--semi-color-text-3)', marginBottom: 12 }} />
      {primaryText ? <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--semi-color-text-0)' }}>{primaryText}</div> : null}
      {clickLabel ? <div style={{ fontSize: 13, color: 'var(--semi-color-primary)', marginTop: 6 }}>{clickLabel}</div> : null}
      {formatHint ? <div style={{ fontSize: 12, color: 'var(--semi-color-text-3)', marginTop: 4 }}>{formatHint}</div> : null}
      {showTip && tipText ? <div style={{ fontSize: 12, color: 'var(--semi-color-text-3)', marginTop: 14 }}>{tipText}</div> : null}
      <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile?.(f); e.target.value = '' }} />
    </div>
  )
}
