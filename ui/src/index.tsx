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
  InputNumberProps,
  SliderProps,
  TagProps,
  TabsProps,
  TabsItem,
  EmptyProps,
  SpinProps,
  StepsProps,
  StepsItem,
  StepStatus,
  TableProps,
  TableColumn as ThemeTableColumn,
  DescriptionsProps,
  DescriptionsItem,
  BannerProps,
  LayoutShellProps,
  NavigationItem,
  NavigationProps,
  ImageProps,
  ColorPickerProps,
  CollapsePanelItem,
  CollapseProps,
  ListGrid,
  ListProps,
  CarouselProps,
  TimelineItem,
  TimelineProps,
  CopyTextProps,
  ConsoleLayoutProps,
  ConsoleLayoutBrand,
  ConsoleLayoutNavGroup,
  ConsoleLayoutNavItem,
} from "./contracts";

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
  CtaLink,
  FeaturesFlowProps,
  FeaturesListProps,
  StatsProps,
  LogosProps,
  ToolHeroProps,
  ToolHeroBadge,
  ToolHeroMeta,
  ToolHeroLink,
  BlogProps,
  BlogDetailProps,
  HeroCleanerProps,
  RelatedPostsProps,
  BlogToolCtaProps,
  PageHeaderProps,
  DashboardOverviewProps,
  DashboardStat,
  DashboardActivityItem,
  DashboardActivities,
  DashboardQuickAction,
  DashboardQuickActions,
  SettingsOverviewProps,
  SettingsOverviewItem,
  ChatWorkbenchProps,
  ChatSuggestionChip,
  ChatHistoryProps,
  ChatHistoryItem,
  ChatHistoryGroup,
  ChatHistoryStat,
  ChatHistoryStatTone,
  ImageGeneratorStudioProps,
  ImageGeneratorStudioImage,
  ImageGeneratorStudioOption,
  ImageGeneratorStudioTabItem,
  ImageGeneratorStudioTab,
  MusicGeneratorStudioProps,
  MusicGeneratorStudioMode,
  MusicGeneratorStudioModeItem,
  MusicGeneratorStudioOption,
  MusicGeneratorStudioSong,
  VideoGeneratorStudioProps,
  VideoGeneratorStudioVideo,
  VideoGeneratorStudioOption,
  VideoGeneratorStudioTabItem,
  VideoGeneratorStudioTab,
  ResizeWorkbenchFormat,
  ResizeWorkbenchFormatOption,
  ResizeWorkbenchPlatform,
  ResizeWorkbenchPreset,
  ResizeWorkbenchProps,
  ResizeWorkbenchQualityCheck,
  CompressWorkbenchFormat,
  CompressWorkbenchFormatOption,
  CompressWorkbenchProps,
  ExtractWorkbenchProps,
  ExtractWorkbenchTip,
  DownloadWorkbenchProps,
  DownloadWorkbenchQuality,
  DownloadWorkbenchTip,
  ActivityOverviewProps,
  ActivityStat,
  ActivityTaskItem,
  ActivityQuickAction,
  ActivityTone,
} from "./contracts/sections";

export type { HeaderProps } from "./contracts/header";
export type { FooterProps } from "./contracts/footer";
export type {
  BoxProps,
  BoxTone,
  BoxVariant,
  BoxPadding,
  BoxRadius,
  BoxAs,
} from "./contracts/box";
export type { LabelProps } from "./contracts/label";
export type { AvatarProps } from "./contracts/avatar";
export type { DialogProps } from "./contracts/dialog";
export type { PromoModalProps } from "./contracts/promo-modal";
export type { ToolFooterProps } from "./contracts/tool-footer";
export type { ToolHeaderProps, ToolHeaderLink } from "./contracts/tool-header";
export type { UploadZoneProps } from "./contracts/upload-zone";
export type {
  ToolSettingsProps,
  ColorSystemOption,
  PixelationMode,
  TranslationFn,
} from "./contracts/tool-settings";
export type { HintBannerProps } from "./contracts/hint-banner";
export type { DualCtaProps } from "./contracts/dual-cta";
export type { DropdownProps, DropdownItem } from "./contracts/dropdown";
export type {
  StackProps,
  ClusterProps,
  GridProps,
  DividerProps,
} from "./contracts/layout";
export type {
  SelectProps,
  SelectOption,
  ToggleProps,
  ToggleGroupProps,
  BareTextareaProps,
} from "./contracts/form";
export type { IconFrameProps } from "./contracts/iconframe";
export { Footer } from "./themes/pixel/footer";
export { PixelThemeToggler } from "./themes/pixel/theme-toggler";
export type { PageShellProps } from "./contracts/pageshell";
export { PageShell } from "./themes/pixel/pageshell";

