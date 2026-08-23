import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  onColorSelect: () => {},
  onLocate: () => {},
  onPause: () => {},
  isPaused: false,
  elapsedTime: "04:32",
  t: (key: string) => key,
};
