import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  canvasRef: null,
  originalSrc:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#e5e5e5"/><rect x="70" y="70" width="500" height="220" rx="12" fill="#a3a3a3"/><circle cx="180" cy="180" r="60" fill="#7c4fff"/><rect x="300" y="130" width="180" height="100" rx="8" fill="#4ecdc4"/></svg>'
    ),
  width: 640,
  height: 360,
  isProcessing: false,
  showOriginal: false,
  onCompareToggle: () => {},
  exportScale: 2,
  onExportScaleChange: () => {},
  onDownload: () => {},
  t: (key: string) => key,
};
