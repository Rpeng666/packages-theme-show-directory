import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  task: { id: "t2", status: "idle" as const, source: "image", progress: 0 },
  run: () => {},
  onResult: () => {},
  t: (key: string) => key,
};
