import type { Section } from "@template/ui";


export const toolsGridSection = {
  id: "tools-grid",
  title: "Tools",
  description: "Every tool in one grid.",
  items: [
    { title: "Code Images", description: "Beautiful code screenshots", url: "#", icon: "code" },
    { title: "Icon Maker", description: "Create extension icons", url: "#", icon: "image" },
    { title: "Prompt Explorer", description: "Browse AI prompts", url: "#", icon: "sparkles" },
  ],
};

export const props = { section: toolsGridSection };
