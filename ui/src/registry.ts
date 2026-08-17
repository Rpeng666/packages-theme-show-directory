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
import { createElement } from 'react'
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
import type { PromoModalProps } from './contracts/promo-modal'
import type { ToolFooterProps } from './contracts/tool-footer'
import type { ToolHeaderProps } from './contracts/tool-header'
import type { UploadZoneProps } from './contracts/upload-zone'
import type { ToolSettingsProps } from './contracts/tool-settings'
import type { HintBannerProps } from './contracts/hint-banner'
import type { DualCtaProps } from './contracts/dual-cta'
import type { DropdownProps } from './contracts/dropdown'
import type { StackProps, ClusterProps, GridProps, DividerProps } from './contracts/layout'
import type { SelectProps, ToggleProps, ToggleGroupProps, BareTextareaProps } from './contracts/form'
import type { InputNumberProps } from './contracts/input-number'
import type { SliderProps } from './contracts/slider'
import type { TagProps } from './contracts/tag'
import type { TabsProps } from './contracts/tabs'
import type { EmptyProps } from './contracts/empty'
import type { SpinProps } from './contracts/spin'
import type { StepsProps } from './contracts/steps'
import type { TableProps } from './contracts/table'
import type { DescriptionsProps } from './contracts/descriptions'
import type { BannerProps } from './contracts/banner'
import type { IconFrameProps } from './contracts/iconframe'
import type { HeroProps } from './contracts/sections/hero'
import type { FaqProps } from './contracts/sections/faq'
import type { CtaProps } from './contracts/sections/cta'
import type { FeaturesGridProps } from './contracts/sections/features-grid'
import type { FeaturesStepProps } from './contracts/sections/features-step'
import type { FeaturesProps } from './contracts/sections/features'
import type { FeaturesAccordionProps } from './contracts/sections/features-accordion'
import type { FeaturesCompareProps } from './contracts/sections/features-compare'
import type { ToolsGridProps } from './contracts/sections/tools-grid'
import type { ShowcasesProps } from './contracts/sections/showcases'
import type { ShowcasesFlowProps } from './contracts/sections/showcases-flow'
import type { TestimonialsProps } from './contracts/sections/testimonials'
import type { PricingProps } from './contracts/sections/pricing'
import type { FeaturesFlowProps, FeaturesListProps } from './contracts/sections/features-media'
import type { BlogProps } from './contracts/sections/blog'
import type { BlogDetailProps } from './contracts/sections/blog-detail'
import type { HeroCleanerProps } from './contracts/sections/hero-cleaner'
import type { RelatedPostsProps, BlogToolCtaProps } from './contracts/sections/blog-cta'
import type { CleanerWorkbenchProps } from './contracts/sections/cleaner-workbench'
import type { CleanerOutputProps } from './themes/pixel/sections/cleaner'

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
import { PromoModal as DefaultPromoModal } from './themes/default/promo-modal'
import { ToolFooter as DefaultToolFooter } from './themes/default/tool-footer'
import { ToolHeader as DefaultToolHeader } from './themes/default/tool-header'
import { UploadZone as DefaultUploadZone } from './themes/default/upload-zone'
import { ToolSettings as DefaultToolSettings } from './themes/default/tool-settings'
import { HintBanner as DefaultHintBanner } from './themes/default/hint-banner'
import { DualCta as DefaultDualCta } from './themes/default/dual-cta'
import { Dropdown as DefaultDropdown } from './themes/default/dropdown'
import {
  Stack as DefaultStack,
  Cluster as DefaultCluster,
  Grid as DefaultGrid,
  Divider as DefaultDivider,
} from './themes/default/layout'
import { Select as DefaultSelect, Toggle as DefaultToggle, ToggleGroup as DefaultToggleGroup, BareTextarea as DefaultBareTextarea } from './themes/default/form'
import { IconFrame as DefaultIconFrame } from './themes/default/iconframe'
import { InputNumber as DefaultInputNumber } from './themes/default/input-number'
import { Slider as DefaultSlider } from './themes/default/slider'
import { Tag as DefaultTag } from './themes/default/tag'
import { Tabs as DefaultTabs } from './themes/default/tabs'
import { Empty as DefaultEmpty } from './themes/default/empty'
import { Spin as DefaultSpin } from './themes/default/spin'
import { Steps as DefaultSteps } from './themes/default/steps'
import { Table as DefaultTable } from './themes/default/table'
import { Descriptions as DefaultDescriptions } from './themes/default/descriptions'
import { Banner as DefaultBanner } from './themes/default/banner'
import { Hero as DefaultHero } from './themes/default/sections/hero'
import { FeaturesGrid as DefaultFeaturesGrid } from './themes/default/sections/features-grid'
import { Features as DefaultFeatures } from './themes/default/sections/features'
import { FeaturesAccordion as DefaultFeaturesAccordion } from './themes/default/sections/features-accordion'
import { FeaturesCompare as DefaultFeaturesCompare } from './themes/default/sections/features-compare'
import { ToolsGrid as DefaultToolsGrid } from './themes/default/sections/tools-grid'
import { Showcases as DefaultShowcases } from './themes/default/sections/showcases'
import { Testimonials as DefaultTestimonials } from './themes/default/sections/testimonials'
import { Pricing as DefaultPricing } from './themes/default/sections/pricing'
import { Faq as DefaultFaq } from './themes/default/sections/faq'
import { Cta as DefaultCta } from './themes/default/sections/cta'
import { FeaturesStep as DefaultFeaturesStep } from './themes/default/sections/features-step'
import { HeroCleaner as DefaultHeroCleaner } from './themes/default/sections/hero-cleaner'
import { Blog as DefaultBlog } from './themes/default/sections/blog'
import { BlogDetail as DefaultBlogDetail } from './themes/default/sections/blog-detail'
import { CleanerWorkbench as DefaultCleanerWorkbench, CleanerOutput as DefaultCleanerOutput } from './themes/default/sections/cleaner'

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
import { PromoModal as PixelPromoModal } from './themes/pixel/promo-modal'
import { ToolFooter as PixelToolFooter } from './themes/pixel/tool-footer'
import { ToolHeader as PixelToolHeader } from './themes/pixel/tool-header'
import { UploadZone as PixelUploadZone } from './themes/pixel/upload-zone'
import { ToolSettings as PixelToolSettings } from './themes/pixel/tool-settings'
import { HintBanner as PixelHintBanner } from './themes/pixel/hint-banner'
import { DualCta as PixelDualCta } from './themes/pixel/dual-cta'
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
import { FeaturesStep as PixelFeaturesStep } from './themes/pixel/sections/features/features-step'
import { Features as PixelFeatures } from './themes/pixel/sections/features/features'
import { FeaturesAccordion as PixelFeaturesAccordion } from './themes/pixel/sections/features/features-accordion'
import { FeaturesCompare as PixelFeaturesCompare } from './themes/pixel/sections/features/features-compare'
import { ToolsGrid as PixelToolsGrid } from './themes/pixel/sections/tools-grid'
import { Showcases as PixelShowcases } from './themes/pixel/sections/showcases'
import { ShowcasesFlow as PixelShowcasesFlow } from './themes/pixel/sections/showcases-flow'
import { Testimonials as PixelTestimonials } from './themes/pixel/sections/testimonials'
import { Pricing as PixelPricing } from './themes/pixel/sections/pricing'
import { FeaturesFlow as PixelFeaturesFlow } from './themes/pixel/sections/features/features-flow'
import { FeaturesList as PixelFeaturesList } from './themes/pixel/sections/features/features-list'
import { Blog as PixelBlog } from './themes/pixel/sections/blog/blog'
import { BlogDetail as PixelBlogDetail } from './themes/pixel/sections/blog/blog-detail'
import { RelatedPosts as PixelRelatedPosts } from './themes/pixel/sections/blog/related-posts'
import { BlogToolCta as PixelBlogToolCta } from './themes/pixel/sections/blog/blog-tool-cta'
import { PixelAmbientProvider } from './themes/pixel/ambient'

