"use client";

import * as React from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { ConsoleLink } from "../../../components/console/bridge";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  ChatHistoryGroup,
  ChatHistoryItem,
  ChatHistoryProps,
  ChatHistoryStat,
} from "../../../contracts/sections/chat-history";

const STAT_TONE: Record<
  NonNullable<ChatHistoryStat["tone"]>,
  { text: string; bg: string }
> = {
  brand: { text: "text-primary", bg: "bg-primary/10" },
  success: { text: "text-emerald-600", bg: "bg-emerald-500/10" },
  warning: { text: "text-amber-600", bg: "bg-amber-500/10" },
  neutral: { text: "text-muted-foreground", bg: "bg-muted" },
};

const DEFAULT_STAT_TONE: NonNullable<ChatHistoryStat["tone"]> = "neutral";

function StatCard({ stat }: { stat: ChatHistoryStat }) {
  const tone = (stat.tone && STAT_TONE[stat.tone]) || STAT_TONE[DEFAULT_STAT_TONE];
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm">
      {stat.icon ? (
        <span
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            tone.bg,
            tone.text
          )}
        >
          <SmartIcon name={stat.icon} size={16} />
        </span>
      ) : null}
      <span className="flex flex-col">
        <span className="text-lg font-bold leading-tight text-foreground">
          {stat.value}
        </span>
        <span className="text-xs text-muted-foreground">{stat.label}</span>
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
        className="group flex w-full items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
        onClick={() => onOpen?.(item.id)}
        title={item.dateLabel}
        aria-label={`${openLabel || "Open"} - ${item.title}`}
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <SmartIcon name="Message" size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">
            {item.title}
          </span>
          <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            {item.timeLabel ? (
              <span className="inline-flex items-center gap-1">
                <SmartIcon name="Clock" size={12} />
                {item.timeLabel}
              </span>
            ) : null}
            {item.model ? (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
                {item.model}
              </span>
            ) : null}
          </span>
        </span>
        <span className="shrink-0 text-muted-foreground/60 transition group-hover:text-foreground">
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
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <h3 className="text-sm font-semibold text-foreground">{group.label}</h3>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {group.items.length}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
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
    <div className="flex flex-col gap-2">
      {[0, 1, 2, 3, 4].map((idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 rounded-xl border bg-card p-4"
        >
          <div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/5 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
          </div>
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
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <SmartIcon name={icon} size={26} />
      </span>
      {title ? (
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      ) : null}
      {description ? (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-1 inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
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
  const btn =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40";
  return (
    <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
      <span className="text-xs text-muted-foreground">{summary}</span>
      {totalPages > 1 ? (
        <nav className="flex items-center gap-1" aria-label="pagination">
          <button type="button" className={btn} disabled={page <= 1} onClick={() => onPageChange?.(page - 1)} aria-label="previous page">
            ‹
          </button>
          {pages.map((p, idx) =>
            p === "…" ? (
              <span key={`dots-${idx}`} className="px-1 text-sm text-muted-foreground">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                className={`${btn}${p === page ? " border-primary bg-primary/10 text-primary" : ""}`}
                aria-current={p === page ? "page" : undefined}
                onClick={() => onPageChange?.(p)}
              >
                {p}
              </button>
            )
          )}
          <button type="button" className={btn} disabled={page >= totalPages} onClick={() => onPageChange?.(page + 1)} aria-label="next page">
            ›
          </button>
        </nav>
      ) : null}
      {perPageLabel && perPageOptions && perPageOptions.length > 0 ? (
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          {perPageLabel}
          <select
            value={perPageValue}
            onChange={(e) => onPerPageChange?.(Number(e.target.value))}
            className="h-8 rounded-lg border bg-background px-2 text-sm outline-none"
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
    </footer>
  );
}

export function ChatHistory({
  className,
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
      <CenterState icon="Warning" title={error} actionLabel={retryLabel} onAction={onRetry} />
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
        <div className="flex flex-col gap-8">
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
      <ConsoleLink href={newChatHref} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90">
        <SmartIcon name="Plus" size={16} />
        {newChatLabel}
      </ConsoleLink>
    ) : (
      <button
        type="button"
        onClick={onNewChat}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
      >
        <SmartIcon name="Plus" size={16} />
        {newChatLabel}
      </button>
    )
  ) : null;

  return (
    <div
      className={cn("mx-auto flex h-full w-full max-w-3xl flex-col overflow-y-auto px-6 py-8", className)}
      data-registry={dataRegistry}
    >
      <header className="mb-6">
        {eyebrow ? (
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
        ) : null}
        {title ? (
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        ) : null}
        {description ? (
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
        ) : null}
        {stats && stats.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatCard key={stat.key} stat={stat} />
            ))}
          </div>
        ) : null}
        <div className="mt-5 flex items-center gap-3">
          {showSearch ? (
            <label className="relative flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                <SmartIcon name="Search" size={16} />
              </span>
              <input
                type="search"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="h-9 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
              />
            </label>
          ) : null}
          {newChat}
        </div>
      </header>
      <div className="flex-1">{body}</div>
      {footerHint ? (
        <p className="pb-2 pt-4 text-center text-xs text-muted-foreground/70">{footerHint}</p>
      ) : null}
    </div>
  );
}
