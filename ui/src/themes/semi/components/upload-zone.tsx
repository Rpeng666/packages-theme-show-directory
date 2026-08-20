'use client'

import * as React from 'react'
import { Upload as SemiUpload } from '@douyinfe/semi-ui'
import type { UploadZoneProps } from '@template/ui'

/**
 * Semi UploadZone — maps the shared UploadZoneProps onto Semi's drag Upload.
 * Clicking the drag area opens Semi's native file dialog; dropping hands the
 * File to the app via `onFile` (beforeUpload returns false so nothing uploads).
 * `onDrop`/`onDragOver` are unused under Semi (the component manages drag).
 */
export function UploadZone({
  isMounted,
  onClick,
  onFile,
  primaryText,
  clickLabel,
  formatHint,
  showTip = false,
  tipText,
  className = '',
}: UploadZoneProps) {
  return (
    <div className={className}>
      <SemiUpload
        draggable
        accept="image/*"
        beforeUpload={(p) => {
          // FileItem is not a native File — the real File lives on `fileInstance`
          // (falls back to the item cast for the type-only shape).
          const native = p.file?.fileInstance ?? (p.file as unknown as File)
          if (onFile && native) onFile(native)
          return false
        }}
      >
        <div onClick={isMounted ? onClick : undefined} style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--semi-color-text-0)' }}>
            {primaryText}
            {clickLabel && (
              <span style={{ color: 'var(--semi-color-primary)', fontWeight: 600 }}>
                {' '}
                {clickLabel}
              </span>
            )}
          </div>
          {formatHint && (
            <div style={{ marginTop: 6, fontSize: 13, color: 'var(--semi-color-text-2)' }}>
              {formatHint}
            </div>
          )}
        </div>
      </SemiUpload>
      {showTip && tipText && (
        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            color: 'var(--semi-color-text-2)',
            textAlign: 'center',
          }}
        >
          {tipText}
        </div>
      )}
    </div>
  )
}
