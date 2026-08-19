/**
 * Shared registry types — contract keys, component interfaces, and the
 * `ThemeManifest` shape used by the per-theme manifests (the `manifest.ts`
 * files under `src/themes/<theme>/`) and the registry aggregator (`registry.ts`).
 *
 * Everything here is type-only (plus `ComponentType`/`ReactNode`), so this
 * module never participates in the runtime import graph: the manifests import
 * only these types, which means `registry-types` cannot create a cycle back
 * into `registry.ts` (where `defaultThemeName` lives — see context.tsx for the
 * registry↔context cycle note).
 */
import type { ComponentType, ReactNode } from "react";

import type { ButtonProps } from "./contracts/button";
import type { BadgeProps } from "./contracts/badge";
import type { CardProps } from "./contracts/card";
import type { SkeletonProps } from "./contracts/skeleton";
import type { InputProps } from "./contracts/input";
import type { TextareaProps } from "./contracts/textarea";
import type { SwitchProps } from "./contracts/switch";
import type { ProgressProps } from "./contracts/progress";
import type { TooltipProps } from "./contracts/tooltip";
import type { HeaderProps } from "./contracts/header";
import type { FooterProps } from "./contracts/footer";
import type { BoxProps } from "./contracts/box";
import type { LabelProps } from "./contracts/label";
import type { AvatarProps } from "./contracts/avatar";
import type { DialogProps } from "./contracts/dialog";
import type { PromoModalProps } from "./contracts/promo-modal";
import type { ToolFooterProps } from "./contracts/tool-footer";
import type { ToolHeaderProps } from "./contracts/tool-header";
import type { UploadZoneProps } from "./contracts/upload-zone";
import type { ToolSettingsProps } from "./contracts/tool-settings";
import type { HintBannerProps } from "./contracts/hint-banner";
import type { DualCtaProps } from "./contracts/dual-cta";
import type { DropdownProps } from "./contracts/dropdown";
import type {
  StackProps,
  ClusterProps,
  GridProps,
  DividerProps,
} from "./contracts/layout";
import type {
  SelectProps,
  ToggleProps,
  ToggleGroupProps,
  BareTextareaProps,
} from "./contracts/form";
import type { InputNumberProps } from "./contracts/input-number";
import type { SliderProps } from "./contracts/slider";
import type { TagProps } from "./contracts/tag";
import type { TabsProps } from "./contracts/tabs";
import type { EmptyProps } from "./contracts/empty";
import type { SpinProps } from "./contracts/spin";
import type { StepsProps } from "./contracts/steps";
import type { TableProps } from "./contracts/table";
import type { DescriptionsProps } from "./contracts/descriptions";
import type { BannerProps } from "./contracts/banner";
import type { LayoutShellProps } from "./contracts/layout-shell";
import type { NavigationProps } from "./contracts/navigation";
import type { ImageProps } from "./contracts/image";
import type { ColorPickerProps } from "./contracts/color-picker";
import type { CollapseProps } from "./contracts/collapse";
import type { ListProps } from "./contracts/list";
import type { CarouselProps } from "./contracts/carousel";
import type { TimelineProps } from "./contracts/timeline";
import type { CopyTextProps } from "./contracts/copy-text";
import type { IconFrameProps } from "./contracts/iconframe";
import type { HeroProps } from "./contracts/sections/hero";
import type { FaqProps } from "./contracts/sections/faq";
import type { CtaProps } from "./contracts/sections/cta";
import type { FeaturesGridProps } from "./contracts/sections/features-grid";
import type { FeaturesStepProps } from "./contracts/sections/features-step";
import type { FeaturesProps } from "./contracts/sections/features";
import type { FeaturesAccordionProps } from "./contracts/sections/features-accordion";
import type { FeaturesCompareProps } from "./contracts/sections/features-compare";
import type { ToolsGridProps } from "./contracts/sections/tools-grid";
import type { ShowcasesProps } from "./contracts/sections/showcases";
import type { ShowcasesFlowProps } from "./contracts/sections/showcases-flow";
import type { TestimonialsProps } from "./contracts/sections/testimonials";
import type { StatsProps } from "./contracts/sections/stats";
import type { LogosProps } from "./contracts/sections/logos";
import type { PricingProps } from "./contracts/sections/pricing";
import type { ToolHeroProps } from "./contracts/sections/tool-hero";
import type { PageHeaderProps } from "./contracts/sections/page-header";
import type { DashboardOverviewProps } from "./contracts/sections/dashboard-overview";
import type { SettingsOverviewProps } from "./contracts/sections/settings-overview";
import type { ActivityOverviewProps } from "./contracts/sections/activity-overview";
import type { ChatWorkbenchProps } from "./contracts/sections/chat-workbench";
import type { ChatHistoryProps } from "./contracts/sections/chat-history";
import type { MusicGeneratorStudioProps } from "./contracts/sections/music-generator-studio";
import type { ImageGeneratorStudioProps } from "./contracts/sections/image-generator-studio";
import type { VideoGeneratorStudioProps } from "./contracts/sections/video-generator-studio";
import type { ResizeWorkbenchProps } from "./contracts/sections/resize-workbench";
import type { CompressWorkbenchProps } from "./contracts/sections/compress-workbench";
import type { ExtractWorkbenchProps } from "./contracts/sections/extract-workbench";
import type { DownloadWorkbenchProps } from "./contracts/sections/download-workbench";
import type { PreviewWorkbenchProps } from "./contracts/sections/preview-workbench";
import type { DesignerStudioProps } from "./contracts/sections/designer-studio";
import type {
  FeaturesFlowProps,
  FeaturesListProps,
} from "./contracts/sections/features-media";
import type { BlogProps } from "./contracts/sections/blog";
import type { BlogDetailProps } from "./contracts/sections/blog-detail";
import type { HeroCleanerProps } from "./contracts/sections/hero-cleaner";
import type { HeroLiveProps } from "./contracts/sections/hero-live";
import type {
  RelatedPostsProps,
  BlogToolCtaProps,
} from "./contracts/sections/blog-cta";
import type { CleanerWorkbenchProps } from "./contracts/sections/cleaner-workbench";
import type { CleanerOutputProps } from "./themes/pixel/sections/cleaner";
import type { ToolPageProps } from "@template/semi";
import type { ConsoleLayoutProps } from "./contracts";
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
} from "./themes/pixel/sections/perler-beads";
import type { LightToolDemoProps } from "./themes/pixel/light-tool-demo";
import type { ParamGeneratorDemoProps } from "./themes/pixel/light-tool-demo";
import type { ArtifactHeroProps } from "./themes/pixel/light-tool-demo";
import type { CraftEntryNavProps } from "./themes/pixel/light-tool-demo";
import type { DitherSettingsPanelProps } from "./themes/pixel/sections/dither";
import type { DitherPreviewProps } from "./themes/pixel/sections/dither";
import type { EditorShellProps } from "./themes/pixel/editor";
import type { EditorToolbarProps } from "./themes/pixel/editor";
import type { EditorSidebarProps } from "./themes/pixel/editor";
import type { EditorCanvasProps } from "./themes/pixel/editor";

