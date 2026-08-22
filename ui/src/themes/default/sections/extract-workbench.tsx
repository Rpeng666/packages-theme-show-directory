"use client";

import * as React from "react";
import { useState } from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { SmartIcon } from "../../../components/smart-icon";
import type { ExtractWorkbenchProps } from "../../../contracts/sections/extract-workbench";

/**
 * Default ExtractWorkbench - shadcn-styled fallback of the video frame
 * extraction studio (see the Semi implementation for the full design notes).
 * Same contract: indigo freeze-frame hero, guided empty state, two-panel
 * workbench with player stage + capture rail.
 */

function formatTime(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function ExtractWorkbench({
  className,
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  badges,
  meta,
  emptyPrimary,
  emptyClickLabel,
  emptyHint,
  privacyTip,
  videoUrl,
  videoName,
  videoRef,
  onDropFile,
  onReplace,
  playing,
  currentTime = 0,
  duration = 0,
  onTogglePlay,
  onSeek,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded,
  stageCardTitle,
  captureLabel,
  captureHint,
  onCapture,
  capturing,
  frameCardTitle,
  frameResolutionLabel,
  framePlaceholder,
  frameUrl,
  exportCardTitle,
  downloadLabel,
  downloadHint,
  onDownload,
  tipsTitle,
  tips,
  footerHint,
}: ExtractWorkbenchProps) {
  const [dragging, setDragging] = useState(false);
  const hasSource = Boolean(videoUrl);

  return (
    <section
      className={cn("mx-auto w-full max-w-6xl px-4 py-12", className)}
      data-registry={dataRegistry}
    >
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-indigo-50 to-background p-8 sm:p-10 dark:from-indigo-950/40">
        <div className="relative z-10 max-w-xl">
          {eyebrow ? (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
              {eyebrow}
            </span>
          ) : null}
          {title ? (
            <h1 className="mb-2.5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {title}
            </h1>
          ) : null}
          {description ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {badges && badges.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-bold",
                    badge.tone === "pro"
                      ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                      : badge.tone === "neutral"
                        ? "border-border bg-muted text-muted-foreground"
                        : "border-indigo-300 bg-indigo-50 text-indigo-700",
                  )}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          ) : null}
          {meta && meta.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {meta.map((item) => (
                <span
                  key={item.text}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  <SmartIcon
                    name={item.icon}
                    size={14}
                    className="text-indigo-600"
                  />
                  {item.text}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {!hasSource ? (
        /* Empty state */
        <div className="mt-6">
          <button
            type="button"
            onClick={onReplace}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file && onDropFile) onDropFile(file);
            }}
            className={cn(
              "flex min-h-80 w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-indigo-400/60 bg-gradient-to-b from-indigo-50 to-background p-10 text-center transition-transform hover:border-indigo-500",
              dragging && "scale-[1.005] border-indigo-500 bg-indigo-50",
            )}
          >
            <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/30">
              <SmartIcon name="Video" size={26} />
            </span>
            {emptyPrimary ? (
              <span className="text-lg font-bold">{emptyPrimary}</span>
            ) : null}
            {emptyClickLabel ? (
              <span className="text-sm font-semibold text-indigo-600">
                {emptyClickLabel}
              </span>
            ) : null}
            {emptyHint ? (
              <span className="mt-1.5 text-xs text-muted-foreground">
                {emptyHint}
              </span>
            ) : null}
          </button>
          {privacyTip ? (
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <SmartIcon name="Shield" size={14} className="text-indigo-600" />
              {privacyTip}
            </p>
          ) : null}
        </div>
      ) : (
        /* Workspace */
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[6fr_4fr]">
          {/* Player stage */}
          <section className="rounded-2xl border bg-card p-5">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <SmartIcon name="Play" size={15} />
              </span>
              <h2 className="text-sm font-bold">{stageCardTitle}</h2>
              <span className="flex-1" />
              {videoName ? (
                <span
                  className="max-w-[40%] truncate rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground"
                  title={videoName}
                >
                  {videoName}
                </span>
              ) : null}
            </div>

            <div className="relative overflow-hidden rounded-xl border bg-black">
              <video
                ref={videoRef}
                src={videoUrl ?? undefined}
                className="aspect-video w-full"
                playsInline
                onTimeUpdate={(e) =>
                  onTimeUpdate?.(e.currentTarget.currentTime)
                }
                onLoadedMetadata={(e) =>
                  onLoadedMetadata?.(e.currentTarget.duration)
                }
                onEnded={onEnded}
              />
              {!playing ? (
                <button
                  type="button"
                  onClick={onTogglePlay}
                  aria-label="Play"
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-indigo-600 shadow-lg">
                    <SmartIcon name="Play" size={22} />
                  </span>
                </button>
              ) : null}
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={onTogglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted text-foreground transition-colors hover:border-indigo-400 hover:text-indigo-600"
              >
                <SmartIcon name={playing ? "Pause" : "Play"} size={14} />
              </button>
              <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={Math.min(currentTime, duration || 100)}
                onChange={(e) => onSeek?.(Number(e.target.value))}
                className="w-full accent-indigo-500"
                aria-label="Seek"
              />
              <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>

            <button
              type="button"
              onClick={onCapture}
              disabled={capturing}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
            >
              <SmartIcon name="Camera" size={17} />
              {captureLabel}
            </button>
            {captureHint ? (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {captureHint}
              </p>
            ) : null}
          </section>

          {/* Rail */}
          <div className="flex flex-col gap-5">
            {/* Captured frame */}
            <section className="rounded-2xl border bg-card p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                  <SmartIcon name="ImageIcon" size={15} />
                </span>
                <h2 className="text-sm font-bold">{frameCardTitle}</h2>
                <span className="flex-1" />
                {frameResolutionLabel ? (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                    {frameResolutionLabel}
                  </span>
                ) : null}
              </div>
              {frameUrl ? (
                <div className="overflow-hidden rounded-xl border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={frameUrl}
                    alt={
                      typeof frameCardTitle === "string"
                        ? frameCardTitle
                        : "Captured frame"
                    }
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl bg-muted text-xs text-muted-foreground">
                  <SmartIcon name="ImageIcon" size={22} />
                  <span>{framePlaceholder}</span>
                </div>
              )}
            </section>

            {/* Export dock */}
            <section className="rounded-2xl border bg-card p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                  <SmartIcon name="Download" size={15} />
                </span>
                <h2 className="text-sm font-bold">{exportCardTitle}</h2>
              </div>
              <button
                type="button"
                onClick={onDownload}
                disabled={!frameUrl}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
              >
                <SmartIcon name="Download" size={17} />
                {downloadLabel}
              </button>
              {downloadHint ? (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {downloadHint}
                </p>
              ) : null}
            </section>

            {/* Improve tips */}
            {tips && tips.length > 0 ? (
              <section className="rounded-2xl border bg-card p-5">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                    <SmartIcon name="Sparkles" size={15} />
                  </span>
                  <h2 className="text-sm font-bold">{tipsTitle}</h2>
                </div>
                <ul className="space-y-2">
                  {tips.map((tip) => (
                    <li key={tip.href}>
                      <a
                        href={tip.href}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        <SmartIcon name="ArrowRight" size={13} />
                        {tip.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {footerHint ? (
              <p className="text-center text-xs text-muted-foreground">
                {footerHint}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}

export default ExtractWorkbench;
