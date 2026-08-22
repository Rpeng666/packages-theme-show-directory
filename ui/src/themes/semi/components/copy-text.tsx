'use client'

import * as React from 'react'
import { Copy } from 'lucide-react'
import type { CopyTextProps } from '@template/ui'

export function CopyText({ children, text, copyable = true, type = 'primary', strong, code, className = '' }: CopyTextProps) {
  const copyText = text ?? (typeof children === 'string' ? children : '')
  const [copied, setCopied] = React.useState(false)
  const color = type === 'danger' ? 'rgba(var(--semi-red-5), 1)' : type === 'success' ? 'rgba(var(--semi-green-5), 1)' : type === 'link' ? 'var(--semi-color-primary)' : 'var(--semi-color-text-1)'
  const copy = async () => {
    try { await navigator.clipboard.writeText(copyText); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch {}
  }
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: strong ? 700 : undefined, color, fontFamily: code ? 'monospace' : undefined }}>
      <span>{children}</span>
      {copyable ? (
        <button type="button" onClick={copy} aria-label="Copy" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--semi-color-text-3)', display: 'inline-flex' }}>
          <Copy size={13} />
        </button>
      ) : null}
      {copied ? <span style={{ fontSize: 11, color: 'var(--semi-color-text-3)' }}>copied</span> : null}
    </span>
  )
}