export type ThemeName = string;

export interface ThemeComponents {
  Button: ComponentType<ButtonProps>;
  Badge: ComponentType<BadgeProps>;
  Card: ComponentType<CardProps>;
  Skeleton: ComponentType<SkeletonProps>;
  Input: ComponentType<InputProps>;
  Textarea: ComponentType<TextareaProps>;
  Switch: ComponentType<SwitchProps>;
  Progress: ComponentType<ProgressProps>;
  Tooltip: ComponentType<TooltipProps>;
  Header: ComponentType<HeaderProps>;
  Footer: ComponentType<FooterProps>;
  Box: ComponentType<BoxProps>;
  Label: ComponentType<LabelProps>;
  Avatar: ComponentType<AvatarProps>;
  Dialog: ComponentType<DialogProps>;
  PromoModal: ComponentType<PromoModalProps>;
  ToolFooter: ComponentType<ToolFooterProps>;
  ToolHeader: ComponentType<ToolHeaderProps>;
  UploadZone: ComponentType<UploadZoneProps>;
  ToolSettings: ComponentType<ToolSettingsProps>;
  HintBanner: ComponentType<HintBannerProps>;
  DualCta: ComponentType<DualCtaProps>;
  Dropdown: ComponentType<DropdownProps>;
  Stack: ComponentType<StackProps>;
  Cluster: ComponentType<ClusterProps>;
  Grid: ComponentType<GridProps>;
  Divider: ComponentType<DividerProps>;
  Select: ComponentType<SelectProps>;
  Toggle: ComponentType<ToggleProps>;
  ToggleGroup: ComponentType<ToggleGroupProps>;
  BareTextarea: ComponentType<BareTextareaProps>;
  IconFrame: ComponentType<IconFrameProps>;
  InputNumber: ComponentType<InputNumberProps>;
  Slider: ComponentType<SliderProps>;
  Tag: ComponentType<TagProps>;
  Tabs: ComponentType<TabsProps>;
  Empty: ComponentType<EmptyProps>;
  Spin: ComponentType<SpinProps>;
  Steps: ComponentType<StepsProps>;
  Table: ComponentType<TableProps>;
  Descriptions: ComponentType<DescriptionsProps>;
  Banner: ComponentType<BannerProps>;
  Layout: ComponentType<LayoutShellProps>;
  Navigation: ComponentType<NavigationProps>;
  Image: ComponentType<ImageProps>;
  ColorPicker: ComponentType<ColorPickerProps>;
  Collapse: ComponentType<CollapseProps>;
  List: ComponentType<ListProps>;
  Carousel: ComponentType<CarouselProps>;
  Timeline: ComponentType<TimelineProps>;
  CopyText: ComponentType<CopyTextProps>;
  ToolPage: ComponentType<ToolPageProps>;
  ConsoleLayout: ComponentType<ConsoleLayoutProps>;
}

