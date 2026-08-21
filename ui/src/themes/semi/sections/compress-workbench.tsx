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
    <section className={cn("cstudio", className)} data-registry={dataRegistry}>
      <div className="cstudio-shell">
        {/* ── Hero: emerald lightweight strip (only when copy provided) ── */}
        {eyebrow || title || description || (badges && badges.length > 0) || (meta && meta.length > 0) ? (
        <header className="cstudio-hero">
          <div className="cstudio-hero-mesh" />
          <div className="cstudio-hero-glow" />
          <div className="cstudio-hero-inner">
            {eyebrow ? (
              <span className="cstudio-eyebrow">
                <span className="cstudio-eyebrow-dot" />
                {eyebrow}
              </span>
            ) : null}
            {title ? <h1 className="cstudio-title">{title}</h1> : null}
            {description ? <p className="cstudio-desc">{description}</p> : null}
            {badges && badges.length > 0 ? (
              <div className="cstudio-hero-badges">
                {badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={cn(
                      "cstudio-badge",
                      badge.tone === "pro"
                        ? "cstudio-badge-pro"
                        : badge.tone === "neutral"
                          ? "cstudio-badge-neutral"
                          : "cstudio-badge-free",
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            ) : null}
            {meta && meta.length > 0 ? (
              <div className="cstudio-hero-meta">
                {meta.map((item) => (
                  <span key={item.text} className="cstudio-meta-chip">
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
          <div className="cstudio-empty">
            <button
              type="button"
              className={cn(
                "cstudio-dropzone",
                dragging && "cstudio-dropzone-drag",
              )}
              onClick={onReplace}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span className="cstudio-dropzone-ring" />
              <span className="cstudio-dropzone-icon">
                <SmartIcon name="Shrink" size={26} />
              </span>
              {emptyPrimary ? (
                <span className="cstudio-dropzone-primary">{emptyPrimary}</span>
              ) : null}
              {emptyClickLabel ? (
                <span className="cstudio-dropzone-click">
                  {emptyClickLabel}
                </span>
              ) : null}
              {emptyHint ? (
                <span className="cstudio-dropzone-hint">{emptyHint}</span>
              ) : null}
            </button>
            {privacyTip ? (
              <p className="cstudio-privacy">
                <SmartIcon name="Shield" size={14} />
                {privacyTip}
              </p>
            ) : null}
          </div>
        ) : (
          /* ── Workspace: two-panel workbench ── */
          <div className="cstudio-workspace">
            <div className="cstudio-rail">
              {/* Source card */}
              <section className="cstudio-card">
                <div className="cstudio-card-head">
                  <span className="cstudio-card-icon">
                    <SmartIcon name="Image" size={15} />
                  </span>
                  <h2 className="cstudio-card-title">{sourceCardTitle}</h2>
                  <span className="cstudio-card-spacer" />
                  {replaceLabel && onReplace ? (
                    <button
                      type="button"
                      className="cstudio-card-action"
                      onClick={onReplace}
                    >
                      {replaceLabel}
                    </button>
                  ) : null}
                </div>
                {sourceUrl ? (
                  <div className="cstudio-source-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sourceUrl}
                      alt={
                        typeof sourceName === "string" ? sourceName : "source"
                      }
                      className="cstudio-source-img"
                    />
                  </div>
                ) : null}
                <div className="cstudio-source-meta">
                  <span className="cstudio-source-meta-label">
                    {sourceMetaLabel}
                  </span>
                  <span className="cstudio-source-meta-value">
                    {sourceName || "—"}
                    {sourceSizeBytes
                      ? ` · ${formatBytes(sourceSizeBytes)}`
                      : ""}
                    {sourceWidth && sourceHeight
                      ? ` · ${sourceWidth}×${sourceHeight}`
                      : ""}
                  </span>
                </div>
              </section>

              {/* Settings card */}
              <section className="cstudio-card">
                <div className="cstudio-card-head">
                  <span className="cstudio-card-icon">
                    <SmartIcon name="Layers" size={15} />
                  </span>
                  <h2 className="cstudio-card-title">{settingsCardTitle}</h2>
                </div>
                {formatLabel ? (
                  <h3 className="cstudio-field-label">{formatLabel}</h3>
                ) : null}
                <div className="cstudio-formats">
                  {formatOptions.map((option) => {
                    const active = option.value === format;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          "cstudio-format",
                          active && "cstudio-format-active",
                        )}
                        onClick={() => onFormatChange(option.value)}
                      >
                        <span className="cstudio-format-name">
                          {option.label}
                        </span>
                        <span className="cstudio-format-desc">
                          {option.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="cstudio-quality-head">
                  <span className="cstudio-quality-label">{qualityLabel}</span>
                  <span className="cstudio-quality-value">{qualityValue}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={1}
                  value={qualityValue}
                  onChange={(event) =>
                    onQualityChange(Number(event.target.value))
                  }
                  className="cstudio-slider"
                  aria-label={
                    typeof qualityLabel === "string" ? qualityLabel : "quality"
                  }
                />
                {onAutoFit2MB ? (
                  <button
                    type="button"
                    onClick={onAutoFit2MB}
                    className="cstudio-otf"
                  >
                    <span className="cstudio-otf-magic">✦</span>
                    <span>{autoFitLabel}</span>
                  </button>
                ) : null}
                <div className="cstudio-quality-endpoints">
                  <span>{smallerLabel}</span>
                  <span>{betterLabel}</span>
                </div>
              </section>

              {/* Results card */}
              <section className="cstudio-card">
                <div className="cstudio-card-head">
                  <span className="cstudio-card-icon">
                    <SmartIcon name="Shrink" size={15} />
                  </span>
                  <h2 className="cstudio-card-title">{resultsCardTitle}</h2>
                </div>
                <div className="cstudio-results">
                  <div className="cstudio-result-row">
                    <span className="cstudio-result-label">
                      {originalLabel}
                    </span>
                    <span className="cstudio-result-value">
                      {formatBytes(sourceSizeBytes)}
                    </span>
                  </div>
                  <div className="cstudio-result-row">
                    <span className="cstudio-result-label">
                      {compressedLabel}
                    </span>
                    <span className="cstudio-result-value cstudio-result-value-accent">
                      {processing && !compressedSizeBytes
                        ? "…"
                        : formatBytes(compressedSizeBytes)}
                    </span>
                  </div>
                  <div className="cstudio-result-row cstudio-result-row-saved">
                    <span className="cstudio-result-label">{savedLabel}</span>
                    <span
                      className={cn(
                        "cstudio-result-saved",
                        savedPositive && "cstudio-result-saved-positive",
                      )}
                    >
                      {savedPositive ? `−${saved}%` : "—"}
                    </span>
                  </div>
                </div>
                {meterRatio > 0 ? (
                  <div className="cstudio-meter">
                    <div className="cstudio-meter-track">
                      <div
                        className="cstudio-meter-fill"
                        style={{ width: `${meterRatio}%` }}
                      />
                    </div>
                    <div className="cstudio-meter-scale">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                ) : null}
              </section>
            </div>

            <div className="cstudio-stage">
              {/* Before / after comparison */}
              <section className="cstudio-card cstudio-card-stage">
                <div className="cstudio-card-head">
                  <span className="cstudio-card-icon">
                    <SmartIcon name="EyeOpened" size={15} />
                  </span>
                  <h2 className="cstudio-card-title">{stageCardTitle}</h2>
                  <span className="cstudio-card-spacer" />
                  {compressedSizeBytes && sourceSizeBytes ? (
                    <span
                      className={cn(
                        "cstudio-savings-badge",
                        savedPositive && "cstudio-savings-badge-positive",
                      )}
                    >
                      {savedPositive ? `−${saved}%` : "No savings"}
                    </span>
                  ) : null}
                </div>
                <div className="cstudio-compare">
                  <div className="cstudio-compare-panel">
                    <div className="cstudio-compare-head">
                      <span className="cstudio-compare-label">
                        {beforeLabel}
                      </span>
                      <span className="cstudio-compare-size">
                        {formatBytes(sourceSizeBytes)}
                      </span>
                    </div>
                    {sourceUrl ? (
                      <div className="cstudio-compare-media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sourceUrl}
                          alt={
                            typeof beforeLabel === "string"
                              ? beforeLabel
                              : "before"
                          }
                          className="cstudio-compare-img"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="cstudio-compare-panel">
                    <div className="cstudio-compare-head">
                      <span className="cstudio-compare-label">
                        {afterLabel}
                      </span>
                      <span className="cstudio-compare-size">
                        {formatBytes(compressedSizeBytes)}
                      </span>
                    </div>
                    <div className="cstudio-compare-media">
                      {compressedUrl ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={compressedUrl}
                            alt={
                              typeof afterLabel === "string"
                                ? afterLabel
                                : "after"
                            }
                            className="cstudio-compare-img"
                          />
                          {processing ? (
                            <span className="cstudio-compare-busy">
                              <SmartIcon name="RefreshCw" size={13} />…
                            </span>
                          ) : null}
                        </>
                      ) : (
                        <div className="cstudio-compare-loading">
                          <SmartIcon name="RefreshCw" size={20} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* 2MB gauge */}
              {limitState !== "idle" ? (
                <div
                  className={cn(
                    "cstudio-limit",
                    limitState === "ok"
                      ? "cstudio-limit-ok"
                      : "cstudio-limit-over",
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
              <section className="cstudio-card cstudio-card-export">
                <div className="cstudio-card-head">
                  <span className="cstudio-card-icon">
                    <SmartIcon name="Download" size={15} />
                  </span>
                  <h2 className="cstudio-card-title">{exportCardTitle}</h2>
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="cstudio-download"
                  onClick={onDownload}
                  disabled={busy || !compressedUrl}
                  loading={Boolean(busy)}
                >
                  <SmartIcon name="Download" size={17} />
                  <span>
                    {downloadLabel
                      ? downloadLabel
                      : `Download Compressed ${extension}`}
                  </span>
                </Button>
                {downloadHint ? (
                  <p className="cstudio-download-hint">{downloadHint}</p>
                ) : null}
                {error ? <div className="cstudio-error">{error}</div> : null}
              </section>

              {footerHint ? (
                <p className="cstudio-footer-hint">{footerHint}</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CompressWorkbench;