// Shared presentational components (no app deps).
export { SmartIcon } from "./components/smart-icon";
export { ScrollAnimation } from "./components/scroll-animation";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/accordion";
export { PixelIcon } from "./components/pixel-icon";
export type { PixelIconProps } from "./components/pixel-icon";
// Vendored magicui effects (generic motion primitives).
export { Particles } from "./components/magicui/particles";
export { BorderBeam } from "./components/magicui/border-beam";
export { RetroGrid } from "./components/magicui/retro-grid";
export { Meteors } from "./components/magicui/meteors";
export { Ripple } from "./components/magicui/ripple";
export { AvatarCircles } from "./components/magicui/avatar-circles";
export { TextShimmer } from "./components/magicui/text-shimmer";
// Raw shadcn/radix composites (generic primitives, theme-agnostic).
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/tabs";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./components/select";

// Theme-aware thin Tooltip (contract) — distinct from the composite
// default tooltip sub-components below.
export { Tooltip } from "./tooltip";

// Shared section data types.
export type { Section, SectionItem, Hero, Testimonials } from "./types/landing";
export type {
  Pricing,
  PricingItem,
  PricingCurrency,
  PricingGroup,
} from "./types/pricing";
export type { Button, NavItem, Image } from "./types/common";

export {
  ThemeRegistryProvider,
  useThemeComponent,
  useActiveTheme,
} from "./context";

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
} from "./registry";
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
} from "./registry";

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
} from "./themes/pixel/sections/perler-beads";
export type {
  PerlerMappedPixel,
  PerlerPaletteColor,
  PerlerColorReplaceState,
  PerlerPaletteSelections,
  GridDownloadOptions,
} from "./contracts/perler-beads";
export { gridLineColorOptions } from "./themes/pixel/sections/perler-beads";

// Dither workbench — component prop contracts (pixel sections) + shared types.
export type {
  DitherSettingsPanelProps,
  DitherPreviewProps,
  DitherExportScale,
  DitherT,
} from "./themes/pixel/sections/dither";
export type {
  DitherMethod,
  DitherMode,
  DitherOptions,
} from "./contracts/dither/types";
export { DEFAULT_DITHER_OPTIONS } from "./contracts/dither/types";

// Cleaner workbench — display component prop contracts. Components are consumed
// via `resolveCleaner`; the props types are exported so app blocks can type
// their thin forwarders. Display types are shared (default + pixel).
export type { CleanerWorkbenchProps } from "./contracts/sections/cleaner-workbench";
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
} from "./contracts/sections/cleaner-types";

// Light-tool demo — reusable upload→process→download asset for the SEO tool pages.
export {
  ArtifactHero,
  drawArtifactChart,
} from "./themes/pixel/light-tool-demo";
export type {
  ArtifactHeroProps,
  ArtifactRenderStyle,
} from "./themes/pixel/light-tool-demo";
export { CraftEntryNav } from "./themes/pixel/light-tool-demo";
export type {
  CraftEntryNavProps,
  CraftEntryKind,
} from "./themes/pixel/light-tool-demo";
export {
  PIXEL_PATTERNS,
  getPixelPattern,
  patternsForCraft,
  patternStats,
} from "./themes/pixel/light-tool-demo";
export type {
  PixelCraft,
  PatternCategory,
  PixelPattern,
  PatternStats,
} from "./themes/pixel/light-tool-demo";
export { genNum, genStr, genBool } from "./themes/pixel/light-tool-demo";
export {
  setToolHandoff,
  stageWorkbenchHandoff,
  consumeWorkbenchHandoff,
} from "./themes/pixel/light-tool-demo";
export type { WorkbenchHandoff } from "./themes/pixel/light-tool-demo";
export type {
  LightToolDemoProps,
  LightToolDemoProcessor,
  LightToolDemoResult,
  GenParam,
  GenValues,
  GenTool,
  GenListRow,
  ParamGeneratorDemoProps,
  LightToolParamSpec,
} from "./themes/pixel/light-tool-demo";

// Generic image-editor shell — reusable asset for the image-design workbenches.
export {
  EditorPanel,
  PresetGrid,
  ToolButton,
  AdjustmentRow,
} from "./themes/pixel/editor";
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
} from "./themes/pixel/editor";

export { cn } from "./lib/utils";
export { stripTemplateTokens } from "./lib/strip-tokens";

