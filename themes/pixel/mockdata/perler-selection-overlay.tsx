import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  isActive: true,
  canvasRef: null,
  gridDimensions: { N: 32, M: 32 },
  selection: null,
  onSelectionChange: () => {},
  onClear: () => {},
  onFill: () => {},
  onErase: () => {},
  onCopy: () => {},
  onPaste: () => {},
  canPaste: false,
  t: (key: string) => key,
};
