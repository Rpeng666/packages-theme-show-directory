import type { Section } from "@template/ui";

export const props = {
    items: [
      { key: "one", title: "General settings", children: "General settings body." },
      { key: "two", title: "Advanced", children: "Advanced settings body." },
    ],
    defaultActiveKeys: ["one"],
  };