// Perler-beads (pixel-only workbench) — single-theme; registered so app-side
// bridges resolve through the registry instead of deep-importing the pixel
// subpath. `default` intentionally has no perler entries (feature is pixel-only).
import { ToolBar as PixelPerlerToolBar } from './themes/pixel/sections/perler-beads'
import { ColorPalette as PixelPerlerColorPalette } from './themes/pixel/sections/perler-beads'
import { GridTooltip as PixelPerlerGridTooltip } from './themes/pixel/sections/perler-beads'
import { FloatingToolbar as PixelPerlerFloatingToolbar } from './themes/pixel/sections/perler-beads'
import { DownloadSettingsModal as PixelPerlerDownloadSettingsModal } from './themes/pixel/sections/perler-beads'
import { ColorStatusBar as PixelPerlerColorStatusBar } from './themes/pixel/sections/perler-beads'
import { ProgressBar as PixelPerlerProgressBar } from './themes/pixel/sections/perler-beads'
import { ColorPanel as PixelPerlerColorPanel } from './themes/pixel/sections/perler-beads'
import { SettingsPanel as PixelPerlerSettingsPanel } from './themes/pixel/sections/perler-beads'
import { CelebrationAnimation as PixelPerlerCelebrationAnimation } from './themes/pixel/sections/perler-beads'
import { MagnifierSelectionOverlay as PixelPerlerMagnifierSelectionOverlay } from './themes/pixel/sections/perler-beads'
import { FocusCanvas as PixelPerlerFocusCanvas } from './themes/pixel/sections/perler-beads'
import { FocusHeader as PixelPerlerFocusHeader } from './themes/pixel/sections/perler-beads'
import { PixelatedPreviewCanvas as PixelPerlerPixelatedPreviewCanvas } from './themes/pixel/sections/perler-beads'
import { CompletionCard as PixelPerlerCompletionCard } from './themes/pixel/sections/perler-beads'
import { DonationModal as PixelPerlerDonationModal } from './themes/pixel/sections/perler-beads'
import { MagnifierTool as PixelPerlerMagnifierTool } from './themes/pixel/sections/perler-beads'
import { InstallPWA as PixelPerlerInstallPWA } from './themes/pixel/sections/perler-beads'
import { FocusModePreDownloadModal as PixelPerlerFocusModePreDownloadModal } from './themes/pixel/sections/perler-beads'
import { CustomPaletteEditor as PixelPerlerCustomPaletteEditor } from './themes/pixel/sections/perler-beads'
import { FloatingColorPalette as PixelPerlerFloatingColorPalette } from './themes/pixel/sections/perler-beads'
import { ColorStatsPanel as PixelPerlerColorStatsPanel } from './themes/pixel/sections/perler-beads'
import { ImageCompareModal as PixelPerlerImageCompareModal } from './themes/pixel/sections/perler-beads'
import { ShareModal as PixelPerlerShareModal } from './themes/pixel/sections/perler-beads'
import { PerlerGalleryCard as PixelPerlerGalleryCard } from './themes/pixel/sections/perler-beads'
import { PerlerGalleryFeed as PixelPerlerGalleryFeed } from './themes/pixel/sections/perler-beads'
import { PerlerCommunityFeed as PixelPerlerCommunityFeed } from './themes/pixel/sections/perler-beads'
import { PerlerCommunityCard as PixelPerlerCommunityCard } from './themes/pixel/sections/perler-beads'
import { PerlerAppLanding as PixelPerlerAppLanding } from './themes/pixel/sections/perler-beads'
import { PerlerToolRail as PixelPerlerToolRail } from './themes/pixel/sections/perler-beads'
import { PerlerWorkBar as PixelPerlerWorkBar } from './themes/pixel/sections/perler-beads'
import { PerlerSelectionOverlay as PixelPerlerSelectionOverlay } from './themes/pixel/sections/perler-beads'
import { ColorSwatches as PixelPerlerColorSwatches } from './themes/pixel/sections/perler-beads'
import { SampleGallery as PixelPerlerSampleGallery } from './themes/pixel/sections/perler-beads'
import { LightToolDemo as PixelLightToolDemo } from './themes/pixel/light-tool-demo'
import { ParamGeneratorDemo as PixelParamGeneratorDemo } from './themes/pixel/light-tool-demo'
import { BackgroundGeneratorDemo as PixelBackgroundGeneratorDemo } from './themes/pixel/light-tool-demo'
import { GameIconGeneratorDemo as PixelGameIconGeneratorDemo } from './themes/pixel/light-tool-demo'
import { PaletteExtractorDemo as PixelPaletteExtractorDemo } from './themes/pixel/light-tool-demo'
import { ArtifactHero as PixelArtifactHero } from './themes/pixel/light-tool-demo'
import { CraftEntryNav as PixelCraftEntryNav } from './themes/pixel/light-tool-demo'
import { DitherSettingsPanel as PixelDitherSettingsPanel } from './themes/pixel/sections/dither'
import { DitherPreview as PixelDitherPreview } from './themes/pixel/sections/dither'
import { EditorShell as PixelEditorShell } from './themes/pixel/editor'
import { CleanerWorkbench as PixelCleanerWorkbench, CleanerOutput as PixelCleanerOutput } from './themes/pixel/sections/cleaner'
import { EditorToolbar as PixelEditorToolbar } from './themes/pixel/editor'
import { EditorSidebar as PixelEditorSidebar } from './themes/pixel/editor'
import { EditorCanvas as PixelEditorCanvas } from './themes/pixel/editor'

