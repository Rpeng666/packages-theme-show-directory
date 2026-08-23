import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  items: [
    { id: "p1", title: "Pixel cat", author: "Ada", likes: 12, media: <div className="h-16 w-16 rounded bg-muted" /> },
    { id: "p2", title: "Space invader", author: "Grace", likes: 8, media: <div className="h-16 w-16 rounded bg-muted" /> },
    { id: "p3", title: "Heart", author: "Linus", likes: 21, media: <div className="h-16 w-16 rounded bg-muted" /> },
  ],
  categories: [
    { id: "all", label: "All" },
    { id: "animals", label: "Animals" },
    { id: "game", label: "Game" },
  ],
  topicTiles: [
    { id: "popular", label: "Popular" },
    { id: "new", label: "New" },
  ],
  title: "Community",
  renderMedia: (item: any) => item.media,
  renderStats: (item: any) => <span className="text-xs">{item.likes} likes</span>,
  onOpen: () => {},
  onEdit: () => {},
  onShare: () => {},
  pageSize: 9,
  t: (key: string) => key,
};
