import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  templates: [
    { id: "t1", category: "youtube", labelKey: "bold", preview: { bg: "#7c4fff", accent: "#ff6363", text: "Bold", textColor: "#fff" } },
    { id: "t2", category: "x", labelKey: "clean", preview: { bg: "#f5f5f5", accent: "#1a1a2e", text: "Clean", textColor: "#1a1a2e" } },
  ],
  templateCategories: [
    { id: "youtube", label: "YouTube" },
    { id: "x", label: "X" },
  ],
  onApply: () => {},
  t: (key: string) => key,
};
