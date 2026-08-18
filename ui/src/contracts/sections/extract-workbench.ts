import type { ReactNode, RefObject } from "react";

/**
 * ExtractWorkbench - the video frame extraction studio.
 *
 * Pure presentational: the app keeps the full business layer (video file
 * loading, the <video> element + transport logic, 1280x720 canvas capture,
 * download) and passes structured data + callbacks down. The section renders
 * the designed studio: an indigo "freeze-frame" hero, a guided empty state
 * (dropzone + privacy tip), then a two-panel workbench - a left stage with
 * the video player, transport bar (play/pause + scrub timeline) and the
 * capture CTA, and a right rail with the captured-frame preview, the export
 * dock and the "improve this frame" tips.
 */

export interface ExtractWorkbenchTip {
  label: string;
  href: string;
}

export interface ExtractWorkbenchProps {
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
  /** source video */
  videoUrl?: string | null;
  videoName?: string;
  videoRef?: RefObject<HTMLVideoElement | null>;
  onDropFile?: (file: File) => void;
  onReplace?: () => void;
  /** transport */
  playing?: boolean;
  currentTime?: number;
  duration?: number;
  onTogglePlay?: () => void;
  onSeek?: (time: number) => void;
  onTimeUpdate?: (time: number) => void;
  onLoadedMetadata?: (duration: number) => void;
  onEnded?: () => void;
  /** stage */
  stageCardTitle?: ReactNode;
  captureLabel?: ReactNode;
  captureHint?: ReactNode;
  onCapture?: () => void;
  capturing?: boolean;
  /** frame */
  frameCardTitle?: ReactNode;
  frameResolutionLabel?: ReactNode;
  framePlaceholder?: ReactNode;
  frameUrl?: string | null;
  /** export dock */
  exportCardTitle?: ReactNode;
  downloadLabel?: ReactNode;
  downloadHint?: ReactNode;
  onDownload?: () => void;
  /** improve tips */
  tipsTitle?: ReactNode;
  tips?: ExtractWorkbenchTip[];
  /** shared */
  footerHint?: ReactNode;
}
