import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  isManualColoringMode: true,
  isPaletteOpen: true,
  onTogglePalette: () => {},
  onExitManualMode: () => {},
  onToggleMagnifier: () => {},
  isMagnifierActive: false,
  t: (key: string) => key,
};
