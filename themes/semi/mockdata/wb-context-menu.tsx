import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  x: 120,
  y: 80,
  locked: false,
  t: (key: string) => key,
  onClose: () => {},
  onBringFront: () => {},
  onForward: () => {},
  onBackward: () => {},
  onBack: () => {},
  onFlipX: () => {},
  onFlipY: () => {},
  onDuplicate: () => {},
  onToggleLock: () => {},
  onDelete: () => {},
};
