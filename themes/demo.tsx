/**
 * Demo section data for the showcase — sample `Section` objects keyed by
 * block name. These drive the forwarder blocks in themes/default/blocks.
 */
import type { Section } from "@template/ui";

export const heroSection: Section = {
  id: "hero",
  label: "New",
  title: "Build beautiful interfaces with a theme system",
  description:
    "Every component and section lives in a registry. Switch themes, compare implementations, and ship the look you want — no copy-paste.",
  highlight_text: "theme system",
  buttons: [
    { title: "Get started", url: "#", variant: "default" },
    { title: "Learn more", url: "#", variant: "outline" },
  ],
  features: [
    { title: "4 themes", description: "default, pixel, semi, raycast" },
    { title: "98 components", description: "primitives + sections" },
    { title: "Open registry", description: "drop a file to register" },
  ],
};

export const featuresSection: Section = {
  id: "features",
  sr_only_title: "Features",
  title: "Everything you need",
  description: "A full set of landing blocks resolved through the registry.",
  items: [
    { title: "Data-driven", description: "Sections render from plain Section data.", icon: "sparkles" },
    { title: "Theme-able", description: "Each theme overrides any block.", icon: "palette" },
    { title: "Forwarders", description: "Blocks delegate to registered implementations.", icon: "refresh" },
    { title: "Fallback chain", description: "Missing blocks fall back to default.", icon: "shield" },
  ],
};

export const featuresGridSection: Section = {
  id: "features-grid",
  title: "Feature grid",
  description: "A responsive grid of features.",
  items: [
    { title: "Fast", description: "Rendered server-side, hydrated instantly.", icon: "zap" },
    { title: "Portable", description: "Package owns no Next dependency.", icon: "package" },
    { title: "Typed", description: "Contracts give full autocomplete.", icon: "type" },
  ],
};

export const featuresStepSection: Section = {
  id: "features-step",
  title: "How it works",
  description: "Three steps from data to deployed block.",
  items: [
    { title: "Define", description: "Shape your Section data." },
    { title: "Render", description: "Forward it through a block." },
    { title: "Ship", description: "Theme it however you like." },
  ],
};

export const featuresAccordionSection: Section = {
  id: "features-accordion",
  title: "FAQ-ish features",
  description: "Expandable rows for detailed copy.",
  items: [
    { title: "What is the registry?", description: "The filesystem is the registry — drop a file and it resolves." },
    { title: "How do themes fall back?", description: "Requested theme → default → any theme → empty." },
    { title: "Can I mix themes?", description: "Yes — resolve any component for any theme." },
  ],
};

export const featuresCompareSection: Section = {
  id: "features-compare",
  title: "Compare themes",
  description: "Side-by-side feature comparison.",
  items: [
    { title: "Default", description: "shadcn-style primitives." },
    { title: "Pixel", description: "pxlkit chunky surfaces." },
    { title: "Semi", description: "HeroUI components." },
  ],
};

export const faqSection: Section = {
  id: "faq",
  title: "Frequently asked questions",
  description: "Answers to the most common questions.",
  items: [
    { title: "How do I add a theme?", description: "Create themes/{name}/ with style/ and blocks/." },
    { title: "Where does the data come from?", description: "Landing sections are plain Section objects." },
    { title: "What if a block is missing?", description: "The loader falls back to the default theme." },
  ],
};

export const ctaSection: Section = {
  id: "cta",
  title: "Ready to get started?",
  description: "Try the registry today.",
  buttons: [
    { title: "Start now", url: "#", variant: "default" },
    { title: "Contact us", url: "#", variant: "outline" },
  ],
};

export const subscribeSection: Section = {
  id: "subscribe",
  title: "Subscribe to updates",
  description: "Get the latest news in your inbox.",
  submit: { action: "#", label: "Subscribe" },
};

export const testimonialsSection: Section = {
  id: "testimonials",
  title: "Loved by developers",
  description: "What people say about the theme system.",
  items: [
    { name: "Ada Lovelace", role: "Engineer", quote: "The registry approach is genius.", avatar: { src: "", alt: "Ada" } },
    { name: "Grace Hopper", role: "Architect", quote: "Fallback chains just work.", avatar: { src: "", alt: "Grace" } },
    { name: "Linus Torvalds", role: "Maintainer", quote: "Simple, data-driven, theme-able.", avatar: { src: "", alt: "Linus" } },
  ],
};

export const toolsGridSection: Section = {
  id: "tools-grid",
  title: "Tools",
  description: "Every tool in one grid.",
  items: [
    { title: "Code Images", description: "Beautiful code screenshots", url: "#", icon: "code" },
    { title: "Icon Maker", description: "Create extension icons", url: "#", icon: "image" },
    { title: "Prompt Explorer", description: "Browse AI prompts", url: "#", icon: "sparkles" },
  ],
};

export const showcasesSection: Section = {
  id: "showcases",
  title: "Showcases",
  description: "Real projects using the system.",
  items: [
    { title: "Project One", description: "Uses default theme", url: "#" },
    { title: "Project Two", description: "Uses pixel theme", url: "#" },
  ],
};

export const heroCleanerSection: Section = {
  id: "hero-cleaner",
  title: "Clean up any image",
  description: "Remove backgrounds in one click.",
  buttons: [{ title: "Try it free", url: "#", variant: "default" }],
};

export const heroLiveSection: Section = {
  id: "hero-live",
  title: "Live editing",
  description: "See changes in real time.",
  buttons: [{ title: "Open studio", url: "#", variant: "default" }],
};

export const pricingSection: Section = {
  id: "pricing",
  title: "Simple pricing",
  description: "Pick a plan that works for you.",
  groups: [
    { name: "monthly", title: "Monthly", is_featured: true },
    { name: "yearly", title: "Yearly" },
  ],
  items: [
    {
      product_id: "free",
      title: "Free",
      description: "For individuals",
      price: "$0",
      currency: "USD",
      amount: 0,
      group: "monthly",
      features: ["1 project", "Community support"],
      is_featured: false,
    },
    {
      product_id: "pro",
      title: "Pro",
      description: "For teams",
      price: "$12",
      currency: "USD",
      amount: 12,
      group: "monthly",
      features: ["Unlimited projects", "Priority support"],
      is_featured: true,
    },
  ],
};

