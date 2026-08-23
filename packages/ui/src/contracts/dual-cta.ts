/**
 * DualCta contract — two stacked call-to-action buttons (e.g. enter manual
 * mode / enter focus mode). Pure presentation; click handlers + labels are
 * injected by the app (labels optional, no defaults).
 * pixel → PixelDualCta, default → shadcn-style.
 */
export interface DualCtaProps {
  /** 主要 CTA（如进入手动编辑模式） */
  onPrimary: () => void
  /** 次要 CTA（如进入专心模式） */
  onSecondary: () => void
  /** 主要 CTA 文案 */
  primaryLabel?: string
  /** 次要 CTA 文案 */
  secondaryLabel?: string
  className?: string
}
