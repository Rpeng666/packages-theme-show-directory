"use client";

import * as React from "react";

import { cn } from "../../../lib/utils";
import { ConsoleLink } from "../../../components/console/bridge";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  ChatSuggestionChip,
  ChatWorkbenchProps,
} from "../../../contracts/sections/chat-workbench";

const TONE: Record<
  NonNullable<ChatSuggestionChip["tone"]>,
  { text: string; bg: string }
> = {
  blue: { text: "text-primary", bg: "bg-primary/10" },
  green: { text: "text-emerald-600", bg: "bg-emerald-500/10" },
  gold: { text: "text-amber-600", bg: "bg-amber-500/10" },
  red: { text: "text-red-600", bg: "bg-red-500/10" },
  purple: { text: "text-violet-600", bg: "bg-violet-500/10" },
  neutral: { text: "text-muted-foreground", bg: "bg-muted" },
};

const DEFAULT_TONE: NonNullable<ChatSuggestionChip["tone"]> = "blue";

function SuggestionChip({
  chip,
  onSelect,
}: {
  chip: ChatSuggestionChip;
  onSelect?: (key: string) => void;
}) {
  const tone = (chip.tone && TONE[chip.tone]) || TONE[DEFAULT_TONE];
  return (
    <button
      type="button"
      className="group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={() => onSelect?.(chip.key)}
    >
      {chip.icon ? (
        <span
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            tone.bg,
            tone.text
          )}
        >
          <SmartIcon name={chip.icon} size={16} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">
          {chip.title}
        </span>
        {chip.description ? (
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
            {chip.description}
          </span>
        ) : null}
      </span>
      <span className="shrink-0 text-muted-foreground/60 transition group-hover:text-foreground">
        ↗
      </span>
    </button>
  );
}

export function ChatWorkbench({
  mode = "empty",
  eyebrow,
  title,
  subtitle,
  suggestions,
  onSuggestionClick,
  chatTitle,
  chatStatus,
  modelLabel,
  headerBackUrl,
  headerActions,
  messages,
  composer,
  footerHint,
  className,
}: ChatWorkbenchProps) {
  if (mode === "conversation") {
    return (
      <div className={cn("flex h-full flex-col overflow-hidden", className)}>
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b bg-background/85 px-5 py-3 backdrop-blur">
          <div className="flex min-w-0 items-center gap-2.5">
            {headerBackUrl ? (
              <ConsoleLink
                href={headerBackUrl}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="back"
              >
                <span aria-hidden>←</span>
              </ConsoleLink>
            ) : null}
            <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_rgba(239,68,68,0.18)]" />
            <h1 className="truncate text-sm font-semibold text-foreground">
              {chatTitle || "…"}
            </h1>
            {chatStatus ? (
              <span className="shrink-0 text-xs font-medium text-primary">
                {chatStatus}
              </span>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {modelLabel ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {modelLabel}
              </span>
            ) : null}
            {headerActions}
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">{messages}</div>
        <div className="shrink-0 px-5 pb-4 pt-2">
          {composer ? <div className="w-full">{composer}</div> : null}
          {footerHint ? (
            <p className="mt-3 text-center text-xs text-muted-foreground/70">
              {footerHint}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(239,68,68,0.08),transparent_70%)]" />
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-4 pb-10 pt-6">
        {eyebrow ? (
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(239,68,68,0.18)]" />
            {eyebrow}
          </span>
        ) : null}
        {title ? (
          <h2 className="mb-3 text-center text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <p className="mb-8 max-w-xl text-center text-base text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
        {suggestions && suggestions.length > 0 ? (
          <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {suggestions.map((chip) => (
              <SuggestionChip
                key={chip.key}
                chip={chip}
                onSelect={onSuggestionClick}
              />
            ))}
          </div>
        ) : null}
        {composer ? <div className="w-full">{composer}</div> : null}
        {footerHint ? (
          <p className="mt-4 text-center text-xs text-muted-foreground/70">
            {footerHint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
