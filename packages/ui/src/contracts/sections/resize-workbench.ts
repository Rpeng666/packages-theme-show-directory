import type { ReactNode } from "react";

/**
 * ResizeWorkbench - the core thumbnail resize studio.
 *
 * Pure presentational: the app keeps the full business layer (file loading,
 * canvas resizing, download, session restore, credit check) and passes
 * structured data + callbacks down. The section renders the designed studio:
 * a compact amber "precision" hero, a guided empty state (dropzone + YouTube
 * URL), then a two-panel workbench - a left control rail (source card with a
 * live quality checklist, platform presets and custom dimensions) and a
 * right stage (checkerboard canvas preview, multi-size strip and the export
 * dock with format segmented control + single / ZIP downloads).
 */

export type ResizeWorkbenchFormat = "image/jpeg" | "image/png" | "image/webp";

export interface ResizeWorkbenchQualityCheck {
  status: "ok" | "warn" | "error";
  label: string;
}

export interface ResizeWorkbenchPreset {
  ratio: string;
  label: string;
  width: number;
  height: number;
}

export interface ResizeWorkbenchPlatform {
  id: string;
  name: string;
  icon: string;
  presets: ResizeWorkbenchPreset[];
}

export interface ResizeWorkbenchFormatOption {
  value: ResizeWorkbenchFormat;
  label: string;
  desc: string;
}

export interface ResizeWorkbenchProps {
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
  dividerLabel?: ReactNode;
  youtubePlaceholder?: string;
  youtubeFetchLabel?: ReactNode;
  youtubeBusy?: boolean;
  onYouTubeSubmit?: (url: string) => void;
  /** source */
  sourceUrl?: string | null;
  sourceWidth?: number;
  sourceHeight?: number;
  fileSizeBytes?: number;
  sourceCardTitle?: ReactNode;
  sourceMetaLabel?: ReactNode;
  qualityCardTitle?: ReactNode;
  qualityChecks?: ResizeWorkbenchQualityCheck[];
  replaceLabel?: ReactNode;
  onReplace?: () => void;
  onDropFile?: (file: File) => void;
  previewLinkLabel?: ReactNode;
  editorLinkLabel?: ReactNode;
  onOpenPreview?: () => void;
  onOpenEditor?: () => void;
  /** target size */
  targetCardTitle?: ReactNode;
  platforms: ResizeWorkbenchPlatform[];
  activeWidth: number;
  activeHeight: number;
  onPresetSelect?: (width: number, height: number) => void;
  /** custom dimensions */
  customCardTitle?: ReactNode;
  widthLabel?: ReactNode;
  heightLabel?: ReactNode;
  aspectLocked: boolean;
  onToggleAspectLock: () => void;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  sliderMax?: number;
  outputLabel?: ReactNode;
  /** preview stage */
  previewCardTitle?: ReactNode;
  canvasLabel?: ReactNode;
  multiSizeLabel?: ReactNode;
  /** export dock */
  exportCardTitle?: ReactNode;
  formatOptions: ResizeWorkbenchFormatOption[];
  format: ResizeWorkbenchFormat;
  onFormatChange: (value: ResizeWorkbenchFormat) => void;
  downloadLabel?: (
    width: number,
    height: number,
    extension: string,
  ) => ReactNode;
  downloadAllLabel?: ReactNode;
  downloadAllLoadingLabel?: ReactNode;
  downloadAllHint?: ReactNode;
  downloadingAll?: boolean;
  busy?: boolean;
  onDownload: () => void;
  onDownloadAll: () => void;
  /** shared */
  error?: ReactNode;
  footerHint?: ReactNode;
}