/**
 * Section components — the landing page blocks (Hero, Faq, Cta, …). Their
 * props differ per section (each has its own *Props contract), so they're
 * registered under a separate key and resolved via `resolveSection` (not the
 * single-typed `resolveComponent`).
 */
export interface SectionComponents {
  Hero: ComponentType<HeroProps>;
  Faq: ComponentType<FaqProps>;
  Cta: ComponentType<CtaProps>;
  FeaturesGrid: ComponentType<FeaturesGridProps>;
  FeaturesStep: ComponentType<FeaturesStepProps>;
  Features: ComponentType<FeaturesProps>;
  FeaturesAccordion: ComponentType<FeaturesAccordionProps>;
  FeaturesCompare: ComponentType<FeaturesCompareProps>;
  ToolsGrid: ComponentType<ToolsGridProps>;
  Showcases: ComponentType<ShowcasesProps>;
  ShowcasesFlow: ComponentType<ShowcasesFlowProps>;
  FeaturesFlow: ComponentType<FeaturesFlowProps>;
  FeaturesList: ComponentType<FeaturesListProps>;
  Blog: ComponentType<BlogProps>;
  BlogDetail: ComponentType<BlogDetailProps>;
  HeroCleaner: ComponentType<HeroCleanerProps>;
  RelatedPosts: ComponentType<RelatedPostsProps>;
  BlogToolCta: ComponentType<BlogToolCtaProps>;
  Testimonials: ComponentType<TestimonialsProps>;
  Stats: ComponentType<StatsProps>;
  Logos: ComponentType<LogosProps>;
  Pricing: ComponentType<PricingProps>;
  ToolHero: ComponentType<ToolHeroProps>;
  PageHeader: ComponentType<PageHeaderProps>;
  DashboardOverview: ComponentType<DashboardOverviewProps>;
  SettingsOverview: ComponentType<SettingsOverviewProps>;
  ActivityOverview: ComponentType<ActivityOverviewProps>;
  ChatWorkbench: ComponentType<ChatWorkbenchProps>;
  ChatHistory: ComponentType<ChatHistoryProps>;
  MusicGeneratorStudio: ComponentType<MusicGeneratorStudioProps>;
  ImageGeneratorStudio: ComponentType<ImageGeneratorStudioProps>;
  VideoGeneratorStudio: ComponentType<VideoGeneratorStudioProps>;
  ResizeWorkbench: ComponentType<ResizeWorkbenchProps>;
  CompressWorkbench: ComponentType<CompressWorkbenchProps>;
  ExtractWorkbench: ComponentType<ExtractWorkbenchProps>;
  DownloadWorkbench: ComponentType<DownloadWorkbenchProps>;
  PreviewWorkbench: ComponentType<PreviewWorkbenchProps>;
  DesignerStudio: ComponentType<DesignerStudioProps>;
  HeroLive: ComponentType<HeroLiveProps>;
}

export type PartialSectionComponents = Partial<SectionComponents>;

/**
 * Perler-beads workbench components — pixel-only feature (no default-theme
 * counterpart), registered so the app's bridges resolve them via
 * `resolvePerler` instead of deep-importing the pixel subpath.
 */
