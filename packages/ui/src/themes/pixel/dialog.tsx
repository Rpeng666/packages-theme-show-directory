'use client'

import { PixelModal } from '@pxlkit/ui-kit'
import type { DialogProps } from '../../contracts/dialog'

/**
 * Pixel Dialog — pxlkit's PixelModal (old-school pixel window chrome).
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
}: DialogProps) {
  return (
    <PixelModal
      open={open}
      onClose={() => onOpenChange(false)}
      title={typeof title === 'string' ? title : ''}
      size={size === 'xl' ? 'xl' : size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
      footer={footer}
      description={description}
    >
      {title !== '' && typeof title !== 'string' ? (
        <div className="mb-2">{title}</div>
      ) : null}
      {children}
    </PixelModal>
  )
}
