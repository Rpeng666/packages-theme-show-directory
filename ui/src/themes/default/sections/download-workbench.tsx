"use client";

import * as React from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  DownloadWorkbenchProps,
  DownloadWorkbenchQuality,
} from "../../../contracts/sections/download-workbench";

/**
 * Default DownloadWorkbench - shadcn-styled fallback of the thumbnail
 * download studio (see the Semi implementation for the full design notes).
 * Same contract: orange grab hero, persistent grab bar, quality gallery and
 * "what's next" tips rail.
 */

export function DownloadWorkbench({
  className,
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  badges,
  meta,
  inputLabel,
  inputPlaceholder,
  fetchLabel,
  loading,
  error,
  urlValue,
  onUrlChange,
  onSubmit,
  privacyTip,
  resultsTitle,
  foundLabel,
  videoId,
  videoIdLabel,
  resolutionLabel,
  unavailableLabel,
  downloadLabel,
  downloadingLabel,
  downloadingKey,
  onDownload,
  qualities = [],
  noResultsTitle,
  noResultsHint,
  tipsTitle,
  tips,
  footerHint,
}: DownloadWorkbenchProps) {
  const availableCount = qualities.filter((q) => q.available).length;

  return (
    <section
      className={cn("mx-auto w-full max-w-6xl px-4 py-12", className)}
      data-registry={dataRegistry}
    >
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-orange-50 to-background p-8 sm:p-10 dark:from-orange-950/40">
        <div className="relative z-10 max-w-xl">
          {eyebrow ? (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
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
                      ? "border-orange-300 bg-orange-50 text-orange-700"
                      : badge.tone === "neutral"
                        ? "border-border bg-muted text-muted-foreground"
                        : "border-orange-300 bg-orange-50 text-orange-700",
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
                    className="text-orange-600"
                  />
                  {item.text}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {/* Grab bar */}
      <div className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
        >
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-600">
              <SmartIcon name="Link" size={16} />
            </span>
            <input
              aria-label={
                typeof inputLabel === "string" ? inputLabel : "YouTube URL"
              }
              type="text"
              placeholder={
                typeof inputPlaceholder === "string"
                  ? inputPlaceholder
                  : "https://www.youtube.com/watch?v=..."
              }
              value={urlValue ?? ""}
              onChange={(e) => onUrlChange?.(e.target.value)}
              className="w-full rounded-xl border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !urlValue?.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
          >
            <SmartIcon name="Search" size={16} />
            {fetchLabel}
          </button>
        </form>
        {error ? (
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 dark:bg-red-950/50">
            <SmartIcon name="AlertTriangleIcon" size={14} />
            {error}
          </div>
        ) : null}
        {privacyTip ? (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <SmartIcon name="Shield" size={13} className="text-orange-600" />
            {privacyTip}
          </p>
        ) : null}
      </div>

      {/* Quality gallery */}
      {qualities.length > 0 ? (
        <div className="mt-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">
                {resultsTitle}
              </h2>
              {foundLabel ? (
                <p className="text-sm text-muted-foreground">{foundLabel}</p>
              ) : null}
            </div>
            {videoId && videoIdLabel ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                <SmartIcon name="Video" size={13} className="text-orange-600" />
                {videoIdLabel}
                <b className="font-mono">{videoId}</b>
              </span>
            ) : null}
          </div>

          {availableCount > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {qualities.map((q) => (
                <QualityCard
                  key={q.key}
                  quality={q}
                  resolutionLabel={resolutionLabel}
                  unavailableLabel={unavailableLabel}
                  downloadLabel={downloadLabel}
                  downloadingLabel={downloadingLabel}
                  downloading={downloadingKey === q.key}
                  onDownload={onDownload}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-muted/40 py-14 text-center">
              <SmartIcon
                name="ImageIcon"
                size={26}
                className="text-orange-500"
              />
              {noResultsTitle ? (
                <span className="text-sm font-bold">{noResultsTitle}</span>
              ) : null}
              {noResultsHint ? (
                <span className="text-xs text-muted-foreground">
                  {noResultsHint}
                </span>
              ) : null}
            </div>
          )}
        </div>
      ) : null}

      {/* What's next */}
      {tips && tips.length > 0 ? (
        <section className="mt-8 rounded-2xl border bg-card p-5">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <SmartIcon name="Sparkles" size={15} />
            </span>
            <h2 className="text-sm font-bold">{tipsTitle}</h2>
          </div>
          <ul className="space-y-2">
            {tips.map((tip) => (
              <li key={tip.href}>
                <a
                  href={tip.href}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 hover:underline"
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
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {footerHint}
        </p>
      ) : null}
    </section>
  );
}

function QualityCard({
  quality,
  resolutionLabel,
  unavailableLabel,
  downloadLabel,
  downloadingLabel,
  downloading,
  onDownload,
}: {
  quality: DownloadWorkbenchQuality;
  resolutionLabel?: ReactNode;
  unavailableLabel?: ReactNode;
  downloadLabel?: ReactNode;
  downloadingLabel?: ReactNode;
  downloading: boolean;
  onDownload?: (quality: DownloadWorkbenchQuality) => void;
}) {
  const { available } = quality;
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border bg-card",
        !available && "opacity-50",
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={quality.url}
          alt={typeof quality.label === "string" ? quality.label : "thumbnail"}
          className="h-full w-full object-cover"
        />
        {quality.badge ? (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-orange-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
            {quality.badge}
          </span>
        ) : null}
        {!available ? (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-black/70 px-2.5 py-0.5 text-[11px] font-bold text-white">
            {unavailableLabel}
          </span>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-3 p-3.5">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold">{quality.label}</h3>
          <p className="text-xs text-muted-foreground">
            {resolutionLabel ? (
              <span className="mr-1.5 text-muted-foreground/80">
                {resolutionLabel}
              </span>
            ) : null}
            {quality.width} × {quality.height} px
          </p>
        </div>
        <button
          type="button"
          disabled={!available}
          onClick={() => onDownload?.(quality)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          <SmartIcon name="Download" size={13} />
          {downloading
            ? (downloadingLabel ?? downloadLabel)
            : available
              ? downloadLabel
              : unavailableLabel}
        </button>
      </div>
    </article>
  );
}

export default DownloadWorkbench;
