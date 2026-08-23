import type { Section } from "@template/ui";


export const showcasesSection = {
  id: "showcases",
  title: "Showcases",
  description: "Real projects using the system.",
  items: [
    { title: "Project One", description: "Uses default theme", url: "#" },
    { title: "Project Two", description: "Uses pixel theme", url: "#" },
  ],
};

export const props = { section: showcasesSection };
