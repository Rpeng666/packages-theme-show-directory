import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  result: {
    dataUrl: "",
    width: 1920,
    height: 1080,
    format: "png",
  },
  onClose: () => {},
  t: (key: string) => key,
};
