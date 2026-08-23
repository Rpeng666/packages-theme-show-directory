import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  isOpen: false,
  onClose: () => {},
  onProceedWithoutDownload: () => {},
  mappedPixelData: [],
  gridDimensions: { N: 32, M: 32 },
  selectedColorSystem: "MARD",
  exportCsv: () => {},
  t: (key: string) => key,
};
