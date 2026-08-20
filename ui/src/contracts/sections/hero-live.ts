import type { ReactNode } from "react";
import type { Section } from "../../types/landing";

/**
 * HeroLive — interactive first-viewport thumbnail demo.
 *
 * Sits right below the hero on the homepage. Pure presentational: the app
 * holds the business layer (YouTube fetch via /api/thumbnail, file reading,
 * session handoff to the workbench / resize studio) and passes copy + state +
 * callbacks down. The section renders a glass studio card: a guided dropzone
 * and YouTube URL input on the left, a live 16:9 canvas preview with size
 * presets and editor CTAs on the right.
 */

export interface HeroLivePreset {
  label: string;
  width: number;
  height: number;
}

export interface HeroLiveProps {
  className?: string;
  /** the landing data section the block adapter maps into the props below */
  section?: Section;
  /** forwarded to the DOM root by the registry wrapper */
  "data-registry"?: string;
  /** section copy */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** dropzone */
  dropPrimary?: ReactNode;
  dropClick?: ReactNode;
  dropHint?: ReactNode;
  /** youtube import */
  youtubeLabel?: ReactNode;
  youtubePlaceholder?: string;
  youtubeBusy?: boolean;
  /** live preview */
  previewLabel?: ReactNode;
  canvasLabel?: ReactNode;
  sizeChipLabel?: string;
  /** size presets */
  presets?: HeroLivePreset[];
  activeWidth?: number;
  activeHeight?: number;
  /** CTAs */
  ctaPrimaryLabel?: ReactNode;
  ctaPrimaryDisabled?: boolean;
  ctaSecondaryLabel?: ReactNode;
  ctaSecondaryDisabled?: boolean;
  privacyTip?: ReactNode;
  error?: ReactNode;
  /** state + callbacks */
  sourceUrl?: string | null;
  onDropFile?: (file: File) => void;
  onYouTubeSubmit?: (url: string) => void;
  onSelectPreset?: (width: number, height: number) => void;
  onOpenEditor?: () => void;
  onOpenResize?: () => void;
}
