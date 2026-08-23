import type { Section } from "@template/ui";

export const props = {
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
    sourceUrl:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#e5e5e5"/><rect x="70" y="70" width="500" height="220" rx="12" fill="#a3a3a3"/><circle cx="180" cy="180" r="60" fill="#7c4fff"/><rect x="300" y="130" width="180" height="100" rx="8" fill="#4ecdc4"/></svg>'
      ),
    sourceWidth: 4032,
    sourceHeight: 3024,
    fileSizeBytes: 4_800_000,
    activeWidth: 1280,
    activeHeight: 720,
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
    multiSizeLabel: "All sizes",
    footerHint: "Processed in-browser.",
  };
