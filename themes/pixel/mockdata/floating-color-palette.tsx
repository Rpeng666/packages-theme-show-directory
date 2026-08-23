import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  colors: [
    { key: "black", color: "#1a1a2e" },
    { key: "red", color: "#ff6b6b" },
    { key: "green", color: "#51cf66" },
    { key: "blue", color: "#4dabf7" },
  ],
  selectedColor: { key: "green", color: "#51cf66" },
  onColorSelect: () => {},
  selectedColorSystem: "MARD",
  isEraseMode: false,
  onEraseToggle: () => {},
  fullPaletteColors: [],
  showFullPalette: false,
  onToggleFullPalette: () => {},
  colorReplaceState: { isActive: false },
  onColorReplaceToggle: () => {},
  onColorReplace: () => {},
  onHighlightColor: () => {},
  isOpen: true,
  onToggleOpen: () => {},
  isActive: true,
  onActivate: () => {},
  t: (key: string) => key,
};
