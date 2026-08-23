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
 * Default CompressWorkbench — restrained editor-style layout.
 *
 * Design language (minimal utility):
 *  - No accent-colored hero; a quiet eyebrow + large title + one-line copy.
 *  - Left rail is a numbered control list (Source → Format → Quality), each
 *    row separated by hairlines instead of floating cards.
 *  - Right stage shows a big mono before/after figure, the two images, and
 *    a single primary download action.
 *  - The only color used is the semantic `primary` token (accent-free).
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

/** Small section heading with a step number (left rail rows). */
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

  return (
    <section
      className={cn("mx-auto w-full max-w-5xl px-4 py-10 sm:py-14", className)}
      data-registry={dataRegistry}
    >
      {/* Header — quiet, no colored hero */}
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
              <SmartIcon name="Image" size={22} />
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
        /* Workspace — two columns: numbered control rail + stage */
        <div className="grid grid-cols-1 items-start gap-10 py-10 lg:grid-cols-[5fr_7fr]">
          {/* Left rail — control list with hairlines */}
          <div className="flex flex-col">
            {/* Source */}
            <div className="border-b py-4 first:pt-0">
              <StepHeading
                n="01"
                title={sourceCardTitle}
                right={
                  replaceLabel && onReplace ? (
                    <button
                      type="button"
                      onClick={onReplace}
                      className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {replaceLabel}
                    </button>
                  ) : null
                }
              />
              {sourceUrl ? (
                <div className="mt-3 overflow-hidden rounded-lg border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sourceUrl}
                    alt={typeof sourceName === "string" ? sourceName : "source"}
                    className="aspect-video w-full object-contain"
                  />
                </div>
              ) : null}
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{sourceMetaLabel}</span>
                <span className="font-mono text-muted-foreground">
                  {sourceName || "—"}
                  {sourceSizeBytes ? ` · ${formatBytes(sourceSizeBytes)}` : ""}
                  {sourceWidth && sourceHeight
                    ? ` · ${sourceWidth}×${sourceHeight}`
                    : ""}
                </span>
              </div>
            </div>

            {/* Format */}
            <div className="border-b py-4">
              <StepHeading n="02" title={settingsCardTitle} />
              {formatLabel ? (
                <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {formatLabel}
                </p>
              ) : null}
              <div className="mt-2 grid grid-cols-3 gap-2">
                {formatOptions.map((option) => {
                  const active = option.value === format;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onFormatChange(option.value)}
                      className={cn(
                        "flex flex-col items-center gap-0.5 rounded-lg border px-2 py-2.5 transition-colors",
                        active
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground",
                      )}
                    >
                      <span className="text-[13px] font-semibold">
                        {option.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {option.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quality */}
            <div className="py-4">
              <StepHeading n="03" title={qualityLabel} />
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{smallerLabel}</span>
                <span className="font-mono text-sm font-semibold">
                  {qualityValue}%
                </span>
                <span className="text-muted-foreground">{betterLabel}</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={1}
                value={qualityValue}
                onChange={(e) => onQualityChange(Number(e.target.value))}
                className="mt-1.5 w-full accent-primary"
                aria-label={
                  typeof qualityLabel === "string" ? qualityLabel : "quality"
                }
              />
            </div>
          </div>

          {/* Right stage — big numbers + images + export */}
          <div className="flex flex-col">
            {/* Before / after images */}
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-[13px] font-semibold tracking-tight">
                  {stageCardTitle}
                </h2>
                <span className="flex-1" />
                {compressedSizeBytes && sourceSizeBytes ? (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                      savedPositive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {savedPositive ? `−${saved}%` : "No savings"}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
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
                  <figure key={i}>
                    <figcaption className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-medium uppercase tracking-wider">
                        {panel.label}
                      </span>
                      <span className="font-mono">{formatBytes(panel.size)}</span>
                    </figcaption>
                    <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
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
                  </figure>
                ))}
              </div>
            </div>

            {/* Big number figure */}
            {compressedSizeBytes && sourceSizeBytes ? (
              <div className="mt-8 border-t pt-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {formatBytes(compressedSizeBytes)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    from{" "}
                    <span className="font-mono text-foreground">
                      {formatBytes(sourceSizeBytes)}
                    </span>
                  </span>
                  {savedPositive ? (
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-sm font-semibold text-primary">
                      −{saved}%
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {savedLabel}
                </p>
              </div>
            ) : null}

            {/* Limit notice */}
            {limitState !== "idle" ? (
              <div
                className={cn(
                  "mt-6 flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm",
                  limitState === "ok"
                    ? "border-border bg-muted/40 text-foreground"
                    : "border-border bg-muted/40 text-foreground",
                )}
              >
                <SmartIcon
                  name={limitState === "ok" ? "CheckCircle" : "Alert"}
                  size={15}
                  className={
                    limitState === "ok"
                      ? "text-primary"
                      : "text-amber-500"
                  }
                />
                <span className="text-[13px]">
                  {limitState === "ok" ? limitOkMessage : limitOverMessage}
                </span>
              </div>
            ) : null}

            {/* Export */}
            <div className="mt-6 border-t pt-6">
              <button
                type="button"
                onClick={onDownload}
                disabled={busy || !compressedUrl}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SmartIcon name="Download" size={16} />
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
                <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                  {error}
                </div>
              ) : null}
            </div>

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

export default CompressWorkbench;
