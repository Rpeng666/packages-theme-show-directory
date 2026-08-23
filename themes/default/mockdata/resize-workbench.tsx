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
  };
