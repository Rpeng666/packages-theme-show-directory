import type { Section } from "@template/ui";
import * as React from "react";

const svg = (fill: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="${fill}"/></svg>`
  );

export const props = {
  isOpen: false,
  onClose: () => {},
  beforeSrc: svg("#a3a3a3"),
  afterSrc: svg("#7c4fff"),
  beforeLabel: "Original",
  afterLabel: "Result",
  t: (key: string) => key,
};
