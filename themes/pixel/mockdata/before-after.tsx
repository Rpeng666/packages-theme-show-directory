import type { Section } from "@template/ui";
import * as React from "react";

const svg = (fill: string, label: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="${fill}"/><text x="160" y="100" font-size="24" text-anchor="middle" fill="#fff">${label}</text></svg>`
  );

export const props = {
  beforeSrc: svg("#a3a3a3", "before"),
  afterSrc: svg("#7c4fff", "after"),
  beforeLabel: "Original",
  afterLabel: "Result",
};
