"use client";

import * as React from "react";
import type { ReactNode } from "react";
import type {
  ChatHistoryGroup,
  ChatHistoryItem,
  ChatHistoryProps,
  ChatHistoryStat,
} from "@template/ui";
import { ConsoleLink } from "@template/ui";
import { IconChevronLeft, IconChevronRight } from "@douyinfe/semi-icons";

import { SmartIcon } from "../icons";

/**
 * Semi ChatHistory - conversation archive for the AI chat studio.
 *
 * A calm, scannable "history" surface that mirrors the ChatWorkbench visual
 * language: a soft grid + brand glow hero with live stats, a search box and
 * a new-chat action, then a date-grouped timeline of conversation rows
 * (icon tile, title, relative time + model pill). Loading, signed-out, empty
 * and error states are built in; data, grouping and routing stay in the app.
 */

const STAT_TONE: Record<
  NonNullable<ChatHistoryStat["tone"]>,
  { color: string; bg: string }
> = {
  brand: {
    color: "var(--semi-color-primary)",
    bg: "var(--semi-color-primary-light-default)",
  },
  success: {
    color: "var(--semi-color-success)",
    bg: "rgba(var(--semi-green-1), 0.7)",
  },
  warning: {
    color: "var(--semi-color-warning)",
    bg: "rgba(var(--semi-amber-1), 0.7)",
  },
  neutral: {
    color: "var(--semi-color-text-2)",
    bg: "var(--semi-color-fill-0)",
  },
};

const DEFAULT_STAT_TONE: NonNullable<ChatHistoryStat["tone"]> = "neutral";

function StatCard({ stat }: { stat: ChatHistoryStat }) {
  const tone = (stat.tone && STAT_TONE[stat.tone]) || STAT_TONE[DEFAULT_STAT_TONE];
  return (
    <div className="chat-history-stat">
      {stat.icon ? (
        <span
          className="chat-history-stat-icon"
          style={{ color: tone.color, background: tone.bg }}
        >
          <SmartIcon name={stat.icon} size={16} />
        </span>
      ) : null}
      <span className="chat-history-stat-body">
        <span className="chat-history-stat-value">{stat.value}</span>
        <span className="chat-history-stat-label">{stat.label}</span>
      </span>
    </div>
  );
}

function HistoryRow({
  item,
  openLabel,
  onOpen,
}: {
  item: ChatHistoryItem;
  openLabel?: string;
  onOpen?: (id: string) => void;
}) {
  return (
    <li>
      <button
        type="button"
        className="chat-history-row"
        onClick={() => onOpen?.(item.id)}
        title={item.dateLabel}
        aria-label={`${openLabel || "Open"} - ${item.title}`}
      >
        <span className="chat-history-row-icon">
          <SmartIcon name="Message" size={18} />
        </span>
        <span className="chat-history-row-body">
          <span className="chat-history-row-title">{item.title}</span>
          <span className="chat-history-row-meta">
            {item.timeLabel ? (
              <span className="chat-history-row-time">
                <SmartIcon name="Clock" size={12} />
                {item.timeLabel}
              </span>
            ) : null}
            {item.model ? (
              <span className="chat-history-row-model">{item.model}</span>
            ) : null}
          </span>
        </span>
        <span className="chat-history-row-arrow" aria-hidden>
          <SmartIcon name="ArrowRight" size={16} />
        </span>
      </button>
    </li>
  );
}

function HistoryGroup({
  group,
  openLabel,
  onOpen,
}: {
  group: ChatHistoryGroup;
  openLabel?: string;
  onOpen?: (id: string) => void;
}) {
  return (
    <section className="chat-history-group">
      <div className="chat-history-group-head">
        <span className="chat-history-group-dot" aria-hidden />
        <h3 className="chat-history-group-label">{group.label}</h3>
        <span className="chat-history-group-count">{group.items.length}</span>
      </div>
      <ul className="chat-history-list">
        {group.items.map((item) => (
          <HistoryRow
            key={item.id}
            item={item}
            openLabel={openLabel}
            onOpen={onOpen}
          />
        ))}
      </ul>
    </section>
  );
}

function SkeletonRows() {
  return (
    <div className="chat-history-skeleton" aria-hidden>
      {[0, 1, 2, 3, 4].map((idx) => (
        <div key={idx} className="chat-history-skeleton-row">
          <span className="chat-history-skeleton-icon" />
          <span className="chat-history-skeleton-lines">
            <span className="chat-history-skeleton-line chat-history-skeleton-line--title" />
            <span className="chat-history-skeleton-line chat-history-skeleton-line--meta" />
          </span>
        </div>
      ))}
    </div>
  );
}

