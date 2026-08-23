import type { Section } from "@template/ui";

export const blogDetailSection: Section = {
  id: "blog-detail",
  title: "A deep dive into theme blocks",
  description: "How forwarders resolve registered implementations.",
};
export const blogDetailPost = {
  id: "blog-detail",
  slug: "theme-blocks",
  title: "A deep dive into theme blocks",
  description: "How forwarders resolve registered implementations.",
  created_at: "2024-08-23",
  author_name: "Ada Lovelace",
  author_role: "Platform Engineer",
  author_image: "",
  content:
    "Every block in themes/default/blocks is a forwarder: it resolves the registered section from the registry and injects the section data. The registry falls back through requested theme → default → any theme → empty.",
};

export const props = { section: blogDetailSection, post: blogDetailPost };
