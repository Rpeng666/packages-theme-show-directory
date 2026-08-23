import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  canvas: null,
  dims: { N: 32, M: 32 },
  cellSize: 8,
  colorMap: { 1: "#1a1a2e", 2: "#ff6b6b", 3: "#51cf66" },
};
