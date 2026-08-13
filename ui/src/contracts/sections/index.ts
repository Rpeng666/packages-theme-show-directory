/**
 * Section contracts — the data boundary between the app's business layer
 * (pricing payment/i18n, hero link/image) and the package's presentational
 * sections. Each section receives `section` data + injected deps, and renders
 * theme visuals only.
 */
export type { HeroProps, SectionLink, SectionImage } from './hero'
export type { FeaturesGridProps } from './features-grid'
export type { FeaturesProps } from './features'
export type { FeaturesAccordionProps } from './features-accordion'
export type { FeaturesCompareProps } from './features-compare'
export type { ToolsGridProps, ToolGridLink } from './tools-grid'
export type { ShowcasesProps, ShowcaseLink, ShowcaseImage } from './showcases'
export type { TestimonialsProps } from './testimonials'
export type { PricingProps } from './pricing'
export type { FaqProps } from './faq'
export type { CtaProps, CtaLink } from './cta'
export type { FeaturesFlowProps, FeaturesListProps } from './features-media'
export type { BlogProps, BlogPost, BlogCategory } from './blog'
export type { BlogDetailProps, BlogDetailPost, RelatedPost } from './blog-detail'
export type {
  RelatedPostsProps,
  BlogToolCtaProps,
  BlogCtaData,
} from './blog-cta'
