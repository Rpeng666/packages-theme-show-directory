import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  entries: ["pattern", "upload", "letters"] as const,
  active: "pattern" as const,
  onSelect: () => {},
  t: (key: string) => key,
};
