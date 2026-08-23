import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  options: {
    method: "floyd",
    mode: "grayscale",
    grayLevels: 4,
    rgbBits: 3,
    strength: 100,
    serpentine: true,
    duotoneFrom: "#1a1a2e",
    duotoneTo: "#e8e6e3",
  },
  onChange: () => {},
  t: (key: string) => key,
};
