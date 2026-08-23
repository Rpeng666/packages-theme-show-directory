"use client";

import * as React from "react";
import { useRef } from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  PreviewSceneId,
  PreviewWorkbenchProps,
} from "../../../contracts/sections/preview-workbench";

/**
 * Default PreviewWorkbench - shadcn-styled fallback of the thumbnail
 * inspect studio (see the Semi implementation for the full design notes).
 * Same contract: console (single / A-B mode, upload slots, title + channel,
 * dark toggle, scene tabs), a YouTube-context stage and tips rail.
 */

/** Small section heading with a step number. */
function StepHeading({
  n,
  title,
}: {
  n: string;
  title?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono text-[11px] font-semibold text-muted-foreground">
        {n}
      </span>
      <h2 className="text-[13px] font-semibold tracking-tight">{title}</h2>
      <span className="flex-1" />
    </div>
  );
}

const FAKE = [
  {
    title: "I Spent 30 Days Learning This Skill",
    channel: "TechWithMike",
    views: "2.1M views",
    age: "3 days ago",
    g: "from-blue-600 to-indigo-800",
    a: "bg-blue-500",
  },
  {
    title: "The Truth About Passive Income in 2026",
    channel: "FinanceFlow",
    views: "890K views",
    age: "1 week ago",
    g: "from-emerald-600 to-teal-800",
    a: "bg-teal-500",
  },
  {
    title: "Why Everyone Is Switching to This Tool",
    channel: "ProductivityPro",
    views: "1.4M views",
    age: "5 days ago",
    g: "from-orange-500 to-red-700",
    a: "bg-orange-500",
  },
  {
    title: "I Tested 10 AI Tools So You Don't Have To",
    channel: "AIReviewer",
    views: "3.2M views",
    age: "2 weeks ago",
    g: "from-purple-600 to-pink-700",
    a: "bg-purple-500",
  },
  {
    title: "This Changed How I Work Forever",
    channel: "WorkSmarter",
    views: "567K views",
    age: "4 days ago",
    g: "from-slate-600 to-gray-800",
    a: "bg-slate-500",
  },
  {
    title: "The Beginner's Guide to Getting Started",
    channel: "LearnFast",
    views: "1.8M views",
    age: "1 month ago",
    g: "from-cyan-600 to-blue-700",
    a: "bg-cyan-500",
  },
] as const;

const FAKE_DESC =
  "In this video we break down the entire workflow step by step, covering the tools, the mistakes and the exact playbook you can copy today.";

