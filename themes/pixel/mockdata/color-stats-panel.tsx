import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  totalBeadCount: 420,
  colorCounts: {
    "#1a1a2e": { color: "#1a1a2e", count: 120 },
    "#ff6b6b": { color: "#ff6b6b", count: 95 },
    "#51cf66": { color: "#51cf66", count: 80 },
    "#ffd43b": { color: "#ffd43b", count: 125 },
  },
  excludedColorKeys: new Set<string>(),
  selectedColorSystem: "MARD",
  onExportShoppingList: () => {},
  onToggleExcludeColor: () => {},
  onRestoreColor: () => {},
  onRestoreAllColors: () => {},
  displayColorKey: (key: string) => key,
  t: (key: string) => key,
};
