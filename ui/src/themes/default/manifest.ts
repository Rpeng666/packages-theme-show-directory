/**
 * Default theme manifest — which implementations back each contract key for
 * the `default` theme.
 *
 * Registration lives here (not in `registry.ts`) so adding a default-theme
 * component touches only this file + the component itself; the registry
 * aggregator (`../../registry.ts`) assembles this into the `registry` map.
 *
 * A few landing sections have no default implementation and reuse the semi
 * theme's (FeaturesFlow/FeaturesList/Stats/Logos/ToolHero) — imported from
 * the merged semi theme directory (`../semi/index`), matching the previous
 * single-file registry.
 */
import { Button as DefaultButton } from "./button";
import { Badge as DefaultBadge } from "./badge";
import { Card as DefaultCard } from "./card";
import { Skeleton as DefaultSkeleton } from "./skeleton";
import { Input as DefaultInput } from "./input";
import { Textarea as DefaultTextarea } from "./textarea";
import { Switch as DefaultSwitch } from "./switch";
import { Progress as DefaultProgress } from "./progress";
import { Tooltip as DefaultTooltip } from "./tooltip";
import { Header as DefaultHeader } from "./header";
import { Footer as DefaultFooter } from "./footer";
import { Box as DefaultBox } from "./box";
import { Label as DefaultLabel } from "./label";
import { Avatar as DefaultAvatar } from "./avatar";
import { Dialog as DefaultDialog } from "./dialog";
import { PromoModal as DefaultPromoModal } from "./promo-modal";
import { ToolFooter as DefaultToolFooter } from "./tool-footer";
import { ToolHeader as DefaultToolHeader } from "./tool-header";
import { UploadZone as DefaultUploadZone } from "./upload-zone";
import { ToolSettings as DefaultToolSettings } from "./tool-settings";
import { HintBanner as DefaultHintBanner } from "./hint-banner";
import { DualCta as DefaultDualCta } from "./dual-cta";
import { Dropdown as DefaultDropdown } from "./dropdown";
import {
  Stack as DefaultStack,
  Cluster as DefaultCluster,
  Grid as DefaultGrid,
  Divider as DefaultDivider,
} from "./layout";
import {
  Select as DefaultSelect,
  Toggle as DefaultToggle,
  ToggleGroup as DefaultToggleGroup,
  BareTextarea as DefaultBareTextarea,
} from "./form";
import { IconFrame as DefaultIconFrame } from "./iconframe";
import { InputNumber as DefaultInputNumber } from "./input-number";
import { Slider as DefaultSlider } from "./slider";
import { Tag as DefaultTag } from "./tag";
import { Tabs as DefaultTabs } from "./tabs";
import { Empty as DefaultEmpty } from "./empty";
import { Spin as DefaultSpin } from "./spin";
import { Steps as DefaultSteps } from "./steps";
import { Table as DefaultTable } from "./table";
import { Descriptions as DefaultDescriptions } from "./descriptions";
import { Banner as DefaultBanner } from "./banner";
import { LayoutShell as DefaultLayoutShell } from "./layout-shell";
import { Navigation as DefaultNavigation } from "./navigation";
import { Image as DefaultImage } from "./image";
import { ColorPicker as DefaultColorPicker } from "./color-picker";
import { Collapse as DefaultCollapse } from "./collapse";
import { List as DefaultList } from "./list";
import { Carousel as DefaultCarousel } from "./carousel";
import { Timeline as DefaultTimeline } from "./timeline";
import { CopyText as DefaultCopyText } from "./copy-text";
import { Hero as DefaultHero } from "./sections/hero";
import { PageHeader as DefaultPageHeader } from "./sections/page-header";
import { DashboardOverview as DefaultDashboardOverview } from "./sections/dashboard-overview";
import { SettingsOverview as DefaultSettingsOverview } from "./sections/settings-overview";
import { ActivityOverview as DefaultActivityOverview } from "./sections/activity-overview";
import { ChatWorkbench as DefaultChatWorkbench } from "./sections/chat-workbench";
import { ChatHistory as DefaultChatHistory } from "./sections/chat-history";
import { MusicGeneratorStudio as DefaultMusicGeneratorStudio } from "./sections/music-generator-studio";
import { ImageGeneratorStudio as DefaultImageGeneratorStudio } from "./sections/image-generator-studio";
import { VideoGeneratorStudio as DefaultVideoGeneratorStudio } from "./sections/video-generator-studio";
import { ResizeWorkbench as DefaultResizeWorkbench } from "./sections/resize-workbench";
import { CompressWorkbench as DefaultCompressWorkbench } from "./sections/compress-workbench";
import { ExtractWorkbench as DefaultExtractWorkbench } from "./sections/extract-workbench";
import { DownloadWorkbench as DefaultDownloadWorkbench } from "./sections/download-workbench";
import { PreviewWorkbench as DefaultPreviewWorkbench } from "./sections/preview-workbench";
import { DesignerStudio as DefaultDesignerStudio } from "./sections/designer-studio";
import { FeaturesGrid as DefaultFeaturesGrid } from "./sections/features-grid";
import { Features as DefaultFeatures } from "./sections/features";
import { FeaturesAccordion as DefaultFeaturesAccordion } from "./sections/features-accordion";
import { FeaturesCompare as DefaultFeaturesCompare } from "./sections/features-compare";
import { ToolsGrid as DefaultToolsGrid } from "./sections/tools-grid";
import { Showcases as DefaultShowcases } from "./sections/showcases";
import { Testimonials as DefaultTestimonials } from "./sections/testimonials";
import { Pricing as DefaultPricing } from "./sections/pricing";
import { Faq as DefaultFaq } from "./sections/faq";
import { Cta as DefaultCta } from "./sections/cta";
import { Subscribe as DefaultSubscribe } from "./sections/subscribe";
import { FeaturesStep as DefaultFeaturesStep } from "./sections/features-step";
import { HeroCleaner as DefaultHeroCleaner } from "./sections/hero-cleaner";
import { HeroLive as DefaultHeroLive } from "./sections/hero-live";
import { Blog as DefaultBlog } from "./sections/blog";
import { BlogDetail as DefaultBlogDetail } from "./sections/blog-detail";
import {
  CleanerWorkbench as DefaultCleanerWorkbench,
  CleanerOutput as DefaultCleanerOutput,
} from "./sections/cleaner";

