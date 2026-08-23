"use client";

import * as React from "react";
import type { ReactNode } from "react";
import type {
  DownloadWorkbenchProps,
  DownloadWorkbenchQuality,
} from "@template/ui";

import { Button } from "../components/button";
import { Input } from "../components/input";
import { SmartIcon } from "../icons";

/**
 * Semi DownloadWorkbench - a designer-grade YouTube thumbnail download studio.
 *
 * Compact by design: a single URL input with a small fetch CTA directly
 * beneath it, then a horizontally scrolling gallery of rectangular quality
 * cards (recent downloads) and a "what's next" tips rail. All data +
 * callbacks come from the app; this section only renders.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function DownloadWorkbench({
  className,
  "data-registry": dataRegistry,
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
  downloadAllLabel,
  downloadingAll,
  onDownloadAll,
  qualities = [],
  noResultsTitle,
  noResultsHint,
  tipsTitle,
  tips,
  footerHint,
}: DownloadWorkbenchProps) {
  const hasResults = qualities.length > 0;
  const availableCount = qualities.filter((q) => q.available).length;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <section className={cn("relative py-12", className)} data-registry={dataRegistry}>
      <div className="px-4">
        {/* ── Grab: single URL input + compact fetch below ── */}
        <div className="rounded-3xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-5 shadow-[0_12px_34px_rgba(0,0,0,0.05)]">
          <form className="flex gap-2.5" onSubmit={handleSubmit}>
            <Input
              prefix={<SmartIcon name="Link" size={16} />}
              aria-label={typeof inputLabel === "string" ? inputLabel : "YouTube URL"}
              placeholder={typeof inputPlaceholder === "string" ? inputPlaceholder : "https://www.youtube.com/watch?v=..."}
              value={urlValue ?? ""}
              onChange={(event) => onUrlChange?.(event.target.value)}
              size="lg"
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !urlValue?.trim()} loading={Boolean(loading)}>
              <SmartIcon name="Search" size={16} />
              <span>{fetchLabel}</span>
            </Button>
          </form>
          {error ? (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-[rgba(var(--semi-red-4),0.3)] bg-[rgba(var(--semi-red-1),0.6)] px-4 py-3 text-[13px] font-semibold text-[rgb(var(--semi-red-6))]">
              <SmartIcon name="Alert" size={15} />
              <span>{error}</span>
            </div>
          ) : null}
          {privacyTip ? (
            <p className="mt-2 flex items-center justify-center gap-[7px] text-xs text-[var(--semi-color-text-3)]">
              <SmartIcon name="Shield" size={14} />
              {privacyTip}
            </p>
          ) : null}
        </div>

        {/* ── Recent downloads: horizontal scrolling strip ── */}
        {hasResults ? (
          <div className="mt-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="m-0 text-[18px] font-bold text-[var(--semi-color-text-0)]">{resultsTitle}</h2>
                {foundLabel ? <p className="mt-1 text-xs text-[var(--semi-color-text-3)]">{foundLabel}</p> : null}
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {videoId && videoIdLabel ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--semi-color-fill-0)] px-3 py-1.5 text-xs font-semibold text-[var(--semi-color-text-2)]">
                    <SmartIcon name="Video" size={13} />
                    <span>{videoIdLabel}</span>
                    <b className="text-[var(--semi-color-text-1)]">{videoId}</b>
                  </span>
                ) : null}
                {onDownloadAll && availableCount > 1 ? (
                  <Button type="button" disabled={Boolean(downloadingAll)} loading={Boolean(downloadingAll)} onClick={onDownloadAll}>
                    <SmartIcon name="Download" size={14} />
                    <span>{downloadAllLabel}</span>
                  </Button>
                ) : null}
              </div>
            </div>

            {availableCount > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
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
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] py-10 text-[var(--semi-color-text-3)]">
                <SmartIcon name="Image" size={26} />
                {noResultsTitle ? <span className="text-[14px] font-bold text-[var(--semi-color-text-0)]">{noResultsTitle}</span> : null}
                {noResultsHint ? <span className="text-xs">{noResultsHint}</span> : null}
              </div>
            )}
          </div>
        ) : null}

        {/* ── What's next tips ── */}
        {tips && tips.length > 0 ? (
          <section className="mt-6 rounded-3xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-5">
            <div className="mb-3.5 flex items-center gap-2.5">
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] bg-[rgba(var(--semi-cyan-1),0.6)] text-[rgb(var(--semi-cyan-7))]">
                <SmartIcon name="Sparkles" size={15} />
              </span>
              <h2 className="m-0 text-[14px] font-bold text-[var(--semi-color-text-0)]">{tipsTitle}</h2>
            </div>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {tips.map((tip) => (
                <li key={tip.href}>
                  <a className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] px-3.5 py-2.5 text-[13px] font-semibold text-[var(--semi-color-text-1)] transition-all duration-[180ms] hover:border-[rgba(var(--semi-cyan-5),0.45)]" href={tip.href}>
                    <SmartIcon name="ArrowRight" size={13} />
                    <span>{tip.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {footerHint ? <p className="mt-5 text-center text-xs text-[var(--semi-color-text-3)]">{footerHint}</p> : null}
      </div>
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
        "w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)]",
        !available && "opacity-60",
      )}
    >
      <div className="relative aspect-video bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={quality.url} alt={typeof quality.label === "string" ? quality.label : "thumbnail"} className="h-full w-full object-cover" />
        {quality.badge ? <span className="absolute left-2 top-2 rounded-full bg-[rgb(var(--semi-red-5))] px-2 py-0.5 text-[10px] font-extrabold tracking-[0.04em] text-white shadow">{quality.badge}</span> : null}
        {!available ? <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-black/50 py-1.5 text-center text-xs font-bold text-white">{unavailableLabel}</span> : null}
      </div>
      <div className="p-3.5">
        <div className="flex items-center justify-between gap-2.5">
          <div className="min-w-0">
            <h3 className="m-0 truncate text-[14px] font-bold text-[var(--semi-color-text-0)]">{quality.label}</h3>
            <p className="m-0 mt-0.5 text-xs text-[var(--semi-color-text-3)]">
              {resolutionLabel ? <span className="font-semibold text-[var(--semi-color-text-2)]">{resolutionLabel}: </span> : null}
              {quality.width} × {quality.height} px
            </p>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          className="mt-3 w-full"
          disabled={!available}
          loading={downloading}
          onClick={() => onDownload?.(quality)}
        >
          <SmartIcon name="Download" size={14} />
          <span>
            {downloading
              ? (downloadingLabel ?? downloadLabel)
              : available
                ? downloadLabel
                : unavailableLabel}
          </span>
        </Button>
      </div>
    </article>
  );
}

export default DownloadWorkbench;
