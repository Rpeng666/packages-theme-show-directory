import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  canvasRef: null,
  width: 640,
  height: 360,
  originalSrc:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#f3e8ff"/><rect x="70" y="70" width="500" height="220" rx="12" fill="#a3a3a3"/><circle cx="180" cy="180" r="60" fill="#7c4fff"/><rect x="300" y="130" width="180" height="100" rx="8" fill="#4ecdc4"/></svg>'
    ),
  zoom: 1,
  onZoomChange: () => {},
  onFit: () => {},
  showOriginal: true,
  comparePosition: 0.5,
  onCompareChange: () => {},
  backdrop: "#1a1a2e",
  backdropPattern: "checker",
  isProcessing: false,
  t: (key: string) => key,
};