// Semi theme (@douyinfe/semi-ui) — separate workspace package (@template/semi).
// It implements the shared contracts; missing keys (ToolHeader/ToolFooter/
// ToolSettings/DualCta) fall back to the default theme.
import {
  Button as SemiButton,
  Badge as SemiBadge,
  Card as SemiCard,
  Input as SemiInput,
  Textarea as SemiTextarea,
  Switch as SemiSwitch,
  Progress as SemiProgress,
  Tooltip as SemiTooltip,
  Skeleton as SemiSkeleton,
  Select as SemiSelect,
  Toggle as SemiToggle,
  ToggleGroup as SemiToggleGroup,
  BareTextarea as SemiBareTextarea,
  Dropdown as SemiDropdown,
  Dialog as SemiDialog,
  PromoModal as SemiPromoModal,
  HintBanner as SemiHintBanner,
  Stack as SemiStack,
  Cluster as SemiCluster,
  Grid as SemiGrid,
  Divider as SemiDivider,
  Label as SemiLabel,
  Avatar as SemiAvatar,
  Box as SemiBox,
  IconFrame as SemiIconFrame,
  InputNumber as SemiInputNumber,
  Slider as SemiSlider,
  Tag as SemiTag,
  Tabs as SemiTabs,
  Empty as SemiEmpty,
  Spin as SemiSpin,
  Steps as SemiSteps,
  Table as SemiTable,
  Descriptions as SemiDescriptions,
  UploadZone as SemiUploadZone,
  Banner as SemiBanner,
  Header as SemiHeader,
  Footer as SemiFooter,
} from '@template/semi'
import {
  Hero as SemiHero,
  Features as SemiFeatures,
  FeaturesAccordion as SemiFeaturesAccordion,
  Faq as SemiFaq,
  Cta as SemiCta,
  Testimonials as SemiTestimonials,
  Pricing as SemiPricing,
} from '@template/semi'

