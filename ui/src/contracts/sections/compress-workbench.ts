import type { ReactNode } from "react";

/**
 * CompressWorkbench - the thumbnail compression studio.
 *
 * Pure presentational: the app keeps the full business layer (file loading,
 * canvas re-compression, live savings, 2MB check, download) and passes
 * structured data + callbacks down. The section renders the designed studio:
 * an emerald "lightweight" hero, a guided empty state (dropzone + privacy
 * tip), then a two-panel workbench - a left control rail (source card,
 * format + quality settings, live results with a savings meter) and a right
 * stage (before / after comparison, the YouTube 2MB gauge and the export
 * dock with a single download CTA).
 */

export type CompressWorkbenchFormat = "image/jpeg" | "image/png" | "image/webp";

export interface CompressWorkbenchFormatOption {
  value: CompressWorkbenchFormat;
  label: string;
  desc: string;
}

export interface CompressWorkbenchProps {
  className?: string;
  /** forwarded to the DOM root by the registry wrapper */
  "data-registry"?: string;
  /** studio hero */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  badges?: Array<{ label: string; tone?: "free" | "pro" | "neutral" }>;
  meta?: Array<{ icon: string; text: string }>;
  /** empty state */
  emptyPrimary?: ReactNode;
  emptyClickLabel?: ReactNode;
  emptyHint?: ReactNode;
  privacyTip?: ReactNode;
  /** source */
  sourceUrl?: string | null;
  sourceName?: string;
  sourceWidth?: number;
  sourceHeight?: number;
  sourceSizeBytes?: number;
  sourceCardTitle?: ReactNode;
  sourceMetaLabel?: ReactNode;
  replaceLabel?: ReactNode;
  onReplace?: () => void;
  onDropFile?: (file: File) => void;
  /** settings */
  settingsCardTitle?: ReactNode;
  formatLabel?: ReactNode;
  formatOptions: CompressWorkbenchFormatOption[];
  format: CompressWorkbenchFormat;
  onFormatChange: (value: CompressWorkbenchFormat) => void;
  qualityLabel?: ReactNode;
  qualityValue: number;
  onQualityChange: (value: number) => void;
  smallerLabel?: ReactNode;
  betterLabel?: ReactNode;
  /** results */
  resultsCardTitle?: ReactNode;
  originalLabel?: ReactNode;
  compressedLabel?: ReactNode;
  savedLabel?: ReactNode;
  compressedUrl?: string | null;
  compressedSizeBytes?: number;
  savingsPercent?: number;
  processing?: boolean;
  /** stage */
  stageCardTitle?: ReactNode;
  beforeLabel?: ReactNode;
  afterLabel?: ReactNode;
  /** 2MB gauge */
  limitState?: "ok" | "over" | "idle";
  limitOkMessage?: ReactNode;
  limitOverMessage?: ReactNode;
  /** export dock */
  exportCardTitle?: ReactNode;
  downloadLabel?: ReactNode;
  downloadHint?: ReactNode;
  busy?: boolean;
  onDownload?: () => void;
  /** shared */
  error?: ReactNode;
  footerHint?: ReactNode;
}