export interface PerlerBeadsComponents {
  ToolBar: ComponentType<PerlerToolBarProps>;
  ColorPalette: ComponentType<PerlerColorPaletteProps>;
  GridTooltip: ComponentType<PerlerGridTooltipProps>;
  FloatingToolbar: ComponentType<PerlerFloatingToolbarProps>;
  DownloadSettingsModal: ComponentType<PerlerDownloadSettingsModalProps>;
  ColorStatusBar: ComponentType<PerlerColorStatusBarProps>;
  ProgressBar: ComponentType<PerlerProgressBarProps>;
  ColorPanel: ComponentType<PerlerColorPanelProps>;
  SettingsPanel: ComponentType<PerlerSettingsPanelProps>;
  CelebrationAnimation: ComponentType<PerlerCelebrationAnimationProps>;
  MagnifierSelectionOverlay: ComponentType<PerlerMagnifierSelectionOverlayProps>;
  FocusCanvas: ComponentType<PerlerFocusCanvasProps>;
  FocusHeader: ComponentType<PerlerFocusHeaderProps>;
  PixelatedPreviewCanvas: ComponentType<PerlerPixelatedPreviewCanvasProps>;
  CompletionCard: ComponentType<PerlerCompletionCardProps>;
  DonationModal: ComponentType<PerlerDonationModalProps>;
  MagnifierTool: ComponentType<PerlerMagnifierToolProps>;
  InstallPWA: ComponentType<PerlerInstallPwaProps>;
  FocusModePreDownloadModal: ComponentType<PerlerFocusModePreDownloadModalProps>;
  CustomPaletteEditor: ComponentType<PerlerCustomPaletteEditorProps>;
  FloatingColorPalette: ComponentType<PerlerFloatingColorPaletteProps>;
  ColorStatsPanel: ComponentType<PerlerColorStatsPanelProps>;
  ImageCompareModal: ComponentType<PerlerImageCompareModalProps>;
  ShareModal: ComponentType<PerlerShareModalProps>;
  GalleryCard: ComponentType<PerlerGalleryCardProps>;
  GalleryFeed: ComponentType<PerlerGalleryFeedProps>;
  CommunityFeed: ComponentType<PerlerCommunityFeedProps>;
  CommunityCard: ComponentType<PerlerCommunityCardProps>;
  AppLanding: ComponentType<PerlerAppLandingProps>;
  ToolRail: ComponentType<PerlerToolRailProps>;
  WorkBar: ComponentType<PerlerWorkBarProps>;
  SelectionOverlay: ComponentType<PerlerSelectionOverlayProps>;
  ColorSwatches: ComponentType<PerlerColorSwatchesProps>;
  SampleGallery: ComponentType<PerlerSampleGalleryProps>;
}

export type PartialPerlerBeadsComponents = Partial<PerlerBeadsComponents>;

/**
 * Dither workbench components — pixel-only feature (no default-theme
 * counterpart), registered so the app's bridges resolve them via
 * `resolveDither` instead of deep-importing the pixel subpath.
 */
export interface DitherComponents {
  SettingsPanel: ComponentType<DitherSettingsPanelProps>;
  Preview: ComponentType<DitherPreviewProps>;
}

export type PartialDitherComponents = Partial<DitherComponents>;

/**
 * Generic image-editor shell components — pixel-only reusable asset for the
 * image-design workbenches. Resolved via `resolveEditor` (never falls back to
 * the default theme).
 */
export interface EditorComponents {
  Shell: ComponentType<EditorShellProps>;
  Toolbar: ComponentType<EditorToolbarProps>;
  Sidebar: ComponentType<EditorSidebarProps>;
  Canvas: ComponentType<EditorCanvasProps>;
}

export type PartialEditorComponents = Partial<EditorComponents>;

/**
 * Cleaner workbench display components — pixel-only feature (no default-theme
 * counterpart), registered so the app's bridges resolve them via `resolveCleaner`
 * instead of deep-importing the pixel subpath.
 */
export interface CleanerComponents {
  Workbench: ComponentType<CleanerWorkbenchProps>;
  Output: ComponentType<CleanerOutputProps>;
}

export type PartialCleanerComponents = Partial<CleanerComponents>;

/**
 * Light-tool demo components — reusable upload→process→download demo for the
 * SEO tool detail pages. Pixel-only asset, resolved via `resolveLightDemo`.
 */
export interface LightDemoComponents {
  Demo: ComponentType<LightToolDemoProps>;
  ParamGenerator: ComponentType<ParamGeneratorDemoProps>;
  BackgroundGenerator: ComponentType<Record<string, never>>;
  GameIconGenerator: ComponentType<Record<string, never>>;
  PaletteExtractor: ComponentType<Record<string, never>>;
  ArtifactHero: ComponentType<ArtifactHeroProps>;
  CraftEntryNav: ComponentType<CraftEntryNavProps>;
}

export type PartialLightDemoComponents = Partial<LightDemoComponents>;

export interface SectionManifest {
  name: ThemeName;
  sections: PartialSectionComponents;
}

export type PartialThemeComponents = Partial<ThemeComponents>;

export interface ThemeManifest {
  name: ThemeName;
  /** The theme's ambient Provider (e.g. pixel → PixelAmbientProvider), injected by the registry */
  AmbientProvider?: ComponentType<{ children: ReactNode }>;
  components: PartialThemeComponents;
  /** The theme's landing section components (Hero/Faq/Cta/…) */
  sections?: PartialSectionComponents;
  /** The theme's perler-beads workbench components (currently only pixel registers them) */
  perler?: PartialPerlerBeadsComponents;
  /** The theme's dither workbench components (currently only pixel registers them) */
  dither?: PartialDitherComponents;
  /** The theme's generic image-editor shell components (currently only pixel registers them) */
  editor?: PartialEditorComponents;
  /** The theme's cleaner workbench display components (default + pixel registered) */
  cleaner?: PartialCleanerComponents;
  /** The theme's light-tool demo components (currently only pixel registers them) */
  lightDemo?: PartialLightDemoComponents;
}