import {
  FeaturesFlow as SemiFeaturesFlow,
  FeaturesList as SemiFeaturesList,
  Stats as SemiStats,
  Logos as SemiLogos,
  ToolHero as SemiToolHero,
} from "../semi/index";

import type { ThemeManifest } from "../../registry-types";

export const defaultManifest: ThemeManifest = {
  name: "default",
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
    Layout: DefaultLayoutShell,
    Navigation: DefaultNavigation,
    Image: DefaultImage,
    ColorPicker: DefaultColorPicker,
    Collapse: DefaultCollapse,
    List: DefaultList,
    Carousel: DefaultCarousel,
    Timeline: DefaultTimeline,
    CopyText: DefaultCopyText,
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
    Subscribe: DefaultSubscribe,
    FeaturesStep: DefaultFeaturesStep,
    // No default implementation for these — reuse the semi theme's.
    FeaturesFlow: SemiFeaturesFlow,
    FeaturesList: SemiFeaturesList,
    Stats: SemiStats,
    Logos: SemiLogos,
    ToolHero: SemiToolHero,
    PageHeader: DefaultPageHeader,
    DashboardOverview: DefaultDashboardOverview,
    SettingsOverview: DefaultSettingsOverview,
    ActivityOverview: DefaultActivityOverview,
    ChatWorkbench: DefaultChatWorkbench,
    ChatHistory: DefaultChatHistory,
    MusicGeneratorStudio: DefaultMusicGeneratorStudio,
    ImageGeneratorStudio: DefaultImageGeneratorStudio,
    VideoGeneratorStudio: DefaultVideoGeneratorStudio,
    ResizeWorkbench: DefaultResizeWorkbench,
    CompressWorkbench: DefaultCompressWorkbench,
    ExtractWorkbench: DefaultExtractWorkbench,
    DownloadWorkbench: DefaultDownloadWorkbench,
    PreviewWorkbench: DefaultPreviewWorkbench,
    DesignerStudio: DefaultDesignerStudio,
    HeroCleaner: DefaultHeroCleaner,
    HeroLive: DefaultHeroLive,
    Blog: DefaultBlog,
    BlogDetail: DefaultBlogDetail,
  },
  cleaner: {
    Workbench: DefaultCleanerWorkbench,
    Output: DefaultCleanerOutput,
  },
};
