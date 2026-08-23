import type { Section } from "@template/ui";


export const blogSection = {
  id: "blog",
  title: "From the blog",
  description: "Latest articles.",
  items: [
    { title: "Introducing the theme registry", description: "How the filesystem became the registry.", url: "#" },
    { title: "Fallback chains explained", description: "Requested → default → any → empty.", url: "#" },
  ],
};

export const props = { section: blogSection };
