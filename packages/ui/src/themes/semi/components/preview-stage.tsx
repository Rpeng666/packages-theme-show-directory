"use client";

import type { ReactNode } from "react";
import type { PreviewSceneDef, PreviewSceneId } from "@template/ui";

import { SmartIcon } from "../icons";

/**
 * Semi PreviewStage — the preview studio's YouTube-context stage: a mock
 * browser chrome bar plus the active scene (desktop feed / search results /
 * mobile feed / watch sidebar) built from deterministic fake data and the
 * user's uploaded thumbnails. Presentational — all data and callbacks come
 * from the consumer. Lifted out of the preview-workbench section for reuse.
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
    g: "bg-[linear-gradient(135deg,rgb(var(--semi-blue-5)),rgb(var(--semi-indigo-8)))]",
    a: "#3b82f6",
  },
  {
    title: "The Truth About Passive Income in 2026",
    channel: "FinanceFlow",
    views: "890K views",
    age: "1 week ago",
    g: "bg-[linear-gradient(135deg,rgb(var(--semi-teal-5)),rgb(var(--semi-green-8)))]",
    a: "#14b8a6",
  },
  {
    title: "Why Everyone Is Switching to This Tool",
    channel: "ProductivityPro",
    views: "1.4M views",
    age: "5 days ago",
    g: "bg-[linear-gradient(135deg,rgb(var(--semi-orange-5)),rgb(var(--semi-red-7)))]",
    a: "#f97316",
  },
  {
    title: "I Tested 10 AI Tools So You Don't Have To",
    channel: "AIReviewer",
    views: "3.2M views",
    age: "2 weeks ago",
    g: "bg-[linear-gradient(135deg,rgb(var(--semi-purple-5)),rgb(var(--semi-violet-8)))]",
    a: "#a855f7",
  },
  {
    title: "This Changed How I Work Forever",
    channel: "WorkSmarter",
    views: "567K views",
    age: "4 days ago",
    g: "bg-[linear-gradient(135deg,rgb(var(--semi-grey-6)),rgb(var(--semi-grey-9)))]",
    a: "#64748b",
  },
  {
    title: "The Beginner's Guide to Getting Started",
    channel: "LearnFast",
    views: "1.8M views",
    age: "1 month ago",
    g: "bg-[linear-gradient(135deg,rgb(var(--semi-cyan-5)),rgb(var(--semi-blue-8)))]",
    a: "#06b6d4",
  },
] as const;

const FAKE_DESC =
  "In this video we break down the entire workflow step by step, covering the tools, the mistakes and the exact playbook you can copy today.";

// ── Small mock atoms ──────────────────────────────────────────────────────────

function FakeThumb({ g, w, h }: { g: string; w?: number; h?: number }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg",
        g,
      )}
      style={w && h ? { width: w, height: h } : { width: 128, height: 72 }}
    >
      <span className="h-0 w-0 border-l-[12px] border-t-[7px] border-b-[7px] border-l-white/90 border-t-transparent border-b-transparent drop-shadow" />
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
      className="inline-flex items-center justify-center shrink-0 rounded-full text-white font-extrabold"
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.42),
        background: a,
      }}
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
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-[10px] border-2 border-dashed border-[var(--pstage-border)] bg-[var(--pstage-soft)] text-[var(--pstage-meta)]",
          className,
        )}
        style={{
          aspectRatio: "16 / 9",
          ...(w && h ? { width: w, height: h } : null),
        }}
      >
        <SmartIcon name="Image" size={15} />
        {badge ? (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-[rgb(var(--semi-cyan-6))] px-2 py-0.5 text-[10px] font-extrabold tracking-[0.04em] text-white shadow">
            {badge}
          </span>
        ) : null}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[10px] outline-2 outline-offset-1 outline-[rgb(var(--semi-cyan-5))]",
        className,
      )}
      style={{
        aspectRatio: "16 / 9",
        ...(w && h ? { width: w, height: h } : null),
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Your thumbnail" className="h-full w-full object-cover" />
      {badge ? (
        <span className="absolute left-1.5 top-1.5 rounded-full bg-[rgb(var(--semi-cyan-6))] px-2 py-0.5 text-[10px] font-extrabold tracking-[0.04em] text-white shadow">
          {badge}
        </span>
      ) : null}
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
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card, i) =>
        card.kind === "fake" ? (
          <div key={i} className="min-w-0">
            <FakeThumb g={FAKE[card.idx].g} />
            <div className="mt-2 flex gap-2.5">
              <Avatar
                a={FAKE[card.idx].a}
                seed={FAKE[card.idx].channel}
                size={30}
              />
              <div className="min-w-0">
                <p className="m-0 line-clamp-2 overflow-hidden text-[13px] font-medium leading-[1.35] text-[var(--pstage-text)]">
                  {FAKE[card.idx].title}
                </p>
                <p className="mt-[3px] text-[11.5px] text-[var(--pstage-meta)]">
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
              <Avatar a="#06b6d4" seed={channel || "Y"} size={30} />
              <div className="min-w-0">
                <p className="m-0 line-clamp-2 overflow-hidden text-[13px] font-bold leading-[1.35] text-[var(--pstage-text)]">
                  {title || yourVideoLabel || "Your Video"}
                </p>
                <p className="mt-[3px] text-[11.5px] text-[var(--pstage-meta)]">
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
    <div className="mx-auto flex max-w-[780px] flex-col gap-[18px]">
      {rows.map((row, i) =>
        row.kind === "fake" ? (
          <div key={i} className="flex gap-[18px]">
            <FakeThumb g={FAKE[row.idx].g} w={246} h={138} />
            <div className="min-w-0">
              <p className="m-0 text-[15px] font-medium leading-[1.35] text-[var(--pstage-text)]">
                {FAKE[row.idx].title}
              </p>
              <p className="mt-[5px] text-xs text-[var(--pstage-meta)]">
                {FAKE[row.idx].channel} · {FAKE[row.idx].views} ·{" "}
                {FAKE[row.idx].age}
              </p>
              <p className="mt-[7px] text-xs leading-[1.5] text-[var(--pstage-meta)]">
                {FAKE_DESC}
              </p>
            </div>
          </div>
        ) : (
          <div key={i} className="flex gap-[18px]">
            <UserThumb src={row.src} badge={row.badge} w={246} h={138} />
            <div className="min-w-0">
              <p className="m-0 text-[15px] font-bold leading-[1.35] text-[var(--pstage-text)]">
                {title || yourVideoLabel || "Your Video"}
              </p>
              <p className="mt-[5px] text-xs text-[var(--pstage-meta)]">
                {channel || "Your Channel"} · 1.2M views · 2 days ago
              </p>
              <p className="mt-[7px] text-xs leading-[1.5] text-[var(--pstage-meta)]">
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
    <div className="grid grid-cols-1 gap-4">
      {cards.map((card, i) =>
        card.kind === "fake" ? (
          <div key={i} className="min-w-0">
            <FakeThumb g={FAKE[card.idx].g} />
            <div className="mt-2 flex gap-2.5">
              <Avatar
                a={FAKE[card.idx].a}
                seed={FAKE[card.idx].channel}
                size={26}
              />
              <div className="min-w-0">
                <p className="m-0 line-clamp-2 overflow-hidden text-[13px] font-medium leading-[1.35] text-[var(--pstage-text)]">
                  {FAKE[card.idx].title}
                </p>
                <p className="mt-[3px] text-[11.5px] text-[var(--pstage-meta)]">
                  {FAKE[card.idx].channel} · {FAKE[card.idx].views}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div key={i} className="min-w-0">
            <UserThumb src={card.src} badge={card.badge} />
            <div className="mt-2 flex gap-2.5">
              <Avatar a="#06b6d4" seed={channel || "Y"} size={26} />
              <div className="min-w-0">
                <p className="m-0 line-clamp-2 overflow-hidden text-[13px] font-bold leading-[1.35] text-[var(--pstage-text)]">
                  {title || yourVideoLabel || "Your Video"}
                </p>
                <p className="mt-[3px] text-[11.5px] text-[var(--pstage-meta)]">
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
    <div className="flex max-w-[480px] flex-col gap-3.5">
      {rows.map((row, i) =>
        row.kind === "fake" ? (
          <div key={i} className="flex items-start gap-3">
            <FakeThumb g={FAKE[row.idx].g} w={168} h={94} />
            <div className="min-w-0">
              <p className="m-0 line-clamp-2 overflow-hidden text-[13px] font-medium leading-[1.35] text-[var(--pstage-text)]">
                {FAKE[row.idx].title}
              </p>
              <p className="mt-[3px] text-[11.5px] text-[var(--pstage-meta)]">
                {FAKE[row.idx].channel} · {FAKE[row.idx].views} ·{" "}
                {FAKE[row.idx].age}
              </p>
            </div>
          </div>
        ) : (
          <div key={i} className="flex items-start gap-3">
            <UserThumb src={row.src} badge={row.badge} w={168} h={94} />
            <div className="min-w-0">
              <p className="m-0 line-clamp-2 overflow-hidden text-[13px] font-bold leading-[1.35] text-[var(--pstage-text)]">
                {title || yourVideoLabel || "Your Video"}
              </p>
              <p className="mt-[3px] text-[11.5px] text-[var(--pstage-meta)]">
                {channel || "Your Channel"} · 1.2M views · 2 days ago
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

// ── Stage ─────────────────────────────────────────────────────────────────────

export function PreviewStage({
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
  const stageVars = dark
    ? {
        "--pstage-bg": "#0f0f0f",
        "--pstage-card": "#1c1c1c",
        "--pstage-border": "#2e2e2e",
        "--pstage-text": "#f1f1f1",
        "--pstage-meta": "#aaaaaa",
        "--pstage-soft": "#272727",
      } as React.CSSProperties
    : {
        "--pstage-bg": "#ffffff",
        "--pstage-card": "#f7f7f7",
        "--pstage-border": "#e8e8e8",
        "--pstage-text": "#0f0f0f",
        "--pstage-meta": "#606060",
        "--pstage-soft": "#f1f1f1",
      } as React.CSSProperties;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[20px] border border-[var(--semi-color-border)]",
        "bg-[var(--pstage-bg)] shadow-[0_18px_50px_rgba(0,0,0,0.08)]",
        colorBlind && "grayscale-[0.55] contrast-[1.08] sepia-[0.25] hue-rotate-[-12deg]",
      )}
      style={stageVars}
    >
      <div className="flex items-center gap-3 border-b border-[var(--pstage-border)] bg-[var(--pstage-card)] px-3.5 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex max-w-[440px] flex-1 items-center gap-1.5 rounded-full bg-[var(--pstage-soft)] px-3 py-[5px] text-[11.5px] text-[var(--pstage-meta)]">
          <SmartIcon name="Shield" size={11} />
          <span>youtube.com</span>
          <span className="font-semibold text-[var(--pstage-text)]">
            {activeScene?.label ?? scene}
          </span>
        </div>
      </div>
      <div className="relative p-5">
        {scene === "feed" ? <FeedScene {...sceneProps} /> : null}
        {scene === "search" ? <SearchScene {...sceneProps} /> : null}
        {scene === "mobile" ? <MobileScene {...sceneProps} /> : null}
        {scene === "sidebar" ? <SidebarScene {...sceneProps} /> : null}
        {foldLine ? (
          <div
            className="absolute left-0 right-0 top-[62%] z-[6] h-0 border-t-2 border-dashed border-[rgba(245,73,43,0.85)]"
            aria-hidden
          >
            <span className="absolute left-2 -translate-y-full rounded-md bg-[rgb(var(--semi-red-5))] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em] text-white">
              {foldLineLabel}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
