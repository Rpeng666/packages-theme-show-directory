import type { Section } from "@template/ui";
import * as React from "react";

export const props = {
  activeTool: "brush",
  onToolChange: () => {},
  canUndo: true,
  onUndo: () => {},
  canRedo: false,
  onRedo: () => {},
  onResetEdit: () => {},
  onCountBeads: () => {},
  referenceVisible: false,
  onToggleReference: () => {},
  referenceOpacity: 0.5,
  onReferenceOpacityChange: () => {},
  onChangeReference: () => {},
  onRemoveReference: () => {},
  hasReference: false,
  onDownload: () => {},
  onSavePattern: () => {},
  onShare: () => {},
  t: (key: string) => key,
};
