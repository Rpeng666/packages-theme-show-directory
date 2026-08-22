"use client";

import * as React from "react";
import { Tooltip as SemiTooltip } from "@douyinfe/semi-ui";
import { IconArrowLeft } from "@douyinfe/semi-icons";
import type {
  ChatSuggestionChip,
  ChatWorkbenchProps,
} from "@template/ui";
import { ConsoleLink } from "@template/ui";

import { SmartIcon } from "../icons";

/**
 * Semi ChatWorkbench - AI chat studio.
 *
 * A calm, focused conversation surface that makes the chat the hero of the
 * product:
 *   - empty state: soft grid + brand glow, a brand pill with a pulsing dot,
 *     a display headline, prompt suggestion chips (tinted icon cards) and the
 *     composer dock anchored at the bottom.
 *   - conversation: a glass sticky header (back control + chat title + live
 *     status + model badge + actions), a scrollable message column and the
 *     composer dock.
 * The streaming message list and the prompt composer are app-provided slots
 * because they bind to the AI SDK stream state.
 */

const TONE: Record<
  NonNullable<ChatSuggestionChip["tone"]>,
  { color: string; bg: string }
> = {
  blue: {
    color: "var(--semi-color-primary)",
    bg: "var(--semi-color-primary-light-default)",
  },
  green: {
    color: "var(--semi-color-success)",
    bg: "rgba(var(--semi-green-1), 0.7)",
  },
  gold: {
    color: "var(--semi-color-warning)",
    bg: "rgba(var(--semi-amber-1), 0.7)",
  },
  red: {
    color: "var(--semi-color-danger)",
    bg: "rgba(var(--semi-red-1), 0.7)",
  },
  purple: {
    color: "rgb(var(--semi-violet-6))",
    bg: "rgba(var(--semi-violet-1), 0.7)",
  },
  neutral: {
    color: "var(--semi-color-text-2)",
    bg: "var(--semi-color-fill-0)",
  },
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
      className="chat-suggestion"
      onClick={() => onSelect?.(chip.key)}
    >
      {chip.icon ? (
        <span
          className="chat-suggestion-icon"
          style={{ color: tone.color, background: tone.bg }}
        >
          <SmartIcon name={chip.icon} size={16} />
        </span>
      ) : null}
      <span className="chat-suggestion-body">
        <span className="chat-suggestion-title">{chip.title}</span>
        {chip.description ? (
          <span className="chat-suggestion-desc">{chip.description}</span>
        ) : null}
      </span>
      <span className="chat-suggestion-arrow" aria-hidden>
        ↗
      </span>
    </button>
  );
}

function EmptyFrame({
  eyebrow,
  title,
  subtitle,
  suggestions,
  onSuggestionClick,
  composer,
  footerHint,
}: ChatWorkbenchProps) {
  return (
    <div className="chat-empty">
      <div className="chat-empty-bg" aria-hidden>
        <div className="app-grid-pattern" />
        <div className="app-hero-glow" />
      </div>
      <div className="chat-empty-inner">
        {eyebrow ? (
          <span className="chat-empty-brand">
            <span className="chat-empty-dot" aria-hidden />
            {eyebrow}
          </span>
        ) : null}
        {title ? <h2 className="chat-empty-title">{title}</h2> : null}
        {subtitle ? (
          <p className="chat-empty-subtitle">{subtitle}</p>
        ) : null}
        {suggestions && suggestions.length > 0 ? (
          <div className="chat-suggestions">
            {suggestions.map((chip) => (
              <SuggestionChip
                key={chip.key}
                chip={chip}
                onSelect={onSuggestionClick}
              />
            ))}
          </div>
        ) : null}
        {composer ? <div className="chat-composer-dock">{composer}</div> : null}
        {footerHint ? (
          <p className="chat-footer-hint">{footerHint}</p>
        ) : null}
      </div>
    </div>
  );
}

function ConversationFrame({
  chatTitle,
  chatStatus,
  modelLabel,
  headerBackUrl,
  headerActions,
  messages,
  composer,
  footerHint,
}: ChatWorkbenchProps) {
  const back = headerBackUrl ? (
    <ConsoleLink href={headerBackUrl} className="chat-conv-back" aria-label="back">
      <IconArrowLeft size="small" />
    </ConsoleLink>
  ) : null;

  return (
    <div className="chat-conv">
      <header className="chat-conv-header">
        <div className="chat-conv-header-left">
          {back}
          <span className="chat-conv-dot" aria-hidden />
          <h1 className="chat-conv-title">{chatTitle || "…"}</h1>
          {chatStatus ? (
            <span className="chat-conv-status">{chatStatus}</span>
          ) : null}
        </div>
        <div className="chat-conv-header-right">
          {modelLabel ? (
            <span className="chat-conv-model">
              <span className="chat-conv-model-dot" aria-hidden />
              {modelLabel}
            </span>
          ) : null}
          {headerActions}
        </div>
      </header>
      <div className="chat-conv-messages">{messages}</div>
      <div className="chat-conv-composer">
        {composer ? <div className="chat-composer-dock">{composer}</div> : null}
        {footerHint ? (
          <p className="chat-footer-hint">{footerHint}</p>
        ) : null}
      </div>
    </div>
  );
}

export function ChatWorkbench({
  mode = "empty",
  className = "",
  ...rest
}: ChatWorkbenchProps) {
  return (
    <div className={`chat-workbench chat-workbench-${mode} ${className}`.trim()}>
      {mode === "conversation" ? (
        <ConversationFrame {...rest} />
      ) : (
        <EmptyFrame {...rest} />
      )}
    </div>
  );
}
