/**
 * @template/ui — theme-able component primitives + sections.
 *
 * Contracts (reusable semantics) + per-theme implementations + a runtime
 * registry. Consumed by the app through @template/ui; the app's shared/ui
 * components re-export these for zero-churn call sites.
 */
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  BadgeProps,
  BadgeVariant,
  CardProps,
  CardBadge,
  SkeletonProps,
  FieldTone,
  FieldSize,
  InputProps,
  TextareaProps,
  SwitchProps,
  ProgressProps,
  TooltipProps,
} from './contracts'

export type {
  HeroProps,
  SectionLink,
  SectionImage,
  FeaturesGridProps,
  FeaturesCompareProps,
  TestimonialsProps,
  PricingProps,
  FaqProps,
  CtaProps,
  FeaturesFlowProps,
  FeaturesListProps,
  BlogProps,
  BlogDetailProps,
  RelatedPostsProps,
  BlogToolCtaProps,
} from './contracts/sections'

export type { HeaderProps } from './contracts/header'
export type { FooterProps } from './contracts/footer'
export type { BoxProps, BoxTone, BoxVariant, BoxPadding, BoxRadius, BoxAs } from './contracts/box'
export type { LabelProps } from './contracts/label'
export type { AvatarProps } from './contracts/avatar'
export type { DialogProps } from './contracts/dialog'
export type { DropdownProps, DropdownItem } from './contracts/dropdown'
export type { StackProps, ClusterProps, GridProps, DividerProps } from './contracts/layout'
export type {
  SelectProps,
  SelectOption,
  ToggleProps,
  ToggleGroupProps,
  BareTextareaProps,
} from './contracts/form'
export type { IconFrameProps } from './contracts/iconframe'
export { Footer } from './themes/pixel/footer'
export { PixelThemeToggler } from './themes/pixel/theme-toggler'
export type { PageShellProps } from './contracts/pageshell'
export { PageShell } from './themes/pixel/pageshell'

// Shared presentational components (no app deps).
export { SmartIcon } from './components/smart-icon'
export { ScrollAnimation } from './components/scroll-animation'
export { PixelIcon } from './components/pixel-icon'
export type { PixelIconProps } from './components/pixel-icon'

// Theme-aware thin Tooltip (contract) — distinct from the composite
// default tooltip sub-components below.
export { Tooltip } from './tooltip'

// Shared section data types.
export type { Section, SectionItem, Hero, Testimonials } from './types/landing'
export type { Pricing, PricingItem, PricingCurrency, PricingGroup } from './types/pricing'
export type { Button, NavItem, Image } from './types/common'

export {
  ThemeRegistryProvider,
  useThemeComponent,
  useActiveTheme,
} from './context'

export {
  registry,
  getThemeManifest,
  resolveComponent,
  resolveSection,
  defaultThemeName,
} from './registry'
export type {
  ThemeName,
  ThemeComponents,
  ThemeManifest,
  PartialThemeComponents,
  SectionComponents,
  PartialSectionComponents,
} from './registry'

export { cn } from './lib/utils'
export { stripTemplateTokens } from './lib/strip-tokens'

// cva variant definitions (shadcn template) — re-exported so app callers like
// pagination.tsx can reach buttonVariants / badgeVariants.
export { buttonVariants } from './themes/default/button'
export { badgeVariants } from './themes/default/badge'
// Card composite sub-components (layout primitives, always default-flavored).
export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from './themes/default/card'
// Tooltip composite sub-components (default shadcn, for app-side composable
// call sites that don't need theme switching).
export {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from './themes/default/tooltip-composite'
