import type { Section } from "@template/ui";

export const props = {
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
    sourceUrl:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#e5e5e5"/><rect x="70" y="70" width="500" height="220" rx="12" fill="#a3a3a3"/><circle cx="180" cy="180" r="60" fill="#7c4fff"/><rect x="300" y="130" width="180" height="100" rx="8" fill="#4ecdc4"/></svg>'
      ),
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
    compressedUrl:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#f0f0f0"/><rect x="70" y="70" width="500" height="220" rx="12" fill="#a3a3a3"/><circle cx="180" cy="180" r="60" fill="#7c4fff"/><rect x="300" y="130" width="180" height="100" rx="8" fill="#4ecdc4"/></svg>'
      ),
    processing: false,
    limitState: "ok",
    busy: false,
    onDownload: () => {},
    footerHint: "Files never leave your device.",
  };
