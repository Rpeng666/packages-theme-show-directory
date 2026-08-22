/**
 * LinkCard — a grid of quiet, tappable link cards (title + optional
 * description + optional tags). Used for navigation surfaces like the
 * image-size guide index ("pick a platform").
 */
export interface LinkCardItem {
  title: string
  description?: string
  href?: string
  /** Small mono chips under the description (e.g. "1080×1080") */
  tags?: string[]
}

export interface LinkCardProps {
  items: LinkCardItem[]
  /** Grid columns (1-3) */
  columns?: number
  className?: string
}
