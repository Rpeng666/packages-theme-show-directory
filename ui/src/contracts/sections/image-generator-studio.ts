import type { ReactNode } from 'react';

/**
 * ImageGeneratorStudio - the AI image generation studio.
 *
 * Pure presentational: the app keeps the full business layer (auth, credit
 * balance, task creation, polling, download) and passes structured data +
 * callbacks down. The section renders the designed studio: a gradient hero
 * strip with the credit wallet, a two-panel workspace (prompt deck on the
 * left, gallery on the right), the segmented mode tabs, provider/model
 * selects, the reference-image slot, the prompt composer with a live count,
 * the generate action, the live progress rail and the gallery grid with
 * download overlays and empty/loading states.
 */

export type ImageGeneratorStudioTab = 'text-to-image' | 'image-to-image';

export interface ImageGeneratorStudioTabItem {
  key: ImageGeneratorStudioTab;
  label: string;
}

export interface ImageGeneratorStudioOption {
  value: string;
  label: string;
}

export interface ImageGeneratorStudioImage {
  id: string;
  url: string;
  prompt?: string;
  provider?: string;
  model?: string;
}

export interface ImageGeneratorStudioProps {
  className?: string;
  /** forwarded to the DOM root by the registry wrapper */
  'data-registry'?: string;
  /** hero */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** studio panel titles */
  deckTitle?: ReactNode;
  galleryTitle?: ReactNode;
  /** mode tabs (text-to-image / image-to-image) */
  activeTab: ImageGeneratorStudioTab;
  tabs: ImageGeneratorStudioTabItem[];
  onTabChange: (tab: ImageGeneratorStudioTab) => void;
  /** provider + model selects */
  providerLabel?: ReactNode;
  providerPlaceholder?: string;
  providerOptions: ImageGeneratorStudioOption[];
  provider: string;
  onProviderChange: (value: string) => void;
  modelLabel?: ReactNode;
  modelPlaceholder?: string;
  modelOptions: ImageGeneratorStudioOption[];
  model: string;
  onModelChange: (value: string) => void;
  /** reference images (image-to-image mode) */
  referenceTitle?: ReactNode;
  referenceSlot?: ReactNode;
  referenceError?: ReactNode;
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
  /** gallery */
  images: ImageGeneratorStudioImage[];
  galleryEmptyLabel?: ReactNode;
  galleryReadyLabel?: ReactNode;
  downloadLabel?: string;
  downloadingId?: string | null;
  onDownload?: (image: ImageGeneratorStudioImage) => void;
  /** footer */
  footerHint?: ReactNode;
}
