import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  items: [
    { id: "g1", title: "Pixel cat", author: "Ada", likes: 12, media: <div className="h-16 w-16 rounded bg-muted" /> },
    { id: "g2", title: "Space invader", author: "Grace", likes: 8, media: <div className="h-16 w-16 rounded bg-muted" /> },
  ],
  topics: [
    { id: "all", label: "All" },
    { id: "animals", label: "Animals" },
  ],
  title: "Gallery",
  exploreLabel: "Explore",
  renderMedia: (item: any) => item.media,
  renderMeta: (item: any) => <span className="text-xs">{item.author}</span>,
  onOpen: () => {},
  onEdit: () => {},
  onLike: () => {},
  onShare: () => {},
  pageSize: 12,
  t: (key: string) => key,
};
