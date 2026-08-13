/**
 * Component registry — theme name → component implementations.
 *
 * This is the piece that makes the contracts reusable across themes: a theme
 * declares which implementations back each contract key, and consumers always
 * resolve through `resolveComponent`/`useThemeComponent`, never importing a
 * concrete visual implementation directly.
 *
 * Scope note: this package registers 9 primitives (Button/Badge/Card/Skeleton
 * + Input/Textarea/Switch/Progress/Tooltip) + each theme's AmbientProvider.
 * Section-level components (Hero, Pricing, …) are app-side concerns (they bind
 * payment/i18n business deps) and live in the app.
 */
import type { ComponentType, ReactNode } from 'react'

import type { ButtonProps } from './contracts/button'
import type { BadgeProps } from './contracts/badge'
import type { CardProps } from './contracts/card'
import type { SkeletonProps } from './contracts/skeleton'
import type { InputProps } from './contracts/input'
import type { TextareaProps } from './contracts/textarea'
import type { SwitchProps } from './contracts/switch'
import type { ProgressProps } from './contracts/progress'
import type { TooltipProps } from './contracts/tooltip'
import type { HeaderProps } from './contracts/header'
import type { FooterProps } from './contracts/footer'
import type { BoxProps } from './contracts/box'
import type { LabelProps } from './contracts/label'
import type { AvatarProps } from './contracts/avatar'
import type { DialogProps } from './contracts/dialog'
import type { DropdownProps } from './contracts/dropdown'
import type { StackProps, ClusterProps, GridProps, DividerProps } from './contracts/layout'
import type { SelectProps, ToggleProps, ToggleGroupProps, BareTextareaProps } from './contracts/form'
import type { IconFrameProps } from './contracts/iconframe'
import type { HeroProps } from './contracts/sections/hero'
import type { FaqProps } from './contracts/sections/faq'
import type { CtaProps } from './contracts/sections/cta'
import type { FeaturesGridProps } from './contracts/sections/features-grid'
import type { FeaturesCompareProps } from './contracts/sections/features-compare'
import type { TestimonialsProps } from './contracts/sections/testimonials'
import type { PricingProps } from './contracts/sections/pricing'
import type { FeaturesFlowProps, FeaturesListProps } from './contracts/sections/features-media'
import type { BlogProps } from './contracts/sections/blog'
import type { BlogDetailProps } from './contracts/sections/blog-detail'
import type { RelatedPostsProps, BlogToolCtaProps } from './contracts/sections/blog-cta'

import { Button as DefaultButton } from './themes/default/button'
import { Badge as DefaultBadge } from './themes/default/badge'
import { Card as DefaultCard } from './themes/default/card'
import { Skeleton as DefaultSkeleton } from './themes/default/skeleton'
import { Input as DefaultInput } from './themes/default/input'
import { Textarea as DefaultTextarea } from './themes/default/textarea'
import { Switch as DefaultSwitch } from './themes/default/switch'
import { Progress as DefaultProgress } from './themes/default/progress'
import { Tooltip as DefaultTooltip } from './themes/default/tooltip'
import { Header as DefaultHeader } from './themes/default/header'
import { Footer as DefaultFooter } from './themes/default/footer'
import { Box as DefaultBox } from './themes/default/box'
import { Label as DefaultLabel } from './themes/default/label'
import { Avatar as DefaultAvatar } from './themes/default/avatar'
import { Dialog as DefaultDialog } from './themes/default/dialog'
import { Dropdown as DefaultDropdown } from './themes/default/dropdown'
import {
  Stack as DefaultStack,
  Cluster as DefaultCluster,
  Grid as DefaultGrid,
  Divider as DefaultDivider,
} from './themes/default/layout'
import { Select as DefaultSelect, Toggle as DefaultToggle, ToggleGroup as DefaultToggleGroup, BareTextarea as DefaultBareTextarea } from './themes/default/form'
import { IconFrame as DefaultIconFrame } from './themes/default/iconframe'
import { Hero as DefaultHero } from './themes/default/sections/hero'
import { FeaturesGrid as DefaultFeaturesGrid } from './themes/default/sections/features-grid'
import { FeaturesCompare as DefaultFeaturesCompare } from './themes/default/sections/features-compare'
import { Testimonials as DefaultTestimonials } from './themes/default/sections/testimonials'
import { Pricing as DefaultPricing } from './themes/default/sections/pricing'

