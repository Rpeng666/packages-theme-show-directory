/**
 * Promo/Announcement modal contract — a full-screen "go somewhere" overlay
 * (e.g. "new workbench is live, go check it out"). Pure presentation; open
 * state + copy are injected by the app. pixel → PixelPromoModal, default →
 * shadcn Dialog fallback.
 */
export interface PromoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  /** 停留按钮文案 */
  stayLabel: string
  /** 前往按钮文案 */
  goLabel: string
  /** 前往目标 URL */
  goHref: string
  /** 关闭按钮 aria-label（缺省为 "Close"） */
  closeLabel?: string
  /** 图标节点（可选，默认用外部链接图标） */
  icon?: React.ReactNode
  className?: string
}
