import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  zoom: 100,
  canUndo: true,
  canRedo: false,
  canvasW: 1920,
  canvasH: 1080,
  gridVisible: true,
  brandHref: "#",
  brandName: "Studio",
  brandLogo: null,
  backHref: "#",
  previewHref: "#",
  t: (key: string) => key,
  onUndo: () => {},
  onRedo: () => {},
  onZoomIn: () => {},
  onZoomOut: () => {},
  onZoomReset: () => {},
  onToggleGrid: () => {},
};