import { Button as PixelButton } from './themes/pixel/button'
import { Badge as PixelBadge } from './themes/pixel/badge'
import { Card as PixelCard } from './themes/pixel/card'
import { Skeleton as PixelSkeleton } from './themes/pixel/skeleton'
import { Input as PixelInput } from './themes/pixel/input'
import { Textarea as PixelTextarea } from './themes/pixel/textarea'
import { Switch as PixelSwitch } from './themes/pixel/switch'
import { Progress as PixelProgress } from './themes/pixel/progress'
import { Tooltip as PixelTooltip } from './themes/pixel/tooltip'
import { Header as PixelHeader } from './themes/pixel/header'
import { Footer as PixelFooter } from './themes/pixel/footer'
import { Box as PixelBox } from './themes/pixel/box'
import { Label as PixelLabel } from './themes/pixel/label'
import { Avatar as PixelAvatar } from './themes/pixel/avatar'
import { Dialog as PixelDialog } from './themes/pixel/dialog'
import { Dropdown as PixelDropdown } from './themes/pixel/dropdown'
import {
  Stack as PixelStack,
  Cluster as PixelCluster,
  Grid as PixelGrid,
  Divider as PixelDivider,
} from './themes/pixel/layout'
import { Select as PixelSelect, Toggle as PixelToggle, ToggleGroup as PixelToggleGroup, BareTextarea as PixelBareTextarea } from './themes/pixel/form'
import { IconFrame as PixelIconFrame } from './themes/pixel/iconframe'
import { Hero as PixelHero } from './themes/pixel/sections/hero'
import { Faq as PixelFaq } from './themes/pixel/sections/faq'
import { Cta as PixelCta } from './themes/pixel/sections/cta'
import { FeaturesGrid as PixelFeaturesGrid } from './themes/pixel/sections/features/features-grid'
import { FeaturesCompare as PixelFeaturesCompare } from './themes/pixel/sections/features/features-compare'
import { Testimonials as PixelTestimonials } from './themes/pixel/sections/testimonials'
import { Pricing as PixelPricing } from './themes/pixel/sections/pricing'
import { FeaturesFlow as PixelFeaturesFlow } from './themes/pixel/sections/features/features-flow'
import { FeaturesList as PixelFeaturesList } from './themes/pixel/sections/features/features-list'
import { Blog as PixelBlog } from './themes/pixel/sections/blog/blog'
import { BlogDetail as PixelBlogDetail } from './themes/pixel/sections/blog/blog-detail'
import { RelatedPosts as PixelRelatedPosts } from './themes/pixel/sections/blog/related-posts'
import { BlogToolCta as PixelBlogToolCta } from './themes/pixel/sections/blog/blog-tool-cta'
import { PixelAmbientProvider } from './themes/pixel/ambient'

export type ThemeName = string

export interface ThemeComponents {
  Button: ComponentType<ButtonProps>
  Badge: ComponentType<BadgeProps>
  Card: ComponentType<CardProps>
  Skeleton: ComponentType<SkeletonProps>
  Input: ComponentType<InputProps>
  Textarea: ComponentType<TextareaProps>
  Switch: ComponentType<SwitchProps>
  Progress: ComponentType<ProgressProps>
  Tooltip: ComponentType<TooltipProps>
  Header: ComponentType<HeaderProps>
  Footer: ComponentType<FooterProps>
  Box: ComponentType<BoxProps>
  Label: ComponentType<LabelProps>
  Avatar: ComponentType<AvatarProps>
  Dialog: ComponentType<DialogProps>
  Dropdown: ComponentType<DropdownProps>
  Stack: ComponentType<StackProps>
  Cluster: ComponentType<ClusterProps>
  Grid: ComponentType<GridProps>
  Divider: ComponentType<DividerProps>
  Select: ComponentType<SelectProps>
  Toggle: ComponentType<ToggleProps>
  ToggleGroup: ComponentType<ToggleGroupProps>
  BareTextarea: ComponentType<BareTextareaProps>
  IconFrame: ComponentType<IconFrameProps>
}

/**
 * Section components — the landing page blocks (Hero, Faq, Cta, …). Their
 * props differ per section (each has its own *Props contract), so they're
 * registered under a separate key and resolved via `resolveSection` (not the
 * single-typed `resolveComponent`).
 */
export interface SectionComponents {
  Hero: ComponentType<HeroProps>
  Faq: ComponentType<FaqProps>
  Cta: ComponentType<CtaProps>
  FeaturesGrid: ComponentType<FeaturesGridProps>
  FeaturesCompare: ComponentType<FeaturesCompareProps>
  FeaturesFlow: ComponentType<FeaturesFlowProps>
  FeaturesList: ComponentType<FeaturesListProps>
  Blog: ComponentType<BlogProps>
  BlogDetail: ComponentType<BlogDetailProps>
  RelatedPosts: ComponentType<RelatedPostsProps>
  BlogToolCta: ComponentType<BlogToolCtaProps>
  Testimonials: ComponentType<TestimonialsProps>
  Pricing: ComponentType<PricingProps>
}

export type PartialSectionComponents = Partial<SectionComponents>

export interface SectionManifest {
  name: ThemeName
  sections: PartialSectionComponents
}

export type PartialThemeComponents = Partial<ThemeComponents>

export interface ThemeManifest {
  name: ThemeName
  /** 该主题的「环境 Provider」（如 pixel → PixelAmbientProvider），由注册表统一注入 */
  AmbientProvider?: ComponentType<{ children: ReactNode }>
  components: PartialThemeComponents
  /** 该主题的 landing section 组件（Hero/Faq/Cta/…） */
  sections?: PartialSectionComponents
}

