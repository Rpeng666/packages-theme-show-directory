import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  isOpen: false,
  onClose: () => {},
  ImageComponent: null,
  t: (key: string) => key,
};
