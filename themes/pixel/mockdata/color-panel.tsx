import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  colors: [
    { color: "#1a1a2e", name: "Black", total: 120, completed: 60 },
    { color: "#ff6b6b", name: "Red", total: 95, completed: 40 },
    { color: "#51cf66", name: "Green", total: 80, completed: 80 },
    { color: "#4dabf7", name: "Blue", total: 70, completed: 10 },
  ],
  currentColor: "#51cf66",
  onColorSelect: () => {},
  onClose: () => {},
  t: (key: string) => key,
};
