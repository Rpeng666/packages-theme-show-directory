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
  FeaturesStepProps,
  FeaturesProps,
  FeaturesAccordionProps,
  FeaturesCompareProps,
  ToolsGridProps,
  ToolGridLink,
  ShowcasesProps,
  ShowcaseLink,
  ShowcaseImage,
  ShowcasesFlowProps,
  TestimonialsProps,
  PricingProps,
  FaqProps,
  CtaProps,
  FeaturesFlowProps,
  FeaturesListProps,
  BlogProps,
  BlogDetailProps,
  HeroCleanerProps,
  RelatedPostsProps,
  BlogToolCtaProps,
} from './contracts/sections'

export type { HeaderProps } from './contracts/header'
export type { FooterProps } from './contracts/footer'
export type { BoxProps, BoxTone, BoxVariant, BoxPadding, BoxRadius, BoxAs } from './contracts/box'
export type { LabelProps } from './contracts/label'
export type { AvatarProps } from './contracts/avatar'
export type { DialogProps } from './contracts/dialog'
export type { PromoModalProps } from './contracts/promo-modal'
export type { ToolFooterProps } from './contracts/tool-footer'
export type { ToolHeaderProps, ToolHeaderLink } from './contracts/tool-header'
export type { UploadZoneProps } from './contracts/upload-zone'
export type { ToolSettingsProps, ColorSystemOption, PixelationMode, TranslationFn } from './contracts/tool-settings'
export type { HintBannerProps } from './contracts/hint-banner'
export type { DualCtaProps } from './contracts/dual-cta'
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
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/accordion'
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
  resolvePerler,
  resolveDither,
  resolveEditor,
  resolveCleaner,
  resolveLightDemo,
  defaultThemeName,
} from './registry'
export type {
  ThemeName,
  ThemeComponents,
  ThemeManifest,
  PartialThemeComponents,
  SectionComponents,
  PartialSectionComponents,
  PerlerBeadsComponents,
  PartialPerlerBeadsComponents,
  DitherComponents,
  PartialDitherComponents,
  EditorComponents,
  PartialEditorComponents,
  CleanerComponents,
  PartialCleanerComponents,
  LightDemoComponents,
  PartialLightDemoComponents,
} from './registry'

// Perler-beads workbench types — component prop contracts (pixel sections) +
// shared data types (contracts/perler-beads).
export type {
  PerlerToolBarProps,
  PerlerColorPaletteProps,
  PerlerColorData,
  PerlerGridTooltipProps,
  PerlerTooltipData,
  PerlerFloatingToolbarProps,
  PerlerDownloadSettingsModalProps,
  PerlerColorStatusBarProps,
  PerlerProgressBarProps,
  PerlerColorPanelProps,
  PerlerColorInfo,
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
  PerlerColorSystem,
  PerlerCustomPaletteEditorProps,
  PerlerFloatingColorPaletteProps,
  PerlerSwatch,
  PerlerColorStatsPanelProps,
  PerlerColorStatsPanelRef,
  PerlerImageCompareModalProps,
  PerlerShareModalProps,
  PerlerShareStats,
  PerlerGalleryCardProps,
  PerlerGalleryFeedProps,
  PerlerGalleryItem,
  PerlerGalleryTopic,
  PerlerCommunityFeedProps,
  PerlerCommunityItem,
  PerlerCommunityTopic,
  PerlerCommunityCategory,
  PerlerCommunityTopicTile,
  PerlerCommunityCardProps,
  PerlerAppLandingProps,
  PerlerAppLandingRow,
  PerlerAppLandingFeatureTab,
  PerlerAppStoreLinks,
  PerlerAppTone,
  PerlerToolRailProps,
  PerlerToolId,
  PerlerWorkBarProps,
  PerlerSelectionOverlayProps,
  PerlerSelectionArea,
  PerlerColorSwatchesProps,
  PerlerColorSwatchItem,
  PerlerSampleGalleryProps,
  PerlerSampleItem,
} from './themes/pixel/sections/perler-beads'
export type {
  PerlerMappedPixel,
  PerlerPaletteColor,
  PerlerColorReplaceState,
  PerlerPaletteSelections,
  GridDownloadOptions,
} from './contracts/perler-beads'
export { gridLineColorOptions } from './themes/pixel/sections/perler-beads'

// Dither workbench — component prop contracts (pixel sections) + shared types.
export type {
  DitherSettingsPanelProps,
  DitherPreviewProps,
  DitherExportScale,
  DitherT,
} from './themes/pixel/sections/dither'
export type {
  DitherMethod,
  DitherMode,
  DitherOptions,
} from './contracts/dither/types'
export { DEFAULT_DITHER_OPTIONS } from './contracts/dither/types'

// Cleaner workbench — display component prop contracts. Components are consumed
// via `resolveCleaner`; the props types are exported so app blocks can type
// their thin forwarders. Display types are shared (default + pixel).
export type { CleanerWorkbenchProps } from './contracts/sections/cleaner-workbench'
export type {
  CleanerOutputProps,
  CleanerDiffPart,
  CleanerAnalyzeResult,
  CleanerIssue,
  CleanerSeverity,
  CleanerOutputView,
  CleanerT,
  ContextMode,
  ContextModeValue,
} from './contracts/sections/cleaner-types'

// Light-tool demo — reusable upload→process→download asset for the SEO tool pages.
export { ArtifactHero, drawArtifactChart } from './themes/pixel/light-tool-demo'
export type { ArtifactHeroProps, ArtifactRenderStyle } from './themes/pixel/light-tool-demo'
export { CraftEntryNav } from './themes/pixel/light-tool-demo'
export type { CraftEntryNavProps, CraftEntryKind } from './themes/pixel/light-tool-demo'
export { PIXEL_PATTERNS, getPixelPattern, patternsForCraft, patternStats } from './themes/pixel/light-tool-demo'
export type {
  PixelCraft,
  PatternCategory,
  PixelPattern,
  PatternStats,
} from './themes/pixel/light-tool-demo'
export { genNum, genStr, genBool } from './themes/pixel/light-tool-demo'
export { setToolHandoff, stageWorkbenchHandoff, consumeWorkbenchHandoff } from './themes/pixel/light-tool-demo'
export type { WorkbenchHandoff } from './themes/pixel/light-tool-demo'
export type { LightToolDemoProps, LightToolDemoProcessor, LightToolDemoResult, GenParam, GenValues, GenTool, GenListRow, ParamGeneratorDemoProps, LightToolParamSpec } from './themes/pixel/light-tool-demo'

// Generic image-editor shell — reusable asset for the image-design workbenches.
export { EditorPanel, PresetGrid, ToolButton, AdjustmentRow } from './themes/pixel/editor'
export type {
  EditorShellProps,
  EditorToolbarProps,
  EditorSidebarProps,
  EditorSidebarItem,
  EditorCanvasProps,
  EditorPanelProps,
  PresetGridProps,
  PresetItem,
  ToolButtonProps,
  AdjustmentRowProps,
  EditorT,
} from './themes/pixel/editor'

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
