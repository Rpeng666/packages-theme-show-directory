import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  isOpen: false,
  onClose: () => {},
  options: {
    includeGrid: true,
    includeLabels: true,
    scale: 4,
  },
  onOptionsChange: () => {},
  onDownload: () => {},
  t: (key: string) => key,
};