export const blogSection: Section = {
  id: "blog",
  title: "From the blog",
  description: "Latest articles.",
  items: [
    { title: "Introducing the theme registry", description: "How the filesystem became the registry.", url: "#" },
    { title: "Fallback chains explained", description: "Requested → default → any → empty.", url: "#" },
  ],
};

export const blogDetailSection: Section = {
  id: "blog-detail",
  title: "A deep dive into theme blocks",
  description: "How forwarders resolve registered implementations.",
};

export const blogDetailPost = {
  id: "blog-detail",
  slug: "theme-blocks",
  title: "A deep dive into theme blocks",
  description: "How forwarders resolve registered implementations.",
  created_at: "2024-08-23",
  author_name: "Ada Lovelace",
  author_role: "Platform Engineer",
  author_image: "",
  content:
    "Every block in themes/default/blocks is a forwarder: it resolves the registered section from the registry and injects the section data. The registry falls back through requested theme → default → any theme → empty.",
};


/** ActivityOverview — activity-center home block (needs stats etc., not a Section). */
export const activityOverviewProps = {
  welcomeTitle: "Welcome back, Ada",
  welcomeDescription: "Here's what's been happening across your workspace today.",
  stats: [
    { key: "tasks", label: "AI tasks", value: "128", icon: "sparkles", tone: "blue" as const, hint: "+12 today" },
    { key: "images", label: "Images", value: "342", icon: "image", tone: "purple" as const, hint: "24 in queue" },
    { key: "songs", label: "Songs", value: "56", icon: "music", tone: "green" as const, hint: "3 new" },
    { key: "videos", label: "Videos", value: "12", icon: "video", tone: "gold" as const, hint: "1 exporting" },
  ],
  recentTasks: {
    title: "Recent AI tasks",
    viewAllLabel: "View all",
    viewAllUrl: "#",
    items: [
      { id: "t1", title: "Music generation", description: "Suno · v3", icon: "music", badge: { label: "Done", tone: "green" as const }, time: "3 min ago" },
      { id: "t2", title: "Image upscale", description: "Stable Diffusion · x4", icon: "image", badge: { label: "Running", tone: "blue" as const }, time: "12 min ago" },
      { id: "t3", title: "Prompt rewrite", description: "GPT-4o", icon: "sparkles", badge: { label: "Done", tone: "green" as const }, time: "1 h ago" },
      { id: "t4", title: "Video trim", description: "CapCut · 0:42", icon: "video", badge: { label: "Failed", tone: "red" as const }, time: "2 h ago" },
    ],
  },
  quickActions: {
    title: "Quick start",
    items: [
      { key: "qa1", title: "New chat", description: "Start a conversation", icon: "message", tone: "blue" as const, url: "#" },
      { key: "qa2", title: "Generate image", description: "Text to image", icon: "image", tone: "purple" as const, url: "#" },
      { key: "qa3", title: "Clean background", description: "Remove background", icon: "eraser", tone: "green" as const, url: "#" },
      { key: "qa4", title: "Export PDF", description: "Convert to PDF", icon: "file", tone: "gold" as const, url: "#" },
    ],
  },
};

/** Every demo prop bundle keyed by block name — either `{ section }` for
 * section-driven blocks, or bespoke props for workbench/studio blocks. */
