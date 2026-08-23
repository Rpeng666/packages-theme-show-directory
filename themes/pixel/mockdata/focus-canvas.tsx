import type { Section } from "@template/ui";
import * as React from "react";

const px = { key: "black", color: "#1a1a2e" };
const pg = { key: "green", color: "#51cf66" };

export const props = {
  mappedPixelData: [
    [px, px, pg, pg],
    [px, px, pg, pg],
    [pg, pg, px, px],
    [pg, pg, px, px],
  ],
  gridDimensions: { N: 4, M: 4 },
  currentColor: "#51cf66",
  completedCells: new Set(["0,2"]),
  recommendedCell: null,
  recommendedRegion: null,
  canvasScale: 1,
  canvasOffset: { x: 0, y: 0 },
  gridSectionInterval: 4,
  showSectionLines: true,
  sectionLineColor: "#4a4a66",
  onCellClick: () => {},
  onScaleChange: () => {},
  onOffsetChange: () => {},
};
