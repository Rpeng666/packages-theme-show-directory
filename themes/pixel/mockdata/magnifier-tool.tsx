import type { Section } from "@template/ui";
import * as React from "react";

const px = { key: "black", color: "#1a1a2e" };
const pg = { key: "green", color: "#51cf66" };

export const props = {
  isActive: false,
  onToggle: () => {},
  mappedPixelData: [
    [px, pg],
    [pg, px],
  ],
  gridDimensions: { N: 2, M: 2 },
  selectedColor: null,
  selectedColorSystem: "MARD" as const,
  displayColorKey: (key: string) => key,
  onPixelEdit: () => {},
  cellSize: 12,
  selectionArea: null,
  onClearSelection: () => {},
  isFloatingActive: false,
  onActivateFloating: () => {},
  highlightColorKey: null,
  t: (key: string) => key,
};
