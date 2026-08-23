import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  toolSlug: "circle",
  defaultSrc:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="#e5e5e5"/><circle cx="64" cy="64" r="40" fill="#7c4fff"/></svg>'
    ),
  generateOnly: false,
  t: (key: string) => key,
};
