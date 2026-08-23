'use client'

import * as React from 'react'
import { Modal, useOverlayState } from '@heroui/react'
import type { DialogProps, PromoModalProps, HintBannerProps } from '@template/ui'

/**
 * Semi Dialog — HeroUI Modal (react-aria based). Uses `useOverlayState` for the
 * controlled open/close and the compound Modal.Container/Dialog sub-parts so it
 * renders as a proper overlay, not inline content.
 */
export function Dialog({ open, onOpenChange, title, description, children, footer, size = 'md', className = '' }: DialogProps) {
  const state = useOverlayState({ isOpen: open, onOpenChange: (o) => onOpenChange(o) })
  const heroSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : size === 'xl' ? 'xl' : 'md'

  return (
    <Modal state={state}>
      <Modal.Container size={heroSize as never} placement="center">
        <Modal.Dialog className={className}>
          {title ? (
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>
          ) : null}
          {description ? <div style={{ padding: '0 24px', fontSize: 14, color: 'var(--semi-color-text-2)' }}>{description}</div> : null}
          <Modal.Body>{children}</Modal.Body>
          {footer ? <Modal.Footer>{footer}</Modal.Footer> : null}
        </Modal.Dialog>
      </Modal.Container>
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
