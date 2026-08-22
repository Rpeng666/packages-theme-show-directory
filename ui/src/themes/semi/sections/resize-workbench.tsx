"use client";

import * as React from "react"
import { Input } from '../components/input';;
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

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

const CHECK_TONE: Record<ResizeWorkbenchQualityCheck["status"], string> = {
  ok: "bg-[rgba(var(--semi-green-1),0.5)] text-[rgb(var(--semi-green-6))]",
  warn: "bg-[rgba(var(--semi-amber-1),0.6)] text-[rgb(var(--semi-amber-7))]",
  error: "bg-[rgba(var(--semi-red-1),0.6)] text-[rgb(var(--semi-red-6))]",
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
    <div className="flex items-center justify-center max-w-full overflow-hidden">
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
      <div className="px-4">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        {/* Only render the in-card promo header when copy is provided; the
            page-level ToolHero already carries the title/description/badges,
            so tools can omit it and jump straight to the functional UI. */}
        {eyebrow || title || description || (badges && badges.length > 0) || (meta && meta.length > 0) ? (
          <header className="px-7 py-8 pb-7">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(var(--semi-grey-9),0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--semi-grey-9),0.05) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
                maskImage: "radial-gradient(ellipse 80% 72% at 50% 0%, #000 35%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(460px 320px at 22% 18%, rgba(var(--semi-amber-5),0.16), transparent 70%), radial-gradient(520px 360px at 80% 26%, rgba(var(--semi-orange-4),0.12), transparent 70%)",
              }}
            />
            <div className="relative z-[1] max-w-[640px]">
              {eyebrow ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-6))] text-xs font-bold tracking-[0.08em] uppercase mb-4">
                  <span className="h-2 w-2 rounded-full bg-[rgb(var(--semi-amber-5))] animate-[rstudio-pulse_2.4s_ease-in-out_infinite]" />
                  <span>{eyebrow}</span>
                </div>
              ) : null}
              {title ? <h1 className="mt-0 mb-2.5 text-[clamp(30px,4vw,44px)] leading-[1.12] font-extrabold tracking-[-0.02em] text-[var(--semi-color-text-0)]">{title}</h1> : null}
              {description ? <p className="m-0 max-w-[560px] text-[15px] leading-[1.7] text-[var(--semi-color-text-2)]">{description}</p> : null}
              {badges && badges.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-[18px]">
                  {badges.map((badge, index) => (
                    <span
                      key={index}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-[5px] rounded-full text-xs font-bold border border-transparent",
                        badge.tone === "free"
                          ? "bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-6))] border-[rgba(var(--semi-amber-5),0.25)]"
                          : badge.tone === "pro"
                            ? "bg-[rgba(var(--semi-indigo-1),0.6)] text-[rgb(var(--semi-indigo-6))] border-[rgba(var(--semi-indigo-5),0.25)]"
                            : "bg-[var(--semi-color-fill-0)] text-[var(--semi-color-text-2)]",
                      )}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              ) : null}
              {meta && meta.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-[18px]">
                  {meta.map((item, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--semi-color-fill-0)] text-[var(--semi-color-text-1)] text-xs font-semibold">
                      <SmartIcon name={item.icon} size={13} />
                      <span>{item.text}</span>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </header>
        ) : null}

        {/* ── Empty state ──────────────────────────────────────────────── */}
        {!hasSource ? (
          <div className="mt-6">
            <div
              className={cn(
                "relative flex cursor-pointer flex-col items-center justify-center gap-1.5 min-h-[200px] px-6 py-7 rounded-[24px] border-2 border-dashed border-[rgba(var(--semi-amber-5),0.4)] bg-[linear-gradient(180deg,rgba(var(--semi-amber-0),0.45),var(--semi-color-bg-1))] text-center overflow-hidden transition-[border-color,background,transform] duration-[200ms]",
                dragging && "scale-[1.005] border-[rgb(var(--semi-amber-5))] bg-[linear-gradient(180deg,rgba(var(--semi-amber-0),0.9),var(--semi-color-bg-1))]",
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
              <div className="pointer-events-none absolute h-[200px] w-[200px] rounded-full border border-[rgba(var(--semi-amber-5),0.18)] animate-[rstudio-ring-pulse_3s_ease-in-out_infinite]" aria-hidden />
              <div className="relative mb-2 inline-flex h-[52px] w-[52px] items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,rgb(var(--semi-amber-5)),rgb(var(--semi-orange-4)))] text-white shadow-[0_16px_36px_-14px_rgba(var(--semi-amber-5),0.65)]">
                <SmartIcon name="Upload" size={26} />
              </div>
              <div className="relative text-[18px] font-bold text-[var(--semi-color-text-0)]">{emptyPrimary}</div>
              <div className="relative text-[14px] font-semibold text-[rgb(var(--semi-amber-6))]">{emptyClickLabel}</div>
              {emptyHint ? (
                <div className="relative mt-1.5 text-xs text-[var(--semi-color-text-3)]">{emptyHint}</div>
              ) : null}
            </div>

            {dividerLabel ? (
              <div className="flex items-center gap-4 my-[26px] mb-5">
                <span className="flex-1 h-px bg-[var(--semi-color-border)]" />
                <span className="text-xs font-bold tracking-[0.08em] uppercase text-[var(--semi-color-text-3)]">{dividerLabel}</span>
                <span className="flex-1 h-px bg-[var(--semi-color-border)]" />
              </div>
            ) : null}

            <form className="flex-col" onSubmit={handleYouTubeSubmit}>
              <Input
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                placeholder={youtubePlaceholder}
                prefix={<SmartIcon name="Link" size={14} />}
                className="flex-1 min-w-0"
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
              <div className="flex items-center justify-center gap-[7px] mt-[18px] text-xs text-[var(--semi-color-text-3)]">
                <SmartIcon name="Shield" size={14} />
                <span>{privacyTip}</span>
              </div>
            ) : null}

            {error ? <div className="mt-4 px-4 py-3 rounded-xl bg-[rgba(var(--semi-red-1),0.6)] border border-[rgba(var(--semi-red-4),0.3)] text-[rgb(var(--semi-red-6))] text-[13px] font-semibold">{error}</div> : null}

            {/* ── Capability preview: what you can resize to ───────────── */}
            {platforms && platforms.length > 0 ? (
              <div className="mt-5 pt-[18px] border-t border-[var(--semi-color-border)]">
                <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3.5">
                  <span className="text-[13px] font-bold tracking-[0.02em] text-[var(--semi-color-text-0)]">
                    Resize to any size
                  </span>
                  <span className="text-xs font-semibold text-[var(--semi-color-text-3)] tracking-[0.04em]">
                    {formatOptions
                      ? formatOptions.map((f) => f.label).join(" · ")
                      : "JPG · PNG · WebP"}
                  </span>
                </div>
                <div className="grid gap-3">
                  {platforms.map((platform) => (
                    <div key={platform.id} className="p-3.5 rounded-[14px] border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-2)]">
                      <div className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-[var(--semi-color-text-1)]">
                        <SmartIcon name={platform.icon} size={14} />
                        <span>{platform.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {platform.presets.slice(0, 3).map((preset) => (
                          <span key={preset.label} className="px-2 py-[3px] rounded-full text-[11px] font-semibold tabular-nums text-[var(--semi-color-text-2)] bg-[var(--semi-color-fill-0)] border border-[var(--semi-color-border)]">
                            {preset.width}×{preset.height}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          /* ── Workbench ─────────────────────────────────────────────── */
          <div className="grid-cols-1">
            {/* Left: control rail */}
            <div className="flex flex-col gap-4">
              {/* Source card */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-6))] flex-shrink-0">
                    <SmartIcon name="ImageIcon" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{sourceCardTitle}</h2>
                  <span className="flex-1" />
                  {onReplace ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-[var(--semi-color-text-2)]"
                      onClick={onReplace}
                    >
                      <SmartIcon name="Refresh" size={13} />
                      <span>{replaceLabel}</span>
                    </Button>
                  ) : null}
                </div>
                <div className="rounded-[14px] overflow-hidden border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] aspect-video flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sourceUrl || undefined}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between gap-2.5 mt-3.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--semi-color-text-3)]">
                    {sourceMetaLabel}
                  </span>
                  <span className="text-[13px] font-semibold text-[var(--semi-color-text-1)]">
                    {sourceWidth} × {sourceHeight}
                    {fileSizeBytes ? ` · ${formatBytes(fileSizeBytes)}` : ""}
                  </span>
                </div>
                {onOpenPreview || onOpenEditor ? (
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {onOpenPreview ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3.5 py-[7px] rounded-[10px] border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] text-[var(--semi-color-text-1)] text-[13px] font-semibold cursor-pointer transition-[border-color,background,color]"
                        onClick={onOpenPreview}
                      >
                        <SmartIcon name="EyeOpened" size={13} />
                        <span>{previewLinkLabel}</span>
                      </button>
                    ) : null}
                    {onOpenEditor ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3.5 py-[7px] rounded-[10px] border border-[rgba(var(--semi-amber-5),0.45)] bg-[rgba(var(--semi-amber-1),0.55)] text-[rgb(var(--semi-amber-6))] text-[13px] font-semibold cursor-pointer transition-[border-color,background,color]"
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
                <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-6))] flex-shrink-0">
                      <SmartIcon name="CheckList" size={15} />
                    </span>
                    <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{qualityCardTitle}</h2>
                  </div>
                  <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                    {qualityChecks.map((check, index) => (
                      <li
                        key={index}
                        className={cn(
                          "flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold leading-[1.5]",
                          CHECK_TONE[check.status],
                        )}
                      >
                        <span className="inline-flex items-center justify-center flex-shrink-0 mt-[1px]">
                          <SmartIcon
                            name={CHECK_ICON[check.status]}
                            size={14}
                          />
                        </span>
                        <span className="min-w-0">
                          {check.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* Target size */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-6))] flex-shrink-0">
                    <SmartIcon name="Crop" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{targetCardTitle}</h2>
                </div>
                {platforms.length > 1 ? (
                  <div className="flex flex-wrap gap-2 mb-4" role="tablist">
                    {platforms.map((platform) => {
                      const active = platform.id === activePlatform;
                      return (
                        <button
                          key={platform.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          className={cn(
                            "inline-flex items-center gap-[7px] px-3.5 py-2 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] text-[var(--semi-color-text-2)] text-[13px] font-semibold cursor-pointer transition-[border-color,background,color]",
                            active && "border-[rgba(var(--semi-amber-5),0.55)] bg-[rgba(var(--semi-amber-1),0.65)] text-[rgb(var(--semi-amber-6))]",
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
                <div className="grid grid-cols-2 gap-2.5">
                  {(activePlatformData?.presets || []).map((preset) => {
                    const active =
                      preset.width === activeWidth &&
                      preset.height === activeHeight;
                    return (
                      <button
                        key={`${preset.width}x${preset.height}`}
                        type="button"
                        className={cn(
                          "flex flex-col items-start gap-[3px] px-3.5 py-3 rounded-[14px] border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] text-left cursor-pointer transition-[border-color,background,box-shadow]",
                          active && "border-[rgba(var(--semi-amber-5),0.55)] bg-[rgba(var(--semi-amber-1),0.65)]",
                        )}
                        onClick={() =>
                          onPresetSelect?.(preset.width, preset.height)
                        }
                      >
                        <span className="text-[13px] font-bold text-[var(--semi-color-text-0)]">
                          {preset.label}
                        </span>
                        <span className="text-xs font-semibold text-[var(--semi-color-text-1)]">
                          {preset.width}×{preset.height}
                        </span>
                        <span className="bg-[rgba(var(--semi-amber-5),0.18)] text-[rgb(var(--semi-amber-7))]">
                          {preset.ratio}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Custom dimensions */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-6))] flex-shrink-0">
                    <SmartIcon name="Edit" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{customCardTitle}</h2>
                </div>
                <div className="flex items-end gap-2.5">
                  <div className="flex-1 min-w-0">
                    <span className="block mb-1.5 text-xs font-semibold text-[var(--semi-color-text-2)]">{widthLabel}</span>
                    <Input
                      type="number"
                      min={1}
                      max={7680}
                      value={String(activeWidth)}
                      onChange={(value) => {
                        const num = Number(value);
                        if (Number.isFinite(num) && num > 0) onWidthChange(num);
                      }}
                      className="w-full"
                    />
                  </div>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] text-[var(--semi-color-text-3)] cursor-pointer flex-shrink-0 transition-[border-color,color,background]",
                      aspectLocked && "border-[rgba(var(--semi-amber-5),0.55)] bg-[rgba(var(--semi-amber-1),0.65)] text-[rgb(var(--semi-amber-7))]",
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
                  <div className="flex-1 min-w-0">
                    <span className="block mb-1.5 text-xs font-semibold text-[var(--semi-color-text-2)]">{heightLabel}</span>
                    <Input
                      type="number"
                      min={1}
                      max={4320}
                      value={String(activeHeight)}
                      onChange={(value) => {
                        const num = Number(value);
                        if (Number.isFinite(num) && num > 0)
                          onHeightChange(num);
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  className="w-full mt-5 accent-[rgb(var(--semi-amber-5))] cursor-pointer"
                  min={16}
                  max={Math.max(sliderMax || 2560, activeWidth, 2560)}
                  step={1}
                  value={activeWidth}
                  onChange={(event) =>
                    onWidthChange(Number(event.target.value))
                  }
                />
                <div className="flex items-center justify-between gap-2.5 mt-3.5 px-3.5 py-3 rounded-xl bg-[var(--semi-color-fill-0)]">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--semi-color-text-3)]">{outputLabel}</span>
                  <span className="text-[13px] font-bold text-[rgb(var(--semi-amber-7))] tabular-nums">
                    {activeWidth} × {activeHeight} px
                  </span>
                </div>
              </section>
            </div>

            {/* Right: stage */}
            <div className="flex flex-col gap-5 min-w-0">
              {/* Canvas preview */}
              <section className="overflow-hidden rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-6))] flex-shrink-0">
                    <SmartIcon name="EyeOpened" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{previewCardTitle}</h2>
                  <span className="flex-1" />
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-7))] text-xs font-bold tabular-nums">
                    {activeWidth} × {activeHeight}
                  </span>
                </div>
                <div className="min-h-[220px] p-3.5 rounded-xl border border-[var(--semi-color-border)] bg-[repeating-conic-gradient(rgba(var(--semi-grey-9),0.08)_0%_25%,transparent_0%_50%)_0_0/20px_20px]">
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
                <section className="overflow-hidden rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-6))] flex-shrink-0">
                      <SmartIcon name="GridSquare" size={15} />
                    </span>
                    <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{multiSizeLabel}</h2>
                  </div>
                  <div className="grid-cols-2">
                    {[
                      { w: 1280, h: 720, label: "1280×720" },
                      { w: 640, h: 480, label: "640×480" },
                      { w: 480, h: 360, label: "480×360" },
                      { w: 320, h: 180, label: "320×180" },
                    ].map((size) => (
                      <div key={size.label} className="flex flex-col gap-2">
                        <div className="rounded-xl overflow-hidden border border-[var(--semi-color-border)] bg-[var(--semi-color-fill-0)] aspect-video flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={sourceUrl || undefined}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-center text-[11px] font-bold text-[var(--semi-color-text-2)] tabular-nums">
                          {size.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {/* Export dock */}
              <section className="rounded-2xl border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] p-[18px]">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-[10px] bg-[rgba(var(--semi-amber-1),0.7)] text-[rgb(var(--semi-amber-6))] flex-shrink-0">
                    <SmartIcon name="Download" size={15} />
                  </span>
                  <h2 className="m-0 text-[15px] font-bold text-[var(--semi-color-text-0)]">{exportCardTitle}</h2>
                </div>
                <div className="grid-cols-1">
                  {formatOptions.map((option) => {
                    const active = option.value === format;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          "flex items-center gap-2.5",
                          active && "border-[rgba(var(--semi-amber-5),0.55)] bg-[rgba(var(--semi-amber-1),0.65)]",
                        )}
                        onClick={() => onFormatChange(option.value)}
                      >
                        <span className="text-[13px] font-semibold">
                          {option.label}
                        </span>
                        <span className="text-xs text-[var(--semi-color-text-3)]">
                          {option.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="w-full"
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
                  className="mt-2.5 w-full"
                  onClick={onDownloadAll}
                  disabled={Boolean(downloadingAll) || busy}
                  loading={Boolean(downloadingAll)}
                >
                  {downloadingAll ? downloadAllLoadingLabel : downloadAllLabel}
                </Button>
                {downloadAllHint ? (
                  <p className="m-0 mt-3 text-center text-xs text-[var(--semi-color-text-3)]">{downloadAllHint}</p>
                ) : null}
                {error ? <div className="mt-4 px-4 py-3 rounded-xl bg-[rgba(var(--semi-red-1),0.6)] border border-[rgba(var(--semi-red-4),0.3)] text-[rgb(var(--semi-red-6))] text-[13px] font-semibold">{error}</div> : null}
              </section>

              {footerHint ? (
                <p className="mt-5 text-center text-xs text-[var(--semi-color-text-3)]">{footerHint}</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