import type {
  PerlerToolBarProps,
  PerlerColorPaletteProps,
  PerlerGridTooltipProps,
  PerlerFloatingToolbarProps,
  PerlerDownloadSettingsModalProps,
  PerlerColorStatusBarProps,
  PerlerProgressBarProps,
  PerlerColorPanelProps,
  PerlerSettingsPanelProps,
  PerlerCelebrationAnimationProps,
  PerlerMagnifierSelectionOverlayProps,
  PerlerFocusCanvasProps,
  PerlerFocusHeaderProps,
  PerlerPixelatedPreviewCanvasProps,
  PerlerCompletionCardProps,
  PerlerDonationModalProps,
  PerlerMagnifierToolProps,
  PerlerInstallPwaProps,
  PerlerFocusModePreDownloadModalProps,
  PerlerCustomPaletteEditorProps,
  PerlerFloatingColorPaletteProps,
  PerlerColorStatsPanelProps,
  PerlerImageCompareModalProps,
  PerlerShareModalProps,
  PerlerGalleryCardProps,
  PerlerGalleryFeedProps,
  PerlerCommunityFeedProps,
  PerlerCommunityCardProps,
  PerlerAppLandingProps,
  PerlerToolRailProps,
  PerlerWorkBarProps,
  PerlerSelectionOverlayProps,
  PerlerColorSwatchesProps,
  PerlerSampleGalleryProps,
} from './themes/pixel/sections/perler-beads'
import type { LightToolDemoProps } from './themes/pixel/light-tool-demo'
import type { ParamGeneratorDemoProps } from './themes/pixel/light-tool-demo'
import type { ArtifactHeroProps } from './themes/pixel/light-tool-demo'
import type { CraftEntryNavProps } from './themes/pixel/light-tool-demo'
import type { DitherSettingsPanelProps } from './themes/pixel/sections/dither'
import type { DitherPreviewProps } from './themes/pixel/sections/dither'
import type { EditorShellProps } from './themes/pixel/editor'
import type { EditorToolbarProps } from './themes/pixel/editor'
import type { EditorSidebarProps } from './themes/pixel/editor'
import type { EditorCanvasProps } from './themes/pixel/editor'

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
  PromoModal: ComponentType<PromoModalProps>
  ToolFooter: ComponentType<ToolFooterProps>
  ToolHeader: ComponentType<ToolHeaderProps>
  UploadZone: ComponentType<UploadZoneProps>
  ToolSettings: ComponentType<ToolSettingsProps>
  HintBanner: ComponentType<HintBannerProps>
  DualCta: ComponentType<DualCtaProps>
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
  InputNumber: ComponentType<InputNumberProps>
  Slider: ComponentType<SliderProps>
  Tag: ComponentType<TagProps>
  Tabs: ComponentType<TabsProps>
  Empty: ComponentType<EmptyProps>
  Spin: ComponentType<SpinProps>
  Steps: ComponentType<StepsProps>
  Table: ComponentType<TableProps>
  Descriptions: ComponentType<DescriptionsProps>
  Banner: ComponentType<BannerProps>
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
  FeaturesStep: ComponentType<FeaturesStepProps>
  Features: ComponentType<FeaturesProps>
  FeaturesAccordion: ComponentType<FeaturesAccordionProps>
  FeaturesCompare: ComponentType<FeaturesCompareProps>
  ToolsGrid: ComponentType<ToolsGridProps>
  Showcases: ComponentType<ShowcasesProps>
  ShowcasesFlow: ComponentType<ShowcasesFlowProps>
  FeaturesFlow: ComponentType<FeaturesFlowProps>
  FeaturesList: ComponentType<FeaturesListProps>
  Blog: ComponentType<BlogProps>
  BlogDetail: ComponentType<BlogDetailProps>
  HeroCleaner: ComponentType<HeroCleanerProps>
  RelatedPosts: ComponentType<RelatedPostsProps>
  BlogToolCta: ComponentType<BlogToolCtaProps>
  Testimonials: ComponentType<TestimonialsProps>
  Pricing: ComponentType<PricingProps>
}