function FakeThumb({ g, w, h }: { g: string; w?: number; h?: number }) {
  return (
    <div
      className={cn(
        "relative flex aspect-video flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br",
        g,
      )}
      style={w && h ? { width: w, height: h } : undefined}
    >
      <span className="h-0 w-0 border-b-[7px] border-l-[12px] border-t-[7px] border-b-transparent border-t-transparent border-l-white/90 drop-shadow" />
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
      className={cn(
        "flex flex-shrink-0 items-center justify-center rounded-full font-bold text-white",
        a,
      )}
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
  const wrap = cn(
    "relative flex aspect-video flex-shrink-0 items-center justify-center overflow-hidden rounded-lg",
    src
      ? "ring-2 ring-primary ring-offset-1"
      : "border-2 border-dashed bg-muted text-muted-foreground",
    className,
  );
  if (!src) {
    return (
      <div
        className={wrap}
        style={w && h ? { width: w, height: h } : undefined}
      >
        <SmartIcon name="ImageIcon" size={15} />
        {badge ? (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
            {badge}
          </span>
        ) : null}
      </div>
    );
  }
  return (
    <div className={wrap} style={w && h ? { width: w, height: h } : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Your thumbnail"
        className="h-full w-full object-cover"
      />
      {badge ? (
        <span className="absolute left-1.5 top-1.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

function UserMeta({ channel }: { channel?: string }) {
  return (
    <p className="mt-1 text-[11.5px] text-muted-foreground">
      {channel || "Your Channel"} · 1.2M views · 2 days ago
    </p>
  );
}

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
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
      {cards.map((card, i) =>
        card.kind === "fake" ? (
          <div key={i} className="min-w-0">
            <FakeThumb g={FAKE[card.idx].g} />
            <div className="mt-2 flex gap-2.5">
              <Avatar a={FAKE[card.idx].a} seed={FAKE[card.idx].channel} />
              <div className="min-w-0">
                <p className="line-clamp-2 text-[13px] font-medium leading-snug">
                  {FAKE[card.idx].title}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {FAKE[card.idx].channel} · {FAKE[card.idx].views} ·{" "}
                  {FAKE[card.idx].age}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div key={i} className="min-w-0">
            <UserThumb src={card.src} badge={card.badge} />
            <div className="mt-2 flex gap-2.5">
              <Avatar a="bg-sky-500" seed={channel || "Y"} />
              <div className="min-w-0">
                <p className="line-clamp-2 text-[13px] font-bold leading-snug">
                  {title || yourVideoLabel || "Your Video"}
                </p>
                <UserMeta channel={channel} />
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
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      {rows.map((row, i) =>
        row.kind === "fake" ? (
          <div key={i} className="flex gap-4">
            <FakeThumb g={FAKE[row.idx].g} w={246} h={138} />
            <div className="min-w-0">
              <p className="text-[15px] font-medium leading-snug">
                {FAKE[row.idx].title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {FAKE[row.idx].channel} · {FAKE[row.idx].views} ·{" "}
                {FAKE[row.idx].age}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {FAKE_DESC}
              </p>
            </div>
          </div>
        ) : (
          <div key={i} className="flex gap-4">
            <UserThumb src={row.src} badge={row.badge} w={246} h={138} />
            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-snug">
                {title || yourVideoLabel || "Your Video"}
              </p>
              <UserMeta channel={channel} />
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {FAKE_DESC}
              </p>
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
    <div className="mx-auto grid max-w-lg grid-cols-2 gap-x-4 gap-y-5">
      {cards.map((card, i) =>
        card.kind === "fake" ? (
          <div key={i} className="min-w-0">
            <FakeThumb g={FAKE[card.idx].g} />
            <div className="mt-2 flex gap-2">
              <Avatar
                a={FAKE[card.idx].a}
                seed={FAKE[card.idx].channel}
                size={26}
              />
              <div className="min-w-0">
                <p className="line-clamp-2 text-[12.5px] font-medium leading-snug">
                  {FAKE[card.idx].title}
                </p>
                <p className="mt-0.5 text-[10.5px] text-muted-foreground">
                  {FAKE[card.idx].channel} · {FAKE[card.idx].views}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div key={i} className="min-w-0">
            <UserThumb src={card.src} badge={card.badge} />
            <div className="mt-2 flex gap-2">
              <Avatar a="bg-sky-500" seed={channel || "Y"} size={26} />
              <div className="min-w-0">
                <p className="line-clamp-2 text-[12.5px] font-bold leading-snug">
                  {title || yourVideoLabel || "Your Video"}
                </p>
                <p className="mt-0.5 text-[10.5px] text-muted-foreground">
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
    <div className="mx-auto flex max-w-md flex-col gap-3.5">
      {rows.map((row, i) =>
        row.kind === "fake" ? (
          <div key={i} className="flex gap-3">
            <FakeThumb g={FAKE[row.idx].g} w={168} h={94} />
            <div className="min-w-0">
              <p className="line-clamp-2 text-[13px] font-medium leading-snug">
                {FAKE[row.idx].title}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {FAKE[row.idx].channel} · {FAKE[row.idx].views} ·{" "}
                {FAKE[row.idx].age}
              </p>
            </div>
          </div>
        ) : (
          <div key={i} className="flex gap-3">
            <UserThumb src={row.src} badge={row.badge} w={168} h={94} />
            <div className="min-w-0">
              <p className="line-clamp-2 text-[13px] font-bold leading-snug">
                {title || yourVideoLabel || "Your Video"}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {channel || "Your Channel"} · 1.2M views · 2 days ago
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

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
    <div className="overflow-hidden rounded-2xl border bg-card">
      {src ? (
        <>
          <div className="relative aspect-video w-full bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="Thumbnail"
              className="h-full w-full object-cover"
            />
            {label ? (
              <span className="absolute left-2.5 top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-[11px] font-semibold text-primary-foreground">
                {label}
              </span>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-2.5 p-2.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <SmartIcon name="RefreshCw" size={13} />
              {replaceLabel}
            </button>
            {uploadFormatHint ? (
              <span className="text-[11px] text-muted-foreground">
                {uploadFormatHint}
              </span>
            ) : null}
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) load(file);
          }}
          className="flex w-full min-h-[190px] flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-muted/30 p-6 text-center transition-colors hover:border-primary/60"
        >
          <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-xl border bg-card text-muted-foreground">
            <SmartIcon name="Upload" size={18} />
          </span>
          <span className="text-sm font-semibold">
            {uploadTitle} <b className="text-foreground">{label}</b>
          </span>
          <span className="text-xs text-muted-foreground">{uploadHint}</span>
          <span className="text-[11px] text-muted-foreground/70">
            {uploadFormatHint}
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) load(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

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
    <section
      className={cn("mx-auto w-full max-w-6xl px-4 py-12", className)}
      data-registry={dataRegistry}
    >
      {/* Header — quiet hairline rule */}
      <header className="border-b pb-8 mb-10">
        <div className="relative z-10 max-w-xl">
          {eyebrow ? (
            <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              {eyebrow}
            </div>
          ) : null}
          {title ? (
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
          ) : null}
          {description ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {(badges && badges.length > 0) || (meta && meta.length > 0) ? (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
              {badges?.map((badge) => (
                <span
                  key={badge.label}
                  className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {badge.label}
                </span>
              ))}
              {meta?.map((item) => (
                <span
                  key={item.text}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
                >
                  <SmartIcon name={item.icon} size={12} />
                  {item.text}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {/* Console — control rail */}
      <div className="rounded-xl border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex gap-1 rounded-lg border bg-muted/60 p-1">
            {[
              { key: "single" as const, label: singleLabel, icon: "Monitor" },
              { key: "ab" as const, label: abLabel, icon: "ListChecks" },
            ].map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => onModeChange?.(m.key)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[13px] font-medium transition-colors",
                  mode === m.key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <SmartIcon name={m.icon} size={15} />
                {m.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onToggleDark}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <SmartIcon name={dark ? "SunDim" : "Moon"} size={14} />
            {dark ? lightLabel : darkLabel}
          </button>
        </div>

        {mode === "ab" && abHint ? (
          <p className="mt-3 flex items-center gap-2 text-xs font-medium text-primary">
            <SmartIcon name="Sparkles" size={14} />
            {abHint}
          </p>
        ) : null}

        <div className="mt-6 border-t pt-5">
          <StepHeading n="01" title={uploadTitle} />
          <div
            className={cn(
              "mt-4 grid grid-cols-1 gap-4",
              mode === "ab" && "md:grid-cols-2",
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
            ) : null}
          </div>
        </div>

        <div className="mt-6 border-t pt-5">
          <StepHeading n="02" title={titleLabel} />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                {titleLabel}
              </span>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <SmartIcon name="Type" size={15} />
                </span>
                <input
                  type="text"
                  placeholder={
                    typeof titlePlaceholder === "string"
                      ? titlePlaceholder
                      : "Your video title here…"
                  }
                  value={titleValue ?? ""}
                  onChange={(e) => onTitleChange?.(e.target.value)}
                  className="h-9 w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                {channelLabel}
              </span>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <SmartIcon name="User" size={15} />
                </span>
                <input
                  type="text"
                  placeholder={
                    typeof channelPlaceholder === "string"
                      ? channelPlaceholder
                      : "Your Channel"
                  }
                  value={channelValue ?? ""}
                  onChange={(e) => onChannelChange?.(e.target.value)}
                  className="h-9 w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </label>
          </div>
        </div>

        {scenes.length > 0 ? (
          <div className="mt-6 border-t pt-5">
            <StepHeading n="03" title={sceneLabel} />
            <div className="mt-4 flex flex-1 flex-wrap gap-2">
              {scenes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSceneChange?.(s.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                    s.id === scene
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  <SmartIcon name={s.icon} size={14} />
                  {s.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                      s.id === scene
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {s.size}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Stage */}
      <div
        className={cn(
          "mt-6 overflow-hidden rounded-xl border transition-colors",
          dark ? "border-neutral-800 bg-[#0f0f0f]" : "border-border bg-white",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 border-b px-4 py-2.5",
            dark
              ? "border-neutral-800 bg-neutral-900"
              : "border-border bg-muted/40",
          )}
        >
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div
            className={cn(
              "ml-2 flex max-w-xs flex-1 items-center gap-1.5 rounded-full px-3 py-1 text-[11px]",
              dark
                ? "bg-neutral-800 text-neutral-400"
                : "bg-muted text-muted-foreground",
            )}
          >
            <SmartIcon name="Shield" size={11} />
            youtube.com
            <span
              className={
                dark ? "font-semibold text-neutral-200" : "font-semibold"
              }
            >
              {activeScene?.label ?? scene}
            </span>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary sm:inline-flex">
            {mode === "ab" ? abLabel : singleLabel}
            <b>{activeScene?.size}</b>
          </span>
        </div>
        <div
          className={cn("p-5", dark ? "text-neutral-100" : "text-neutral-900")}
        >
          {scene === "feed" ? <FeedScene {...sceneProps} /> : null}
          {scene === "search" ? <SearchScene {...sceneProps} /> : null}
          {scene === "mobile" ? <MobileScene {...sceneProps} /> : null}
          {scene === "sidebar" ? <SidebarScene {...sceneProps} /> : null}
        </div>
      </div>

      {/* Tips */}
      {tips && tips.length > 0 ? (
        <div className="mt-8 border-t pt-6">
          <StepHeading n="04" title={tipsTitle} />
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip) =>
              tip.scene ? (
                <button
                  key={tip.scene}
                  type="button"
                  onClick={() => onSceneChange?.(tip.scene as PreviewSceneId)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-colors",
                    tip.scene === scene
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  <SmartIcon name="Eye" size={13} />
                  {tip.label}
                </button>
              ) : (
                <a
                  key={tip.href}
                  href={tip.href}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SmartIcon name="ArrowRight" size={13} />
                  {tip.label}
                </a>
              ),
            )}
          </div>
        </div>
      ) : null}

      {footerHint ? (
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {footerHint}
        </p>
      ) : null}
    </section>
  );
}

export default PreviewWorkbench;
