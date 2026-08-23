import type { Section } from "@template/ui";

export const props = {
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
  };
