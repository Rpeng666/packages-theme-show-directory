import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  colors: [
    { key: "#000000", color: "#000000" },
    { key: "#2F7FE0", color: "#2F7FE0" },
    { key: "#51CF66", color: "#51CF66" },
    { key: "#FF6B6B", color: "#FF6B6B" },
    { key: "#FFD43B", color: "#FFD43B" },
    { key: "#A855F7", color: "#A855F7" },
    { key: "#FF77A8", color: "#FF77A8" },
    { key: "#4ECDC4", color: "#4ECDC4" },
    { key: "#F5D76E", color: "#F5D76E" },
    { key: "#8B4513", color: "#8B4513" },
  ],
  selectedColor: { key: "#51CF66", color: "#51CF66" },
  onColorSelect: () => {},
  onMoreColors: () => {},
  label: "Color",
  t: (key: string) => key,
};
