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
 * Semi CompressWorkbench - a designer-grade thumbnail compression studio.
 *
 * Visual language shared with the AI studios: an emerald "lightweight" hero,
 * a guided empty state (gradient dropzone + privacy tip), then a two-panel
 * workbench - a left control rail (source card, format + quality settings,
 * live results with a savings meter) and a right stage (before / after
 * comparison, the YouTube 2MB gauge and the export dock). All data +
 * callbacks come from the app; this section only renders.
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
    <section className={cn("relative overflow-hidden py-12", className)} data-registry={dataRegistry}>
      <div className="px-4">
        {/* ── Hero: emerald lightweight strip (only when copy provided) ── */}
        {eyebrow || title || description || (badges && badges.length > 0) || (meta && meta.length > 0) ? (
        <header className="px-7 py-8 pb-7">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(var(--semi-grey-9),0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--semi-grey-9),0.05) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              maskImage:
                "radial-gradient(ellipse 80% 72% at 50% 0%, #000 35%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(460px 320px at 22% 18%, rgba(var(--semi-green-5),0.16), transparent 70%), radial-gradient(520px 360px at 80% 26%, rgba(var(--semi-teal-4),0.12), transparent 70%)",
            }}
          />
          <div className="relative z-[1] max-w-[640px]">
            {eyebrow ? (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(var(--semi-green-1),0.7)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[rgb(var(--semi-green-7))]">
                <span className="h-2 w-2 rounded-full bg-[rgb(var(--semi-green-5))] animate-[cstudio-pulse_2.4s_ease-in-out_infinite]" />
                {eyebrow}
              </span>
            ) : null}
            {title ? <h1 className="m-0 mb-2.5 text-[clamp(30px,4vw,44px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-[var(--semi-color-text-0)]">{title}</h1> : null}
            {description ? <p className="m-0 max-w-[560px] text-[15px] leading-[1.7] text-[var(--semi-color-text-2)]">{description}</p> : null}
            {badges && badges.length > 0 ? (
              <div className="mt-[18px] flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-[5px] text-xs font-bold",
                      badge.tone === "pro"
                        ? "bg-[rgba(var(--semi-indigo-1),0.6)] text-[rgb(var(--semi-indigo-6))] border-[rgba(var(--semi-indigo-5),0.25)]"
                        : badge.tone === "neutral"
                          ? "bg-[var(--semi-color-fill-0)] text-[var(--semi-color-text-2)]"
                          : "bg-[rgba(var(--semi-green-1),0.7)] text-[rgb(var(--semi-green-7))] border-[rgba(var(--semi-green-5),0.25)]",
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            ) : null}
            {meta && meta.length > 0 ? (
              <div className="mt-[18px] flex flex-wrap gap-2">
                {meta.map((item) => (
                  <span key={item.text} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--semi-color-fill-0)] px-3 py-1.5 text-xs font-semibold text-[var(--semi-color-text-1)]">
                    <SmartIcon name={item.icon} size={14} />
                    {item.text}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </header>
        ) : null}

        {!hasSource ? (
          /* ── Empty state ── */
          <div className="mt-6">
            <button
              type="button"
              className={cn(
                "relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[24px] border-2 border-dashed border-[rgba(var(--semi-green-5),0.4)] bg-[linear-gradient(180deg,rgba(var(--semi-green-0),0.45),var(--semi-color-bg-1))] px-[18px] py-7 text-center transition-[border-color,background,transform] duration-[200ms]",
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
              <p className="mt-[18px] flex items-center justify-center gap-[7px] text-xs text-[var(--semi-color-text-3)]">
                <SmartIcon name="Shield" size={14} />
                {privacyTip}
              </p>
            ) : null}

            {/* ── Capability preview: what compression gets you ── */}
            <div className="mt-6 border-t border-[var(--semi-color-border)] pt-5">
              <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-3">
                <span className="text-[13px] font-bold tracking-[0.02em] text-[var(--semi-color-text-0)]">
                  Shrink it your way
                </span>
                <span className="text-xs font-semibold tracking-[0.04em] text-[var(--semi-color-text-3)]">
                  Fits YouTube&apos;s 2 MB limit
                </span>
              </div>
              <div className="grid gap-2.5">
                {formatOptions && formatOptions.length > 0
                  ? formatOptions.map((option) => (
                      <div key={option.value} className="flex flex-col gap-1 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-2)] p-3 px-3.5">
                        <span className="text-[14px] font-bold tracking-[0.02em] text-[rgb(var(--semi-green-6))]">{option.label}</span>
                        <span className="text-xs text-[var(--semi-color-text-3)]">{option.desc}</span>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        ) : (
          /* ── Workspace: two-panel workbench ── */
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-4">
              {/* Source card */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-green-1),0.7)] text-[rgb(var(--semi-green-7))]">
                    <SmartIcon name="Image" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{sourceCardTitle}</h2>
                  <span className="flex-1" />
                  {replaceLabel && onReplace ? (
                    <button type="button" className="cursor-pointer border-none bg-transparent p-0 text-xs font-bold text-[rgb(var(--semi-green-7))] transition-colors duration-[180ms]" onClick={onReplace}>{replaceLabel}</button>
                  ) : null}
                </div>
                {sourceUrl ? (
                  <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[14px] border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sourceUrl}
                      alt={typeof sourceName === "string" ? sourceName : "source"}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : null}
                <div className="mt-3.5 flex items-center justify-between gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--semi-color-text-3)]">{sourceMetaLabel}</span>
                  <span className="text-right text-[13px] font-semibold text-[var(--semi-color-text-1)]">
                    {sourceName || "—"}
                    {sourceSizeBytes ? ` · ${formatBytes(sourceSizeBytes)}` : ""}
                    {sourceWidth && sourceHeight ? ` · ${sourceWidth}×${sourceHeight}` : ""}
                  </span>
                </div>
              </section>

              {/* Settings card */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-green-1),0.7)] text-[rgb(var(--semi-green-7))]">
                    <SmartIcon name="Layers" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{settingsCardTitle}</h2>
                </div>
                {formatLabel ? <h3 className="m-0 mb-2 text-xs font-semibold text-[var(--semi-color-text-2)]">{formatLabel}</h3> : null}
                <div className="grid grid-cols-1 gap-2">
                  {formatOptions.map((option) => {
                    const active = option.value === format;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          "flex cursor-pointer flex-col items-center gap-0.5 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] px-2 py-2.5 transition-[border-color,background] duration-[180ms]",
                          active && "border-[rgba(var(--semi-green-5),0.45)] bg-[rgba(var(--semi-green-1),0.5)]",
                        )}
                        onClick={() => onFormatChange(option.value)}
                      >
                        <span className="text-[13px] font-extrabold text-[var(--semi-color-text-0)]">{option.label}</span>
                        <span className="text-[10px] text-[var(--semi-color-text-3)]">{option.desc}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[var(--semi-color-text-1)]">{qualityLabel}</span>
                  <span className="text-[13px] font-bold tabular-nums text-[rgb(var(--semi-green-7))]">{qualityValue}%</span>
                </div>
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
                {onAutoFit2MB ? (
                  <button type="button" onClick={onAutoFit2MB} className="mt-2.5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[rgba(var(--semi-green-5),0.4)] bg-[linear-gradient(180deg,rgba(var(--semi-green-5),0.14),rgba(var(--semi-green-5),0.06))] px-3 py-1.5 text-xs font-semibold text-[rgb(var(--semi-green-6))] transition-[background,transform] duration-[100ms] active:scale-95">
                    <span className="text-[14px] leading-none">✦</span>
                    <span>{autoFitLabel}</span>
                  </button>
                ) : null}
                <div className="mt-1.5 flex justify-between text-[11px] text-[var(--semi-color-text-3)]">
                  <span>{smallerLabel}</span>
                  <span>{betterLabel}</span>
                </div>
              </section>

              {/* Results card */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-green-1),0.7)] text-[rgb(var(--semi-green-7))]">
                    <SmartIcon name="Shrink" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{resultsCardTitle}</h2>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2.5 rounded-xl bg-[var(--semi-color-fill-0)] px-3 py-[9px]">
                    <span className="text-xs font-semibold text-[var(--semi-color-text-3)]">{originalLabel}</span>
                    <span className="text-[13px] font-semibold tabular-nums text-[var(--semi-color-text-1)]">{formatBytes(sourceSizeBytes)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2.5 rounded-xl bg-[var(--semi-color-fill-0)] px-3 py-[9px]">
                    <span className="text-xs font-semibold text-[var(--semi-color-text-3)]">{compressedLabel}</span>
                    <span className="text-[13px] font-semibold tabular-nums text-[rgb(var(--semi-green-7))]">
                      {processing && !compressedSizeBytes ? "…" : formatBytes(compressedSizeBytes)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2.5 rounded-xl bg-[rgba(var(--semi-green-1),0.5)] px-3 py-[9px]">
                    <span className="text-xs font-semibold text-[var(--semi-color-text-3)]">{savedLabel}</span>
                    <span className={cn("text-[13px] font-extrabold tabular-nums text-[var(--semi-color-text-2)]", savedPositive && "text-[rgb(var(--semi-green-6))]")}>
                      {savedPositive ? `−${saved}%` : "—"}
                    </span>
                  </div>
                </div>
                {meterRatio > 0 ? (
                  <div className="mt-4">
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--semi-color-fill-0)]">
                      <div className="h-full rounded-full bg-[linear-gradient(90deg,rgb(var(--semi-teal-4)),rgb(var(--semi-green-5)))] transition-[width] duration-[250ms]" style={{ width: `${meterRatio}%` }} />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-[var(--semi-color-text-3)]">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                ) : null}
              </section>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              {/* Before / after comparison */}
              <section className="overflow-hidden rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-green-1),0.7)] text-[rgb(var(--semi-green-7))]">
                    <SmartIcon name="EyeOpened" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{stageCardTitle}</h2>
                  <span className="flex-1" />
                  {compressedSizeBytes && sourceSizeBytes ? (
                    <span className={cn("inline-flex items-center rounded-full bg-[var(--semi-color-fill-0)] px-2.5 py-1 text-xs font-bold tabular-nums text-[var(--semi-color-text-2)]", savedPositive && "bg-[rgba(var(--semi-green-1),0.7)] text-[rgb(var(--semi-green-7))]")}>
                      {savedPositive ? `−${saved}%` : "No savings"}
                    </span>
                  ) : null}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--semi-color-text-3)]">{beforeLabel}</span>
                      <span className="text-[11px] font-semibold tabular-nums text-[var(--semi-color-text-2)]">{formatBytes(sourceSizeBytes)}</span>
                    </div>
                    {sourceUrl ? (
                      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[14px] border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={sourceUrl} alt={typeof beforeLabel === "string" ? beforeLabel : "before"} className="h-full w-full object-contain" />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--semi-color-text-3)]">{afterLabel}</span>
                      <span className="text-[11px] font-semibold tabular-nums text-[var(--semi-color-text-2)]">{formatBytes(compressedSizeBytes)}</span>
                    </div>
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[14px] border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)]">
                      {compressedUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={compressedUrl} alt={typeof afterLabel === "string" ? afterLabel : "after"} className="h-full w-full object-contain" />
                          {processing ? (
                            <span className="absolute right-2 top-2 inline-flex items-center gap-[5px] rounded-full bg-[rgba(var(--semi-grey-9),0.6)] px-2 py-[3px] text-[11px] font-bold text-white">
                              <SmartIcon name="RefreshCw" size={13} />…
                            </span>
                          ) : null}
                        </>
                      ) : (
                        <div className="inline-flex items-center justify-center text-[var(--semi-color-text-3)] animate-[cstudio-spin_1s_linear_infinite]">
                          <SmartIcon name="RefreshCw" size={20} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* 2MB gauge */}
              {limitState !== "idle" ? (
                <div className={cn("flex items-center gap-2.5 rounded-[14px] px-4 py-3.5 text-[13px] font-semibold leading-[1.5]", limitState === "ok" ? "bg-[rgba(var(--semi-green-1),0.6)] text-[rgb(var(--semi-green-7))] border border-[rgba(var(--semi-green-4),0.35)]" : "bg-[rgba(var(--semi-amber-1),0.6)] text-[rgb(var(--semi-amber-7))] border border-[rgba(var(--semi-amber-4),0.35)]")}>
                  <SmartIcon name={limitState === "ok" ? "CheckCircle" : "Alert"} size={15} />
                  <span>{limitState === "ok" ? limitOkMessage : limitOverMessage}</span>
                </div>
              ) : null}

              {/* Export dock */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-green-1),0.7)] text-[rgb(var(--semi-green-7))]">
                    <SmartIcon name="Download" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{exportCardTitle}</h2>
                </div>
                <Button type="button" size="lg" className="w-full" onClick={onDownload} disabled={busy || !compressedUrl} loading={Boolean(busy)}>
                  <SmartIcon name="Download" size={17} />
                  <span>{downloadLabel ? downloadLabel : `Download Compressed ${extension}`}</span>
                </Button>
                {downloadHint ? <p className="m-0 mt-3 text-center text-xs text-[var(--semi-color-text-3)]">{downloadHint}</p> : null}
                {error ? <div className="mt-4 rounded-xl bg-[rgba(var(--semi-red-1),0.6)] border border-[rgba(var(--semi-red-4),0.3)] px-4 py-3 text-[13px] font-semibold text-[rgb(var(--semi-red-6))]">{error}</div> : null}
              </section>

              {footerHint ? <p className="mt-5 text-center text-xs text-[var(--semi-color-text-3)]">{footerHint}</p> : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CompressWorkbench;
