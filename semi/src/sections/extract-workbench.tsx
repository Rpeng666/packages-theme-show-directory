"use client";

import * as React from "react";
import { useState } from "react";
import type { ReactNode } from "react";
import type { ExtractWorkbenchProps } from "@template/ui";

import { Button } from "../components/button";
import { SmartIcon } from "../icons";

/**
 * Semi ExtractWorkbench - a designer-grade video frame extraction studio.
 *
 * Visual language shared with the AI studios: an indigo "freeze-frame" hero,
 * a guided empty state (gradient dropzone + privacy tip), then a two-panel
 * workbench - a left stage with the video player, transport bar (play/pause
 * + scrub timeline) and the capture CTA, and a right rail with the captured
 * frame preview, the export dock and the "improve this frame" tips. All data
 * + callbacks come from the app; this section only renders.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatTime(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
    <section className={cn("xstudio", className)} data-registry={dataRegistry}>
      <div className="xstudio-shell">
        {/* ── Hero: indigo freeze-frame strip ── */}
        <header className="xstudio-hero">
          <div className="xstudio-hero-mesh" />
          <div className="xstudio-hero-glow" />
          <div className="xstudio-hero-inner">
            {eyebrow ? (
              <span className="xstudio-eyebrow">
                <span className="xstudio-eyebrow-dot" />
                {eyebrow}
              </span>
            ) : null}
            {title ? <h1 className="xstudio-title">{title}</h1> : null}
            {description ? <p className="xstudio-desc">{description}</p> : null}
            {badges && badges.length > 0 ? (
              <div className="xstudio-hero-badges">
                {badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={cn(
                      "xstudio-badge",
                      badge.tone === "pro"
                        ? "xstudio-badge-pro"
                        : badge.tone === "neutral"
                          ? "xstudio-badge-neutral"
                          : "xstudio-badge-free",
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            ) : null}
            {meta && meta.length > 0 ? (
              <div className="xstudio-hero-meta">
                {meta.map((item) => (
                  <span key={item.text} className="xstudio-meta-chip">
                    <SmartIcon name={item.icon} size={14} />
                    {item.text}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        {!hasSource ? (
          /* ── Empty state ── */
          <div className="xstudio-empty">
            <button
              type="button"
              className={cn(
                "xstudio-dropzone",
                dragging && "xstudio-dropzone-drag",
              )}
              onClick={onReplace}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span className="xstudio-dropzone-ring" />
              <span className="xstudio-dropzone-icon">
                <SmartIcon name="Video" size={26} />
              </span>
              {emptyPrimary ? (
                <span className="xstudio-dropzone-primary">{emptyPrimary}</span>
              ) : null}
              {emptyClickLabel ? (
                <span className="xstudio-dropzone-click">
                  {emptyClickLabel}
                </span>
              ) : null}
              {emptyHint ? (
                <span className="xstudio-dropzone-hint">{emptyHint}</span>
              ) : null}
            </button>
            {privacyTip ? (
              <p className="xstudio-privacy">
                <SmartIcon name="Shield" size={14} />
                {privacyTip}
              </p>
            ) : null}
          </div>
        ) : (
          /* ── Workspace: stage (player) + rail (frame / export) ── */
          <div className="xstudio-workspace">
            <div className="xstudio-stage">
              <section className="xstudio-card xstudio-card-player">
                <div className="xstudio-card-head">
                  <span className="xstudio-card-icon">
                    <SmartIcon name="Play" size={15} />
                  </span>
                  <h2 className="xstudio-card-title">{stageCardTitle}</h2>
                  <span className="xstudio-card-spacer" />
                  {videoName ? (
                    <span className="xstudio-card-tag" title={videoName}>
                      {videoName}
                    </span>
                  ) : null}
                </div>

                <div className="xstudio-player">
                  <video
                    ref={videoRef}
                    src={videoUrl ?? undefined}
                    className="xstudio-player-video"
                    playsInline
                    onTimeUpdate={(event) =>
                      onTimeUpdate?.(event.currentTarget.currentTime)
                    }
                    onLoadedMetadata={(event) =>
                      onLoadedMetadata?.(event.currentTarget.duration)
                    }
                    onEnded={onEnded}
                  />
                  {!playing ? (
                    <button
                      type="button"
                      className="xstudio-player-overlay"
                      onClick={onTogglePlay}
                      aria-label="Play"
                    >
                      <span className="xstudio-player-play">
                        <SmartIcon name="Play" size={22} />
                      </span>
                    </button>
                  ) : null}
                </div>

                <div className="xstudio-transport">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="xstudio-transport-btn"
                    onClick={onTogglePlay}
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    <SmartIcon name={playing ? "Pause" : "Play"} size={15} />
                  </Button>
                  <span className="xstudio-transport-time">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={Math.min(currentTime, duration || 100)}
                    onChange={(event) => onSeek?.(Number(event.target.value))}
                    className="xstudio-slider"
                    aria-label="Seek"
                  />
                  <span className="xstudio-transport-time">
                    {formatTime(duration)}
                  </span>
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="xstudio-capture"
                  onClick={onCapture}
                  disabled={capturing}
                  loading={Boolean(capturing)}
                >
                  <SmartIcon name="Camera" size={17} />
                  <span>{captureLabel}</span>
                </Button>
                {captureHint ? (
                  <p className="xstudio-capture-hint">{captureHint}</p>
                ) : null}
              </section>
            </div>

            <div className="xstudio-rail">
              {/* Captured frame */}
              <section className="xstudio-card">
                <div className="xstudio-card-head">
                  <span className="xstudio-card-icon">
                    <SmartIcon name="ImageIcon" size={15} />
                  </span>
                  <h2 className="xstudio-card-title">{frameCardTitle}</h2>
                  <span className="xstudio-card-spacer" />
                  {frameResolutionLabel ? (
                    <span className="xstudio-card-tag">
                      {frameResolutionLabel}
                    </span>
                  ) : null}
                </div>
                {frameUrl ? (
                  <div className="xstudio-frame-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={frameUrl}
                      alt={
                        typeof frameCardTitle === "string"
                          ? frameCardTitle
                          : "Captured frame"
                      }
                      className="xstudio-frame-img"
                    />
                  </div>
                ) : (
                  <div className="xstudio-frame-empty">
                    <SmartIcon name="ImageIcon" size={22} />
                    <span>{framePlaceholder}</span>
                  </div>
                )}
              </section>

              {/* Export dock */}
              <section className="xstudio-card xstudio-card-export">
                <div className="xstudio-card-head">
                  <span className="xstudio-card-icon">
                    <SmartIcon name="Download" size={15} />
                  </span>
                  <h2 className="xstudio-card-title">{exportCardTitle}</h2>
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="xstudio-download"
                  onClick={onDownload}
                  disabled={!frameUrl}
                >
                  <SmartIcon name="Download" size={17} />
                  <span>{downloadLabel}</span>
                </Button>
                {downloadHint ? (
                  <p className="xstudio-download-hint">{downloadHint}</p>
                ) : null}
              </section>

              {/* Improve tips */}
              {tips && tips.length > 0 ? (
                <section className="xstudio-card">
                  <div className="xstudio-card-head">
                    <span className="xstudio-card-icon">
                      <SmartIcon name="Sparkles" size={15} />
                    </span>
                    <h2 className="xstudio-card-title">{tipsTitle}</h2>
                  </div>
                  <ul className="xstudio-tips">
                    {tips.map((tip) => (
                      <li key={tip.href}>
                        <a className="xstudio-tip-link" href={tip.href}>
                          <SmartIcon name="ArrowRight" size={13} />
                          <span>{tip.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {footerHint ? (
                <p className="xstudio-footer-hint">{footerHint}</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExtractWorkbench;
