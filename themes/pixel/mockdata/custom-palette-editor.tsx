import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  allColors: [
    { key: "white", hex: "#f5f5f5", label: "White" },
    { key: "black", hex: "#1a1a2e", label: "Black" },
    { key: "red", hex: "#ff6b6b", label: "Red" },
    { key: "green", hex: "#51cf66", label: "Green" },
  ],
  currentSelections: ["white", "red"],
  onSelectionChange: () => {},
  onSaveCustomPalette: () => {},
  onClose: () => {},
  onExportCustomPalette: () => {},
  onImportCustomPalette: () => {},
  selectedColorSystem: "MARD",
  getDisplayColorKey: (key: string) => key,
  t: (key: string) => key,
};
