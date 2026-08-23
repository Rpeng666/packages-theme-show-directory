import type { Section } from "@template/ui";


export const heroSection = {
  id: "hero",
  label: "New",
  title: "Build beautiful interfaces with a theme system",
  description:
    "Every component and section lives in a registry. Switch themes, compare implementations, and ship the look you want — no copy-paste.",
  highlight_text: "theme system",
  buttons: [
    { title: "Get started", url: "#", variant: "default" },
    { title: "Learn more", url: "#", variant: "outline" },
  ],
  features: [
    { title: "4 themes", description: "default, pixel, semi, raycast" },
    { title: "98 components", description: "primitives + sections" },
    { title: "Open registry", description: "drop a file to register" },
  ],
};

export const props = { section: heroSection };
