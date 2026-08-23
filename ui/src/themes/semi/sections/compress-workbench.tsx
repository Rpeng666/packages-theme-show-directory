"use client";

import * as React from "react";
import { useState } from "react";
import type { ReactNode } from "react";
import type {
  CompressWorkbenchFormat,
  CompressWorkbenchProps,
} from "@template/ui";

import { Button } from "../components/button";
import { SmartIcon } from "../icons";

/**
 * Semi CompressWorkbench — immersive studio layout (option C).
 *
 * A thin top toolbar (title + format pills + quality + export) over a big
 * center canvas with a before/after compare slider, a large savings figure,
 * and a bottom status bar. The emerald design-system tokens are kept; the
 * old two-panel card layout is replaced.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const EXTENSION: Record<CompressWorkbenchFormat, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

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
  autoFitLabel,
  onAutoFit2MB,
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
  const [compare, setCompare] = useState(0.5);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && onDropFile) onDropFile(file);
  };

  return (
    <section
      className={cn("relative overflow-hidden", className)}
      data-registry={dataRegistry}
    >
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
        {/* ── Top toolbar: title + controls + export ── */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[var(--semi-color-border)] px-6 py-4">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="mb-0.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[rgb(var(--semi-green-7))]">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--semi-green-5))]" />
                {eyebrow}
              </p>
            ) : null}
            <h1 className="m-0 truncate text-[20px] font-extrabold tracking-[-0.01em] text-[var(--semi-color-text-0)]">
              {title}
            </h1>
          </div>

          <span className="hidden h-6 w-px bg-[var(--semi-color-border)] sm:block" />

          {/* Format pills */}
          <div className="flex items-center gap-1.5">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--semi-color-text-3)]">
              {formatLabel}
            </span>
            <div className="flex overflow-hidden rounded-[10px] border border-[var(--semi-color-border)]">
              {formatOptions.map((option) => {
                const active = option.value === format;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onFormatChange(option.value)}
                    className={cn(
                      "cursor-pointer px-3 py-1.5 font-mono text-xs font-bold transition-colors duration-[150ms]",
                      active
                        ? "bg-[rgba(var(--semi-green-5),0.9)] text-white"
                        : "bg-[var(--semi-color-fill-0)] text-[var(--semi-color-text-2)] hover:bg-[var(--semi-color-fill-1)]",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quality */}
          <label className="flex min-w-[160px] flex-1 items-center gap-2.5 sm:max-w-[260px]">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--semi-color-text-3)]">
              {qualityLabel}
            </span>
            <input
              type="range"
              min={10}
              max={100}
              step={1}
              value={qualityValue}
              onChange={(event) => onQualityChange(Number(event.target.value))}
              className="w-full cursor-pointer accent-[rgb(var(--semi-green-5))]"
              aria-label={typeof qualityLabel === "string" ? qualityLabel : "quality"}
            />
            <span className="w-9 shrink-0 text-right font-mono text-xs font-bold tabular-nums text-[rgb(var(--semi-green-7))]">
              {qualityValue}%
            </span>
          </label>

          {onAutoFit2MB ? (
            <button
              type="button"
              onClick={onAutoFit2MB}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[rgba(var(--semi-green-5),0.4)] bg-[linear-gradient(180deg,rgba(var(--semi-green-5),0.14),rgba(var(--semi-green-5),0.06))] px-3 py-1.5 text-xs font-semibold text-[rgb(var(--semi-green-6))] transition-[background,transform] duration-[100ms] active:scale-95"
            >
              <span className="text-[13px] leading-none">✦</span>
              {autoFitLabel}
            </button>
          ) : null}

          <div className="ml-auto flex items-center gap-2">
            {replaceLabel && onReplace ? (
              <button
                type="button"
                onClick={onReplace}
                className="cursor-pointer border-none bg-transparent p-0 text-xs font-bold text-[var(--semi-color-text-3)] transition-colors duration-[150ms] hover:text-[rgb(var(--semi-green-7))]"
              >
                {replaceLabel}
              </button>
            ) : null}
            <Button
              type="button"
              size="lg"
              className="!h-9 shrink-0"
              onClick={onDownload}
              disabled={busy || !compressedUrl}
              loading={Boolean(busy)}
            >
              <SmartIcon name="Download" size={16} />
              <span>{downloadLabel ? downloadLabel : `Download ${extension}`}</span>
            </Button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col px-6 py-6">
          {!hasSource ? (
            /* Empty state — centered drop zone */
            <div className="flex flex-1 flex-col items-center justify-center">
              <button
                type="button"
                className={cn(
                  "relative flex w-full max-w-xl cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[24px] border-2 border-dashed border-[rgba(var(--semi-green-5),0.4)] bg-[linear-gradient(180deg,rgba(var(--semi-green-0),0.45),var(--semi-color-bg-1))] px-[18px] py-14 text-center transition-[border-color,background,transform] duration-[200ms]",
                  dragging && "scale-[1.005] border-[rgb(var(--semi-green-5))] bg-[linear-gradient(180deg,rgba(var(--semi-green-0),0.9),var(--semi-color-bg-1))]",
                )}
                onClick={onReplace}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <span className="pointer-events-none absolute h-[200px] w-[200px] rounded-full border border-[rgba(var(--semi-green-5),0.18)] animate-[cstudio-ring-pulse_3s_ease-in-out_infinite]" />
                <span className="relative mb-2.5 inline-flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,rgb(var(--semi-green-5)),rgb(var(--semi-teal-4)))] text-white shadow-[0_16px_36px_-14px_rgba(var(--semi-green-5),0.65)]">
                  <SmartIcon name="Shrink" size={26} />
                </span>
                {emptyPrimary ? (
                  <span className="relative text-[18px] font-bold text-[var(--semi-color-text-0)]">{emptyPrimary}</span>
                ) : null}
                {emptyClickLabel ? (
                  <span className="relative text-[14px] font-semibold text-[rgb(var(--semi-green-7))]">{emptyClickLabel}</span>
                ) : null}
                {emptyHint ? (
                  <span className="relative mt-1.5 text-xs text-[var(--semi-color-text-3)]">{emptyHint}</span>
                ) : null}
              </button>
              {privacyTip ? (
                <p className="mt-5 flex items-center gap-[7px] text-xs text-[var(--semi-color-text-3)]">
                  <SmartIcon name="Shield" size={14} />
                  {privacyTip}
                </p>
              ) : null}
            </div>
          ) : (
            /* Immersive workspace */
            <div className="flex flex-1 flex-col">
              {/* Center canvas: before/after compare */}
              <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[20px] border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)]">
                {/* compare labels */}
                <span className="absolute left-3 top-3 z-20 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
                  {beforeLabel} · {formatBytes(sourceSizeBytes)}
                </span>
                <span className="absolute right-3 top-3 z-20 rounded-full bg-[rgba(var(--semi-green-5),0.9)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
                  {afterLabel} · {formatBytes(compressedSizeBytes)}
                </span>

                {/* after (base) */}
                <div className="aspect-video w-full">
                  {compressedUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={compressedUrl}
                      alt={typeof afterLabel === "string" ? afterLabel : "after"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[var(--semi-color-text-3)] animate-[cstudio-spin_1s_linear_infinite]">
                      <SmartIcon name="RefreshCw" size={24} />
                    </div>
                  )}
                </div>

                {/* before (clipped) */}
                {sourceUrl && (
                  <div
                    className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
                    style={{ width: `${compare * 100}%` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sourceUrl}
                      alt={typeof beforeLabel === "string" ? beforeLabel : "before"}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                {/* divider + handle */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)]"
                  style={{ left: `${compare * 100}%` }}
                />
                <span
                  className="pointer-events-none absolute top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[rgb(var(--semi-green-7))] shadow-md"
                  style={{ left: `${compare * 100}%` }}
                >
                  <SmartIcon name="ArrowLeftRight" size={16} />
                </span>

                {/* drag input */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(compare * 100)}
                  onChange={(e) => setCompare(Number(e.target.value) / 100)}
                  aria-label="Compare before and after"
                  className="absolute inset-0 z-30 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
                />
              </div>

              {/* Big figure */}
              <div className="mx-auto mt-8 flex w-full max-w-4xl flex-wrap items-end justify-center gap-x-8 gap-y-3">
                <div className="text-center">
                  <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--semi-color-text-3)]">
                    {originalLabel}
                  </p>
                  <p className="m-0 mt-1 font-mono text-[26px] font-bold leading-none text-[var(--semi-color-text-1)]">
                    {formatBytes(sourceSizeBytes)}
                  </p>
                </div>
                <div className="flex items-center gap-2 pb-1 text-[rgb(var(--semi-green-7))]">
                  <SmartIcon name="ArrowRight" size={20} />
                </div>
                <div className="text-center">
                  <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--semi-color-text-3)]">
                    {compressedLabel}
                  </p>
                  <p className="m-0 mt-1 font-mono text-[26px] font-bold leading-none text-[rgb(var(--semi-green-7))]">
                    {processing && !compressedSizeBytes ? "…" : formatBytes(compressedSizeBytes)}
                  </p>
                </div>
                {savedPositive ? (
                  <span className="rounded-full bg-[rgba(var(--semi-green-1),0.7)] px-3 py-1.5 font-mono text-sm font-extrabold tabular-nums text-[rgb(var(--semi-green-7))]">
                    −{saved}%
                  </span>
                ) : null}
              </div>

              {/* limit gauge */}
              {limitState !== "idle" ? (
                <div className={cn(
                  "mx-auto mt-6 flex w-full max-w-4xl items-center gap-2.5 rounded-[14px] px-4 py-3 text-[13px] font-semibold leading-[1.5]",
                  limitState === "ok"
                    ? "border border-[rgba(var(--semi-green-4),0.35)] bg-[rgba(var(--semi-green-1),0.6)] text-[rgb(var(--semi-green-7))]"
                    : "border border-[rgba(var(--semi-amber-4),0.35)] bg-[rgba(var(--semi-amber-1),0.6)] text-[rgb(var(--semi-amber-7))]",
                )}>
                  <SmartIcon name={limitState === "ok" ? "CheckCircle" : "Alert"} size={15} />
                  <span>{limitState === "ok" ? limitOkMessage : limitOverMessage}</span>
                </div>
              ) : null}

              {error ? (
                <div className="mx-auto mt-4 w-full max-w-4xl rounded-xl border border-[rgba(var(--semi-red-4),0.3)] bg-[rgba(var(--semi-red-1),0.6)] px-4 py-3 text-[13px] font-semibold text-[rgb(var(--semi-red-6))]">
                  {error}
                </div>
              ) : null}

              {footerHint ? (
                <p className="mx-auto mt-6 w-full max-w-4xl text-center text-xs text-[var(--semi-color-text-3)]">
                  {footerHint}
                </p>
              ) : null}
            </div>
          )}
        </div>

        {/* ── Bottom status bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--semi-color-border)] px-6 py-2.5">
          <span className="flex items-center gap-2 text-[11px] font-semibold text-[var(--semi-color-text-2)]">
            <SmartIcon name="Image" size={13} />
            {sourceName || "—"}
            {sourceWidth && sourceHeight ? ` · ${sourceWidth}×${sourceHeight}` : ""}
          </span>
          <span className="text-[11px] text-[var(--semi-color-text-3)]">
            {sourceMetaLabel} · {privacyTip || footerHint}
          </span>
        </div>
      </div>
    </section>
  );
}

export default CompressWorkbench;
