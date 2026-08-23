import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  tool: {
    id: "demo",
    params: [
      { key: "size", label: "Size", type: "slider", min: 8, max: 64, step: 1, default: 32 },
      { key: "color", label: "Color", type: "color", default: "#7c4fff" },
    ],
    draw: () => {},
    filename: () => "demo.png",
    exportScale: 4,
  },
  t: (key: string) => key,
};
