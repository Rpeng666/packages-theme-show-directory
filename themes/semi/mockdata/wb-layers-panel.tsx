import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  layers: [
    { id: "l1", name: "Background", kind: "rect", visible: true, locked: false },
    { id: "l2", name: "Shape", kind: "rect", visible: true, locked: false },
    { id: "l3", name: "Text", kind: "text", visible: true, locked: false },
  ],
  version: 1,
  t: (key: string) => key,
  onSelect: () => {},
  onSelectMulti: () => {},
  onReorder: () => {},
  onMove: () => {},
  onToggle: () => {},
  onToggleLock: () => {},
  onDelete: () => {},
};
