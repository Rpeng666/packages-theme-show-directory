import type * as React from 'react'

/**
 * Modal/Dialog contract — a modal dialog with title + body + optional footer.
 * pixel → PixelModal, default → shadcn Dialog.
 */
export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description?: React.ReactNode
  /** 弹窗主体 */
  children: React.ReactNode
  /** 底部节点（default 用 footer 区，pixel 用 footer slot） */
  footer?: React.ReactNode
  /** 宽度语义 */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}
