'use client'

import * as React from 'react'
import { Modal } from '@heroui/react'
import type { DialogProps, PromoModalProps, HintBannerProps } from '@template/ui'

export function Dialog({ open, onOpenChange, title, description, children, footer, size = 'md', className = '' }: DialogProps) {
  return (
    <Modal
      {...({ isOpen: open, onOpenChange, size } as any)}
      className={className}
    >
      {title ? <div style={{ fontSize: 17, fontWeight: 700, padding: '20px 24px 0', color: 'var(--semi-color-text-0)' }}>{title}</div> : null}
      {description ? <div style={{ padding: '6px 24px 0', fontSize: 14, color: 'var(--semi-color-text-2)' }}>{description}</div> : null}
      <div style={{ padding: '16px 24px', color: 'var(--semi-color-text-1)' }}>{children}</div>
      {footer ? <div style={{ padding: '0 24px 20px', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>{footer}</div> : null}
    </Modal>
  )
}

export function PromoModal(props: PromoModalProps) {
  return <Dialog {...(props as any)} />
}

export function HintBanner({ actionHint, recommendHint, className = '' }: HintBannerProps) {
  return (
    <div className={className} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 13, color: 'var(--semi-color-text-3)', padding: '8px 0' }}>
      {actionHint ? <span>{actionHint}</span> : null}
      {recommendHint ? <span style={{ color: 'var(--semi-color-primary)' }}>{recommendHint}</span> : null}
    </div>
  )
}
