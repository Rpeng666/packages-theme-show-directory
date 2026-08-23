import type { Section } from "@template/ui";


export const ctaSection = {
  id: "cta",
  title: "Ready to get started?",
  description: "Try the registry today.",
  buttons: [
    { title: "Start now", url: "#", variant: "default" },
    { title: "Contact us", url: "#", variant: "outline" },
  ],
};

export const props = { section: ctaSection };
