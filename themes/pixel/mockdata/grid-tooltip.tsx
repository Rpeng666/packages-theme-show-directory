import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  tooltipData: {
    colorKey: "green",
    count: 12,
    percentage: 8,
  },
  displayColorKey: (key: string) => key,
};
