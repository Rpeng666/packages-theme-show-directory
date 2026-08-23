import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  title: "Pixel cat",
  author: "Ada",
  description: "A perler cat in 32×32.",
  renderStats: () => <span className="text-xs text-muted-foreground">128 beads</span>,
  media: <div className="h-24 w-24 rounded bg-muted" />,
  liked: false,
  likes: 12,
  onLike: () => {},
  onView: () => {},
  onEdit: () => {},
  onShare: () => {},
  t: (key: string) => key,
};
