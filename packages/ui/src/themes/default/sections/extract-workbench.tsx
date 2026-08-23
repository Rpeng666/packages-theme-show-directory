"use client";

import * as React from "react";
import { useState } from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { SmartIcon } from "../../../components/smart-icon";
import type { ExtractWorkbenchProps } from "../../../contracts/sections/extract-workbench";

/**
 * Default ExtractWorkbench — restrained editor-style layout.
 *
 * Same design language as the CompressWorkbench: quiet header with a
 * hairline rule, a numbered left rail (Capture → Frame → Export) separated
 * by hairlines, a large player stage, and only the semantic `primary` token
 * for color. No accent gradient hero.
 */

function formatTime(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** Small section heading with a step number. */
function StepHeading({
  n,
  title,
  right,
}: {
  n: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono text-[11px] font-semibold text-muted-foreground">
        {n}
      </span>
      <h2 className="text-[13px] font-semibold tracking-tight">{title}</h2>
      <span className="flex-1" />
      {right}
    </div>
  );
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
      className={cn("mx-auto w-full max-w-5xl px-4 py-10 sm:py-14", className)}
      data-registry={dataRegistry}
    >
      {/* Header — quiet, hairline rule */}
      <header className="border-b pb-8">
        {eyebrow ? (
          <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {eyebrow}
          </div>
        ) : null}
        {title ? (
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
        ) : null}
        {description ? (
          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
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
      </header>

      {!hasSource ? (
        /* Empty state — minimal drop zone */
        <div className="py-10">
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
              "group flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-8 text-center transition-colors",
              dragging ? "border-primary bg-muted/60" : "hover:border-primary/60",
            )}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border bg-card text-muted-foreground shadow-sm transition-colors group-hover:text-foreground">
              <SmartIcon name="Video" size={22} />
            </span>
            {emptyPrimary ? (
              <span className="text-[15px] font-medium text-foreground">
                {emptyPrimary}
              </span>
            ) : null}
            {emptyClickLabel ? (
              <span className="text-[13px] text-muted-foreground">
                {emptyClickLabel}
              </span>
            ) : null}
            {emptyHint ? (
              <span className="text-xs text-muted-foreground/70">
                {emptyHint}
              </span>
            ) : null}
          </button>
          {privacyTip ? (
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <SmartIcon name="Shield" size={13} />
              {privacyTip}
            </p>
          ) : null}
        </div>
      ) : (
        /* Workspace — player stage + numbered rail */
        <div className="grid grid-cols-1 items-start gap-10 py-10 lg:grid-cols-[7fr_5fr]">
          {/* Player stage */}
          <div>
            <StepHeading
              n="01"
              title={stageCardTitle}
              right={
                videoName ? (
                  <span
                    className="max-w-[40%] truncate rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    title={videoName}
                  >
                    {videoName}
                  </span>
                ) : null
              }
            />

            <div className="mt-4 overflow-hidden rounded-xl border bg-black">
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
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg">
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
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted text-foreground transition-colors hover:border-primary/60 hover:text-foreground"
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
                className="w-full accent-primary"
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
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <SmartIcon name="Camera" size={16} />
              {captureLabel}
            </button>
            {captureHint ? (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {captureHint}
              </p>
            ) : null}
          </div>

          {/* Rail — Frame → Export → Tips */}
          <div className="flex flex-col">
            {/* Captured frame */}
            <div className="border-b pb-6">
              <StepHeading
                n="02"
                title={frameCardTitle}
                right={
                  frameResolutionLabel ? (
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {frameResolutionLabel}
                    </span>
                  ) : null
                }
              />
              {frameUrl ? (
                <div className="mt-4 overflow-hidden rounded-lg border bg-muted">
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
                <div className="mt-4 flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
                  <SmartIcon name="ImageIcon" size={22} />
                  <span>{framePlaceholder}</span>
                </div>
              )}
            </div>

            {/* Export */}
            <div className="border-b py-6">
              <StepHeading n="03" title={exportCardTitle} />
              <button
                type="button"
                onClick={onDownload}
                disabled={!frameUrl}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <SmartIcon name="Download" size={16} />
                {downloadLabel}
              </button>
              {downloadHint ? (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {downloadHint}
                </p>
              ) : null}
            </div>

            {/* Tips */}
            {tips && tips.length > 0 ? (
              <div className="pt-6">
                <StepHeading n="04" title={tipsTitle} />
                <ul className="mt-3 space-y-2">
                  {tips.map((tip) => (
                    <li key={tip.href}>
                      <a
                        href={tip.href}
                        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <SmartIcon name="ArrowRight" size={13} />
                        {tip.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {footerHint ? (
              <p className="mt-6 text-center text-xs text-muted-foreground">
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
