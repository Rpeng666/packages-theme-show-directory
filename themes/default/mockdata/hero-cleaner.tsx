import type { Section } from "@template/ui";

export const heroCleanerSection = {
  id: "hero-cleaner",
  label: "AI Cleaner",
  title: "Clean up any image",
  description: "Remove backgrounds in one click.",
  highlight_text: "any image",
  buttons: [{ title: "Try it free", url: "#", variant: "default" }],
};

export const props = {
  section: heroCleanerSection,
  trustText: "Free · No signup · 100% private",
};