export type PartialSectionComponents = Partial<SectionComponents>

/**
 * Perler-beads workbench components — pixel-only feature (no default-theme
 * counterpart), registered so the app's bridges resolve them via
 * `resolvePerler` instead of deep-importing the pixel subpath.
 */
export interface PerlerBeadsComponents {
  ToolBar: ComponentType<PerlerToolBarProps>
  ColorPalette: ComponentType<PerlerColorPaletteProps>
  GridTooltip: ComponentType<PerlerGridTooltipProps>
  FloatingToolbar: ComponentType<PerlerFloatingToolbarProps>
  DownloadSettingsModal: ComponentType<PerlerDownloadSettingsModalProps>
  ColorStatusBar: ComponentType<PerlerColorStatusBarProps>
  ProgressBar: ComponentType<PerlerProgressBarProps>
  ColorPanel: ComponentType<PerlerColorPanelProps>
  SettingsPanel: ComponentType<PerlerSettingsPanelProps>
  CelebrationAnimation: ComponentType<PerlerCelebrationAnimationProps>
  MagnifierSelectionOverlay: ComponentType<PerlerMagnifierSelectionOverlayProps>
  FocusCanvas: ComponentType<PerlerFocusCanvasProps>
  FocusHeader: ComponentType<PerlerFocusHeaderProps>
  PixelatedPreviewCanvas: ComponentType<PerlerPixelatedPreviewCanvasProps>
  CompletionCard: ComponentType<PerlerCompletionCardProps>
  DonationModal: ComponentType<PerlerDonationModalProps>
  MagnifierTool: ComponentType<PerlerMagnifierToolProps>
  InstallPWA: ComponentType<PerlerInstallPwaProps>
  FocusModePreDownloadModal: ComponentType<PerlerFocusModePreDownloadModalProps>
  CustomPaletteEditor: ComponentType<PerlerCustomPaletteEditorProps>
  FloatingColorPalette: ComponentType<PerlerFloatingColorPaletteProps>
  ColorStatsPanel: ComponentType<PerlerColorStatsPanelProps>
  ImageCompareModal: ComponentType<PerlerImageCompareModalProps>
  ShareModal: ComponentType<PerlerShareModalProps>
  GalleryCard: ComponentType<PerlerGalleryCardProps>
  GalleryFeed: ComponentType<PerlerGalleryFeedProps>
  CommunityFeed: ComponentType<PerlerCommunityFeedProps>
  CommunityCard: ComponentType<PerlerCommunityCardProps>
  AppLanding: ComponentType<PerlerAppLandingProps>
  ToolRail: ComponentType<PerlerToolRailProps>
  WorkBar: ComponentType<PerlerWorkBarProps>
  SelectionOverlay: ComponentType<PerlerSelectionOverlayProps>
  ColorSwatches: ComponentType<PerlerColorSwatchesProps>
  SampleGallery: ComponentType<PerlerSampleGalleryProps>
}

export type PartialPerlerBeadsComponents = Partial<PerlerBeadsComponents>

/**
 * Dither workbench components — pixel-only feature (no default-theme
 * counterpart), registered so the app's bridges resolve them via
 * `resolveDither` instead of deep-importing the pixel subpath.
 */
export interface DitherComponents {
  SettingsPanel: ComponentType<DitherSettingsPanelProps>
  Preview: ComponentType<DitherPreviewProps>
}

export type PartialDitherComponents = Partial<DitherComponents>

/**
 * Generic image-editor shell components — pixel-only reusable asset for the
 * image-design workbenches. Resolved via `resolveEditor` (never falls back to
 * the default theme).
 */
export interface EditorComponents {
  Shell: ComponentType<EditorShellProps>
  Toolbar: ComponentType<EditorToolbarProps>
  Sidebar: ComponentType<EditorSidebarProps>
  Canvas: ComponentType<EditorCanvasProps>
}

export type PartialEditorComponents = Partial<EditorComponents>

/**
 * Cleaner workbench display components — pixel-only feature (no default-theme
 * counterpart), registered so the app's bridges resolve them via `resolveCleaner`
 * instead of deep-importing the pixel subpath.
 */
export interface CleanerComponents {
  Workbench: ComponentType<CleanerWorkbenchProps>
  Output: ComponentType<CleanerOutputProps>
}

export type PartialCleanerComponents = Partial<CleanerComponents>

