import type { ReactNode } from "react";

/**
 * PreviewWorkbench - the YouTube thumbnail inspect studio.
 *
 * Pure presentational: the app keeps the image-upload / FileReader layer, the
 * title + channel inputs, the simulated dark mode and the scene + A/B state;
 * this section renders the designed studio: a sky "inspect" hero, a work-area
 * console (single / A-B mode, upload slots, title + channel, dark toggle,
 * scene tabs), a YouTube-context stage (desktop feed / search results /
 * mobile feed / watch sidebar) and a "what to check" tips rail.
 */

export type PreviewSceneId = "feed" | "search" | "mobile" | "sidebar";

export interface PreviewSceneDef {
  id: PreviewSceneId;
  /** human label, e.g. "Desktop Feed" */
  label: string;
  /** SmartIcon name, e.g. "Desktop" / "Search" / "Mobile" / "EyeOpened" */
  icon: string;
  /** pixel hint shown under the scene chip, e.g. "320 × 180" */
  size: string;
}

export interface PreviewWorkbenchTip {
  label: string;
  href: string;
  /** optional jump-to-scene id (overrides href when the section supports it) */
  scene?: PreviewSceneId;
}

export interface PreviewWorkbenchProps {
  className?: string;
  /** forwarded to the DOM root by the registry wrapper */
  "data-registry"?: string;
  /** studio hero */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  badges?: Array<{ label: string; tone?: "free" | "pro" | "neutral" }>;
  meta?: Array<{ icon: string; text: string }>;
  /** mode */
  mode?: "single" | "ab";
  onModeChange?: (mode: "single" | "ab") => void;
  singleLabel?: ReactNode;
  abLabel?: ReactNode;
  abHint?: ReactNode;
  /** upload + inputs */
  uploadTitle?: ReactNode;
  uploadHint?: ReactNode;
  uploadFormatHint?: ReactNode;
  replaceLabel?: ReactNode;
  uploadA?: string | null;
  uploadB?: string | null;
  onUploadA?: (dataUrl: string) => void;
  onUploadB?: (dataUrl: string) => void;
  titleLabel?: ReactNode;
  titleValue?: string;
  titlePlaceholder?: ReactNode;
  onTitleChange?: (value: string) => void;
  channelLabel?: ReactNode;
  channelValue?: string;
  channelPlaceholder?: ReactNode;
  onChannelChange?: (value: string) => void;
  /** simulated dark mode */
  dark?: boolean;
  onToggleDark?: () => void;
  darkLabel?: ReactNode;
  lightLabel?: ReactNode;
  /** above-the-fold analysis line */
  foldLine?: boolean;
  onToggleFoldLine?: () => void;
  foldLineLabel?: ReactNode;
  foldLineHideLabel?: ReactNode;
  /** color-vision-deficiency simulation */
  colorBlind?: boolean;
  onToggleColorBlind?: () => void;
  colorBlindLabel?: ReactNode;
  colorBlindOffLabel?: ReactNode;
  /** scenes */
  sceneLabel?: ReactNode;
  scenes?: PreviewSceneDef[];
  scene?: PreviewSceneId;
  onSceneChange?: (scene: PreviewSceneId) => void;
  /** compare labels */
  aLabel?: ReactNode;
  bLabel?: ReactNode;
  yourVideoLabel?: ReactNode;
  /** what to check */
  tipsTitle?: ReactNode;
  tips?: PreviewWorkbenchTip[];
  /** shared */
  footerHint?: ReactNode;
}