export const defaultThemeName = 'default'

/**
 * Active theme from build-time env (NEXT_PUBLIC_THEME), mirroring the app's
 * getActiveTheme. The package reads the env directly so callers can resolve
 * components without passing the theme explicitly (e.g. resolveComponent('Footer')).
 */
export function getActiveTheme(): ThemeName {
  return (process.env.NEXT_PUBLIC_THEME as ThemeName) || defaultThemeName
}

export const registry: Record<ThemeName, ThemeManifest> = {
  default: {
    name: 'default',
    components: {
      Button: DefaultButton,
      Badge: DefaultBadge,
      Card: DefaultCard,
      Skeleton: DefaultSkeleton,
      Input: DefaultInput,
      Textarea: DefaultTextarea,
      Switch: DefaultSwitch,
      Progress: DefaultProgress,
      Tooltip: DefaultTooltip,
      Header: DefaultHeader,
      Footer: DefaultFooter,
      Box: DefaultBox,
      Label: DefaultLabel,
      Avatar: DefaultAvatar,
      Dialog: DefaultDialog,
      Dropdown: DefaultDropdown,
      Stack: DefaultStack,
      Cluster: DefaultCluster,
      Grid: DefaultGrid,
      Divider: DefaultDivider,
      Select: DefaultSelect,
      Toggle: DefaultToggle,
      ToggleGroup: DefaultToggleGroup,
      BareTextarea: DefaultBareTextarea,
      IconFrame: DefaultIconFrame,
    },
    sections: {
      Hero: DefaultHero,
      FeaturesGrid: DefaultFeaturesGrid,
      FeaturesCompare: DefaultFeaturesCompare,
      Testimonials: DefaultTestimonials,
      Pricing: DefaultPricing,
    },
  },
  pixel: {
    name: 'pixel',
    AmbientProvider: PixelAmbientProvider,
    components: {
      Button: PixelButton,
      Badge: PixelBadge,
      Card: PixelCard,
      Skeleton: PixelSkeleton,
      Input: PixelInput,
      Textarea: PixelTextarea,
      Switch: PixelSwitch,
      Progress: PixelProgress,
      Tooltip: PixelTooltip,
      Header: PixelHeader,
      Footer: PixelFooter,
      Box: PixelBox,
      Label: PixelLabel,
      Avatar: PixelAvatar,
      Dialog: PixelDialog,
      Dropdown: PixelDropdown,
      Stack: PixelStack,
      Cluster: PixelCluster,
      Grid: PixelGrid,
      Divider: PixelDivider,
      Select: PixelSelect,
      Toggle: PixelToggle,
      ToggleGroup: PixelToggleGroup,
      BareTextarea: PixelBareTextarea,
      IconFrame: PixelIconFrame,
    },
    sections: {
      Hero: PixelHero,
      Faq: PixelFaq,
      Cta: PixelCta,
      FeaturesGrid: PixelFeaturesGrid,
      FeaturesCompare: PixelFeaturesCompare,
      FeaturesFlow: PixelFeaturesFlow,
      FeaturesList: PixelFeaturesList,
      Blog: PixelBlog,
      BlogDetail: PixelBlogDetail,
      RelatedPosts: PixelRelatedPosts,
      BlogToolCta: PixelBlogToolCta,
      Testimonials: PixelTestimonials,
      Pricing: PixelPricing,
    },
  },
}

export function getThemeManifest(name?: ThemeName): ThemeManifest {
  return registry[name ?? defaultThemeName] ?? registry[defaultThemeName]
}

/**
 * Resolve a contract key to its implementation for a theme, falling back to
 * the default theme when a theme hasn't registered that component (mirrors
 * the app's getThemeBlock fallback-to-default semantics).
 */
/**
 * Resolve a contract key to its implementation. `theme` is optional — when
 * omitted, resolves against the active theme (NEXT_PUBLIC_THEME), falling back
 * to the default theme when the theme hasn't registered that component.
 *
 * Usage: resolveComponent('Footer')  /  resolveComponent('Button', 'default')
 */
export function resolveComponent<K extends keyof ThemeComponents>(
  key: K,
  theme?: ThemeName,
): ThemeComponents[K] {
  const t = theme ?? getActiveTheme()
  return (
    getThemeManifest(t).components[key] ??
    getThemeManifest(defaultThemeName).components[key]!
  ) as ThemeComponents[K]
}

/**
 * Resolve a section (Hero/Faq/Cta/…). `theme` is optional — when omitted,
 * resolves against the active theme, falling back to the default theme.
 *
 * Usage: resolveSection('Faq')  /  resolveSection('Hero', 'default')
 */
export function resolveSection<K extends keyof SectionComponents>(
  key: K,
  theme?: ThemeName,
): SectionComponents[K] {
  const t = theme ?? getActiveTheme()
  return (
    getThemeManifest(t).sections?.[key] ??
    getThemeManifest(defaultThemeName).sections?.[key]!
  )
}
