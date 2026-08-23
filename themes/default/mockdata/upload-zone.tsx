import type { Section } from "@template/ui";

export const props = {
    isMounted: true,
    onDrop: () => {},
    onDragOver: () => {},
    onClick: () => {},
    primaryText: "Drag & drop your image here",
    clickLabel: "or click to browse",
    formatHint: "PNG, JPG up to 10MB",
    showTip: true,
    tipText: "Files stay on your device.",
  };