// cva variant definitions (shadcn template) — re-exported so app callers like
// pagination.tsx can reach buttonVariants / badgeVariants.
export { buttonVariants } from "./themes/default/button";
export { badgeVariants } from "./themes/default/badge";
// Card composite sub-components (layout primitives, always default-flavored).
export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "./themes/default/card";
// Tooltip composite sub-components (default shadcn, for app-side composable
// call sites that don't need theme switching).
export {
  Tooltip as TooltipComposite,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./themes/default/tooltip-composite";

// Vendored shadcn/radix primitives (generic, theme-agnostic).
export { Avatar, AvatarImage, AvatarFallback } from "./components/avatar";
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/breadcrumb";
export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from "./components/button-group";
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./components/carousel";
export type { CarouselApi } from "./components/carousel";
export { Checkbox } from "./components/checkbox";
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/collapsible";
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./components/command";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog";
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./components/drawer";
export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./components/dropdown-menu";
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "./components/form";
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./components/hover-card";
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "./components/input-group";
export { Label } from "./components/label";
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./components/navigation-menu";
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/pagination";
export { RadioGroup, RadioGroupItem } from "./components/radio-group";
export { ScrollArea, ScrollBar } from "./components/scroll-area";
export { Separator } from "./components/separator";
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./components/sheet";
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./components/sidebar";
export { Toaster } from "./components/sonner";
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./components/table";
export { Toggle, toggleVariants } from "./components/toggle";
export { ToggleGroup, ToggleGroupItem } from "./components/toggle-group";
export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "./components/chart";
export type { ChartConfig } from "./components/chart";
export { Highlighter } from "./components/highlighter";
export { InfiniteSlider } from "./components/infinite-slider";
export type { InfiniteSliderProps } from "./components/infinite-slider";
export { Marquee } from "./components/marquee";
export {
  GRADIENT_ANGLES,
  ProgressiveBlur,
} from "./components/progressive-blur";
export type { ProgressiveBlurProps } from "./components/progressive-blur";
export { TextEffect } from "./components/text-effect";
export type {
  PresetType,
  PerType,
  TextEffectProps,
} from "./components/text-effect";
export { AnimatedGridPattern } from "./components/animated-grid-pattern";
export type { AnimatedGridPatternProps } from "./components/animated-grid-pattern";
export { AnimatedGroup } from "./components/animated-group";
export type {
  PresetType as AnimatedGroupPresetType,
  AnimatedGroupProps,
} from "./components/animated-group";

// Console feature contracts (schema-driven form/table types).
// Aliased where the bare name would clash with a component export
// (Button / Form / Table / Pagination).
export type {
  Image as NavImage,
  Brand,
  NavItem as ConsoleNavItem,
  Nav,
  Crumb,
  Tab,
  FilterOption,
  Filter,
  Search,
  Button as NavButton,
  SocialNav,
  AgreementNav,
  UserNav,
  Pagination as PaginationInfo,
} from "./contracts/features/common";
export type {
  FormField as ConsoleFormField,
  FormSubmit,
  Form as FormConfig,
} from "./contracts/features/form";
export type {
  TableColumn,
  Table as TableConfig,
} from "./contracts/features/table";

// Console bridge (i18n navigation injection seam) + schema-driven console
// stack. Component names aliased where the bare name clashes with a
// primitive (Form / Table / Tabs / Pagination).
export {
  ConsoleBridgeProvider,
  useConsoleBridge,
  ConsoleLink,
} from "./components/console/bridge";
export type { ConsoleBridgeValue } from "./components/console/bridge";
export { Form as ConsoleForm } from "./components/console/form";
export { FormCard } from "./components/console/form/form-card";
export { Table as ConsoleTable } from "./components/console/table";
export { TableCard } from "./components/console/table/table-card";
export { PanelCard } from "./components/console/panel-card";
export { ConsoleLayout } from "./components/console/console-layout";
// Generic common components (used by the console stack; theme-agnostic).
export { Tabs as NavTabs } from "./components/common/tabs";
export { Pagination as NavPagination } from "./components/common/pagination";
export { LazyImage } from "./components/common/lazy-image";
export { MarkdownEditor } from "./components/common/markdown-editor";
export { ImageUploader } from "./components/common/image-uploader";
export type { ImageUploaderValue } from "./components/common/image-uploader";

// Generic common presentational components + MDX content blocks.
export { Empty } from "./components/common/empty";
export { SectionHeader } from "./components/common/section-header";
export { AudioPlayer } from "./components/common/audio-player";
export { Crumb as CrumbNav } from "./components/common/crumb";
export { PageHeader } from "./components/common/page-header";
export { MarkdownPreview } from "./components/common/markdown-preview";
export { MarkdownContent } from "./components/common/markdown-content";
// MDX blocks (content rendering, server-safe).
export { Callout } from "./components/mdx/Callout";
export { Stats } from "./components/mdx/Stats";
export { Steps, Step } from "./components/mdx/Steps";
export { ProCon } from "./components/mdx/ProCon";
export { Ingredients } from "./components/mdx/Ingredients";
export { RelatedArticles } from "./components/mdx/RelatedArticles";
