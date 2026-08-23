import type { Section } from "@template/ui";
import * as React from "react";
import { PIXEL_PATTERNS } from "../../../packages/ui/src/themes/pixel/light-tool-demo/patterns/pixel-library";

export const props = {
  patterns: PIXEL_PATTERNS.slice(0, 4),
  defaultPatternId: PIXEL_PATTERNS[0]?.id,
  style: "bead" as const,
  onUploadImage: () => {},
  t: (key: string) => key,
};
