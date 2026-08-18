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
 * Visual language shared with the AI studios: an orange "grab" hero, a
 * persistent grab bar (URL input + fetch CTA + privacy note), then a quality
 * gallery (2-column grid of preview cards with resolution tags + download
 * buttons) and a "what's next" tips rail. All data + callbacks come from the
 * app; this section only renders.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

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
  const hasResults = qualities.length > 0;
  const availableCount = qualities.filter((q) => q.available).length;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <section className={cn("dstudio", className)} data-registry={dataRegistry}>
      <div className="dstudio-shell">
        {/* ── Hero: orange grab strip ── */}
        <header className="dstudio-hero">
          <div className="dstudio-hero-mesh" />
          <div className="dstudio-hero-glow" />
          <div className="dstudio-hero-inner">
            {eyebrow ? (
              <span className="dstudio-eyebrow">
                <span className="dstudio-eyebrow-dot" />
                {eyebrow}
              </span>
            ) : null}
            {title ? <h1 className="dstudio-title">{title}</h1> : null}
            {description ? <p className="dstudio-desc">{description}</p> : null}
            {badges && badges.length > 0 ? (
              <div className="dstudio-hero-badges">
                {badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={cn(
                      "dstudio-badge",
                      badge.tone === "pro"
                        ? "dstudio-badge-pro"
                        : badge.tone === "neutral"
                          ? "dstudio-badge-neutral"
                          : "dstudio-badge-free",
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            ) : null}
            {meta && meta.length > 0 ? (
              <div className="dstudio-hero-meta">
                {meta.map((item) => (
                  <span key={item.text} className="dstudio-meta-chip">
                    <SmartIcon name={item.icon} size={14} />
                    {item.text}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        {/* ── Grab bar: URL input + fetch ── */}
        <div className="dstudio-grab">
          <form className="dstudio-grab-form" onSubmit={handleSubmit}>
            <Input
              prefix={<SmartIcon name="Link" size={16} />}
              aria-label={
                typeof inputLabel === "string" ? inputLabel : "YouTube URL"
              }
              placeholder={
                typeof inputPlaceholder === "string"
                  ? inputPlaceholder
                  : "https://www.youtube.com/watch?v=..."
              }
              value={urlValue ?? ""}
              onChange={(event) => onUrlChange?.(event.target.value)}
              size="lg"
              className="dstudio-input"
            />
            <Button
              type="submit"
              size="lg"
              className="dstudio-fetch"
              disabled={loading || !urlValue?.trim()}
              loading={Boolean(loading)}
            >
              <SmartIcon name="Search" size={16} />
              <span>{fetchLabel}</span>
            </Button>
          </form>
          {error ? (
            <div className="dstudio-error">
              <SmartIcon name="Alert" size={15} />
              <span>{error}</span>
            </div>
          ) : null}
          {privacyTip ? (
            <p className="dstudio-grab-tip">
              <SmartIcon name="Shield" size={14} />
              {privacyTip}
            </p>
          ) : null}
        </div>

        {/* ── Quality gallery ── */}
        {hasResults ? (
          <div className="dstudio-results">
            <div className="dstudio-results-head">
              <div>
                <h2 className="dstudio-results-title">{resultsTitle}</h2>
                {foundLabel ? (
                  <p className="dstudio-results-found">{foundLabel}</p>
                ) : null}
              </div>
              {videoId && videoIdLabel ? (
                <span className="dstudio-video-chip">
                  <SmartIcon name="Video" size={13} />
                  <span>{videoIdLabel}</span>
                  <b>{videoId}</b>
                </span>
              ) : null}
            </div>

            {availableCount > 0 ? (
              <div className="dstudio-quality-grid">
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
              <div className="dstudio-empty-state">
                <SmartIcon name="Image" size={26} />
                {noResultsTitle ? (
                  <span className="dstudio-empty-title">{noResultsTitle}</span>
                ) : null}
                {noResultsHint ? (
                  <span className="dstudio-empty-hint">{noResultsHint}</span>
                ) : null}
              </div>
            )}
          </div>
        ) : null}

        {/* ── What's next tips ── */}
        {tips && tips.length > 0 ? (
          <section className="dstudio-tips-card">
            <div className="dstudio-tips-head">
              <span className="dstudio-tips-icon">
                <SmartIcon name="Sparkles" size={15} />
              </span>
              <h2 className="dstudio-tips-title">{tipsTitle}</h2>
            </div>
            <ul className="dstudio-tips">
              {tips.map((tip) => (
                <li key={tip.href}>
                  <a className="dstudio-tip-link" href={tip.href}>
                    <SmartIcon name="ArrowRight" size={13} />
                    <span>{tip.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {footerHint ? (
          <p className="dstudio-footer-hint">{footerHint}</p>
        ) : null}
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
        "dstudio-quality-card",
        !available && "dstudio-quality-card-muted",
      )}
    >
      <div className="dstudio-quality-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={quality.url}
          alt={typeof quality.label === "string" ? quality.label : "thumbnail"}
          className="dstudio-quality-img"
        />
        {quality.badge ? (
          <span className="dstudio-quality-badge">{quality.badge}</span>
        ) : null}
        {!available ? (
          <span className="dstudio-quality-flag">{unavailableLabel}</span>
        ) : null}
      </div>
      <div className="dstudio-quality-body">
        <div className="dstudio-quality-info">
          <h3 className="dstudio-quality-name">{quality.label}</h3>
          <p className="dstudio-quality-res">
            {resolutionLabel ? (
              <span className="dstudio-quality-res-label">
                {resolutionLabel}
              </span>
            ) : null}
            {quality.width} × {quality.height} px
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          className={cn(
            "dstudio-quality-action",
            !available && "dstudio-quality-action-muted",
          )}
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
