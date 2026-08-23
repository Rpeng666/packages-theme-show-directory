import type { ReactNode } from 'react';

/**
 * ChatHistory - the "conversation archive" page for the AI chat product.
 *
 * Pure presentational: data fetching, date-grouping, filtering and routing
 * live in the app-side bridge; this section renders the hero (eyebrow +
 * title + stats + search + new-chat action), the date-grouped conversation
 * list, the loading / signed-out / empty / error states and a footer slot
 * for the pagination controls.
 */

export interface ChatHistoryItem {
  id: string;
  title: string;
  /** model label shown as a small pill (e.g. "gpt-4o-mini") */
  model?: string | null;
  /** relative time label, pre-formatted by the app (e.g. "2 小时前") */
  timeLabel?: string;
  /** absolute date label used for the title/tooltip attribute */
  dateLabel?: string;
}

export interface ChatHistoryGroup {
  key: string;
  label: string;
  items: ChatHistoryItem[];
}

export type ChatHistoryStatTone = 'brand' | 'success' | 'warning' | 'neutral';

export interface ChatHistoryStat {
  key: string;
  label: string;
  value: string;
  icon?: string;
  tone?: ChatHistoryStatTone;
}

export interface ChatHistoryProps {
  className?: string;
  /** hero */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  stats?: ChatHistoryStat[];
  /** actions */
  newChatLabel?: ReactNode;
  newChatHref?: string;
  onNewChat?: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /** list */
  groups?: ChatHistoryGroup[];
  loading?: boolean;
  signedIn?: boolean;
  /** empty state (signed in, no conversations) */
  emptyTitle?: ReactNode;
  emptyDescription?: ReactNode;
  startChatLabel?: ReactNode;
  onStartChat?: () => void;
  /** signed-out state */
  signInTitle?: ReactNode;
  signInDescription?: ReactNode;
  signInLabel?: ReactNode;
  onSignIn?: () => void;
  /** error state - the message node to show (null hides the error state) */
  error?: ReactNode;
  retryLabel?: ReactNode;
  onRetry?: () => void;
  /** accessibility label for the "open conversation" control */
  openChatLabel?: string;
  onOpenChat?: (id: string) => void;
  /** pagination footer - rendered by the section so visuals stay in-package */
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  summary?: ReactNode;
  perPageLabel?: ReactNode;
  perPageValue?: number;
  perPageOptions?: number[];
  onPerPageChange?: (value: number) => void;
  footerHint?: ReactNode;
}