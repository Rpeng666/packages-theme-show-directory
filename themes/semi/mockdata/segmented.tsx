import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  value: "single",
  options: [
    { value: "single", label: "Single" },
    { value: "ab", label: "A/B" },
  ],
  onChange: () => {},
};
