import type { Section } from "@template/ui";
import * as React from "react";
import { props as defaultProps } from "../../default/mockdata/compress-workbench";

/** Semi CompressWorkbench — reuses default props, plus the semi-only
 * auto-fit-to-2MB capability. */
export const props = {
  ...defaultProps,
  autoFitLabel: "Auto-fit to 2 MB",
  onAutoFit2MB: () => {},
};
