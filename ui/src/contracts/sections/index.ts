/**
 * Section contracts — the data boundary between the app's business layer
 * (pricing payment/i18n, hero link/image) and the package's presentational
 * sections. Each section receives `section` data + injected deps, and renders
 * theme visuals only.
 */
export type { HeroProps, SectionLink, SectionImage } from "./hero";
export type { FeaturesGridProps } from "./features-grid";
export type { FeaturesStepProps } from "./features-step";
export type { FeaturesProps } from "./features";
export type { FeaturesAccordionProps } from "./features-accordion";
export type { FeaturesCompareProps } from "./features-compare";
export type { ToolsGridProps, ToolGridLink } from "./tools-grid";
export type { ShowcasesProps, ShowcaseLink, ShowcaseImage } from "./showcases";
export type {
  ShowcasesFlowProps,
  ShowcasesFlowLink,
  ShowcasesFlowImage,
} from "./showcases-flow";
export type { TestimonialsProps } from "./testimonials";
export type { StatsProps } from "./stats";
export type { LogosProps } from "./logos";
export type { PricingProps } from "./pricing";
export type { FaqProps } from "./faq";
export type { CtaProps, CtaLink } from "./cta";
export type { SubscribeProps, SubscribeToast } from "./subscribe";
export type { HeroCleanerProps } from "./hero-cleaner";
export type { HeroLiveProps, HeroLivePreset } from "./hero-live";
export type { FeaturesFlowProps, FeaturesListProps } from "./features-media";
export type { BlogProps, BlogPost, BlogCategory, BlogLink } from "./blog";
export type {
  BlogDetailProps,
  BlogDetailPost,
  RelatedPost,
} from "./blog-detail";
export type {
  RelatedPostsProps,
  BlogToolCtaProps,
  BlogCtaData,
} from "./blog-cta";
export type {
  CleanerAnalyzeResult,
  CleanerDiffPart,
  CleanerIssue,
  CleanerOutputProps,
  CleanerOutputView,
  CleanerSeverity,
  CleanerT,
  ContextMode,
  ContextModeValue,
} from "./cleaner-types";
export type { CleanerWorkbenchProps } from "./cleaner-workbench";

export type {
  ToolHeroProps,
  ToolHeroBadge,
  ToolHeroMeta,
  ToolHeroLink,
} from "./tool-hero";
export type { PageHeaderProps } from "./page-header";
export type { ContentHeaderProps } from "./content-header";
export type { SizeTableProps, SizeTableRow } from "./size-table";
export type { FormatGuideProps } from "./format-guide";
export type { RelatedLinksProps, RelatedLink } from "./related-links";
export type { LinkCardProps, LinkCardItem } from "./link-card";
export type {
  DashboardOverviewProps,
  DashboardStat,
  DashboardActivityItem,
  DashboardActivities,
  DashboardQuickAction,
  DashboardQuickActions,
} from "./dashboard-overview";
export type {
  SettingsOverviewProps,
  SettingsOverviewItem,
} from "./settings-overview";
export type {
  ActivityOverviewProps,
  ActivityStat,
  ActivityTaskItem,
  ActivityQuickAction,
  ActivityTone,
} from "./activity-overview";

export type { ChatWorkbenchProps, ChatSuggestionChip } from "./chat-workbench";
export type {
  ChatHistoryProps,
  ChatHistoryItem,
  ChatHistoryGroup,
  ChatHistoryStat,
  ChatHistoryStatTone,
} from "./chat-history";
export type {
  MusicGeneratorStudioMode,
  MusicGeneratorStudioModeItem,
  MusicGeneratorStudioOption,
  MusicGeneratorStudioSong,
  MusicGeneratorStudioProps,
} from "./music-generator-studio";
export type {
  ImageGeneratorStudioProps,
  ImageGeneratorStudioImage,
  ImageGeneratorStudioOption,
  ImageGeneratorStudioTabItem,
  ImageGeneratorStudioTab,
} from "./image-generator-studio";

export type {
  VideoGeneratorStudioProps,
  VideoGeneratorStudioVideo,
  VideoGeneratorStudioOption,
  VideoGeneratorStudioTabItem,
  VideoGeneratorStudioTab,
} from "./video-generator-studio";

export type {
  ResizeWorkbenchFormat,
  ResizeWorkbenchFormatOption,
  ResizeWorkbenchPlatform,
  ResizeWorkbenchPreset,
  ResizeWorkbenchProps,
  ResizeWorkbenchQualityCheck,
} from "./resize-workbench";

export type {
  CompressWorkbenchFormat,
  CompressWorkbenchFormatOption,
  CompressWorkbenchProps,
} from "./compress-workbench";

export type {
  ExtractWorkbenchProps,
  ExtractWorkbenchTip,
} from "./extract-workbench";

export type {
  DownloadWorkbenchProps,
  DownloadWorkbenchQuality,
  DownloadWorkbenchTip,
} from "./download-workbench";

export type {
  PreviewSceneDef,
  PreviewSceneId,
  PreviewWorkbenchProps,
  PreviewWorkbenchTip,
} from "./preview-workbench";
export type {
  DesignerDesign,
  DesignerDesignPatch,
  DesignerEffects,
  DesignerExportItem,
  DesignerImageFit,
  DesignerStage,
  DesignerStudioCategoryDef,
  DesignerStudioProps,
  DesignerStudioStageDef,
  DesignerTemplate,
  DesignerTemplateCategory,
  DesignerTextAlign,
} from "./designer-studio";
export type {
  WorkbenchAlignDir,
  WorkbenchBackground,
  WorkbenchContextMenu,
  WorkbenchDistributeAxis,
  WorkbenchElementKind,
  WorkbenchEnhance,
  WorkbenchExportFormat,
  WorkbenchExportResult,
  WorkbenchGalleryCard,
  WorkbenchLayer,
  WorkbenchLayerMoveDir,
  WorkbenchObject,
  WorkbenchProps,
  WorkbenchT,
  WorkbenchTemplate,
  WorkbenchTemplateCategory,
  WorkbenchTextStyle,
  WorkbenchTextPreset,
  WorkbenchTool,
  WorkbenchZOp,
  WorkbenchAiTask,
} from "./workbench";
