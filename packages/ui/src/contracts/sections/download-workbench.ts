import type { ReactNode } from "react";

/**
 * DownloadWorkbench - the YouTube thumbnail download studio.
 *
 * Pure presentational: the app keeps the full business layer (YouTube URL →
 * videoId resolution, the /api/thumbnail/variants fetch, per-quality blob
 * download with a new-tab fallback) and passes structured data + callbacks
 * down. The section renders the compact studio: a single URL input with a
 * small fetch CTA directly beneath it, then a horizontally scrolling gallery
 * of rectangular quality cards (recent downloads) and a "what's next" tips
 * rail. No hero — the tool page already provides the page-level header.
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
  /** download every available quality as a single ZIP */
  downloadAllLabel?: ReactNode;
  downloadingAll?: boolean;
  onDownloadAll?: () => void;
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
