/**
 * Pixel theme manifest — which implementations back each contract key for the
 * `pixel` theme.
 *
 * Registration lives here (not in `registry.ts`) so adding a pixel-theme
 * component touches only this file + the component itself; the registry
 * aggregator (`../../registry.ts`) assembles this into the `registry` map.
 *
 * Pixel is the historical reference implementation, so several pixel-only
 * feature workbenches (perler-beads, dither, image editor, cleaner, light-tool
 * demos) also register here — the app's bridges resolve them via
 * `resolvePerler`/`resolveDither`/`resolveEditor`/`resolveCleaner`/
 * `resolveLightDemo` instead of deep-importing the pixel subpath.
 */
import { Button as PixelButton } from "./button";
import { Badge as PixelBadge } from "./badge";
import { Card as PixelCard } from "./card";
import { Skeleton as PixelSkeleton } from "./skeleton";
import { Input as PixelInput } from "./input";
import { Textarea as PixelTextarea } from "./textarea";
import { Switch as PixelSwitch } from "./switch";
import { Progress as PixelProgress } from "./progress";
import { Tooltip as PixelTooltip } from "./tooltip";
import { Header as PixelHeader } from "./header";
import { Footer as PixelFooter } from "./footer";
import { Box as PixelBox } from "./box";
import { Label as PixelLabel } from "./label";
import { Avatar as PixelAvatar } from "./avatar";
import { Dialog as PixelDialog } from "./dialog";
import { PromoModal as PixelPromoModal } from "./promo-modal";
import { ToolFooter as PixelToolFooter } from "./tool-footer";
import { ToolHeader as PixelToolHeader } from "./tool-header";
import { UploadZone as PixelUploadZone } from "./upload-zone";
import { ToolSettings as PixelToolSettings } from "./tool-settings";
import { HintBanner as PixelHintBanner } from "./hint-banner";
import { DualCta as PixelDualCta } from "./dual-cta";
import { Dropdown as PixelDropdown } from "./dropdown";
import {
  Stack as PixelStack,
  Cluster as PixelCluster,
  Grid as PixelGrid,
  Divider as PixelDivider,
} from "./layout";
import {
  Select as PixelSelect,
  Toggle as PixelToggle,
  ToggleGroup as PixelToggleGroup,
  BareTextarea as PixelBareTextarea,
} from "./form";
import { IconFrame as PixelIconFrame } from "./iconframe";
import { Hero as PixelHero } from "./sections/hero";
import { Faq as PixelFaq } from "./sections/faq";
import { Cta as PixelCta } from "./sections/cta";
import { FeaturesGrid as PixelFeaturesGrid } from "./sections/features/features-grid";
import { FeaturesStep as PixelFeaturesStep } from "./sections/features/features-step";
import { Features as PixelFeatures } from "./sections/features/features";
import { FeaturesAccordion as PixelFeaturesAccordion } from "./sections/features/features-accordion";
import { FeaturesCompare as PixelFeaturesCompare } from "./sections/features/features-compare";
import { ToolsGrid as PixelToolsGrid } from "./sections/tools-grid";
import { Showcases as PixelShowcases } from "./sections/showcases";
import { ShowcasesFlow as PixelShowcasesFlow } from "./sections/showcases-flow";
import { Testimonials as PixelTestimonials } from "./sections/testimonials";
import { Pricing as PixelPricing } from "./sections/pricing";
import { FeaturesFlow as PixelFeaturesFlow } from "./sections/features/features-flow";
import { FeaturesList as PixelFeaturesList } from "./sections/features/features-list";
import { Blog as PixelBlog } from "./sections/blog/blog";
import { BlogDetail as PixelBlogDetail } from "./sections/blog/blog-detail";
import { RelatedPosts as PixelRelatedPosts } from "./sections/blog/related-posts";
import { BlogToolCta as PixelBlogToolCta } from "./sections/blog/blog-tool-cta";
import { PixelAmbientProvider } from "./ambient";

