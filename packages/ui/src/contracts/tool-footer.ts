/**
 * ToolFooter contract — a minimal app-workbench footer with an optional
 * donation/CTA button + copyright line. Pure presentation; copy + click are
 * injected by the app. pixel → PixelToolFooter, default → shadcn-style.
 */
export interface ToolFooterProps {
  /** 版权文案 */
  copyright?: string
  /** 打赏/CTA 按钮 */
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}