function CenterState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: string;
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
}) {
  return (
    <div className="chat-history-state">
      <span className="chat-history-state-icon">
        <SmartIcon name={icon} size={26} />
      </span>
      {title ? <h3 className="chat-history-state-title">{title}</h3> : null}
      {description ? (
        <p className="chat-history-state-desc">{description}</p>
      ) : null}
      {actionLabel ? (
        <button type="button" className="chat-history-state-action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) {
    pages.push("…");
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < total - 1) {
    pages.push("…");
  }
  pages.push(total);
  return pages;
}

function ChatHistoryPager({
  page = 1,
  totalPages = 1,
  onPageChange,
  summary,
  perPageLabel,
  perPageValue,
  perPageOptions,
  onPerPageChange,
}: Pick<
  ChatHistoryProps,
  | "page"
  | "totalPages"
  | "onPageChange"
  | "summary"
  | "perPageLabel"
  | "perPageValue"
  | "perPageOptions"
  | "onPerPageChange"
>) {
  const pages = React.useMemo(() => buildPageList(page, totalPages), [page, totalPages]);
  return (
    <footer className="chat-history-footer">
      <div className="chat-history-footer-inner">
        <span className="chat-history-summary">{summary}</span>
        {totalPages > 1 ? (
          <nav className="chat-history-pager" aria-label="pagination">
            <button
              type="button"
              className="chat-history-pager-btn"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
              aria-label="previous page"
            >
              <IconChevronLeft size="small" />
            </button>
            {pages.map((p, idx) =>
              p === "…" ? (
                <span key={`dots-${idx}`} className="chat-history-pager-dots">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  className={`chat-history-pager-btn${p === page ? " is-active" : ""}`}
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => onPageChange?.(p)}
                >
                  {p}
                </button>
              )
            )}
            <button
              type="button"
              className="chat-history-pager-btn"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
              aria-label="next page"
            >
              <IconChevronRight size="small" />
            </button>
          </nav>
        ) : null}
        {perPageLabel && perPageOptions && perPageOptions.length > 0 ? (
          <label className="chat-history-perpage">
            {perPageLabel}
            <select
              value={perPageValue}
              onChange={(e) => onPerPageChange?.(Number(e.target.value))}
            >
              {perPageOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <span />
        )}
      </div>
    </footer>
  );
}

export function ChatHistory({
  className = "",
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  stats,
  newChatLabel,
  newChatHref,
  onNewChat,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  groups = [],
  loading = false,
  signedIn = true,
  emptyTitle,
  emptyDescription,
  startChatLabel,
  onStartChat,
  signInTitle,
  signInDescription,
  signInLabel,
  onSignIn,
  error,
  retryLabel,
  onRetry,
  openChatLabel,
  onOpenChat,
  page,
  totalPages,
  onPageChange,
  summary,
  perPageLabel,
  perPageValue,
  perPageOptions,
  onPerPageChange,
  footerHint,
}: ChatHistoryProps & { "data-registry"?: string }) {
  const hasGroups = groups.length > 0;
  const showSearch = signedIn && !loading && !error && hasGroups;

  let body: ReactNode = null;
  if (!signedIn) {
    body = (
      <CenterState
        icon="Lock"
        title={signInTitle}
        description={signInDescription}
        actionLabel={signInLabel}
        onAction={onSignIn}
      />
    );
  } else if (loading) {
    body = <SkeletonRows />;
  } else if (error) {
    body = (
      <CenterState
        icon="Warning"
        title={error}
        actionLabel={retryLabel}
        onAction={onRetry}
      />
    );
  } else if (!hasGroups) {
    body = (
      <CenterState
        icon="Inbox"
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={startChatLabel}
        onAction={onStartChat}
      />
    );
  } else {
    body = (
      <>
        <div className="chat-history-groups">
          {groups.map((group) => (
            <HistoryGroup
              key={group.key}
              group={group}
              openLabel={openChatLabel}
              onOpen={onOpenChat}
            />
          ))}
        </div>
        {(summary || (totalPages && totalPages > 1)) ? (
          <ChatHistoryPager
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            summary={summary}
            perPageLabel={perPageLabel}
            perPageValue={perPageValue}
            perPageOptions={perPageOptions}
            onPerPageChange={onPerPageChange}
          />
        ) : null}
      </>
    );
  }

  const newChat = newChatLabel ? (
    newChatHref ? (
      <ConsoleLink href={newChatHref} className="chat-history-new">
        <SmartIcon name="Plus" size={16} />
        {newChatLabel}
      </ConsoleLink>
    ) : (
      <button type="button" className="chat-history-new" onClick={onNewChat}>
        <SmartIcon name="Plus" size={16} />
        {newChatLabel}
      </button>
    )
  ) : null;

  return (
    <div className={`chat-history ${className}`.trim()} data-registry={dataRegistry}>
      <div className="chat-history-bg" aria-hidden>
        <div className="app-grid-pattern" />
        <div className="app-hero-glow" />
      </div>

      <div className="chat-history-inner">
        <header className="chat-history-hero">
          <div className="chat-history-hero-copy">
            {eyebrow ? (
              <span className="chat-history-eyebrow">
                <span className="chat-history-eyebrow-dot" aria-hidden />
                {eyebrow}
              </span>
            ) : null}
            {title ? <h1 className="chat-history-title">{title}</h1> : null}
            {description ? (
              <p className="chat-history-desc">{description}</p>
            ) : null}
          </div>

          {stats && stats.length > 0 ? (
            <div className="chat-history-stats">
              {stats.map((stat) => (
                <StatCard key={stat.key} stat={stat} />
              ))}
            </div>
          ) : null}

          <div className="chat-history-actions">
            {showSearch ? (
              <label className="chat-history-search">
                <SmartIcon name="Search" size={16} />
                <input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                />
              </label>
            ) : null}
            {newChat}
          </div>
        </header>

        <div className="chat-history-body">{body}</div>

        {footerHint ? (
          <p className="chat-history-footer-hint">{footerHint}</p>
        ) : null}
      </div>
    </div>
  );
}
