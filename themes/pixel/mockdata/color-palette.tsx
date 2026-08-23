import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  colors: [
    { key: "white", color: "#f5f5f5" },
    { key: "black", color: "#1a1a2e" },
    { key: "red", color: "#ff6b6b" },
    { key: "green", color: "#51cf66" },
    { key: "blue", color: "#4dabf7" },
  ],
  selectedColor: { key: "green", color: "#51cf66" },
  onColorSelect: () => {},
  transparentKey: "transparent",
  selectedColorSystem: "MARD",
  isEraseMode: false,
  onEraseToggle: () => {},
  onHighlightColor: () => {},
  fullPaletteColors: [],
  showFullPalette: false,
  onToggleFullPalette: () => {},
  colorReplaceState: null,
  onColorReplaceToggle: () => {},
  onColorReplace: () => {},
  displayColorKey: (key: string) => key,
  t: (key: string) => key,
};
