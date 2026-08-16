/**
 * ToolHeader contract — a generic tool workbench brand header: brand lockup
 * (icon + brand/tool titles), slogan, source hint and an outbound-links row
 * (e.g. pro workbench / social / GitHub). Pure presentation; all copy and links
 * are injected by the app (no hardcoded text, so no `t` prop needed).
 * pixel → PixelToolHeader, default → shadcn-style.
 */
export interface ToolHeaderLink {
  label: string
  href: string
  icon?: 'external' | 'xiaohongshu' | 'github'
  badge?: string
  color?: string
}

export interface ToolHeaderProps {
  /** 主标题（品牌名） */
  brand: string
  /** 副标题（工具名） */
  title: string
  /** 标题旁的版本标注 */
  titleBadge?: string
  /** 标语 */
  slogan?: string
  /** 来源提示 */
  sourceHint?: string
  /** 链接行（专业工作台/小红书/GitHub 等） */
  links?: ToolHeaderLink[]
  className?: string
}