// Perler-beads (pixel-only workbench) — single-theme; registered so app-side
// bridges resolve through the registry instead of deep-importing the pixel
// subpath. `default` intentionally has no perler entries (feature is pixel-only).
import { ToolBar as PixelPerlerToolBar } from "./sections/perler-beads";
import { ColorPalette as PixelPerlerColorPalette } from "./sections/perler-beads";
import { GridTooltip as PixelPerlerGridTooltip } from "./sections/perler-beads";
import { FloatingToolbar as PixelPerlerFloatingToolbar } from "./sections/perler-beads";
import { DownloadSettingsModal as PixelPerlerDownloadSettingsModal } from "./sections/perler-beads";
import { ColorStatusBar as PixelPerlerColorStatusBar } from "./sections/perler-beads";
import { ProgressBar as PixelPerlerProgressBar } from "./sections/perler-beads";
import { ColorPanel as PixelPerlerColorPanel } from "./sections/perler-beads";
import { SettingsPanel as PixelPerlerSettingsPanel } from "./sections/perler-beads";
import { CelebrationAnimation as PixelPerlerCelebrationAnimation } from "./sections/perler-beads";
import { MagnifierSelectionOverlay as PixelPerlerMagnifierSelectionOverlay } from "./sections/perler-beads";
import { FocusCanvas as PixelPerlerFocusCanvas } from "./sections/perler-beads";
import { FocusHeader as PixelPerlerFocusHeader } from "./sections/perler-beads";
import { PixelatedPreviewCanvas as PixelPerlerPixelatedPreviewCanvas } from "./sections/perler-beads";
import { CompletionCard as PixelPerlerCompletionCard } from "./sections/perler-beads";
import { DonationModal as PixelPerlerDonationModal } from "./sections/perler-beads";
import { MagnifierTool as PixelPerlerMagnifierTool } from "./sections/perler-beads";
import { InstallPWA as PixelPerlerInstallPWA } from "./sections/perler-beads";
import { FocusModePreDownloadModal as PixelPerlerFocusModePreDownloadModal } from "./sections/perler-beads";
import { CustomPaletteEditor as PixelPerlerCustomPaletteEditor } from "./sections/perler-beads";
import { FloatingColorPalette as PixelPerlerFloatingColorPalette } from "./sections/perler-beads";
import { ColorStatsPanel as PixelPerlerColorStatsPanel } from "./sections/perler-beads";
import { ImageCompareModal as PixelPerlerImageCompareModal } from "./sections/perler-beads";
import { ShareModal as PixelPerlerShareModal } from "./sections/perler-beads";
import { PerlerGalleryCard as PixelPerlerGalleryCard } from "./sections/perler-beads";
import { PerlerGalleryFeed as PixelPerlerGalleryFeed } from "./sections/perler-beads";
import { PerlerCommunityFeed as PixelPerlerCommunityFeed } from "./sections/perler-beads";
import { PerlerCommunityCard as PixelPerlerCommunityCard } from "./sections/perler-beads";
import { PerlerAppLanding as PixelPerlerAppLanding } from "./sections/perler-beads";
import { PerlerToolRail as PixelPerlerToolRail } from "./sections/perler-beads";
import { PerlerWorkBar as PixelPerlerWorkBar } from "./sections/perler-beads";
import { PerlerSelectionOverlay as PixelPerlerSelectionOverlay } from "./sections/perler-beads";
import { ColorSwatches as PixelPerlerColorSwatches } from "./sections/perler-beads";
import { SampleGallery as PixelPerlerSampleGallery } from "./sections/perler-beads";
import { LightToolDemo as PixelLightToolDemo } from "./light-tool-demo";
import { ParamGeneratorDemo as PixelParamGeneratorDemo } from "./light-tool-demo";
import { BackgroundGeneratorDemo as PixelBackgroundGeneratorDemo } from "./light-tool-demo";
import { GameIconGeneratorDemo as PixelGameIconGeneratorDemo } from "./light-tool-demo";
import { PaletteExtractorDemo as PixelPaletteExtractorDemo } from "./light-tool-demo";
import { ArtifactHero as PixelArtifactHero } from "./light-tool-demo";
import { CraftEntryNav as PixelCraftEntryNav } from "./light-tool-demo";
import { DitherSettingsPanel as PixelDitherSettingsPanel } from "./sections/dither";
import { DitherPreview as PixelDitherPreview } from "./sections/dither";
import { EditorShell as PixelEditorShell } from "./editor";
import {
  CleanerWorkbench as PixelCleanerWorkbench,
  CleanerOutput as PixelCleanerOutput,
} from "./sections/cleaner";
import { EditorToolbar as PixelEditorToolbar } from "./editor";
import { EditorSidebar as PixelEditorSidebar } from "./editor";
import { EditorCanvas as PixelEditorCanvas } from "./editor";

import type { ThemeManifest } from "../../registry-types";

export const pixelManifest: ThemeManifest = {
  name: "pixel",
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
};
