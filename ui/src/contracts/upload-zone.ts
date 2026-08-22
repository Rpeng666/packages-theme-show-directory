import type { ReactNode } from 'react'

/**
 * UploadZone contract — a generic dashed drop target for file upload. Shows an
 * icon + primary copy (with an optional clickable label), a format hint and an
 * optional tip box. Pure presentation; drag/click callbacks and copy are
 * injected by the app. pixel → PixelUploadZone, default → shadcn-style.
 */
export interface UploadZoneProps {
  /** 是否已挂载（控制点击是否可用） */
  isMounted: boolean
  /** 拖拽/点击回调（app 注入） */
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onClick: () => void
  /** 原生文件选择回调（semi Upload beforeUpload 直传 File；default 忽略） */
  onFile?: (file: File) => void
  /** 主文案（含可点击部分） */
  primaryText?: ReactNode
  /** 可点击的「选择文件」文案 */
  clickLabel?: string
  /** 支持的格式说明 */
  formatHint?: string
  /** 显示小贴士 */
  showTip?: boolean
  tipText?: string
  className?: string
}
