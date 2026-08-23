import type { Section } from "@template/ui";

export const props = {
    items: [
      { itemKey: "home", text: "Home" },
      { itemKey: "docs", text: "Docs", items: [{ itemKey: "getting-started", text: "Getting Started" }, { itemKey: "api", text: "API" }] },
      { itemKey: "settings", text: "Settings" },
    ],
    defaultSelectedKey: "home",
  };
