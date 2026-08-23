"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  ResizeWorkbenchFormat,
  ResizeWorkbenchProps,
  ResizeWorkbenchQualityCheck,
} from "../../../contracts/sections/resize-workbench";

/**
 * Default ResizeWorkbench - shadcn-styled fallback of the resize studio
 * section (see the Semi implementation for the full design notes).
 * Same contract: guided empty state, two-panel
 * workbench with control rail + stage + export dock.
 */

/** Small section heading with a step number. */
function StepHeading({
  n,
  title,
  right,
}: {
  n: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono text-[11px] font-semibold text-muted-foreground">
        {n}
      </span>
      <h2 className="text-[13px] font-semibold tracking-tight">{title}</h2>
      <span className="flex-1" />
      {right}
    </div>
  );
}

const EXTENSION: Record<ResizeWorkbenchFormat, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};

const CHECK_ICON: Record<ResizeWorkbenchQualityCheck["status"], string> = {
  ok: "CheckCircle2",
  warn: "AlertTriangleIcon",
  error: "AlertTriangleIcon",
};

const CHECK_TONE: Record<ResizeWorkbenchQualityCheck["status"], string> = {
  ok: "text-emerald-600",
  warn: "text-primary",
  error: "text-red-600",
};

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function CanvasPreview({
  sourceUrl,
  width,
  height,
}: {
  sourceUrl: string;
  width: number;
  height: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width: displayWidth, height: displayHeight, maxWidth: "100%" }}
      className="rounded-lg border bg-muted"
    />
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
  const handleYouTubeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (youtubeInput.trim() && onYouTubeSubmit) {
      onYouTubeSubmit(youtubeInput.trim());
    }
  };

  if (!hasSource) {
    return (
      <div
        className={cn("mx-auto w-full max-w-2xl px-4 py-8", className)}
        data-registry={dataRegistry}
      >
        {(eyebrow || title || description) && (
          <div className="mb-6 space-y-2">
            {eyebrow && (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {eyebrow}
              </div>
            )}
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <div
          role="button"
          tabIndex={0}
          onClick={onReplace}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onReplace?.();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "group flex w-full cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 transition",
            dragging
              ? "border-primary bg-primary/10"
              : "border-border bg-muted/30 hover:border-primary hover:bg-primary/10",
          )}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <SmartIcon name="Upload" size={26} />
          </span>
          <span className="text-base font-semibold">{emptyPrimary}</span>
          <span className="text-sm text-muted-foreground">
            {emptyClickLabel}
          </span>
          {emptyHint && (
            <span className="text-xs text-muted-foreground">{emptyHint}</span>
          )}
        </div>

        {dividerLabel && (
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              {dividerLabel}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
        )}

        <form onSubmit={handleYouTubeSubmit} className="flex gap-2">
          <input
            value={youtubeInput}
            onChange={(event) => setYoutubeInput(event.target.value)}
            placeholder={youtubePlaceholder}
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={!youtubeInput.trim() || Boolean(youtubeBusy)}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
          >
            {youtubeFetchLabel}
          </button>
        </form>

        {privacyTip && (
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <SmartIcon name="Shield" size={13} />
            {privacyTip}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 py-8", className)}
      data-registry={dataRegistry}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        {/* Left rail */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <StepHeading
              n="01"
              title={sourceCardTitle}
              right={
                onReplace && (
                <button
                  type="button"
                  onClick={onReplace}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <SmartIcon name="RefreshCcwIcon" size={12} />
                  {replaceLabel}
                </button>
                )
              }
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sourceUrl || undefined}
              alt=""
              className="aspect-video w-full rounded-lg border bg-muted object-contain"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {sourceMetaLabel}: {sourceWidth} × {sourceHeight}
              {fileSizeBytes ? ` · ${formatBytes(fileSizeBytes)}` : ""}
            </p>
            {(onOpenPreview || onOpenEditor) && (
              <div className="mt-2 flex gap-3 text-xs">
                {onOpenPreview && (
                  <button
                    type="button"
                    onClick={onOpenPreview}
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <SmartIcon name="Eye" size={12} />
                    {previewLinkLabel}
                  </button>
                )}
                {onOpenEditor && (
                  <button
                    type="button"
                    onClick={onOpenEditor}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <SmartIcon name="Edit" size={12} />
                    {editorLinkLabel}
                  </button>
                )}
              </div>
            )}
          </div>

          {qualityChecks.length > 0 && (
            <div className="rounded-xl border bg-card p-5">
              <StepHeading n="02" title={qualityCardTitle} />
              <ul className="mt-2 space-y-1.5">
                {qualityChecks.map((check, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <SmartIcon
                      name={CHECK_ICON[check.status]}
                      size={13}
                      className={CHECK_TONE[check.status]}
                    />
                    {check.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border bg-card p-5">
            <StepHeading n="03" title={targetCardTitle} />
            {platforms.length > 1 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => setActivePlatform(platform.id)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs",
                      platform.id === activePlatform
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <SmartIcon name={platform.icon} size={12} />
                    {platform.name}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(activePlatformData?.presets || []).map((preset) => {
                const active =
                  preset.width === activeWidth &&
                  preset.height === activeHeight;
                return (
                  <button
                    key={`${preset.width}x${preset.height}`}
                    type="button"
                    onClick={() =>
                      onPresetSelect?.(preset.width, preset.height)
                    }
                    className={cn(
                      "rounded-lg border p-2 text-left transition",
                      active
                        ? "border-primary bg-primary/10"
                        : "hover:border-primary/40",
                    )}
                  >
                    <span className="block text-xs font-medium">
                      {preset.label}
                    </span>
                    <span className="block text-[11px] text-muted-foreground">
                      {preset.width}×{preset.height} · {preset.ratio}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <StepHeading n="04" title={customCardTitle} />
            <div className="mt-2 flex items-end gap-2">
              <div className="flex-1">
                <span className="text-xs text-muted-foreground">
                  {widthLabel}
                </span>
                <input
                  type="number"
                  min={1}
                  max={7680}
                  value={activeWidth}
                  onChange={(event) =>
                    onWidthChange(Number(event.target.value))
                  }
                  className="mt-1 w-full rounded-lg border bg-background px-2 py-1.5 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={onToggleAspectLock}
                aria-label={
                  aspectLocked ? "Unlock aspect ratio" : "Lock aspect ratio"
                }
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg border",
                  aspectLocked
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground",
                )}
              >
                <SmartIcon name={aspectLocked ? "Lock" : "Unlock"} size={14} />
              </button>
              <div className="flex-1">
                <span className="text-xs text-muted-foreground">
                  {heightLabel}
                </span>
                <input
                  type="number"
                  min={1}
                  max={4320}
                  value={activeHeight}
                  onChange={(event) =>
                    onHeightChange(Number(event.target.value))
                  }
                  className="mt-1 w-full rounded-lg border bg-background px-2 py-1.5 text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min={16}
              max={Math.max(sliderMax || 2560, activeWidth, 2560)}
              step={1}
              value={activeWidth}
              onChange={(event) => onWidthChange(Number(event.target.value))}
              className="mt-3 w-full accent-primary"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {outputLabel}:{" "}
              <span className="font-medium text-primary">
                {activeWidth} × {activeHeight} px
              </span>
            </p>
          </div>
        </div>

        {/* Right stage */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5">
            <StepHeading
              n="05"
              title={previewCardTitle}
              right={
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {activeWidth} × {activeHeight}
                </span>
              }
            />
            <div className="flex min-h-[220px] items-center justify-center rounded-lg bg-[repeating-conic-gradient(#80808015_0%_25%,transparent_0%_50%)] bg-[length:20px_20px] p-4">
              {sourceUrl && (
                <CanvasPreview
                  sourceUrl={sourceUrl}
                  width={activeWidth}
                  height={activeHeight}
                />
              )}
            </div>
          </div>

          {multiSizeLabel && (
            <div className="rounded-xl border bg-card p-5">
              <StepHeading n="06" title={multiSizeLabel} />
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[1280, 640, 480, 320].map((w) => {
                  const h = Math.round((w * 9) / 16);
                  return (
                    <div key={w} className="text-center">
                      <div className="overflow-hidden rounded-lg border bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sourceUrl || undefined}
                          alt=""
                          className="w-full object-cover"
                          style={{ aspectRatio: "16 / 9" }}
                        />
                      </div>
                      <span className="mt-1 block text-[11px] text-muted-foreground">
                        {w}×{h}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="rounded-xl border bg-card p-5">
            <StepHeading n="07" title={exportCardTitle} />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {formatOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onFormatChange(option.value)}
                  className={cn(
                    "rounded-lg border py-2 text-center",
                    option.value === format
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary/40",
                  )}
                >
                  <span className="block text-sm font-bold">
                    {option.label}
                  </span>
                  <span className="block text-[10px] text-muted-foreground">
                    {option.desc}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onDownload}
              disabled={busy}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-base font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
            >
              <SmartIcon name="Download" size={17} />
              {downloadLabel
                ? downloadLabel(activeWidth, activeHeight, extension)
                : `Download ${activeWidth}×${activeHeight} ${extension}`}
            </button>
            <button
              type="button"
              onClick={onDownloadAll}
              disabled={Boolean(downloadingAll) || busy}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-60"
            >
              {downloadingAll ? downloadAllLoadingLabel : downloadAllLabel}
            </button>
            {downloadAllHint && (
              <p className="mt-1.5 text-center text-xs text-muted-foreground">
                {downloadAllHint}
              </p>
            )}
            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          {footerHint && (
            <p className="text-center text-xs text-muted-foreground">
              {footerHint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
