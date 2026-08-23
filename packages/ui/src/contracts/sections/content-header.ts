import type { ReactNode } from 'react'

/**
 * ContentHeader — the head of a content/document page: breadcrumb, H1 title,
 * tagline and intro paragraph. Distinct from the console PageHeader (which is
 * for settings/admin chrome with tabs + actions). Used by the programmatic
 * image-size guide pages.
 */
export interface ContentHeaderProps {
  /** Breadcrumb trail (last crumb = current page, rendered as plain text) */
  crumbs?: Array<{ label: string; href?: string }>
  title?: ReactNode
  /** One-line tagline under the title (muted, medium) */
  tagline?: ReactNode
  /** Intro paragraph (muted, larger) */
  intro?: ReactNode
  className?: string
}
