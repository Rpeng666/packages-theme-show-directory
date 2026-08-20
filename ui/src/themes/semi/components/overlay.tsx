'use client'

import * as React from 'react'
import { Modal, Typography, Button, Banner } from '@douyinfe/semi-ui'
import type { DialogProps } from '@template/ui'
import type { HintBannerProps } from '@template/ui'
import type { PromoModalProps } from '@template/ui'

const { Title, Text } = Typography

const WIDTH: Record<string, number> = { sm: 420, md: 520, lg: 720, xl: 960 }

/** Semi Dialog — Modal with header title + body + footer. */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  className = '',
}: DialogProps) {
  return (
    <Modal
      visible={open}
      onCancel={() => onOpenChange(false)}
      onOk={undefined}
      footer={footer}
      title={title}
      maskClosable
      width={WIDTH[size] ?? 520}
      className={className}
    >
      {description && (
        <Text type="tertiary" size="small" style={{ display: 'block', marginBottom: 8 }}>
          {description}
        </Text>
      )}
      {children}
    </Modal>
  )
}

/**
 * Semi PromoModal — a Modal implementing the shared PromoModalProps contract:
 * title/description + stay/go actions. The `go` action navigates to goHref;
 * business wiring (which URL to send the user to) is injected by the app.
 */
export function PromoModal({
  isOpen,
  onClose,
  title,
  description,
  stayLabel,
  goLabel,
  goHref,
  closeLabel,
  icon,
  className = '',
}: PromoModalProps) {
  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      title={title}
      closeOnEsc
      maskClosable
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button theme="light" onClick={onClose} aria-label={closeLabel}>
            {stayLabel}
          </Button>
          <Button theme="solid" onClick={() => { window.location.href = goHref }}>
            {goLabel}
          </Button>
        </div>
      }
      width={480}
      className={className}
    >
      {icon ? <div style={{ marginBottom: 12 }}>{icon}</div> : null}
      <Text type="tertiary" style={{ lineHeight: 1.7 }}>
        {description}
      </Text>
    </Modal>
  )
}

/** Semi HintBanner — actionable tip for the cleaner/tool workbench. */
export function HintBanner({ actionHint, recommendHint, className = '' }: HintBannerProps) {
  if (!actionHint && !recommendHint) return null
  return (
    <Banner
      type="info"
      icon={null}
      description={
        <div className={className} style={{ lineHeight: 1.6 }}>
          {actionHint && <div>{actionHint}</div>}
          {recommendHint && (
            <div style={{ marginTop: 4, color: 'var(--semi-color-text-2)' }}>{recommendHint}</div>
          )}
        </div>
      }
    />
  )
}