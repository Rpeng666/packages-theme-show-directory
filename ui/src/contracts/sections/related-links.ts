/**
 * RelatedLinks — a quiet set of related links rendered as pills/chips.
 * Used by content pages (image-size guides, docs) for internal linking.
 */
export interface RelatedLink {
  label: string
  href: string
}

export interface RelatedLinksProps {
  title?: string
  links: RelatedLink[]
  className?: string
}