export const DEMO_PROPS: Record<string, any> = {
  Hero: { section: heroSection },
  Features: { section: featuresSection },
  FeaturesGrid: { section: featuresGridSection },
  FeaturesStep: { section: featuresStepSection },
  FeaturesAccordion: { section: featuresAccordionSection },
  FeaturesCompare: { section: featuresCompareSection },
  Faq: { section: faqSection },
  Cta: { section: ctaSection },
  Subscribe: { section: subscribeSection },
  Testimonials: { section: testimonialsSection },
  ToolsGrid: { section: toolsGridSection },
  Showcases: { section: showcasesSection },
  HeroCleaner: { section: heroCleanerSection },
  HeroLive: { section: heroLiveSection },
  Pricing: { section: pricingSection },
  Blog: { section: blogSection },
  BlogDetail: { section: blogDetailSection, post: blogDetailPost },
  ActivityOverview: activityOverviewProps,

  // ── card composites ─────────────────────────────────────────────────
  CardHeader: { children: "Card header" },
  CardTitle: { children: "Card title" },
  CardDescription: { children: "Card description" },
  CardContent: { children: "Card body content." },
  CardFooter: { children: "Card footer" },
  CardAction: { children: <span className="text-sm font-medium">Action</span> },
  Carousel: {
    children: [
      <div key="1" className="flex h-32 items-center justify-center rounded-lg bg-gray-4 text-gray-9">Slide 1</div>,
      <div key="2" className="flex h-32 items-center justify-center rounded-lg bg-gray-4 text-gray-9">Slide 2</div>,
      <div key="3" className="flex h-32 items-center justify-center rounded-lg bg-gray-4 text-gray-9">Slide 3</div>,
    ],
    showArrow: true,
    showIndicator: true,
    autoPlay: false,
  },
  Dialog: {
    open: true,
    onOpenChange: () => {},
    title: "Confirm action",
    description: "Are you sure you want to continue?",
    children: "This action cannot be undone.",
    footer: <span className="text-sm">Footer slot</span>,
  },
  Toggle: {
    value: "bold",
    pressed: true,
    children: "Bold",
  },
  ToggleGroup: {
    type: "single",
    defaultValue: "bold",
    children: (
      <div className="flex gap-2">
        <button className="rounded border px-3 py-1 text-sm">Bold</button>
        <button className="rounded border px-3 py-1 text-sm">Italic</button>
      </div>
    ),
  },
  BareTextarea: {
    placeholder: "Type something…",
    defaultValue: "",
    className: "w-full max-w-md rounded border p-3 text-sm",
  },
  Image: {
    src: "",
    alt: "Placeholder",
    width: 320,
    height: 180,
    className: "rounded-lg",
  },
  LayoutShell: {
    sider: <div className="h-full w-48 bg-gray-4/50" />,
    header: <div className="h-12 border-b px-4 text-sm flex items-center">Header</div>,
    children: <div className="p-6 text-sm">Layout body</div>,
    footer: <div className="border-t px-4 py-2 text-sm">Footer</div>,
  },
  Cluster: {
    gap: 3,
    children: (
      <div className="flex flex-wrap gap-3">
        <span className="rounded bg-gray-4 px-2 py-1 text-xs">one</span>
        <span className="rounded bg-gray-4 px-2 py-1 text-xs">two</span>
        <span className="rounded bg-gray-4 px-2 py-1 text-xs">three</span>
      </div>
    ),
  },
  Grid: {
    cols: 3,
    gap: 3,
    children: (
      <div className="grid grid-cols-3 gap-3">
        <div className="h-12 rounded bg-gray-4" />
        <div className="h-12 rounded bg-gray-4" />
        <div className="h-12 rounded bg-gray-4" />
      </div>
    ),
  },
  PromoModal: {
    isOpen: false,
    onClose: () => {},
    title: "Try Pro",
    description: "Unlock every feature with a Pro plan.",
    stayLabel: "Not now",
    goLabel: "Upgrade",
    goHref: "#",
  },
  ToolFooter: {
    copyright: "© 2024 Brand",
    action: { label: "Contact", onClick: () => {} },
  },
  ToolHeader: {
    brand: "Brand",
    title: "My Tool",
    titleBadge: "Beta",
    slogan: "A simple tool.",
    links: [{ label: "Docs", href: "#", icon: "github" }],
  },
  ToolSettings: {
    granularityInput: "4",
    onGranularityInputChange: () => {},
    similarityThresholdInput: "0.6",
    onSimilarityThresholdInputChange: () => {},
    onConfirmParameters: () => {},
    onAutoRemoveBackground: () => {},
    onUndoBgRemoval: () => {},
    canAutoRemoveBackground: true,
    canUndoBgRemoval: false,
    pixelationMode: "dominant",
    onPixelationModeChange: () => {},
    colorSystemOptions: [
      { key: "rgb", name: "RGB" },
      { key: "cmyk", name: "CMYK" },
    ],
    selectedColorSystem: "rgb",
    onColorSystemSelect: () => {},
    onOpenCustomPalette: () => {},
    customPaletteCount: 0,
    isCustomPalette: false,
    t: (key: string) => key,
  },
  UploadZone: {
    isMounted: true,
    onDrop: () => {},
    onDragOver: () => {},
    onClick: () => {},
    primaryText: "Drag & drop your image here",
    clickLabel: "or click to browse",
    formatHint: "PNG, JPG up to 10MB",
    showTip: true,
    tipText: "Files stay on your device.",
  },

  PageHeader: {
    title: "Workspace settings",
    description: "Manage your team, billing, and preferences.",
    crumbs: [
      { title: "Home", url: "#" },
      { title: "Settings", url: "#" },
      { title: "Workspace" },
    ],
    actions: [
      { title: "Invite", url: "#", variant: "primary" },
      { title: "Export", url: "#" },
    ],
    tabs: [
      { title: "General", url: "#" },
      { title: "Members", url: "#" },
      { title: "Billing", url: "#" },
    ],
    search: { name: "q", placeholder: "Search settings…", value: "" },
    filters: [
      { name: "status", title: "Status", options: [{ value: "active", label: "Active" }, { value: "paused", label: "Paused" }] },
    ],
  },
  SettingsOverview: {
    title: "Settings",
    description: "Everything about your account in one place.",
    items: [
      { key: "profile", title: "Profile", description: "Name, avatar, contact", icon: "user", url: "#" },
      { key: "billing", title: "Billing", description: "Plans, invoices, payment", icon: "card", badge: "Pro", tone: "blue", url: "#" },
      { key: "team", title: "Team", description: "Members and roles", icon: "users", url: "#" },
      { key: "api", title: "API keys", description: "Manage access tokens", icon: "key", url: "#" },
      { key: "notifications", title: "Notifications", description: "Email and push", icon: "bell", url: "#" },
    ],
  },

  ImageGeneratorStudio: {
    eyebrow: "Images",
    title: "Generate images",
    description: "Text to image, or image to image.",
    activeTab: "text-to-image",
    tabs: [
      { key: "text-to-image", label: "Text to image" },
      { key: "image-to-image", label: "Image to image" },
    ],
    onTabChange: () => {},
    providerLabel: "Provider",
    providerOptions: [
      { value: "openai", label: "OpenAI" },
      { value: "stability", label: "Stability AI" },
      { value: "google", label: "Google" },
    ],
    provider: "openai",
    onProviderChange: () => {},
    modelLabel: "Model",
    modelOptions: [
      { value: "dall-e-3", label: "DALL·E 3" },
      { value: "sd-xl", label: "SDXL" },
    ],
    model: "dall-e-3",
    onModelChange: () => {},
    promptLabel: "Prompt",
    promptPlaceholder: "A serene mountain lake at sunset…",
    prompt: "A serene mountain lake at sunset, photorealistic",
    promptMaxLength: 1000,
    onPromptChange: () => {},
    signedIn: true,
    isGenerating: false,
    generateLabel: "Generate",
    onGenerate: () => {},
    creditsCostLabel: "1 credit",
    creditsRemainingLabel: "120 credits left",
    progressVisible: false,
    images: [
      { id: "img1", url: "", prompt: "Mountain lake", provider: "OpenAI", model: "DALL·E 3" },
      { id: "img2", url: "", prompt: "Forest path", provider: "OpenAI", model: "DALL·E 3" },
    ],
    galleryEmptyLabel: "No images yet",
    galleryReadyLabel: "Your generations",
    downloadLabel: "Download",
    downloadingId: null,
    onDownload: () => {},
    openInEditorLabel: "Open in editor",
    onOpenInEditor: () => {},
    footerHint: "Generations are stored in your gallery.",
  },
  MusicGeneratorStudio: {
    eyebrow: "Music",
    title: "Generate music",
    description: "Create original tracks from a text prompt.",
    activeMode: "quick",
    modes: [
      { key: "quick", label: "Quick", icon: "zap" },
      { key: "custom", label: "Custom", icon: "sliders" },
    ],
    onModeChange: () => {},
    providerLabel: "Provider",
    providerOptions: [
      { value: "suno", label: "Suno" },
      { value: "udio", label: "Udio" },
    ],
    provider: "suno",
    onProviderChange: () => {},
    modelLabel: "Model",
    modelOptions: [{ value: "v3", label: "v3" }, { value: "v3.5", label: "v3.5" }],
    model: "v3.5",
    onModelChange: () => {},
    customTitle: "My track",
    onCustomTitleChange: () => {},
    style: "ambient electronic",
    onStyleChange: () => {},
    lyrics: "Verse 1…",
    onLyricsChange: () => {},
    prompt: "A calm ambient track with soft pads",
    signedIn: true,
    isGenerating: false,
    generateLabel: "Generate",
    onGenerate: () => {},
    progressVisible: false,
    songs: [
      { id: "s1", title: "Neon Skyline", artist: "AI", style: "synthwave", durationLabel: "2:41", prompt: "retro synthwave" },
      { id: "s2", title: "Quiet Forest", artist: "AI", style: "ambient", durationLabel: "3:12", prompt: "calm ambient" },
    ],
    playerEmptyLabel: "No tracks yet",
    playerReadyLabel: "Your tracks",
    playingId: null,
    loadingId: null,
    onTogglePlay: () => {},
    onDownload: () => {},
    footerHint: "Tracks are added to your library.",
  },
  VideoGeneratorStudio: {
    eyebrow: "Videos",
    title: "Generate videos",
    description: "Text to video with reference support.",
    activeTab: "text-to-video",
    tabs: [
      { key: "text-to-video", label: "Text to video" },
      { key: "image-to-video", label: "Image to video" },
    ],
    onTabChange: () => {},
    providerLabel: "Provider",
    providerOptions: [
      { value: "runway", label: "Runway" },
      { value: "pika", label: "Pika" },
      { value: "google", label: "Google Veo" },
    ],
    provider: "runway",
    onProviderChange: () => {},
    modelLabel: "Model",
    modelOptions: [{ value: "gen3", label: "Gen-3" }, { value: "veo2", label: "Veo 2" }],
    model: "gen3",
    onModelChange: () => {},
    promptLabel: "Prompt",
    promptPlaceholder: "A drone shot over a city…",
    prompt: "A drone shot flying over a futuristic city at dusk",
    promptMaxLength: 1000,
    onPromptChange: () => {},
    signedIn: true,
    isGenerating: false,
    generateLabel: "Generate",
    onGenerate: () => {},
    progressVisible: false,
    videos: [
      { id: "v1", url: "", prompt: "City flyover", provider: "Runway", model: "Gen-3" },
      { id: "v2", url: "", prompt: "Ocean waves", provider: "Runway", model: "Gen-3" },
    ],
    stageEmptyLabel: "No videos yet",
    stageReadyLabel: "Your videos",
    downloadLabel: "Download",
    downloadingId: null,
    onDownload: () => {},
    footerHint: "Videos are stored in your library.",
  },

  CompressWorkbench: {
    eyebrow: "Compress",
    title: "Compress your image",
    description: "Shrink file size without losing quality.",
    badges: [{ label: "Free", tone: "free" }],
    meta: [{ icon: "lock", text: "In-browser only" }],
    emptyPrimary: "Drag & drop your image here",
    emptyClickLabel: "or click to browse",
    emptyHint: "PNG, JPG, WebP up to 10MB",
    sourceName: "photo.jpg",
    sourceWidth: 4032,
    sourceHeight: 3024,
    sourceSizeBytes: 4_800_000,
    onDropFile: () => {},
    formatOptions: [
      { value: "image/jpeg", label: "JPEG", desc: "Best for photos" },
      { value: "image/png", label: "PNG", desc: "Lossless" },
      { value: "image/webp", label: "WebP", desc: "Modern" },
    ],
    format: "image/jpeg",
    onFormatChange: () => {},
    qualityValue: 80,
    onQualityChange: () => {},
    compressedSizeBytes: 980_000,
    savingsPercent: 79,
    processing: false,
    limitState: "ok",
    busy: false,
    onDownload: () => {},
    footerHint: "Files never leave your device.",
  },
  DownloadWorkbench: {
    inputLabel: "Video URL",
    inputPlaceholder: "https://youtube.com/watch?v=…",
    fetchLabel: "Fetch",
    urlValue: "",
    onUrlChange: () => {},
    onSubmit: () => {},
    privacyTip: "Private & temporary.",
    resultsTitle: "Download options",
    videoId: "abc123",
    videoIdLabel: "Video",
    downloadLabel: "Download",
    downloadingLabel: "Downloading…",
    downloadingKey: null,
    onDownload: () => {},
    qualities: [
      { key: "1080p", label: "1080p MP4", width: 1920, height: 1080, url: "#", available: true },
      { key: "720p", label: "720p MP4", width: 1280, height: 720, url: "#", available: true },
      { key: "audio", label: "Audio MP3", width: 0, height: 0, url: "#", available: false, badge: "Pro" },
    ],
    noResultsTitle: "No results",
    noResultsHint: "Try another URL.",
    tipsTitle: "Tips",
    tips: [{ label: "Paste a full watch URL for best results." }],
    footerHint: "For personal use only.",
  },
  ExtractWorkbench: {
    eyebrow: "Extract",
    title: "Extract frames",
    description: "Pull stills from any video.",
    badges: [{ label: "Free", tone: "free" }],
    videoName: "demo.mp4",
    videoRef: null,
    onDropFile: () => {},
    playing: false,
    currentTime: 12,
    duration: 84,
    onTogglePlay: () => {},
    onSeek: () => {},
    onTimeUpdate: () => {},
    onLoadedMetadata: () => {},
    onEnded: () => {},
    captureLabel: "Capture frame",
    captureHint: "Pause at the moment you want.",
    onCapture: () => {},
    capturing: false,
    frameUrl: null,
    gridCount: 12,
    onGridCountChange: () => {},
    exportItems: [{ width: 1920, height: 1080, label: "1080p" }],
    exporting: false,
    onExport: () => {},
    footerHint: "Processed entirely in your browser.",
  },
  PreviewWorkbench: {
    eyebrow: "Preview",
    title: "Preview your thumbnail",
    description: "See how it looks in real products.",
    badges: [{ label: "Free", tone: "free" }],
    mode: "single",
    onModeChange: () => {},
    uploadTitle: "Upload an image",
    uploadHint: "PNG or JPG",
    uploadFormatHint: "Up to 10MB",
    uploadA: null,
    uploadB: null,
    onUploadA: () => {},
    onUploadB: () => {},
    titleValue: "My Video Title",
    titlePlaceholder: "Enter a title…",
    onTitleChange: () => {},
    channelValue: "@my-channel",
    channelPlaceholder: "Channel name…",
    onChannelChange: () => {},
    dark: true,
    onToggleDark: () => {},
    scenes: [
      { id: "feed", label: "Feed", icon: "home", size: "desktop" },
      { id: "search", label: "Search", icon: "search", size: "desktop" },
      { id: "mobile", label: "Mobile", icon: "smartphone", size: "mobile" },
      { id: "sidebar", label: "Sidebar", icon: "panel", size: "sidebar" },
    ],
    scene: "feed",
    onSceneChange: () => {},
    footerHint: "Scroll through scenes to compare.",
  },
  ResizeWorkbench: {
    eyebrow: "Resize",
    title: "Resize for any platform",
    description: "Perfect dimensions for every network.",
    badges: [{ label: "Free", tone: "free" }],
    emptyPrimary: "Drag & drop your image here",
    emptyClickLabel: "or click to browse",
    emptyHint: "PNG, JPG, WebP up to 10MB",
    youtubePlaceholder: "Paste a YouTube URL…",
    onYouTubeSubmit: () => {},
    sourceName: "photo.jpg",
    sourceWidth: 4032,
    sourceHeight: 3024,
    fileSizeBytes: 4_800_000,
    qualityChecks: [
      { status: "ok", label: "HD ready" },
      { status: "warn", label: "Compressed" },
    ],
    formatOptions: [
      { value: "image/jpeg", label: "JPEG", desc: "Best for photos" },
      { value: "image/png", label: "PNG", desc: "Lossless" },
      { value: "image/webp", label: "WebP", desc: "Modern" },
    ],
    format: "image/jpeg",
    onFormatChange: () => {},
    platforms: [
      {
        id: "youtube",
        name: "YouTube",
        icon: "youtube",
        presets: [
          { ratio: "16:9", label: "Thumbnail", width: 1280, height: 720 },
          { ratio: "16:9", label: "Banner", width: 2560, height: 1440 },
        ],
      },
      {
        id: "x",
        name: "X / Twitter",
        icon: "x",
        presets: [
          { ratio: "16:9", label: "Card", width: 1200, height: 675 },
          { ratio: "1:1", label: "Post", width: 1024, height: 1024 },
        ],
      },
    ],
    platform: "youtube",
    onPlatformChange: () => {},
    preset: "thumbnail",
    onPresetChange: () => {},
    exportItems: [{ width: 1280, height: 720, label: "Thumbnail", dataUrl: "" }],
    exporting: false,
    onExport: () => {},
    footerHint: "Processed in-browser.",
  },

  DesignerStudio: {
    eyebrow: "Design Studio",
    title: "Design your thumbnail",
    description: "Pick a template, tweak the design, and export.",
    badges: [{ label: "Free", tone: "free" }],
    meta: [{ icon: "info", text: "No watermark" }],
    heroCanvasBadge: "Live preview",
    heroCanvasTag: "1920 × 1080",
    heroCanvas: { title: "Your title here", subtitle: "Subtitle", swatch: ["#7c4fff", "#ff6363"], accent: "#7c4fff" },
    stage: "design",
    onStageChange: () => {},
    stages: [
      { key: "source", label: "Source", icon: "upload" },
      { key: "templates", label: "Templates", icon: "grid" },
      { key: "design", label: "Design", icon: "wand" },
      { key: "export", label: "Export", icon: "download" },
    ],
    stageOfLabel: "of",
    stageTotalLabel: "4",
    sourceTitle: "Upload your image",
    sourceHint: "PNG, JPG up to 10MB",
    continueLabel: "Continue",
    hasSource: true,
    sourcePreview: "",
    onFile: () => {},
    onUrl: () => {},
    onSample: () => {},
    templatesTitle: "Choose a template",
    useTemplateLabel: "Use template",
    appliedLabel: "Applied",
    skipLabel: "Skip",
    templateCategories: [{ key: "youtube", label: "YouTube" }, { key: "x", label: "X / Twitter" }],
    templates: [
      { id: "t1", name: "Bold", category: "youtube", description: "High contrast", design: { bgColor: "#111", rounded: 0, showBorder: false, borderWidth: 0, borderColor: "#000", imageFit: "cover", shadow: true, title: "Bold", subtitle: "Subtitle", titleColor: "#fff", titleSize: 72, titleAlign: "left", textY: 60, effects: { brightness: 100, contrast: 110, saturation: 110 } }, swatch: ["#7c4fff", "#fff"], accent: "#7c4fff" },
      { id: "t2", name: "Clean", category: "x", description: "Minimal", design: { bgColor: "#fff", rounded: 12, showBorder: true, borderWidth: 2, borderColor: "#333", imageFit: "contain", shadow: false, title: "Clean", subtitle: "Subtitle", titleColor: "#111", titleSize: 64, titleAlign: "center", textY: 50, effects: { brightness: 100, contrast: 100, saturation: 100 } }, swatch: ["#fff", "#111"], accent: "#111" },
    ],
    appliedTemplateId: null,
    onApplyTemplate: () => {},
    onSkipTemplates: () => {},
    designTitle: "Tweak the design",
    previewTag: "Preview",
    templatesButtonLabel: "Templates",
    resetLabel: "Reset",
    backToTemplatesLabel: "Back to templates",
    continueExportLabel: "Continue to export",
    canvasGroupLabel: "Canvas",
    imageGroupLabel: "Image",
    textGroupLabel: "Text",
    fitCoverLabel: "Cover",
    fitContainLabel: "Contain",
    alignLeftLabel: "Left",
    alignCenterLabel: "Center",
    backgroundLabel: "Background",
    cornerRadiusLabel: "Corner radius",
    borderLabel: "Border",
    borderColorLabel: "Border color",
    borderWidthLabel: "Border width",
    fitLabel: "Fit",
    brightnessLabel: "Brightness",
    contrastLabel: "Contrast",
    saturationLabel: "Saturation",
    titleLabel: "Title",
    subtitleLabel: "Subtitle",
    textColorLabel: "Text color",
    titleSizeLabel: "Title size",
    positionLabel: "Position",
    alignmentLabel: "Alignment",
    shadowLabel: "Shadow",
    design: { bgColor: "#111", rounded: 0, showBorder: false, borderWidth: 0, borderColor: "#000", imageFit: "cover", shadow: true, title: "Bold", subtitle: "Subtitle", titleColor: "#fff", titleSize: 72, titleAlign: "left", textY: 60, effects: { brightness: 100, contrast: 110, saturation: 110 } },
    previewUrl: "",
    onUpdateDesign: () => {},
    onResetDesign: () => {},
    onOpenTemplates: () => {},
    exportTitle: "Export",
    downloadLabel: "Download",
    downloadAllLabel: "Download all",
    exportItems: [
      { width: 1920, height: 1080, label: "HD" },
      { width: 1280, height: 720, label: "SD" },
    ],
    exporting: false,
    onExport: () => {},
    onBackToDesign: () => {},
    onStartOver: () => {},
    footerHint: "Your images are processed in-browser.",
  },

  DashboardOverview: {
    stats: [
      { key: "revenue", label: "Revenue", value: "$12,480", icon: "dollar", tone: "green", hint: "+8% this week" },
      { key: "users", label: "Users", value: "3,214", icon: "users", tone: "blue", hint: "+120 today" },
      { key: "tasks", label: "AI tasks", value: "486", icon: "sparkles", tone: "purple", hint: "42 running" },
      { key: "storage", label: "Storage", value: "68%", icon: "database", tone: "gold", hint: "of 100 GB" },
    ],
    activities: {
      title: "Recent activity",
      viewAllUrl: "#",
      items: [
        { id: "a1", title: "New signup from Twitter", description: "via referral link", time: "5 min ago", icon: "user", badge: { label: "New", tone: "green" } },
        { id: "a2", title: "Payment received", description: "$49.00 · Pro plan", time: "1 hour ago", icon: "dollar", badge: { label: "Paid", tone: "blue" } },
        { id: "a3", title: "Export completed", description: "report.pdf", time: "3 hours ago", icon: "file", badge: { label: "Done", tone: "gold" } },
      ],
    },
    quickActions: {
      title: "Quick actions",
      items: [
        { key: "q1", title: "New project", description: "Start from scratch", icon: "plus", url: "#" },
        { key: "q2", title: "Invite team", description: "Add members", icon: "users", url: "#" },
        { key: "q3", title: "View reports", description: "Last 30 days", icon: "chart", url: "#" },
      ],
    },
  },

  ChatHistory: {
    eyebrow: "Chats",
    title: "Recent conversations",
    description: "Pick up where you left off.",
    stats: [
      { key: "total", label: "Conversations", value: "128", icon: "message", tone: "brand" },
      { key: "today", label: "Today", value: "12", icon: "zap", tone: "success" },
      { key: "tokens", label: "Tokens", value: "2.4M", icon: "sparkles", tone: "warning" },
    ],
    newChatLabel: "New chat",
    newChatHref: "#",
    searchPlaceholder: "Search conversations…",
    groups: [
      {
        key: "today",
        label: "Today",
        items: [
          { id: "c1", title: "Summarize a research paper", model: "gpt-4o-mini", timeLabel: "10 min ago" },
          { id: "c2", title: "Plan a product launch", model: "claude-3.5", timeLabel: "2 hours ago" },
        ],
      },
      {
        key: "yesterday",
        label: "Yesterday",
        items: [
          { id: "c3", title: "Refactor the auth flow", model: "gpt-4o", timeLabel: "Yesterday" },
          { id: "c4", title: "Write release notes", model: "gpt-4o-mini", timeLabel: "Yesterday" },
        ],
      },
    ],
    signedIn: true,
    openChatLabel: "Open conversation",
    onOpenChat: () => {},
    perPageValue: 20,
    perPageOptions: [10, 20, 50],
  },
  ChatWorkbench: {
    mode: "empty",
    eyebrow: "AI Chat",
    title: "What can I help you with?",
    subtitle: "Ask anything — code, writing, research.",
    suggestions: [
      { key: "summarize", title: "Summarize this article", description: "3 bullets", icon: "sparkles", tone: "blue" },
      { key: "refactor", title: "Refactor this code", description: "TS/React", icon: "code", tone: "purple" },
      { key: "translate", title: "Translate to French", description: "Natural", icon: "globe", tone: "green" },
    ],
    onSuggestionClick: () => {},
    chatTitle: "Summarize a research paper",
    chatStatus: "Thinking…",
    modelLabel: "gpt-4o",
    footerHint: "AI can make mistakes. Verify important info.",
  },

  ContextModeSelector: {
    value: "auto",
    detectedValue: "general",
    onChange: () => {},
    t: (key: string) => key,
  },
  HighlightedText: {
    text: "The quick brown fox jumps over the lazy dog while the sun sets over the hills.",
    regions: [
      { start: 4, end: 15, score: 0.8 },
      { start: 40, end: 55, score: 0.6 },
    ],
  },
  HighlightedWords: {
    text: "Moreover, the team was able to complete the task efficiently and effectively.",
    issues: [
      { type: "hedging", text: "Moreover", severity: "low", suggestion: "Remove" },
      { type: "passive", text: "was able to", severity: "medium", suggestion: "Use active voice" },
    ],
    typeLabels: { hedging: "Hedging", passive: "Passive voice" },
    t: (key: string) => key,
  },
  CleanerOutput: {
    t: (key: string) => key,
    outputView: "changes",
    outputCount: 3,
    output: "The team completed the task efficiently.",
    activeDiffParts: [
      { value: "The team " },
      { value: "was able to", removed: true },
      { value: "completed" },
    ],
    activeHasChanges: true,
    analyzeResult: {
      aiScore: 72,
      readability: 64,
      wordCount: 486,
      classification: "Likely AI-generated",
      confidence: "High",
      probabilities: { human: 0.18, mixed: 0.24, ai: 0.58 },
      issues: [
        { type: "repetition", text: "Moreover, it is important to note that…", severity: "high", suggestion: "Remove redundant phrases." },
      ],
      normalizedText: "Normalized text sample…",
      summary: "This text shows strong signs of AI generation.",
    },
    isRewriting: false,
    showAiHint: true,
    typeLabels: { repetition: "Repetition" },
    severityLabels: { high: "High", medium: "Medium", low: "Low" },
    onAnalyze: () => {},
    onFixWithAi: () => {},
    onExportMarkdown: () => {},
    onExportPdf: () => {},
    onShareLink: () => {},
    shareCopied: false,
    contextMode: "auto",
    detectedContextMode: "general",
  },
  CleanerWorkbench: {
    section: {
      id: "cleaner",
      title: "AI Text Cleaner",
      description: "Humanize and clean AI-generated text.",
    },
    input: "The quick brown fox jumps over the lazy dog. Moreover, it is important to note that the team was able to complete the task efficiently.",
    onInputChange: () => {},
    mode: "humanize",
    onModeChange: () => {},
    tone: "natural",
    onToneChange: () => {},
    length: "same",
    onLengthChange: () => {},
    strength: "standard",
    onStrengthChange: () => {},
    options: ["trimWhitespace", "normalizeDashes"],
    onOptionsChange: () => {},
    outputView: "changes",
    output: "The quick brown fox jumps over the lazy dog. The team completed the task efficiently.",
    inputCount: 142,
    outputCount: 118,
    error: "",
    copied: false,
    shareCopied: false,
    busy: false,
    showAiHint: true,
    activeDiffParts: [
      { value: "The quick brown fox jumps over the lazy dog. " },
      { value: "Moreover, it is important to note that ", removed: true },
      { value: "The team completed the task efficiently." },
    ],
    activeHasChanges: true,
    analyzeResult: null,
    isRewriting: false,
    fallbackNotice: false,
    showAdvancedOptions: false,
    onToggleAdvancedOptions: () => {},
    contextMode: "auto",
    detectedContextMode: "general",
    typeLabels: { repetition: "Repetition" },
    severityLabels: { high: "High", medium: "Medium", low: "Low" },
    onClear: () => {},
    onCopy: () => {},
    onAnalyze: () => {},
    onFixWithAi: () => {},
    onContextModeChange: () => {},
    onExportMarkdown: () => {},
    onExportPdf: () => {},
    onShareLink: () => {},
    t: (key: string) => key,
    modeOptions: [
      { value: "humanize", label: "Humanize" },
      { value: "simplify", label: "Simplify" },
      { value: "grammar", label: "Grammar" },
    ],
    toneOptions: [
      { value: "natural", label: "Natural" },
      { value: "confident", label: "Confident" },
    ],
    lengthOptions: [
      { value: "same", label: "Same" },
      { value: "shorter", label: "Shorter" },
    ],
    strengthOptions: [
      { value: "light", label: "Light" },
      { value: "standard", label: "Standard" },
      { value: "strong", label: "Strong" },
    ],
    optionLabels: { trimWhitespace: "Trim whitespace", normalizeDashes: "Normalize dashes" },
  },

  // ── cleaner workbench ───────────────────────────────────────────────
  AnalyzePanel: {
    result: {
      aiScore: 72,
      readability: 64,
      wordCount: 486,
      classification: "Likely AI-generated",
      confidence: "High",
      probabilities: { human: 0.18, mixed: 0.24, ai: 0.58 },
      issues: [
        { type: "repetition", text: "Moreover, it is important to note that…", severity: "high", suggestion: "Remove redundant phrases." },
        { type: "passive", text: "was done by the team", severity: "medium", suggestion: "Use active voice." },
        { type: "hedging", text: "it could be argued that", severity: "low", suggestion: "State it directly." },
      ],
      normalizedText: "Normalized text sample…",
      summary: "This text shows strong signs of AI generation with repetitive phrasing.",
      bayesian: {
        verdict: "AI",
        charAiRate: 0.71,
        perModelBreakdown: [
          { name: "GPT-4", percent: 0.55 },
          { name: "Claude", percent: 0.25 },
        ],
        sentences: [
          { text: "In today's fast-paced world…", isAi: true, models: ["GPT-4"] },
          { text: "The report was reviewed.", isAi: false, models: [] },
        ],
        isReliable: true,
      },
    },
    t: (key: string) => key,
    typeLabels: { repetition: "Repetition", passive: "Passive voice", hedging: "Hedging" },
    severityLabels: { critical: "Critical", high: "High", medium: "Medium", low: "Low" },
    onFixWithAi: () => {},
    isRewriting: false,
    onExportMarkdown: () => {},
    onExportPdf: () => {},
    onShareLink: () => {},
    shareCopied: false,
    contextMode: "auto",
    detectedContextMode: "general",
    onContextModeChange: () => {},
  },

  // ── primitives (components) ──────────────────────────────────────────
  Button: {
    children: "Click me",
  },
  Badge: {
    children: "New",
    variant: "default",
  },
  Card: {
    title: "Getting started",
    description: "A card demo for the theme system.",
    children: "Card body content rendered by the active theme.",
  },
  Input: {
    placeholder: "Search…",
    label: "Search",
    className: "w-full max-w-sm",
  },
  Textarea: {
    placeholder: "Write something…",
    label: "Message",
    className: "w-full max-w-md",
  },
  Switch: {
    label: "Airplane mode",
    defaultChecked: true,
  },
  Avatar: {
    name: "Ada Lovelace",
    size: "lg",
  },
  Progress: {
    value: 65,
    showValue: true,
    label: "Uploading…",
  },
  Skeleton: {
    className: "h-4 w-64",
  },
  Tabs: {
    items: [
      { key: "overview", label: "Overview", content: "Overview panel." },
      { key: "activity", label: "Activity", content: "Activity panel." },
      { key: "settings", label: "Settings", content: "Settings panel." },
    ],
  },
  Tag: {
    children: "v1.2.0",
  },
  Slider: {
    defaultValue: 40,
    className: "w-full max-w-sm",
  },
  Spin: {
    spinning: true,
    tip: "Loading…",
  },
  Empty: {
    description: "No items found.",
  },
  Box: {
    children: "Box surface",
    tone: "green",
    variant: "soft",
    padding: "md",
  },
  Divider: {
    label: "or",
  },
  Stack: {
    gap: 3,
    children: (
      <>
        <div className="h-10 w-24 rounded bg-card" />
        <div className="h-10 w-24 rounded bg-card" />
        <div className="h-10 w-24 rounded bg-card" />
      </>
    ),
  },
  Label: {
    children: "Display name",
  },
  Select: {
    label: "Language",
    placeholder: "Pick a language",
    options: [
      { value: "ts", label: "TypeScript" },
      { value: "js", label: "JavaScript" },
      { value: "py", label: "Python" },
    ],
    className: "w-full max-w-xs",
  },
  Dropdown: {
    trigger: <span className="text-sm font-medium">Actions</span>,
    items: [
      { value: "edit", children: "Edit" },
      { value: "share", children: "Share" },
      { value: "sep", separator: true },
      { value: "delete", children: "Delete" },
    ],
  },
  Collapse: {
    items: [
      { key: "one", title: "General settings", children: "General settings body." },
      { key: "two", title: "Advanced", children: "Advanced settings body." },
    ],
    defaultActiveKeys: ["one"],
  },
  List: {
    dataSource: [
      { name: "Ada Lovelace", role: "Mathematician" },
      { name: "Grace Hopper", role: "Computer scientist" },
      { name: "Linus Torvalds", role: "Software engineer" },
    ],
    renderItem: (item: any) => (
      <div className="flex items-center justify-between py-2">
        <span className="font-medium">{item.name}</span>
        <span className="text-gray-11">{item.role}</span>
      </div>
    ),
  },
  Table: {
    columns: [
      { key: "name", title: "Name", dataIndex: "name" },
      { key: "role", title: "Role", dataIndex: "role" },
    ],
    dataSource: [
      { key: "1", name: "Ada Lovelace", role: "Mathematician" },
      { key: "2", name: "Grace Hopper", role: "Computer scientist" },
    ],
  },
  Descriptions: {
    column: 2,
    items: [
      { key: "1", label: "Name", content: "Ada Lovelace" },
      { key: "2", label: "Role", content: "Mathematician" },
      { key: "3", label: "Year", content: "1843" },
    ],
  },
  Timeline: {
    items: [
      { content: "Project kickoff", time: "Jan 2024" },
      { content: "First prototype", time: "Mar 2024" },
      { content: "Launch", time: "Aug 2024", type: "success" },
    ],
  },
  Steps: {
    items: [
      { title: "Upload", description: "Add your file" },
      { title: "Process", description: "Transform it" },
      { title: "Download", description: "Grab the result" },
    ],
    current: 1,
  },
  Navigation: {
    items: [
      { itemKey: "home", text: "Home" },
      { itemKey: "docs", text: "Docs", items: [{ itemKey: "getting-started", text: "Getting Started" }, { itemKey: "api", text: "API" }] },
      { itemKey: "settings", text: "Settings" },
    ],
    defaultSelectedKey: "home",
  },
  Banner: {
    type: "info",
    title: "Heads up",
    description: "This is an informational banner.",
  },
  ColorPicker: {
    defaultValue: "#7c4fff",
  },
  CopyText: {
    text: "npm install @template/ui",
    copyable: true,
    code: true,
  },
  IconFrame: {
    icon: <span className="text-xl">✦</span>,
    size: 64,
  },
  DualCta: {
    onPrimary: () => {},
    onSecondary: () => {},
    primaryLabel: "Get started",
    secondaryLabel: "Learn more",
  },
  HintBanner: {
    actionHint: "Select all",
    recommendHint: "Press ⌘A to select everything",
  },
  InputNumber: {
    defaultValue: 42,
    min: 0,
    max: 100,
    className: "w-full max-w-xs",
  },
  Tooltip: {
    content: "Tooltip content",
    children: <span className="text-sm font-medium">Hover me</span>,
  },
  Header: {
    nav: [
      { title: "Code Images", url: "#" },
      { title: "Icon Maker", url: "#" },
      { title: "Prompts", url: "#" },
    ],
    actions: [{ title: "Sign in", url: "#" }],
  },
  Footer: {
    footer: {
      id: "footer",
      brand: { title: "Brand", description: "Built with the shared UI package." },
      nav: {
        items: [
          { title: "Product", children: [{ title: "Code Images", url: "#" }, { title: "Icon Maker", url: "#" }] },
          { title: "Resources", children: [{ title: "Prompts", url: "#" }] },
        ],
      },
      copyright: "© 2024 Brand",
      social: { items: [{ title: "X", url: "#" }, { title: "GitHub", url: "#" }] },
      agreement: { items: [{ title: "Terms", url: "#" }, { title: "Privacy", url: "#" }] },
    },
  },
};