/**
 * Light-tool demo components — reusable upload→process→download demo for the
 * SEO tool detail pages. Pixel-only asset, resolved via `resolveLightDemo`.
 */
export interface LightDemoComponents {
  Demo: ComponentType<LightToolDemoProps>
  ParamGenerator: ComponentType<ParamGeneratorDemoProps>
  BackgroundGenerator: ComponentType<Record<string, never>>
  GameIconGenerator: ComponentType<Record<string, never>>
  PaletteExtractor: ComponentType<Record<string, never>>
  ArtifactHero: ComponentType<ArtifactHeroProps>
  CraftEntryNav: ComponentType<CraftEntryNavProps>
}

export type PartialLightDemoComponents = Partial<LightDemoComponents>

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
  /** 该主题的 perler-beads 工作台组件（当前仅 pixel 注册） */
  perler?: PartialPerlerBeadsComponents
  /** 该主题的 dither 工作台组件（当前仅 pixel 注册） */
  dither?: PartialDitherComponents
  /** 该主题的通用图像编辑器壳组件（当前仅 pixel 注册） */
  editor?: PartialEditorComponents
  /** 该主题的 cleaner 工作台显示组件（default + pixel 已注册） */
  cleaner?: PartialCleanerComponents
  /** 该主题的轻量工具 demo 组件（当前仅 pixel 注册） */
  lightDemo?: PartialLightDemoComponents
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
      PromoModal: DefaultPromoModal,
      ToolFooter: DefaultToolFooter,
      ToolHeader: DefaultToolHeader,
      UploadZone: DefaultUploadZone,
      ToolSettings: DefaultToolSettings,
      HintBanner: DefaultHintBanner,
      DualCta: DefaultDualCta,
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
      InputNumber: DefaultInputNumber,
      Slider: DefaultSlider,
      Tag: DefaultTag,
      Tabs: DefaultTabs,
      Empty: DefaultEmpty,
      Spin: DefaultSpin,
      Steps: DefaultSteps,
      Table: DefaultTable,
      Descriptions: DefaultDescriptions,
      Banner: DefaultBanner,
    },
    sections: {
      Hero: DefaultHero,
      FeaturesGrid: DefaultFeaturesGrid,
      Features: DefaultFeatures,
      FeaturesAccordion: DefaultFeaturesAccordion,
      FeaturesCompare: DefaultFeaturesCompare,
      ToolsGrid: DefaultToolsGrid,
      Showcases: DefaultShowcases,
      Testimonials: DefaultTestimonials,
      Pricing: DefaultPricing,
      Faq: DefaultFaq,
      Cta: DefaultCta,
      FeaturesStep: DefaultFeaturesStep,
      HeroCleaner: DefaultHeroCleaner,
      Blog: DefaultBlog,
      BlogDetail: DefaultBlogDetail,
    },
    cleaner: {
      Workbench: DefaultCleanerWorkbench,
      Output: DefaultCleanerOutput,
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
      PromoModal: PixelPromoModal,
      ToolFooter: PixelToolFooter,
      ToolHeader: PixelToolHeader,
      UploadZone: PixelUploadZone,
      ToolSettings: PixelToolSettings,
      HintBanner: PixelHintBanner,
      DualCta: PixelDualCta,
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
      FeaturesStep: PixelFeaturesStep,
      Features: PixelFeatures,
      FeaturesAccordion: PixelFeaturesAccordion,
      FeaturesCompare: PixelFeaturesCompare,
      ToolsGrid: PixelToolsGrid,
      Showcases: PixelShowcases,
      ShowcasesFlow: PixelShowcasesFlow,
      FeaturesFlow: PixelFeaturesFlow,
      FeaturesList: PixelFeaturesList,
      Blog: PixelBlog,
      BlogDetail: PixelBlogDetail,
      RelatedPosts: PixelRelatedPosts,
      BlogToolCta: PixelBlogToolCta,
      Testimonials: PixelTestimonials,
      Pricing: PixelPricing,
    },
    perler: {
      ToolBar: PixelPerlerToolBar,
      ColorPalette: PixelPerlerColorPalette,
      GridTooltip: PixelPerlerGridTooltip,
      FloatingToolbar: PixelPerlerFloatingToolbar,
      DownloadSettingsModal: PixelPerlerDownloadSettingsModal,
      ColorStatusBar: PixelPerlerColorStatusBar,
      ProgressBar: PixelPerlerProgressBar,
      ColorPanel: PixelPerlerColorPanel,
      SettingsPanel: PixelPerlerSettingsPanel,
      CelebrationAnimation: PixelPerlerCelebrationAnimation,
      MagnifierSelectionOverlay: PixelPerlerMagnifierSelectionOverlay,
      FocusCanvas: PixelPerlerFocusCanvas,
      FocusHeader: PixelPerlerFocusHeader,
      PixelatedPreviewCanvas: PixelPerlerPixelatedPreviewCanvas,
      CompletionCard: PixelPerlerCompletionCard,
      DonationModal: PixelPerlerDonationModal,
      MagnifierTool: PixelPerlerMagnifierTool,
      InstallPWA: PixelPerlerInstallPWA,
      FocusModePreDownloadModal: PixelPerlerFocusModePreDownloadModal,
      CustomPaletteEditor: PixelPerlerCustomPaletteEditor,
      FloatingColorPalette: PixelPerlerFloatingColorPalette,
      ColorStatsPanel: PixelPerlerColorStatsPanel,
      ImageCompareModal: PixelPerlerImageCompareModal,
      ShareModal: PixelPerlerShareModal,
      GalleryCard: PixelPerlerGalleryCard,
      GalleryFeed: PixelPerlerGalleryFeed,
      CommunityFeed: PixelPerlerCommunityFeed,
      CommunityCard: PixelPerlerCommunityCard,
      AppLanding: PixelPerlerAppLanding,
      ToolRail: PixelPerlerToolRail,
      WorkBar: PixelPerlerWorkBar,
      SelectionOverlay: PixelPerlerSelectionOverlay,
      ColorSwatches: PixelPerlerColorSwatches,
      SampleGallery: PixelPerlerSampleGallery,
    },
    dither: {
      SettingsPanel: PixelDitherSettingsPanel,
      Preview: PixelDitherPreview,
    },
    editor: {
      Shell: PixelEditorShell,
      Toolbar: PixelEditorToolbar,
      Sidebar: PixelEditorSidebar,
      Canvas: PixelEditorCanvas,
    },
    cleaner: {
      Workbench: PixelCleanerWorkbench,
      Output: PixelCleanerOutput,
    },
    lightDemo: {
      Demo: PixelLightToolDemo,
      ParamGenerator: PixelParamGeneratorDemo,
      BackgroundGenerator: PixelBackgroundGeneratorDemo,
      GameIconGenerator: PixelGameIconGeneratorDemo,
      PaletteExtractor: PixelPaletteExtractorDemo,
      ArtifactHero: PixelArtifactHero,
      CraftEntryNav: PixelCraftEntryNav,
    },
  },
  semi: {
    name: 'semi',
    components: {
      Button: SemiButton,
      Badge: SemiBadge,
      Card: SemiCard,
      Input: SemiInput,
      Textarea: SemiTextarea,
      Switch: SemiSwitch,
      Progress: SemiProgress,
      Tooltip: SemiTooltip,
      Skeleton: SemiSkeleton,
      Header: SemiHeader,
      Footer: SemiFooter,
      Box: SemiBox,
      Label: SemiLabel,
      Avatar: SemiAvatar,
      Dialog: SemiDialog,
      PromoModal: SemiPromoModal,
      HintBanner: SemiHintBanner,
      Dropdown: SemiDropdown,
      Stack: SemiStack,
      Cluster: SemiCluster,
      Grid: SemiGrid,
      Divider: SemiDivider,
      Select: SemiSelect,
      Toggle: SemiToggle,
      ToggleGroup: SemiToggleGroup,
      BareTextarea: SemiBareTextarea,
      IconFrame: SemiIconFrame,
      InputNumber: SemiInputNumber,
      Slider: SemiSlider,
      Tag: SemiTag,
      Tabs: SemiTabs,
      Empty: SemiEmpty,
      Spin: SemiSpin,
      Steps: SemiSteps,
      Table: SemiTable,
      Descriptions: SemiDescriptions,
      UploadZone: SemiUploadZone,
      Banner: SemiBanner,
    },
    sections: {
      Hero: SemiHero,
      Features: SemiFeatures,
      FeaturesAccordion: SemiFeaturesAccordion,
      Faq: SemiFaq,
      Cta: SemiCta,
      Testimonials: SemiTestimonials,
      Pricing: SemiPricing,
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
 * Registry identity tag — every component resolved through the registry gets
 * `data-registry="{theme}:{key}"` on its DOM root so it can be identified in
 * the DOM / devtools without guessing which implementation backs it. A
 * consumer-supplied `data-registry` prop wins (spread AFTER the default).
 *
 * Wrappers are memoized by `{theme}:{key}` so the resolved component keeps a
 * stable identity across renders (otherwise React remounts the subtree on
 * every render).
 */
const registryTagCache = new Map<string, ComponentType<any>>()

function withRegistryTag(
  key: string,
  theme: ThemeName,
  Comp: ComponentType<any>,
): ComponentType<any> {
  const cacheKey = `${theme}:${key}`
  const cached = registryTagCache.get(cacheKey)
  if (cached) return cached as ComponentType<any>

  const wrapped = ((props: any) =>
    createElement(Comp, {
      'data-registry': cacheKey,
      ...props,
    } as any)) as ComponentType<any>

  registryTagCache.set(cacheKey, wrapped)
  return wrapped
}

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
  const themed = getThemeManifest(t).components[key]
  // Tag prefix = the theme that actually supplied the implementation (so a
  // fallback to default shows `default:Key`, not a misleading `pixel:Key`).
  const source = themed ? t : defaultThemeName
  const Comp = themed ?? getThemeManifest(defaultThemeName).components[key]!
  return withRegistryTag(key, source, Comp) as ThemeComponents[K]
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
  const themed = getThemeManifest(t).sections?.[key]
  const source = themed ? t : defaultThemeName
  const Comp = themed ?? getThemeManifest(defaultThemeName).sections?.[key]!
  return withRegistryTag(key, source, Comp) as SectionComponents[K]
}

/**
 * Resolve a perler-beads workbench component. The feature is pixel-only, so
 * the implementation always resolves against `pixel` (never falls back to the
 * default theme, which has no perler entries) — but the active theme is still
 * used for the registry identity tag, mirroring the other resolvers.
 *
 * Usage: resolvePerler('ColorPalette')  /  resolvePerler('InstallPWA')
 */
export function resolvePerler<K extends keyof PerlerBeadsComponents>(
  key: K,
  theme?: ThemeName,
): PerlerBeadsComponents[K] {
  const t = theme ?? getActiveTheme()
  const themed = getThemeManifest(t).perler?.[key]
  const source = themed ? t : 'pixel'
  const Comp = themed ?? getThemeManifest('pixel').perler?.[key]!
  return withRegistryTag(`Perler${key}`, source, Comp) as PerlerBeadsComponents[K]
}

/**
 * Resolve a dither workbench component. The feature is pixel-only, so the
 * implementation always resolves against `pixel` (never falls back to the
 * default theme) — mirroring `resolvePerler`.
 *
 * Usage: resolveDither('SettingsPanel')  /  resolveDither('Preview')
 */
export function resolveDither<K extends keyof DitherComponents>(
  key: K,
  theme?: ThemeName,
): DitherComponents[K] {
  const t = theme ?? getActiveTheme()
  const themed = getThemeManifest(t).dither?.[key]
  const source = themed ? t : 'pixel'
  const Comp = themed ?? getThemeManifest('pixel').dither?.[key]!
  return withRegistryTag(`Dither${key}`, source, Comp) as DitherComponents[K]
}

/**
 * Resolve a generic image-editor shell component. The asset is pixel-only, so
 * the implementation always resolves against `pixel` (never falls back to the
 * default theme) — mirroring `resolvePerler`/`resolveDither`.
 *
 * Usage: resolveEditor('Shell')  /  resolveEditor('Sidebar')
 */
export function resolveEditor<K extends keyof EditorComponents>(
  key: K,
  theme?: ThemeName,
): EditorComponents[K] {
  const t = theme ?? getActiveTheme()
  const themed = getThemeManifest(t).editor?.[key]
  const source = themed ? t : 'pixel'
  const Comp = themed ?? getThemeManifest('pixel').editor?.[key]!
  return withRegistryTag(`Editor${key}`, source, Comp) as EditorComponents[K]
}

/**
 * Resolve a cleaner workbench display component. Falls back to the `pixel`
 * implementation when the active theme has no cleaner entry (mirroring
 * `resolveEditor`/`resolveDither`) — pixel is the historical reference.
 *
 * Usage: resolveCleaner('Workbench')  /  resolveCleaner('Output')
 */
export function resolveCleaner<K extends keyof CleanerComponents>(
  key: K,
  theme?: ThemeName,
): CleanerComponents[K] {
  const t = theme ?? getActiveTheme()
  const themed = getThemeManifest(t).cleaner?.[key]
  const source = themed ? t : 'pixel'
  const Comp = themed ?? getThemeManifest('pixel').cleaner?.[key]!
  return withRegistryTag(`Cleaner${key}`, source, Comp) as CleanerComponents[K]
}

/**
 * Resolve a light-tool demo component. The asset is pixel-only, so the
 * implementation always resolves against `pixel` (never the default theme).
 *
 * Usage: resolveLightDemo('Demo')
 */
export function resolveLightDemo<K extends keyof LightDemoComponents>(
  key: K,
  theme?: ThemeName,
): LightDemoComponents[K] {
  const t = theme ?? getActiveTheme()
  const themed = getThemeManifest(t).lightDemo?.[key]
  const source = themed ? t : 'pixel'
  const Comp = themed ?? getThemeManifest('pixel').lightDemo?.[key]!
  return withRegistryTag(`LightDemo${key}`, source, Comp) as LightDemoComponents[K]
}
