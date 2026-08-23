import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  columns: 3,
  items: [
    { title: "Code Images", description: "Beautiful code screenshots", href: "#", icon: "code" },
    { title: "Icon Maker", description: "Create extension icons", href: "#", icon: "image" },
    { title: "Prompt Explorer", description: "Browse AI prompts", href: "#", icon: "sparkles" },
    { title: "Preset Explorer", description: "AI presets", href: "#", icon: "sliders" },
    { title: "Quicklinks", description: "Raycast quicklinks", href: "#", icon: "link" },
    { title: "Snippets", description: "Code snippets", href: "#", icon: "code" },
  ],
};
