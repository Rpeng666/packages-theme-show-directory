import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  title: "Export sizes",
  rows: [
    { label: "HD", dimensions: "1920×1080", fileSize: "1.2 MB" },
    { label: "SD", dimensions: "1280×720", fileSize: "640 KB" },
    { label: "Square", dimensions: "1080×1080", fileSize: "980 KB" },
  ],
};
