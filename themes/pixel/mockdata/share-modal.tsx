import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  isOpen: false,
  onClose: () => {},
  imageSrc:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="#e5e5e5"/><circle cx="64" cy="64" r="40" fill="#7c4fff"/></svg>'
    ),
  stats: { beads: 420, colors: 6 },
  colorSystemLabel: "MARD",
  buildShareText: () => "My perler pattern!",
  t: (key: string) => key,
};
