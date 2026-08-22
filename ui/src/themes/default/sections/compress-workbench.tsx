"use client";

import * as React from "react";
import { useState } from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  CompressWorkbenchFormat,
  CompressWorkbenchProps,
} from "../../../contracts/sections/compress-workbench";

/**
 * Default CompressWorkbench - shadcn-styled fallback of the compression
 * studio section (see the Semi implementation for the full design notes).
 * Same contract: emerald lightweight hero, guided empty state, two-panel
 * workbench with control rail + before/after stage + export dock.
 */

const EXTENSION: Record<CompressWorkbenchFormat, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function CompressWorkbench({
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
  sourceUrl,
  sourceName,
  sourceWidth = 0,
  sourceHeight = 0,
  sourceSizeBytes,
  sourceCardTitle,
  sourceMetaLabel,
  replaceLabel,
  onReplace,
  onDropFile,
  settingsCardTitle,
  formatLabel,
  formatOptions = [],
  format,
  onFormatChange,
  qualityLabel,
  qualityValue,
  onQualityChange,
  smallerLabel,
  betterLabel,
  resultsCardTitle,
  originalLabel,
  compressedLabel,
  savedLabel,
  compressedUrl,
  compressedSizeBytes,
  savingsPercent,
  processing,
  stageCardTitle,
  beforeLabel,
  afterLabel,
  limitState = "idle",
  limitOkMessage,
  limitOverMessage,
  exportCardTitle,
  downloadLabel,
  downloadHint,
  busy,
  onDownload,
  error,
  footerHint,
}: CompressWorkbenchProps) {
  const [dragging, setDragging] = useState(false);
  const hasSource = Boolean(sourceUrl);
  const extension = EXTENSION[format];
  const saved = savingsPercent ?? 0;
  const savedPositive = saved > 0;
  const meterRatio =
    compressedSizeBytes && sourceSizeBytes
      ? Math.min(
          100,
          Math.max(
            0,
            (compressedSizeBytes / Math.max(1, sourceSizeBytes)) * 100,
          ),
        )
      : 0;

  return (
    <section
      className={cn("mx-auto w-full max-w-6xl px-4 py-12", className)}
      data-registry={dataRegistry}
    >
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-emerald-50 to-background p-8 sm:p-10 dark:from-emerald-950/40">
        <div className="relative z-10 max-w-xl">
          {eyebrow ? (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
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
                        : "border-emerald-300 bg-emerald-50 text-emerald-700",
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
                    className="text-emerald-600"
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
              "flex min-h-80 w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-emerald-400/60 bg-gradient-to-b from-emerald-50 to-background p-10 text-center transition-transform hover:border-emerald-500",
              dragging && "scale-[1.005] border-emerald-500 bg-emerald-50",
            )}
          >
            <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
              <SmartIcon name="Shrink" size={26} />
            </span>
            {emptyPrimary ? (
              <span className="text-lg font-bold">{emptyPrimary}</span>
            ) : null}
            {emptyClickLabel ? (
              <span className="text-sm font-semibold text-emerald-600">
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
              <SmartIcon name="Shield" size={14} className="text-emerald-600" />
              {privacyTip}
            </p>
          ) : null}
        </div>
      ) : (
        /* Workspace */
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[4fr_6fr]">
          {/* Rail */}
          <div className="flex flex-col gap-5">
            {/* Source */}
            <section className="rounded-2xl border bg-card p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <SmartIcon name="Image" size={15} />
                </span>
                <h2 className="text-sm font-bold">{sourceCardTitle}</h2>
                <span className="flex-1" />
                {replaceLabel && onReplace ? (
                  <button
                    type="button"
                    onClick={onReplace}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    {replaceLabel}
                  </button>
                ) : null}
              </div>
              {sourceUrl ? (
                <div className="overflow-hidden rounded-xl border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sourceUrl}
                    alt={typeof sourceName === "string" ? sourceName : "source"}
                    className="aspect-video w-full object-contain"
                  />
                </div>
              ) : null}
              <div className="mt-3.5 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {sourceMetaLabel}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {sourceName || "—"}
                  {sourceSizeBytes ? ` · ${formatBytes(sourceSizeBytes)}` : ""}
                  {sourceWidth && sourceHeight
                    ? ` · ${sourceWidth}×${sourceHeight}`
                    : ""}
                </span>
              </div>
            </section>

            {/* Settings */}
            <section className="rounded-2xl border bg-card p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <SmartIcon name="Layers" size={15} />
                </span>
                <h2 className="text-sm font-bold">{settingsCardTitle}</h2>
              </div>
              {formatLabel ? (
                <h3 className="mb-2 text-xs font-semibold text-muted-foreground">
                  {formatLabel}
                </h3>
              ) : null}
              <div className="mb-5 grid grid-cols-3 gap-2">
                {formatOptions.map((option) => {
                  const active = option.value === format;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onFormatChange(option.value)}
                      className={cn(
                        "flex flex-col items-center gap-0.5 rounded-xl border px-2 py-2.5 transition-colors",
                        active
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-border bg-muted hover:border-emerald-400",
                      )}
                    >
                      <span className="text-sm font-extrabold">
                        {option.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {option.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  {qualityLabel}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-700">
                  {qualityValue}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={1}
                value={qualityValue}
                onChange={(e) => onQualityChange(Number(e.target.value))}
                className="w-full accent-emerald-500"
                aria-label={
                  typeof qualityLabel === "string" ? qualityLabel : "quality"
                }
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>{smallerLabel}</span>
                <span>{betterLabel}</span>
              </div>
            </section>

            {/* Results */}
            <section className="rounded-2xl border bg-card p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <SmartIcon name="Shrink" size={15} />
                </span>
                <h2 className="text-sm font-bold">{resultsCardTitle}</h2>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{originalLabel}</span>
                  <span className="font-mono">
                    {formatBytes(sourceSizeBytes)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {compressedLabel}
                  </span>
                  <span className="font-mono font-bold text-emerald-700">
                    {processing && !compressedSizeBytes
                      ? "…"
                      : formatBytes(compressedSizeBytes)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-muted-foreground">{savedLabel}</span>
                  <span
                    className={cn(
                      savedPositive
                        ? "text-emerald-600"
                        : "text-muted-foreground",
                    )}
                  >
                    {savedPositive ? `−${saved}%` : "—"}
                  </span>
                </div>
              </div>
              {meterRatio > 0 ? (
                <div className="mt-4">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${meterRatio}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              ) : null}
            </section>
          </div>

          {/* Stage */}
          <div className="flex flex-col gap-5">
            {/* Before / after */}
            <section className="rounded-2xl border bg-card p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <SmartIcon name="EyeOpened" size={15} />
                </span>
                <h2 className="text-sm font-bold">{stageCardTitle}</h2>
                <span className="flex-1" />
                {compressedSizeBytes && sourceSizeBytes ? (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-bold",
                      savedPositive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {savedPositive ? `−${saved}%` : "No savings"}
                  </span>
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: beforeLabel,
                    size: sourceSizeBytes,
                    url: sourceUrl,
                    isBefore: true,
                  },
                  {
                    label: afterLabel,
                    size: compressedSizeBytes,
                    url: compressedUrl,
                    isBefore: false,
                  },
                ].map((panel, i) => (
                  <div key={i}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {panel.label}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {formatBytes(panel.size)}
                      </span>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
                      {panel.url ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={panel.url}
                            alt={
                              typeof panel.label === "string" ? panel.label : ""
                            }
                            className="h-full w-full object-contain"
                          />
                          {panel.isBefore === false && processing ? (
                            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
                              <SmartIcon name="RefreshCw" size={12} />…
                            </span>
                          ) : null}
                        </>
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <SmartIcon
                            name="RefreshCw"
                            size={20}
                            className="animate-spin"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2MB gauge */}
            {limitState !== "idle" ? (
              <div
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold",
                  limitState === "ok"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-amber-300 bg-amber-50 text-amber-700",
                )}
              >
                <SmartIcon
                  name={limitState === "ok" ? "CheckCircle" : "Alert"}
                  size={15}
                />
                <span>
                  {limitState === "ok" ? limitOkMessage : limitOverMessage}
                </span>
              </div>
            ) : null}

            {/* Export dock */}
            <section className="rounded-2xl border bg-card p-5">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <SmartIcon name="Download" size={15} />
                </span>
                <h2 className="text-sm font-bold">{exportCardTitle}</h2>
              </div>
              <button
                type="button"
                onClick={onDownload}
                disabled={busy || !compressedUrl}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <SmartIcon name="Download" size={17} />
                <span>
                  {downloadLabel
                    ? downloadLabel
                    : `Download Compressed ${extension}`}
                </span>
              </button>
              {downloadHint ? (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {downloadHint}
                </p>
              ) : null}
              {error ? (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              ) : null}
            </section>

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

export default CompressWorkbench;
