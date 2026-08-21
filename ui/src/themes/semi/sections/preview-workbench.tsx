"use client";

import * as React from "react";
import { useRef } from "react";
import type { ReactNode } from "react";
import type {
  PreviewSceneDef,
  PreviewSceneId,
  PreviewWorkbenchProps,
  PreviewWorkbenchTip,
} from "@template/ui";

import { Button } from "../components/button";
import { Input } from "../components/input";
import { SmartIcon } from "../icons";

/**
 * Semi PreviewWorkbench - a designer-grade YouTube thumbnail inspect studio.
 *
 * Visual language shared with the other studios: a sky "inspect" hero, a
 * work-area console (single / A-B mode, upload slots, title + channel, dark
 * toggle, scene tabs), then a YouTube-context stage that simulates the four
 * places viewers meet a thumbnail (desktop feed / search results / mobile
 * feed / watch sidebar) plus a "what to check" tips rail. All data +
 * callbacks come from the app; this section only renders.
 *
 * Layout is a two-column studio: the preview + tips rail on the left (4/5),
 * the console as a narrow control rail on the right (1/5). It collapses to a
 * single column on narrow screens with the preview first, console below.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// ── Mock YouTube surroundings (deterministic, design-only) ───────────────────

const FAKE = [
  {
    title: "I Spent 30 Days Learning This Skill",
    channel: "TechWithMike",
    views: "2.1M views",
    age: "3 days ago",
    g: "pstudio-fake-1",
    a: "pstudio-avatar-1",
  },
  {
    title: "The Truth About Passive Income in 2026",
    channel: "FinanceFlow",
    views: "890K views",
    age: "1 week ago",
    g: "pstudio-fake-2",
    a: "pstudio-avatar-2",
  },
  {
    title: "Why Everyone Is Switching to This Tool",
    channel: "ProductivityPro",
    views: "1.4M views",
    age: "5 days ago",
    g: "pstudio-fake-3",
    a: "pstudio-avatar-3",
  },
  {
    title: "I Tested 10 AI Tools So You Don't Have To",
    channel: "AIReviewer",
    views: "3.2M views",
    age: "2 weeks ago",
    g: "pstudio-fake-4",
    a: "pstudio-avatar-4",
  },
  {
    title: "This Changed How I Work Forever",
    channel: "WorkSmarter",
    views: "567K views",
    age: "4 days ago",
    g: "pstudio-fake-5",
    a: "pstudio-avatar-5",
  },
  {
    title: "The Beginner's Guide to Getting Started",
    channel: "LearnFast",
    views: "1.8M views",
    age: "1 month ago",
    g: "pstudio-fake-6",
    a: "pstudio-avatar-6",
  },
] as const;

const FAKE_DESC =
  "In this video we break down the entire workflow step by step, covering the tools, the mistakes and the exact playbook you can copy today.";

// ── Small mock atoms ──────────────────────────────────────────────────────────

function FakeThumb({ g, w, h }: { g: string; w?: number; h?: number }) {
  return (
    <div
      className={cn("pstudio-fake", g)}
      style={w && h ? { width: w, height: h } : undefined}
    >
      <span className="pstudio-fake-play" />
    </div>
  );
}

function Avatar({
  a,
  seed,
  size = 30,
}: {
  a: string;
  seed: string;
  size?: number;
}) {
  return (
    <span
      className={cn("pstudio-avatar", a)}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
    >
      {seed.charAt(0).toUpperCase()}
    </span>
  );
}

function UserThumb({
  src,
  badge,
  w,
  h,
  className,
}: {
  src?: string | null;
  badge?: ReactNode;
  w?: number;
  h?: number;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={cn("pstudio-user-slot", className)}
        style={w && h ? { width: w, height: h } : undefined}
      >
        <SmartIcon name="Image" size={15} />
        {badge ? <span className="pstudio-slot-badge">{badge}</span> : null}
      </div>
    );
  }
  return (
    <div
      className={cn("pstudio-user-thumb", className)}
      style={w && h ? { width: w, height: h } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Your thumbnail" />
      {badge ? <span className="pstudio-slot-badge">{badge}</span> : null}
    </div>
  );
}

// ── Scenes (mock YouTube contexts) ────────────────────────────────────────────

function FeedScene({
  a,
  b,
  title,
  channel,
  aLabel,
  bLabel,
  yourVideoLabel,
}: {
  a?: string | null;
  b?: string | null;
  title?: string;
  channel?: string;
  aLabel?: ReactNode;
  bLabel?: ReactNode;
  yourVideoLabel?: ReactNode;
}) {
  const cards: Array<
    | { kind: "fake"; idx: number }
    | { kind: "user"; badge?: ReactNode; src?: string | null }
  > = [
    { kind: "fake", idx: 0 },
    { kind: "user", src: a, badge: aLabel },
    { kind: "fake", idx: 1 },
    { kind: "fake", idx: 2 },
    b ? { kind: "user", src: b, badge: bLabel } : { kind: "fake", idx: 3 },
    { kind: "fake", idx: 4 },
  ];
  return (
    <div className="pstudio-grid-feed">
      {cards.map((card, i) =>
        card.kind === "fake" ? (
          <div key={i} className="pstudio-card">
            <FakeThumb g={FAKE[card.idx].g} />
            <div className="pstudio-card-row">
              <Avatar
                a={FAKE[card.idx].a}
                seed={FAKE[card.idx].channel}
                size={30}
              />
              <div className="pstudio-card-copy">
                <p className="pstudio-card-title">{FAKE[card.idx].title}</p>
                <p className="pstudio-card-meta">
                  {FAKE[card.idx].channel} · {FAKE[card.idx].views} ·{" "}
                  {FAKE[card.idx].age}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div key={i} className="pstudio-card pstudio-card-user">
            <UserThumb src={card.src} badge={card.badge} />
            <div className="pstudio-card-row">
              <Avatar a="pstudio-avatar-user" seed={channel || "Y"} size={30} />
              <div className="pstudio-card-copy">
                <p className="pstudio-card-title pstudio-card-title-user">
                  {title || yourVideoLabel || "Your Video"}
                </p>
                <p className="pstudio-card-meta">
                  {channel || "Your Channel"} · 1.2M views · 2 days ago
                </p>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function SearchScene({
  a,
  b,
  title,
  channel,
  aLabel,
  bLabel,
  yourVideoLabel,
}: {
  a?: string | null;
  b?: string | null;
  title?: string;
  channel?: string;
  aLabel?: ReactNode;
  bLabel?: ReactNode;
  yourVideoLabel?: ReactNode;
}) {
  const rows: Array<
    | { kind: "fake"; idx: number }
    | { kind: "user"; badge?: ReactNode; src?: string | null }
  > = [
    { kind: "fake", idx: 0 },
    { kind: "user", src: a, badge: aLabel },
    { kind: "fake", idx: 1 },
    b ? { kind: "user", src: b, badge: bLabel } : { kind: "fake", idx: 2 },
    { kind: "fake", idx: 3 },
  ];
  return (
    <div className="pstudio-search">
      {rows.map((row, i) =>
        row.kind === "fake" ? (
          <div key={i} className="pstudio-search-row">
            <FakeThumb g={FAKE[row.idx].g} w={246} h={138} />
            <div className="pstudio-search-copy">
              <p className="pstudio-search-title">{FAKE[row.idx].title}</p>
              <p className="pstudio-search-meta">
                {FAKE[row.idx].channel} · {FAKE[row.idx].views} ·{" "}
                {FAKE[row.idx].age}
              </p>
              <p className="pstudio-search-desc">{FAKE_DESC}</p>
            </div>
          </div>
        ) : (
          <div key={i} className="pstudio-search-row">
            <UserThumb src={row.src} badge={row.badge} w={246} h={138} />
            <div className="pstudio-search-copy">
              <p className="pstudio-search-title pstudio-search-title-user">
                {title || yourVideoLabel || "Your Video"}
              </p>
              <p className="pstudio-search-meta">
                {channel || "Your Channel"} · 1.2M views · 2 days ago
              </p>
              <p className="pstudio-search-desc">{FAKE_DESC}</p>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function MobileScene({
  a,
  b,
  title,
  channel,
  aLabel,
  bLabel,
  yourVideoLabel,
}: {
  a?: string | null;
  b?: string | null;
  title?: string;
  channel?: string;
  aLabel?: ReactNode;
  bLabel?: ReactNode;
  yourVideoLabel?: ReactNode;
}) {
  const cards: Array<
    | { kind: "fake"; idx: number }
    | { kind: "user"; badge?: ReactNode; src?: string | null }
  > = [
    { kind: "user", src: a, badge: aLabel },
    { kind: "fake", idx: 0 },
    b ? { kind: "user", src: b, badge: bLabel } : { kind: "fake", idx: 1 },
    { kind: "fake", idx: 2 },
  ];
  return (
    <div className="pstudio-grid-mobile">
      {cards.map((card, i) =>
        card.kind === "fake" ? (
          <div key={i} className="pstudio-card">
            <FakeThumb g={FAKE[card.idx].g} />
            <div className="pstudio-card-row">
              <Avatar
                a={FAKE[card.idx].a}
                seed={FAKE[card.idx].channel}
                size={26}
              />
              <div className="pstudio-card-copy">
                <p className="pstudio-card-title">{FAKE[card.idx].title}</p>
                <p className="pstudio-card-meta">
                  {FAKE[card.idx].channel} · {FAKE[card.idx].views}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div key={i} className="pstudio-card pstudio-card-user">
            <UserThumb src={card.src} badge={card.badge} />
            <div className="pstudio-card-row">
              <Avatar a="pstudio-avatar-user" seed={channel || "Y"} size={26} />
              <div className="pstudio-card-copy">
                <p className="pstudio-card-title pstudio-card-title-user">
                  {title || yourVideoLabel || "Your Video"}
                </p>
                <p className="pstudio-card-meta">
                  {channel || "Your Channel"} · 1.2M views
                </p>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function SidebarScene({
  a,
  b,
  title,
  channel,
  aLabel,
  bLabel,
  yourVideoLabel,
}: {
  a?: string | null;
  b?: string | null;
  title?: string;
  channel?: string;
  aLabel?: ReactNode;
  bLabel?: ReactNode;
  yourVideoLabel?: ReactNode;
}) {
  const rows: Array<
    | { kind: "fake"; idx: number }
    | { kind: "user"; badge?: ReactNode; src?: string | null }
  > = [
    { kind: "fake", idx: 0 },
    { kind: "user", src: a, badge: aLabel },
    { kind: "fake", idx: 1 },
    { kind: "fake", idx: 2 },
    b ? { kind: "user", src: b, badge: bLabel } : { kind: "fake", idx: 3 },
  ];
  return (
    <div className="pstudio-sidebar">
      {rows.map((row, i) =>
        row.kind === "fake" ? (
          <div key={i} className="pstudio-sidebar-row">
            <FakeThumb g={FAKE[row.idx].g} w={168} h={94} />
            <div className="pstudio-sidebar-copy">
              <p className="pstudio-sidebar-title">{FAKE[row.idx].title}</p>
              <p className="pstudio-sidebar-meta">
                {FAKE[row.idx].channel} · {FAKE[row.idx].views} ·{" "}
                {FAKE[row.idx].age}
              </p>
            </div>
          </div>
        ) : (
          <div key={i} className="pstudio-sidebar-row">
            <UserThumb src={row.src} badge={row.badge} w={168} h={94} />
            <div className="pstudio-sidebar-copy">
              <p className="pstudio-sidebar-title pstudio-sidebar-title-user">
                {title || yourVideoLabel || "Your Video"}
              </p>
              <p className="pstudio-sidebar-meta">
                {channel || "Your Channel"} · 1.2M views · 2 days ago
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

// ── Upload slot ───────────────────────────────────────────────────────────────

function UploadSlot({
  label,
  src,
  onUpload,
  uploadTitle,
  uploadHint,
  uploadFormatHint,
  replaceLabel,
}: {
  label?: ReactNode;
  src?: string | null;
  onUpload?: (dataUrl: string) => void;
  uploadTitle?: ReactNode;
  uploadHint?: ReactNode;
  uploadFormatHint?: ReactNode;
  replaceLabel?: ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const load = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => onUpload?.(String(event.target?.result ?? ""));
    reader.readAsDataURL(file);
  };

  return (
    <div className="pstudio-slot">
      {src ? (
        <>
          <div className="pstudio-slot-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="Thumbnail" />
            {label ? <span className="pstudio-slot-tag">{label}</span> : null}
          </div>
          <div className="pstudio-slot-actions">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
            >
              <SmartIcon name="Refresh" size={14} />
              <span>{replaceLabel}</span>
            </Button>
            {uploadFormatHint ? (
              <span className="pstudio-slot-hint">{uploadFormatHint}</span>
            ) : null}
          </div>
        </>
      ) : (
        <button
          type="button"
          className="pstudio-drop"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const file = event.dataTransfer.files?.[0];
            if (file) load(file);
          }}
        >
          <span className="pstudio-drop-icon">
            <SmartIcon name="Upload" size={18} />
          </span>
          <span className="pstudio-drop-title">
            {uploadTitle} <b>{label}</b>
          </span>
          <span className="pstudio-drop-hint">{uploadHint}</span>
          <span className="pstudio-drop-format">{uploadFormatHint}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="pstudio-hidden-input"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) load(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}

// ── Studio sub-components ─────────────────────────────────────────────────────
// Split out of the monolithic section for reuse: a sky hero, the control
// console (mode / toggles / uploads / inputs / scenes), the YouTube-context
// stage and the "what to check" tips rail each have a narrow, self-contained
// prop contract. Co-located here until a second workbench shares the pattern,
// then lift the console / stage / tips blocks to ../components/.

function PreviewStudioHero({
  eyebrow,
  title,
  description,
  badges,
  meta,
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  badges?: Array<{ label: string; tone?: "free" | "pro" | "neutral" }>;
  meta?: Array<{ icon: string; text: string }>;
}) {
  return (
    <header className="pstudio-hero">
      <div className="pstudio-hero-mesh" />
      <div className="pstudio-hero-glow" />
      <div className="pstudio-hero-inner">
        {eyebrow ? (
          <span className="pstudio-eyebrow">
            <span className="pstudio-eyebrow-dot" />
            {eyebrow}
          </span>
        ) : null}
        {title ? <h1 className="pstudio-title">{title}</h1> : null}
        {description ? <p className="pstudio-desc">{description}</p> : null}
        {badges && badges.length > 0 ? (
          <div className="pstudio-hero-badges">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={cn(
                  "pstudio-badge",
                  badge.tone === "pro"
                    ? "pstudio-badge-pro"
                    : badge.tone === "neutral"
                      ? "pstudio-badge-neutral"
                      : "pstudio-badge-free",
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>
        ) : null}
        {meta && meta.length > 0 ? (
          <div className="pstudio-hero-meta">
            {meta.map((item) => (
              <span key={item.text} className="pstudio-meta-chip">
                <SmartIcon name={item.icon} size={14} />
                {item.text}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

function PreviewConsole({
  mode,
  onModeChange,
  singleLabel,
  abLabel,
  abHint,
  uploadTitle,
  uploadHint,
  uploadFormatHint,
  replaceLabel,
  uploadA,
  uploadB,
  onUploadA,
  onUploadB,
  titleLabel,
  titleValue,
  titlePlaceholder,
  onTitleChange,
  channelLabel,
  channelValue,
  channelPlaceholder,
  onChannelChange,
  dark,
  onToggleDark,
  darkLabel,
  lightLabel,
  foldLine,
  onToggleFoldLine,
  foldLineLabel,
  foldLineHideLabel,
  colorBlind,
  onToggleColorBlind,
  colorBlindLabel,
  colorBlindOffLabel,
  sceneLabel,
  scenes = [],
  scene,
  onSceneChange,
  aLabel,
  bLabel,
}: {
  mode: "single" | "ab";
  onModeChange?: (mode: "single" | "ab") => void;
  singleLabel?: ReactNode;
  abLabel?: ReactNode;
  abHint?: ReactNode;
  uploadTitle?: ReactNode;
  uploadHint?: ReactNode;
  uploadFormatHint?: ReactNode;
  replaceLabel?: ReactNode;
  uploadA?: string | null;
  uploadB?: string | null;
  onUploadA?: (dataUrl: string) => void;
  onUploadB?: (dataUrl: string) => void;
  titleLabel?: ReactNode;
  titleValue?: string;
  titlePlaceholder?: ReactNode;
  onTitleChange?: (value: string) => void;
  channelLabel?: ReactNode;
  channelValue?: string;
  channelPlaceholder?: ReactNode;
  onChannelChange?: (value: string) => void;
  dark?: boolean;
  onToggleDark?: () => void;
  darkLabel?: ReactNode;
  lightLabel?: ReactNode;
  foldLine?: boolean;
  onToggleFoldLine?: () => void;
  foldLineLabel?: ReactNode;
  foldLineHideLabel?: ReactNode;
  colorBlind?: boolean;
  onToggleColorBlind?: () => void;
  colorBlindLabel?: ReactNode;
  colorBlindOffLabel?: ReactNode;
  sceneLabel?: ReactNode;
  scenes?: PreviewSceneDef[];
  scene?: PreviewSceneId;
  onSceneChange?: (scene: PreviewSceneId) => void;
  aLabel?: ReactNode;
  bLabel?: ReactNode;
}) {
  return (
    <aside className="pstudio-console">
      <div className="pstudio-toolbar">
        <div className="pstudio-mode">
          <button
            type="button"
            className={cn(
              "pstudio-mode-btn",
              mode === "single" && "is-active",
            )}
            onClick={() => onModeChange?.("single")}
          >
            <SmartIcon name="Desktop" size={15} />
            <span>{singleLabel}</span>
          </button>
          <button
            type="button"
            className={cn("pstudio-mode-btn", mode === "ab" && "is-active")}
            onClick={() => onModeChange?.("ab")}
          >
            <SmartIcon name="CheckList" size={15} />
            <span>{abLabel}</span>
          </button>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="pstudio-dark-toggle"
          onClick={onToggleDark}
        >
          <SmartIcon name={dark ? "Sun" : "Moon"} size={14} />
          <span>{dark ? lightLabel : darkLabel}</span>
        </Button>
        {onToggleFoldLine ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="pstudio-dark-toggle"
            onClick={onToggleFoldLine}
          >
            <span className="pstudio-fold-glyph">⌁</span>
            <span>{foldLine ? foldLineHideLabel : foldLineLabel}</span>
          </Button>
        ) : null}
        {onToggleColorBlind ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="pstudio-dark-toggle"
            onClick={onToggleColorBlind}
          >
            <SmartIcon name="Eye" size={14} />
            <span>{colorBlind ? colorBlindOffLabel : colorBlindLabel}</span>
          </Button>
        ) : null}
      </div>

      {mode === "ab" && abHint ? (
        <p className="pstudio-ab-hint">
          <SmartIcon name="Sparkles" size={14} />
          <span>{abHint}</span>
        </p>
      ) : null}

      <div
        className={cn(
          "pstudio-slots",
          mode === "ab" && "pstudio-slots-duo",
        )}
      >
        <UploadSlot
          label={aLabel}
          src={uploadA}
          onUpload={onUploadA}
          uploadTitle={uploadTitle}
          uploadHint={uploadHint}
          uploadFormatHint={uploadFormatHint}
          replaceLabel={replaceLabel}
        />
        {mode === "ab" ? (
          <UploadSlot
            label={bLabel}
            src={uploadB}
            onUpload={onUploadB}
            uploadTitle={uploadTitle}
            uploadHint={uploadHint}
            uploadFormatHint={uploadFormatHint}
            replaceLabel={replaceLabel}
          />
        ) : (
          <div className="pstudio-slot-fill" />
        )}
      </div>

      <div className="pstudio-fields">
        <label className="pstudio-field">
          <span className="pstudio-field-label">{titleLabel}</span>
          <Input
            prefix={<SmartIcon name="Text" size={15} />}
            placeholder={
              typeof titlePlaceholder === "string"
                ? titlePlaceholder
                : "Your video title here…"
            }
            value={titleValue ?? ""}
            onChange={(event) => onTitleChange?.(event.target.value)}
          />
        </label>
        <label className="pstudio-field">
          <span className="pstudio-field-label">{channelLabel}</span>
          <Input
            prefix={<SmartIcon name="User" size={15} />}
            placeholder={
              typeof channelPlaceholder === "string"
                ? channelPlaceholder
                : "Your Channel"
            }
            value={channelValue ?? ""}
            onChange={(event) => onChannelChange?.(event.target.value)}
          />
        </label>
      </div>

      {scenes.length > 0 ? (
        <div className="pstudio-scenes">
          {sceneLabel ? (
            <span className="pstudio-scenes-label">{sceneLabel}</span>
          ) : null}
          <div className="pstudio-scene-tabs">
            {scenes.map((s) => (
              <button
                key={s.id}
                type="button"
                className={cn(
                  "pstudio-scene-tab",
                  s.id === scene && "is-active",
                )}
                onClick={() => onSceneChange?.(s.id)}
              >
                <SmartIcon name={s.icon} size={15} />
                <span className="pstudio-scene-tab-label">{s.label}</span>
                <span className="pstudio-scene-tab-size">{s.size}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function PreviewStage({
  dark,
  colorBlind,
  mode,
  singleLabel,
  abLabel,
  activeScene,
  scene,
  sceneProps,
  foldLine,
  foldLineLabel,
}: {
  dark?: boolean;
  colorBlind?: boolean;
  mode: "single" | "ab";
  singleLabel?: ReactNode;
  abLabel?: ReactNode;
  activeScene?: PreviewSceneDef;
  scene?: PreviewSceneId;
  sceneProps: {
    a?: string | null;
    b?: string | null;
    title?: string;
    channel?: string;
    aLabel?: ReactNode;
    bLabel?: ReactNode;
    yourVideoLabel?: ReactNode;
  };
  foldLine?: boolean;
  foldLineLabel?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "pstudio-stage",
        dark ? "pstudio-dark" : "pstudio-light",
        colorBlind && "pstudio-cvd",
      )}
    >
      <div className="pstudio-browser">
        <div className="pstudio-traffic">
          <span className="pstudio-dot pstudio-dot-red" />
          <span className="pstudio-dot pstudio-dot-yellow" />
          <span className="pstudio-dot pstudio-dot-green" />
        </div>
        <div className="pstudio-url">
          <SmartIcon name="Shield" size={11} />
          <span>youtube.com</span>
          <span className="pstudio-url-path">
            {activeScene?.label ?? scene}
          </span>
        </div>
        <span className="pstudio-stage-chip">
          {mode === "ab" ? abLabel : singleLabel}
          <b>{activeScene?.size}</b>
        </span>
      </div>
      <div className="pstudio-stage-body">
        {scene === "feed" ? <FeedScene {...sceneProps} /> : null}
        {scene === "search" ? <SearchScene {...sceneProps} /> : null}
        {scene === "mobile" ? <MobileScene {...sceneProps} /> : null}
        {scene === "sidebar" ? <SidebarScene {...sceneProps} /> : null}
        {foldLine ? (
          <div className="pstudio-foldline" aria-hidden>
            <span className="pstudio-foldline-tag">{foldLineLabel}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PreviewTips({
  tipsTitle,
  tips,
  scene,
  onSceneChange,
}: {
  tipsTitle?: ReactNode;
  tips?: PreviewWorkbenchTip[];
  scene?: PreviewSceneId;
  onSceneChange?: (scene: PreviewSceneId) => void;
}) {
  return (
    <section className="pstudio-tips-card">
      <div className="pstudio-tips-head">
        <span className="pstudio-tips-icon">
          <SmartIcon name="Sparkles" size={15} />
        </span>
        <h2 className="pstudio-tips-title">{tipsTitle}</h2>
      </div>
      <div className="pstudio-tips">
        {tips?.map((tip) =>
          tip.scene ? (
            <button
              key={tip.scene}
              type="button"
              className={cn(
                "pstudio-tip",
                tip.scene === scene && "is-active",
              )}
              onClick={() => onSceneChange?.(tip.scene as PreviewSceneId)}
            >
              <span className="pstudio-tip-icon">
                <SmartIcon name="EyeOpened" size={13} />
              </span>
              <span>{tip.label}</span>
            </button>
          ) : (
            <a key={tip.href} className="pstudio-tip" href={tip.href}>
              <SmartIcon name="ArrowRight" size={13} />
              <span>{tip.label}</span>
            </a>
          ),
        )}
      </div>
    </section>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function PreviewWorkbench({
  className,
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  badges,
  meta,
  mode = "single",
  onModeChange,
  singleLabel,
  abLabel,
  abHint,
  uploadTitle,
  uploadHint,
  uploadFormatHint,
  replaceLabel,
  uploadA,
  uploadB,
  onUploadA,
  onUploadB,
  titleLabel,
  titleValue,
  titlePlaceholder,
  onTitleChange,
  channelLabel,
  channelValue,
  channelPlaceholder,
  onChannelChange,
  dark = false,
  onToggleDark,
  darkLabel,
  lightLabel,
  foldLine = false,
  onToggleFoldLine,
  foldLineLabel,
  foldLineHideLabel,
  colorBlind = false,
  onToggleColorBlind,
  colorBlindLabel,
  colorBlindOffLabel,
  sceneLabel,
  scenes = [],
  scene = "feed",
  onSceneChange,
  aLabel,
  bLabel,
  yourVideoLabel,
  tipsTitle,
  tips,
  footerHint,
}: PreviewWorkbenchProps) {
  const activeScene = scenes.find((s) => s.id === scene) ?? scenes[0];

  const sceneProps = {
    a: uploadA,
    b: mode === "ab" ? uploadB : undefined,
    title: titleValue,
    channel: channelValue,
    aLabel,
    bLabel,
    yourVideoLabel,
  };

  return (
    <section className={cn("pstudio", className)} data-registry={dataRegistry}>
      <div className="pstudio-shell">
        <PreviewStudioHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          badges={badges}
          meta={meta}
        />

        <div className="pstudio-layout">
          <div className="pstudio-main">
            <PreviewStage
              dark={dark}
              colorBlind={colorBlind}
              mode={mode}
              singleLabel={singleLabel}
              abLabel={abLabel}
              activeScene={activeScene}
              scene={scene}
              sceneProps={sceneProps}
              foldLine={foldLine}
              foldLineLabel={foldLineLabel}
            />
            {tips && tips.length > 0 ? (
              <PreviewTips
                tipsTitle={tipsTitle}
                tips={tips}
                scene={scene}
                onSceneChange={onSceneChange}
              />
            ) : null}
          </div>

          <PreviewConsole
            mode={mode}
            onModeChange={onModeChange}
            singleLabel={singleLabel}
            abLabel={abLabel}
            abHint={abHint}
            uploadTitle={uploadTitle}
            uploadHint={uploadHint}
            uploadFormatHint={uploadFormatHint}
            replaceLabel={replaceLabel}
            uploadA={uploadA}
            uploadB={uploadB}
            onUploadA={onUploadA}
            onUploadB={onUploadB}
            titleLabel={titleLabel}
            titleValue={titleValue}
            titlePlaceholder={titlePlaceholder}
            onTitleChange={onTitleChange}
            channelLabel={channelLabel}
            channelValue={channelValue}
            channelPlaceholder={channelPlaceholder}
            onChannelChange={onChannelChange}
            dark={dark}
            onToggleDark={onToggleDark}
            darkLabel={darkLabel}
            lightLabel={lightLabel}
            foldLine={foldLine}
            onToggleFoldLine={onToggleFoldLine}
            foldLineLabel={foldLineLabel}
            foldLineHideLabel={foldLineHideLabel}
            colorBlind={colorBlind}
            onToggleColorBlind={onToggleColorBlind}
            colorBlindLabel={colorBlindLabel}
            colorBlindOffLabel={colorBlindOffLabel}
            sceneLabel={sceneLabel}
            scenes={scenes}
            scene={scene}
            onSceneChange={onSceneChange}
            aLabel={aLabel}
            bLabel={bLabel}
          />
        </div>

        {footerHint ? (
          <p className="pstudio-footer-hint">{footerHint}</p>
        ) : null}
      </div>
    </section>
  );
}

export default PreviewWorkbench;
