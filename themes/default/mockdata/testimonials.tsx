import type { Section } from "@template/ui";


export const testimonialsSection = {
  id: "testimonials",
  title: "Loved by developers",
  description: "What people say about the theme system.",
  items: [
    { name: "Ada Lovelace", role: "Engineer", quote: "The registry approach is genius.", avatar: { src: "", alt: "Ada" } },
    { name: "Grace Hopper", role: "Architect", quote: "Fallback chains just work.", avatar: { src: "", alt: "Grace" } },
    { name: "Linus Torvalds", role: "Maintainer", quote: "Simple, data-driven, theme-able.", avatar: { src: "", alt: "Linus" } },
  ],
};

export const props = { section: testimonialsSection };
