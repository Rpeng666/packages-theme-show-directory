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
