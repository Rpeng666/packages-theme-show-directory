import type { Section } from "@template/ui";

export const featuresCompareSection = {
  id: "features-compare",
  title: "Compare themes",
  description: "Side-by-side feature comparison.",
  before: {
    label: "Before",
    badge: "Hard-coded",
    badgeColor: "red",
    text: "Templates with colors and markup hard-coded per page. Changing a look means editing dozens of files.",
  },
  after: {
    label: "After",
    badge: "Registry",
    badgeColor: "green",
    text: "Themes own their tokens and blocks. Switching a theme swaps every surface with one line.",
  },
};

export const props = { section: featuresCompareSection };
