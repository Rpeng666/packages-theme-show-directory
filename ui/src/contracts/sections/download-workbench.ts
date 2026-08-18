import type { ReactNode } from "react";

/**
 * DownloadWorkbench - the YouTube thumbnail download studio.
 *
 * Pure presentational: the app keeps the full business layer (YouTube URL →
 * videoId resolution, the /api/thumbnail/variants fetch, per-quality blob
 * download with a new-tab fallback) and passes structured data + callbacks
 * down. The section renders the designed studio: an orange "grab" hero, a
 * persistent grab bar (URL input + fetch CTA + privacy note), then a quality
 * gallery (2-column grid of preview cards with resolution tags + download
 * buttons) and a "what's next" tips rail.
 */

export interface DownloadWorkbenchQuality {
  key: string;
  /** human label, e.g. "Max Resolution" */
  label: ReactNode;
  width: number;
  height: number;
  url: string;
  available: boolean;
  /** optional highlight badge (e.g. "Best") shown on the card */
  badge?: ReactNode;
}

export interface DownloadWorkbenchTip {
  label: string;
  href: string;
}

export interface DownloadWorkbenchProps {
  className?: string;
  /** forwarded to the DOM root by the registry wrapper */
  "data-registry"?: string;
  /** studio hero */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  badges?: Array<{ label: string; tone?: "free" | "pro" | "neutral" }>;
  meta?: Array<{ icon: string; text: string }>;
  /** grab bar */
  inputLabel?: ReactNode;
  inputPlaceholder?: ReactNode;
  fetchLabel?: ReactNode;
  loading?: boolean;
  error?: ReactNode;
  urlValue?: string;
  onUrlChange?: (value: string) => void;
  onSubmit?: () => void;
  privacyTip?: ReactNode;
  /** results */
  resultsTitle?: ReactNode;
  foundLabel?: ReactNode;
  videoId?: string;
  videoIdLabel?: ReactNode;
  resolutionLabel?: ReactNode;
  unavailableLabel?: ReactNode;
  downloadLabel?: ReactNode;
  downloadingLabel?: ReactNode;
  downloadingKey?: string | null;
  onDownload?: (quality: DownloadWorkbenchQuality) => void;
  qualities?: DownloadWorkbenchQuality[];
  /** empty / no-results state */
  noResultsTitle?: ReactNode;
  noResultsHint?: ReactNode;
  /** what's next */
  tipsTitle?: ReactNode;
  tips?: DownloadWorkbenchTip[];
  /** shared */
  footerHint?: ReactNode;
}
