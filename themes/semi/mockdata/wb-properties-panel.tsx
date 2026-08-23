import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  canvasW: 1920,
  canvasH: 1080,
  bgColor: "#1a1a2e",
  selectedObject: { id: "l2", name: "Shape", kind: "rect", x: 100, y: 80, w: 200, h: 120 },
  layers: [
    { id: "l1", name: "Background", kind: "rect", visible: true, locked: false },
    { id: "l2", name: "Shape", kind: "rect", visible: true, locked: false },
  ],
  layersVersion: 1,
  enhance: { enhance: false, preset: "vivid" },
  templates: [],
  templateCategories: [],
  textStylePresets: [
    { id: "p1", name: "Bold", font: "sans", size: 48, weight: 700 },
  ],
  t: (key: string) => key,
  aiRemoveBg: () => {},
  aiTitle: () => {},
  onBackgroundColorChange: () => {},
  onChange: () => {},
};
