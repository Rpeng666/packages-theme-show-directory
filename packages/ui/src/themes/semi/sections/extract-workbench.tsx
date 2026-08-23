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
  gridCardTitle,
  gridHint,
  gridCountLabel,
  gridCount = 9,
  onGridCountChange,
  gridUrl,
  onCaptureGrid,
  gridCapturing,
  downloadGridLabel,
  onDownloadGrid,
  exportCardTitle,
  downloadLabel,
  downloadHint,
  onDownload,
  openInWorkbenchLabel,
  onOpenInWorkbench,
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
    <section className={cn("relative overflow-hidden py-12", className)} data-registry={dataRegistry}>
      <div className="px-4">
        {/* ── Hero: indigo freeze-frame strip (only when copy provided) ── */}
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
                "radial-gradient(460px 320px at 22% 18%, rgba(var(--semi-indigo-5),0.16), transparent 70%), radial-gradient(520px 360px at 80% 26%, rgba(var(--semi-purple-4),0.12), transparent 70%)",
            }}
          />
          <div className="relative z-[1] max-w-[640px]">
            {eyebrow ? (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(var(--semi-indigo-1),0.7)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[rgb(var(--semi-indigo-6))]">
                <span className="h-2 w-2 rounded-full bg-[rgb(var(--semi-indigo-5))] animate-[xstudio-pulse_1.8s_ease-in-out_infinite]" />
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
                          : "bg-[rgba(var(--semi-indigo-1),0.7)] text-[rgb(var(--semi-indigo-6))] border-[rgba(var(--semi-indigo-5),0.25)]",
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
                "relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[24px] border-2 border-dashed border-[rgba(var(--semi-indigo-5),0.4)] bg-[linear-gradient(180deg,rgba(var(--semi-indigo-0),0.45),var(--semi-color-bg-1))] px-[18px] py-7 text-center transition-[border-color,background,transform] duration-[200ms]",
                dragging && "scale-[1.005] border-[rgb(var(--semi-indigo-5))] bg-[linear-gradient(180deg,rgba(var(--semi-indigo-0),0.9),var(--semi-color-bg-1))]",
              )}
              onClick={onReplace}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span className="pointer-events-none absolute h-[200px] w-[200px] rounded-full border border-[rgba(var(--semi-indigo-5),0.18)] animate-[xstudio-ring-pulse_3s_ease-in-out_infinite]" />
              <span className="relative mb-2.5 inline-flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,rgb(var(--semi-indigo-5)),rgb(var(--semi-purple-4)))] text-white shadow-[0_16px_36px_-14px_rgba(var(--semi-indigo-5),0.65)]">
                <SmartIcon name="Video" size={26} />
              </span>
              {emptyPrimary ? <span className="relative text-[18px] font-bold text-[var(--semi-color-text-0)]">{emptyPrimary}</span> : null}
              {emptyClickLabel ? <span className="relative text-[14px] font-semibold text-[rgb(var(--semi-indigo-6))]">{emptyClickLabel}</span> : null}
              {emptyHint ? <span className="relative mt-1.5 text-xs text-[var(--semi-color-text-3)]">{emptyHint}</span> : null}
            </button>
            {privacyTip ? (
              <p className="mt-[18px] flex items-center justify-center gap-[7px] text-xs text-[var(--semi-color-text-3)]">
                <SmartIcon name="Shield" size={14} />
                {privacyTip}
              </p>
            ) : null}

            {/* ── Capability preview: what frame extraction gets you ── */}
            <div className="mt-6 border-t border-[var(--semi-color-border)] pt-5">
              <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-3">
                <span className="text-[13px] font-bold tracking-[0.02em] text-[var(--semi-color-text-0)]">Turn any video into a thumbnail</span>
                <span className="text-xs font-semibold tracking-[0.04em] text-[var(--semi-color-text-3)]">MP4 · MOV · WebM · AVI</span>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3 sm:grid-cols-1">
                <div className="flex flex-col gap-1 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-2)] p-3 px-3.5">
                  <span className="text-[13px] font-bold text-[var(--semi-color-text-0)]">Scrub any frame</span>
                  <span className="text-xs text-[var(--semi-color-text-3)]">Step through the video frame by frame</span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-2)] p-3 px-3.5">
                  <span className="text-[13px] font-bold text-[var(--semi-color-text-0)]">Key moments</span>
                  <span className="text-xs text-[var(--semi-color-text-3)]">Grab the perfect expression or action</span>
                </div>
                <div className="flex flex-col gap-1 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-2)] p-3 px-3.5">
                  <span className="text-[13px] font-bold text-[var(--semi-color-text-0)]">Open in editor</span>
                  <span className="text-xs text-[var(--semi-color-text-3)]">Send a frame straight to the workbench</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── Workspace: stage (player) + rail (frame / export) ── */
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_400px]">
            <div className="min-w-0">
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-indigo-1),0.7)] text-[rgb(var(--semi-indigo-7))]">
                    <SmartIcon name="Play" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{stageCardTitle}</h2>
                  <span className="flex-1" />
                  {videoName ? <span className="truncate rounded-full bg-[var(--semi-color-fill-0)] px-2.5 py-1 text-xs font-semibold text-[var(--semi-color-text-2)]" title={videoName}>{videoName}</span> : null}
                </div>

                <div className="relative overflow-hidden rounded-[14px] bg-black aspect-video">
                  <video
                    ref={videoRef}
                    src={videoUrl ?? undefined}
                    className="h-full w-full object-contain"
                    playsInline
                    onTimeUpdate={(event) => onTimeUpdate?.(event.currentTarget.currentTime)}
                    onLoadedMetadata={(event) => onLoadedMetadata?.(event.currentTarget.duration)}
                    onEnded={onEnded}
                  />
                  {!playing ? (
                    <button type="button" className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30" onClick={onTogglePlay} aria-label="Play">
                      <span className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-white/90 text-[rgb(var(--semi-indigo-6))] shadow-lg">{<SmartIcon name="Play" size={22} />}</span>
                    </button>
                  ) : null}
                </div>

                <div className="mt-3 flex items-center gap-2.5">
                  <Button type="button" size="icon" variant="outline" onClick={onTogglePlay} aria-label={playing ? "Pause" : "Play"}>
                    <SmartIcon name={playing ? "Pause" : "Play"} size={15} />
                  </Button>
                  <span className="text-xs font-semibold tabular-nums text-[var(--semi-color-text-2)]">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={Math.min(currentTime, duration || 100)}
                    onChange={(event) => onSeek?.(Number(event.target.value))}
                    className="flex-1 cursor-pointer accent-[rgb(var(--semi-indigo-5))]"
                    aria-label="Seek"
                  />
                  <span className="text-xs font-semibold tabular-nums text-[var(--semi-color-text-2)]">{formatTime(duration)}</span>
                </div>

                <Button type="button" size="lg" className="mt-3 w-full" onClick={onCapture} disabled={capturing} loading={Boolean(capturing)}>
                  <SmartIcon name="Camera" size={17} />
                  <span>{captureLabel}</span>
                </Button>
                {captureHint ? <p className="m-0 mt-2.5 text-center text-xs text-[var(--semi-color-text-3)]">{captureHint}</p> : null}
              </section>
            </div>

            <div className="flex flex-col gap-4">
              {/* Captured frame */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-indigo-1),0.7)] text-[rgb(var(--semi-indigo-7))]">
                    <SmartIcon name="ImageIcon" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{frameCardTitle}</h2>
                  <span className="flex-1" />
                  {frameResolutionLabel ? <span className="rounded-full bg-[var(--semi-color-fill-0)] px-2.5 py-1 text-xs font-semibold text-[var(--semi-color-text-2)]">{frameResolutionLabel}</span> : null}
                </div>
                {frameUrl ? (
                  <div className="overflow-hidden rounded-[14px] border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={frameUrl} alt={typeof frameCardTitle === "string" ? frameCardTitle : "Captured frame"} className="h-full w-full object-contain" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] py-10 text-[var(--semi-color-text-3)]">
                    <SmartIcon name="ImageIcon" size={22} />
                    <span className="text-xs font-semibold">{framePlaceholder}</span>
                  </div>
                )}
              </section>

              {/* Export dock */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-indigo-1),0.7)] text-[rgb(var(--semi-indigo-7))]">
                    <SmartIcon name="Download" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{exportCardTitle}</h2>
                </div>
                <Button type="button" size="lg" className="w-full" onClick={onDownload} disabled={!frameUrl}>
                  <SmartIcon name="Download" size={17} />
                  <span>{downloadLabel}</span>
                </Button>
                {onOpenInWorkbench ? (
                  <Button type="button" size="lg" variant="secondary" className="mt-2 w-full" onClick={onOpenInWorkbench} disabled={!frameUrl}>
                    <SmartIcon name="Edit" size={17} />
                    <span>{openInWorkbenchLabel}</span>
                  </Button>
                ) : null}
                {downloadHint ? <p className="m-0 mt-3 text-center text-xs text-[var(--semi-color-text-3)]">{downloadHint}</p> : null}
              </section>

              {/* One-click contact-sheet grid (N frames) */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-indigo-1),0.7)] text-[rgb(var(--semi-indigo-7))]">
                    <SmartIcon name="RiLayoutGridLine" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{gridCardTitle}</h2>
                </div>
                <p className="m-0 mb-3 text-xs text-[var(--semi-color-text-3)]">{gridHint}</p>
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="text-xs font-semibold text-[var(--semi-color-text-2)]">{gridCountLabel}</span>
                  <div className="flex gap-1.5">
                    {[6, 9, 12].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={cn("cursor-pointer rounded-lg border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] px-2.5 py-1 text-xs font-semibold text-[var(--semi-color-text-2)]", gridCount === n && "border-[rgba(var(--semi-indigo-5),0.45)] bg-[rgba(var(--semi-indigo-1),0.5)] text-[rgb(var(--semi-indigo-7))]")}
                        onClick={() => onGridCountChange?.(n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <Button type="button" size="lg" className="w-full" onClick={() => onCaptureGrid?.(gridCount)} disabled={!videoUrl || gridCapturing}>
                  <SmartIcon name="Layers" size={17} />
                  <span>{gridCapturing ? "…" : gridCardTitle}</span>
                </Button>
                {gridUrl ? (
                  <div className="relative mt-3 overflow-hidden rounded-[14px] border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={gridUrl} alt="Contact sheet grid" className="h-full w-full object-contain" />
                    {onDownloadGrid ? (
                      <Button type="button" size="sm" variant="secondary" className="absolute bottom-2 right-2" onClick={onDownloadGrid}>
                        <SmartIcon name="Download" size={14} />
                        <span>{downloadGridLabel}</span>
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </section>

              {/* Improve tips */}
              {tips && tips.length > 0 ? (
                <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(var(--semi-indigo-1),0.7)] text-[rgb(var(--semi-indigo-7))]">
                      <SmartIcon name="Sparkles" size={15} />
                    </span>
                    <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{tipsTitle}</h2>
                  </div>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {tips.map((tip) => (
                      <li key={tip.href}>
                        <a className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] px-3 py-2.5 text-xs font-semibold text-[var(--semi-color-text-1)] transition-[border-color] duration-[180ms] hover:border-[rgba(var(--semi-indigo-5),0.45)]" href={tip.href}>
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
          </div>
        )}
      </div>
    </section>
  );
}

export default ExtractWorkbench;
