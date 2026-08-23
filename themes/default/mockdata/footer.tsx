import type { Section } from "@template/ui";

export const props = {
    footer: {
      id: "footer",
      brand: { title: "Brand", description: "Built with the shared UI package." },
      nav: {
        items: [
          { title: "Product", children: [{ title: "Code Images", url: "#" }, { title: "Icon Maker", url: "#" }] },
          { title: "Resources", children: [{ title: "Prompts", url: "#" }] },
        ],
      },
      copyright: "© 2024 Brand",
      social: { items: [{ title: "X", url: "#" }, { title: "GitHub", url: "#" }] },
      agreement: { items: [{ title: "Terms", url: "#" }, { title: "Privacy", url: "#" }] },
    },
  };
