import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  items: [
    { id: "vibrant", label: "Vibrant" },
    { id: "muted", label: "Muted" },
    { id: "retro", label: "Retro" },
    { id: "mono", label: "Mono" },
  ],
  activeId: "retro",
  onSelect: () => {},
  cols: 2,
};
