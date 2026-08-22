import type { ReactNode } from "react";

/**
 * VideoGeneratorStudio - the AI video generation studio.
 *
 * Pure presentational: the app keeps the full business layer (auth, credit
 * balance, task creation, polling, download) and passes structured data +
 * callbacks down. The section renders the designed studio: a cinematic
 * gradient hero strip with the credit wallet, a two-panel workspace (prompt
 * deck on the left, stage on the right), the segmented mode tabs
 * (text-to-video / image-to-video / video-to-video), provider/model selects,
 * the mode-specific reference slot (image uploader for image-to-video, video
 * URL composer for video-to-video), the prompt composer with a live count,
 * the generate action, the live progress rail and the stage grid with native
 * video players, download overlays and empty/loading states.
 */

export type VideoGeneratorStudioTab =
  "text-to-video" | "image-to-video" | "video-to-video";

export interface VideoGeneratorStudioTabItem {
  key: VideoGeneratorStudioTab;
  label: string;
}

export interface VideoGeneratorStudioOption {
  value: string;
  label: string;
}

export interface VideoGeneratorStudioVideo {
  id: string;
  url: string;
  prompt?: string;
  provider?: string;
  model?: string;
}

export interface VideoGeneratorStudioProps {
  className?: string;
  /** forwarded to the DOM root by the registry wrapper */
  "data-registry"?: string;
  /** hero */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** studio panel titles */
  deckTitle?: ReactNode;
  stageTitle?: ReactNode;
  /** mode tabs (text-to-video / image-to-video / video-to-video) */
  activeTab: VideoGeneratorStudioTab;
  tabs: VideoGeneratorStudioTabItem[];
  onTabChange: (tab: VideoGeneratorStudioTab) => void;
  /** provider + model selects */
  providerLabel?: ReactNode;
  providerPlaceholder?: string;
  providerOptions: VideoGeneratorStudioOption[];
  provider: string;
  onProviderChange: (value: string) => void;
  modelLabel?: ReactNode;
  modelPlaceholder?: string;
  modelOptions: VideoGeneratorStudioOption[];
  model: string;
  onModelChange: (value: string) => void;
  /** reference image slot (image-to-video mode) */
  referenceImageTitle?: ReactNode;
  referenceImageSlot?: ReactNode;
  referenceImageError?: ReactNode;
  /** reference video URL (video-to-video mode) */
  referenceVideoLabel?: ReactNode;
  referenceVideoPlaceholder?: string;
  referenceVideo?: string;
  onReferenceVideoChange?: (value: string) => void;
  referenceVideoError?: ReactNode;
  /** prompt composer */
  promptLabel?: ReactNode;
  promptPlaceholder?: string;
  prompt: string;
  promptMaxLength?: number;
  onPromptChange: (value: string) => void;
  promptTooLong?: boolean;
  promptTooLongLabel?: ReactNode;
  /** credit wallet (hero) */
  balanceLabel?: ReactNode;
  balanceValue?: string;
  balanceUnit?: ReactNode;
  signedInBalanceLabel?: ReactNode;
  costChipLabel?: ReactNode;
  buyCreditsLabel?: ReactNode;
  buyCreditsHref?: string;
  /** generate action */
  signedIn: boolean;
  checking?: boolean;
  mounted?: boolean;
  isGenerating: boolean;
  canGenerate?: boolean;
  generateLabel?: ReactNode;
  generatingLabel?: ReactNode;
  checkingLabel?: ReactNode;
  loadingLabel?: ReactNode;
  signInLabel?: ReactNode;
  onGenerate: () => void;
  /** credits row under the action */
  creditsCostLabel?: ReactNode;
  creditsRemainingLabel?: ReactNode;
  /** live progress rail */
  progressVisible?: boolean;
  progress?: number;
  progressLabel?: ReactNode;
  progressStatusLabel?: ReactNode;
  /** stage / gallery */
  videos: VideoGeneratorStudioVideo[];
  stageEmptyLabel?: ReactNode;
  stageReadyLabel?: ReactNode;
  downloadLabel?: string;
  downloadingId?: string | null;
  onDownload?: (video: VideoGeneratorStudioVideo) => void;
  /** footer */
  footerHint?: ReactNode;
}
