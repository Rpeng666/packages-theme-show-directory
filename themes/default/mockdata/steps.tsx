import type { Section } from "@template/ui";

export const props = {
    items: [
      { title: "Upload", description: "Add your file" },
      { title: "Process", description: "Transform it" },
      { title: "Download", description: "Grab the result" },
    ],
    current: 1,
  };
