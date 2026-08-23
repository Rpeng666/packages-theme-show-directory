import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  label: "Brightness",
  value: 65,
  onChange: () => {},
  onReset: () => {},
  min: 0,
  max: 100,
  showValue: true,
  tone: "cyan" as const,
};
