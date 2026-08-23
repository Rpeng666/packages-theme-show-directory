import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  activeTool: "select",
  isCropping: false,
  selectionCount: 1,
  selectedType: "rect",
  t: (key: string) => key,
  onToolChange: () => {},
  onDelete: () => {},
  onGroup: () => {},
  onUngroup: () => {},
  onAlign: () => {},
  onDistribute: () => {},
  onApplyCrop: () => {},
  onCancelCrop: () => {},
};
