/**
 * HintBanner contract — a generic info banner with up to two hint segments
 * (e.g. "use the top-right menu to operate" + "desktop recommended"). Pure
 * presentation; the copy is injected by the app (optional, no defaults).
 * pixel → PixelHintBanner, default → shadcn-style.
 */
export interface HintBannerProps {
  /** 顶部提示（操作位置说明） */
  actionHint?: string
  /** 推荐说明 */
  recommendHint?: string
  className?: string
}
