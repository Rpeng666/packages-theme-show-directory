"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Input as SemiInput } from "@douyinfe/semi-ui";
import type {
  ResizeWorkbenchFormat,
  ResizeWorkbenchProps,
  ResizeWorkbenchQualityCheck,
} from "@template/ui";

import { Button } from "../components/button";
import { SmartIcon } from "../icons";

/**
 * Semi ResizeWorkbench - a designer-grade thumbnail resize studio.
 *
 * Visual language shared with the AI studios: a compact amber "precision"
 * hero, a guided empty state (gradient dropzone + YouTube URL), then a
 * two-panel workbench - a left control rail (source card with a live quality
 * checklist, platform presets and custom dimensions) and a right stage
 * (checkerboard canvas preview, multi-size strip and the export dock with
 * format segmented control + single / ZIP downloads). All data + callbacks
 * come from the app; this section only renders.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const EXTENSION: Record<ResizeWorkbenchFormat, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

const CHECK_ICON: Record<ResizeWorkbenchQualityCheck["status"], string> = {
  ok: "CheckCircle",
  warn: "Warning",
  error: "Alert",
};

function CanvasPreview({
  sourceUrl,
  width,
  height,
  label,
}: {
  sourceUrl: string;
  width: number;
  height: number;
  label?: ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setLoaded(true);
    };
    img.src = sourceUrl;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [sourceUrl, width, height]);

  const scale = Math.min(1, 560 / width);
  const displayWidth = Math.round(width * scale);
  const displayHeight = Math.round(height * scale);

  return (
    <div className="rstudio-canvas-wrap">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ width: displayWidth, height: displayHeight, maxWidth: "100%" }}
        aria-label={typeof label === "string" ? label : undefined}
      />
    </div>
  );
}

export function ResizeWorkbench({
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
  dividerLabel,
  youtubePlaceholder,
  youtubeFetchLabel,
  youtubeBusy,
  onYouTubeSubmit,
  sourceUrl,
  sourceWidth = 0,
  sourceHeight = 0,
  fileSizeBytes,
  sourceCardTitle,
  sourceMetaLabel,
  qualityCardTitle,
  qualityChecks = [],
  replaceLabel,
  onReplace,
  onDropFile,
  previewLinkLabel,
  editorLinkLabel,
  onOpenPreview,
  onOpenEditor,
  targetCardTitle,
  platforms = [],
  activeWidth,
  activeHeight,
  onPresetSelect,
  customCardTitle,
  widthLabel,
  heightLabel,
  aspectLocked,
  onToggleAspectLock,
  onWidthChange,
  onHeightChange,
  sliderMax,
  outputLabel,
  previewCardTitle,
  canvasLabel,
  multiSizeLabel,
  exportCardTitle,
  formatOptions,
  format,
  onFormatChange,
  downloadLabel,
  downloadAllLabel,
  downloadAllLoadingLabel,
  downloadAllHint,
  downloadingAll,
  busy,
  onDownload,
  onDownloadAll,
  error,
  footerHint,
}: ResizeWorkbenchProps) {
  const [youtubeInput, setYoutubeInput] = useState("");
  const [dragging, setDragging] = useState(false);
  const [activePlatform, setActivePlatform] = useState(
    platforms.length > 0 ? platforms[0].id : "",
  );
  const hasSource = Boolean(sourceUrl);
  const extension = EXTENSION[format];

  const handleYouTubeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (youtubeInput.trim() && onYouTubeSubmit) {
      onYouTubeSubmit(youtubeInput.trim());
    }
  };

  const activePlatformData = platforms.find((p) => p.id === activePlatform);

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
    <section className={cn("rstudio", className)} data-registry={dataRegistry}>
      <div className="rstudio-shell">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header className="rstudio-hero">
          <div className="rstudio-hero-mesh" aria-hidden />
          <div className="rstudio-hero-glow" aria-hidden />
          <div className="rstudio-hero-inner">
            {eyebrow ? (
              <div className="rstudio-eyebrow">
                <span className="rstudio-eyebrow-dot" />
                <span>{eyebrow}</span>
              </div>
            ) : null}
            {title ? <h1 className="rstudio-title">{title}</h1> : null}
            {description ? <p className="rstudio-desc">{description}</p> : null}
            {badges && badges.length > 0 ? (
              <div className="rstudio-hero-badges">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className={cn(
                      "rstudio-badge",
                      badge.tone === "free"
                        ? "rstudio-badge-free"
                        : badge.tone === "pro"
                          ? "rstudio-badge-pro"
                          : "rstudio-badge-neutral",
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            ) : null}
            {meta && meta.length > 0 ? (
              <div className="rstudio-hero-meta">
                {meta.map((item, index) => (
                  <span key={index} className="rstudio-meta-chip">
                    <SmartIcon name={item.icon} size={13} />
                    <span>{item.text}</span>
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        {/* ── Empty state ──────────────────────────────────────────────── */}
        {!hasSource ? (
          <div className="rstudio-empty">
            <div
              className={cn(
                "rstudio-dropzone",
                dragging && "rstudio-dropzone-drag",
              )}
              role="button"
              tabIndex={0}
              onClick={onReplace}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onReplace?.();
                }
              }}
            >
              <div className="rstudio-dropzone-ring" aria-hidden />
              <div className="rstudio-dropzone-icon">
                <SmartIcon name="Upload" size={26} />
              </div>
              <div className="rstudio-dropzone-primary">{emptyPrimary}</div>
              <div className="rstudio-dropzone-click">{emptyClickLabel}</div>
              {emptyHint ? (
                <div className="rstudio-dropzone-hint">{emptyHint}</div>
              ) : null}
            </div>

            {dividerLabel ? (
              <div className="rstudio-divider">
                <span className="rstudio-divider-line" />
                <span className="rstudio-divider-label">{dividerLabel}</span>
                <span className="rstudio-divider-line" />
              </div>
            ) : null}

            <form className="rstudio-youtube" onSubmit={handleYouTubeSubmit}>
              <SemiInput
                value={youtubeInput}
                onChange={(value) => setYoutubeInput(value)}
                placeholder={youtubePlaceholder}
                prefix={<SmartIcon name="Link" size={14} />}
                className="rstudio-youtube-input"
              />
              <Button
                type="submit"
                disabled={
                  !youtubeInput.trim() || Boolean(busy) || Boolean(youtubeBusy)
                }
                loading={Boolean(busy) || Boolean(youtubeBusy)}
              >
                {youtubeFetchLabel}
              </Button>
            </form>

            {privacyTip ? (
              <div className="rstudio-privacy">
                <SmartIcon name="Shield" size={14} />
                <span>{privacyTip}</span>
              </div>
            ) : null}

            {error ? <div className="rstudio-error">{error}</div> : null}
          </div>
        ) : (
          /* ── Workbench ─────────────────────────────────────────────── */
          <div className="rstudio-workspace">
            {/* Left: control rail */}
            <div className="rstudio-rail">
              {/* Source card */}
              <section className="rstudio-card">
                <div className="rstudio-card-head">
                  <span className="rstudio-card-icon">
                    <SmartIcon name="ImageIcon" size={15} />
                  </span>
                  <h2 className="rstudio-card-title">{sourceCardTitle}</h2>
                  <span className="rstudio-card-spacer" />
                  {onReplace ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="rstudio-card-action"
                      onClick={onReplace}
                    >
                      <SmartIcon name="Refresh" size={13} />
                      <span>{replaceLabel}</span>
                    </Button>
                  ) : null}
                </div>
                <div className="rstudio-source-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sourceUrl || undefined}
                    alt=""
                    className="rstudio-source-img"
                  />
                </div>
                <div className="rstudio-source-meta">
                  <span className="rstudio-source-meta-label">
                    {sourceMetaLabel}
                  </span>
                  <span className="rstudio-source-meta-value">
                    {sourceWidth} × {sourceHeight}
                    {fileSizeBytes ? ` · ${formatBytes(fileSizeBytes)}` : ""}
                  </span>
                </div>
                {onOpenPreview || onOpenEditor ? (
                  <div className="rstudio-source-links">
                    {onOpenPreview ? (
                      <button
                        type="button"
                        className="rstudio-source-link"
                        onClick={onOpenPreview}
                      >
                        <SmartIcon name="EyeOpened" size={13} />
                        <span>{previewLinkLabel}</span>
                      </button>
                    ) : null}
                    {onOpenEditor ? (
                      <button
                        type="button"
                        className="rstudio-source-link rstudio-source-link-accent"
                        onClick={onOpenEditor}
                      >
                        <SmartIcon name="Edit" size={13} />
                        <span>{editorLinkLabel}</span>
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </section>

              {/* Quality checklist */}
              {qualityChecks.length > 0 ? (
                <section className="rstudio-card">
                  <div className="rstudio-card-head">
                    <span className="rstudio-card-icon">
                      <SmartIcon name="CheckList" size={15} />
                    </span>
                    <h2 className="rstudio-card-title">{qualityCardTitle}</h2>
                  </div>
                  <ul className="rstudio-checks">
                    {qualityChecks.map((check, index) => (
                      <li
                        key={index}
                        className={cn(
                          "rstudio-check",
                          `rstudio-check-${check.status}`,
                        )}
                      >
                        <span className="rstudio-check-icon">
                          <SmartIcon
                            name={CHECK_ICON[check.status]}
                            size={14}
                          />
                        </span>
                        <span className="rstudio-check-label">
                          {check.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* Target size */}
              <section className="rstudio-card">
                <div className="rstudio-card-head">
                  <span className="rstudio-card-icon">
                    <SmartIcon name="Crop" size={15} />
                  </span>
                  <h2 className="rstudio-card-title">{targetCardTitle}</h2>
                </div>
                {platforms.length > 1 ? (
                  <div className="rstudio-platforms" role="tablist">
                    {platforms.map((platform) => {
                      const active = platform.id === activePlatform;
                      return (
                        <button
                          key={platform.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          className={cn(
                            "rstudio-platform",
                            active && "rstudio-platform-active",
                          )}
                          onClick={() => setActivePlatform(platform.id)}
                        >
                          <SmartIcon name={platform.icon} size={14} />
                          <span>{platform.name}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
                <div className="rstudio-presets">
                  {(activePlatformData?.presets || []).map((preset) => {
                    const active =
                      preset.width === activeWidth &&
                      preset.height === activeHeight;
                    return (
                      <button
                        key={`${preset.width}x${preset.height}`}
                        type="button"
                        className={cn(
                          "rstudio-preset",
                          active && "rstudio-preset-active",
                        )}
                        onClick={() =>
                          onPresetSelect?.(preset.width, preset.height)
                        }
                      >
                        <span className="rstudio-preset-name">
                          {preset.label}
                        </span>
                        <span className="rstudio-preset-size">
                          {preset.width}×{preset.height}
                        </span>
                        <span className="rstudio-preset-ratio">
                          {preset.ratio}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Custom dimensions */}
              <section className="rstudio-card">
                <div className="rstudio-card-head">
                  <span className="rstudio-card-icon">
                    <SmartIcon name="Edit" size={15} />
                  </span>
                  <h2 className="rstudio-card-title">{customCardTitle}</h2>
                </div>
                <div className="rstudio-dims">
                  <div className="rstudio-dim">
                    <span className="rstudio-dim-label">{widthLabel}</span>
                    <SemiInput
                      type="number"
                      min={1}
                      max={7680}
                      value={String(activeWidth)}
                      onChange={(value) => {
                        const num = Number(value);
                        if (Number.isFinite(num) && num > 0) onWidthChange(num);
                      }}
                      className="rstudio-dim-input"
                    />
                  </div>
                  <button
                    type="button"
                    className={cn(
                      "rstudio-lock",
                      aspectLocked && "rstudio-lock-active",
                    )}
                    onClick={onToggleAspectLock}
                    aria-label={
                      aspectLocked ? "Unlock aspect ratio" : "Lock aspect ratio"
                    }
                    title={
                      aspectLocked ? "Unlock aspect ratio" : "Lock aspect ratio"
                    }
                  >
                    <SmartIcon
                      name={aspectLocked ? "Lock" : "Unlock"}
                      size={16}
                    />
                  </button>
                  <div className="rstudio-dim">
                    <span className="rstudio-dim-label">{heightLabel}</span>
                    <SemiInput
                      type="number"
                      min={1}
                      max={4320}
                      value={String(activeHeight)}
                      onChange={(value) => {
                        const num = Number(value);
                        if (Number.isFinite(num) && num > 0)
                          onHeightChange(num);
                      }}
                      className="rstudio-dim-input"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  className="rstudio-slider"
                  min={16}
                  max={Math.max(sliderMax || 2560, activeWidth, 2560)}
                  step={1}
                  value={activeWidth}
                  onChange={(event) =>
                    onWidthChange(Number(event.target.value))
                  }
                />
                <div className="rstudio-output">
                  <span className="rstudio-output-label">{outputLabel}</span>
                  <span className="rstudio-output-tag">
                    {activeWidth} × {activeHeight} px
                  </span>
                </div>
              </section>
            </div>

            {/* Right: stage */}
            <div className="rstudio-stage">
              {/* Canvas preview */}
              <section className="rstudio-card rstudio-card-stage">
                <div className="rstudio-card-head">
                  <span className="rstudio-card-icon">
                    <SmartIcon name="EyeOpened" size={15} />
                  </span>
                  <h2 className="rstudio-card-title">{previewCardTitle}</h2>
                  <span className="rstudio-card-spacer" />
                  <span className="rstudio-size-chip">
                    {activeWidth} × {activeHeight}
                  </span>
                </div>
                <div className="rstudio-checkerboard">
                  {sourceUrl ? (
                    <CanvasPreview
                      sourceUrl={sourceUrl}
                      width={activeWidth}
                      height={activeHeight}
                      label={canvasLabel}
                    />
                  ) : null}
                </div>
              </section>

              {/* Multi-size strip */}
              {multiSizeLabel ? (
                <section className="rstudio-card rstudio-card-stage">
                  <div className="rstudio-card-head">
                    <span className="rstudio-card-icon">
                      <SmartIcon name="GridSquare" size={15} />
                    </span>
                    <h2 className="rstudio-card-title">{multiSizeLabel}</h2>
                  </div>
                  <div className="rstudio-multisize">
                    {[
                      { w: 1280, h: 720, label: "1280×720" },
                      { w: 640, h: 480, label: "640×480" },
                      { w: 480, h: 360, label: "480×360" },
                      { w: 320, h: 180, label: "320×180" },
                    ].map((size) => (
                      <div key={size.label} className="rstudio-multisize-item">
                        <div className="rstudio-multisize-media">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={sourceUrl || undefined}
                            alt=""
                            className="rstudio-multisize-img"
                          />
                        </div>
                        <span className="rstudio-multisize-label">
                          {size.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {/* Export dock */}
              <section className="rstudio-card rstudio-card-export">
                <div className="rstudio-card-head">
                  <span className="rstudio-card-icon">
                    <SmartIcon name="Download" size={15} />
                  </span>
                  <h2 className="rstudio-card-title">{exportCardTitle}</h2>
                </div>
                <div className="rstudio-formats">
                  {formatOptions.map((option) => {
                    const active = option.value === format;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          "rstudio-format",
                          active && "rstudio-format-active",
                        )}
                        onClick={() => onFormatChange(option.value)}
                      >
                        <span className="rstudio-format-name">
                          {option.label}
                        </span>
                        <span className="rstudio-format-desc">
                          {option.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="rstudio-download"
                  onClick={onDownload}
                  disabled={busy}
                >
                  <SmartIcon name="Download" size={17} />
                  <span>
                    {downloadLabel
                      ? downloadLabel(activeWidth, activeHeight, extension)
                      : `Download ${activeWidth}×${activeHeight} ${extension}`}
                  </span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="rstudio-download rstudio-download-all"
                  onClick={onDownloadAll}
                  disabled={Boolean(downloadingAll) || busy}
                  loading={Boolean(downloadingAll)}
                >
                  {downloadingAll ? downloadAllLoadingLabel : downloadAllLabel}
                </Button>
                {downloadAllHint ? (
                  <p className="rstudio-download-hint">{downloadAllHint}</p>
                ) : null}
                {error ? <div className="rstudio-error">{error}</div> : null}
              </section>

              {footerHint ? (
                <p className="rstudio-footer-hint">{footerHint}</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
