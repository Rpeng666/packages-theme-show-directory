import type { Section } from "@template/ui";


export const faqSection = {
  id: "faq",
  title: "Frequently asked questions",
  description: "Answers to the most common questions.",
  items: [
    { title: "How do I add a theme?", description: "Create themes/{name}/ with style/ and blocks/." },
    { title: "Where does the data come from?", description: "Landing sections are plain Section objects." },
    { title: "What if a block is missing?", description: "The loader falls back to the default theme." },
  ],
};

export const props = { section: faqSection };
