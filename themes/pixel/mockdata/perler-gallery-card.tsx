import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  id: "g1",
  title: "Pixel cat",
  author: "Ada",
  size: "32×32",
  colorCount: 6,
  beadCount: 420,
  colors: [
    { key: "black", hex: "#1a1a2e", label: "Black" },
    { key: "red", hex: "#ff6b6b", label: "Red" },
  ],
  liked: false,
  likes: 12,
  media: <div className="h-24 w-full rounded bg-muted" />,
  likedMark: null,
  onLike: () => {},
  onOpen: () => {},
  onEdit: () => {},
  t: (key: string) => key,
};
