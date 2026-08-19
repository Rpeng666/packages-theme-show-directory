"use client";

import * as React from "react";
import { useState } from "react";
import type { ReactNode } from "react";
import { Input as SemiInput } from "@douyinfe/semi-ui";
import type { HeroLiveProps } from "@template/ui";

import { Button } from "../components/button";
import { SmartIcon } from "../icons";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Semi HeroLive — interactive first-viewport thumbnail demo that sits right
 * below the hero. A glass studio card: a guided dropzone + YouTube URL input
 * on the left, a live 16:9 canvas preview with size presets and editor CTAs
 * on the right. All copy + state + callbacks are injected by the app.
 */
export function HeroLive({
  className,
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  dropPrimary,
  dropClick,
  dropHint,
  youtubeLabel,
  youtubePlaceholder,
  youtubeBusy,
  previewLabel,
  canvasLabel,
  sizeChipLabel,
  presets = [],
  activeWidth = 1280,
  activeHeight = 720,
  ctaPrimaryLabel,
  ctaPrimaryDisabled,
  ctaSecondaryLabel,
  ctaSecondaryDisabled,
  privacyTip,
  error,
  sourceUrl,
  onDropFile,
  onYouTubeSubmit,
  onSelectPreset,
  onOpenEditor,
  onOpenResize,
}: HeroLiveProps) {
  const [youtubeInput, setYoutubeInput] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && onDropFile) onDropFile(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (youtubeInput.trim() && onYouTubeSubmit) {
      onYouTubeSubmit(youtubeInput.trim());
    }
  };

  const ratio = activeHeight > 0 ? activeWidth / activeHeight : 16 / 9;

  return (
    <section
      className={cn("app-hlive", className)}
      data-registry={dataRegistry}
    >
      <div className="app-hlive-shell">
        <div className="app-hlive-glow" aria-hidden />
        <div className="app-hlive-grid" aria-hidden />

        {/* ── Left: copy + input ─────────────────────────────────────── */}
        <div className="app-hlive-copy">
          {eyebrow ? (
            <span className="app-hlive-eyebrow">
              <span className="app-hlive-eyebrow-dot" />
              {eyebrow}
            </span>
          ) : null}
          {title ? <h2 className="app-hlive-title">{title}</h2> : null}
          {description ? (
            <p className="app-hlive-desc">{description}</p>
          ) : null}

          <div
            className={cn(
              "app-hlive-dropzone",
              dragging && "app-hlive-dropzone-drag",
            )}
            role="button"
            tabIndex={0}
            onClick={() => (document.querySelector<HTMLInputElement>("#app-hlive-file")?.click())}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                document
                  .querySelector<HTMLInputElement>("#app-hlive-file")
                  ?.click();
              }
            }}
          >
            <div className="app-hlive-dropzone-ring" aria-hidden />
            <div className="app-hlive-dropzone-icon">
              <SmartIcon name="Upload" size={24} />
            </div>
            <div className="app-hlive-dropzone-primary">{dropPrimary}</div>
            <div className="app-hlive-dropzone-click">{dropClick}</div>
            {dropHint ? (
              <div className="app-hlive-dropzone-hint">{dropHint}</div>
            ) : null}
          </div>
          <input
            id="app-hlive-file"
            type="file"
            accept="image/*"
            className="app-hlive-file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && onDropFile) onDropFile(file);
              e.target.value = "";
            }}
          />

          {youtubeLabel ? (
            <div className="app-hlive-divider">
              <span className="app-hlive-divider-line" />
              <span className="app-hlive-divider-label">{youtubeLabel}</span>
              <span className="app-hlive-divider-line" />
            </div>
          ) : null}

          <form className="app-hlive-youtube" onSubmit={handleSubmit}>
            <SemiInput
              value={youtubeInput}
              onChange={(value) => setYoutubeInput(value)}
              placeholder={youtubePlaceholder}
              prefix={<SmartIcon name="Link" size={14} />}
              className="app-hlive-youtube-input"
            />
            <Button
              type="submit"
              disabled={
                !youtubeInput.trim() || Boolean(youtubeBusy)
              }
              loading={Boolean(youtubeBusy)}
            >
              {youtubeBusy ? "Fetching…" : "Fetch"}
            </Button>
          </form>

          {error ? <div className="app-hlive-error">{error}</div> : null}

          {privacyTip ? (
            <div className="app-hlive-privacy">
              <SmartIcon name="Shield" size={14} />
              <span>{privacyTip}</span>
            </div>
          ) : null}
        </div>

        {/* ── Right: live preview ────────────────────────────────────── */}
        <div className="app-hlive-stage">
          <div className="app-hlive-preview">
            <div className="app-hlive-preview-head">
              <span className="app-hlive-preview-label">
                <SmartIcon name="EyeOpened" size={14} />
                <span>{previewLabel}</span>
              </span>
              <span className="app-hlive-size-chip">
                {activeWidth} × {activeHeight}
              </span>
            </div>
            <div
              className="app-hlive-canvas"
              style={{ aspectRatio: String(ratio) }}
            >
              {sourceUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={sourceUrl} alt={canvasLabel as string} />
              ) : (
                <div className="app-hlive-canvas-empty">
                  <SmartIcon name="Play" size={34} />
                  <span>{canvasLabel}</span>
                </div>
              )}
            </div>
          </div>

          {presets.length > 0 ? (
            <div className="app-hlive-presets">
              {sizeChipLabel ? (
                <span className="app-hlive-presets-label">{sizeChipLabel}</span>
              ) : null}
              <div className="app-hlive-presets-row">
                {presets.map((preset, index) => {
                  const active =
                    preset.width === activeWidth &&
                    preset.height === activeHeight;
                  return (
                    <button
                      key={`${preset.width}x${preset.height}`}
                      type="button"
                      className={cn(
                        "app-hlive-preset",
                        active && "app-hlive-preset-active",
                      )}
                      onClick={() =>
                        onSelectPreset?.(preset.width, preset.height)
                      }
                    >
                      {preset.label}
                      <span className="app-hlive-preset-size">
                        {preset.width}×{preset.height}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="app-hlive-ctas">
            <Button
              type="button"
              size="lg"
              className="app-hlive-cta app-hlive-cta-primary"
              disabled={!sourceUrl || ctaPrimaryDisabled}
              onClick={onOpenEditor}
            >
              <SmartIcon name="PenLine" size={16} />
              <span>{ctaPrimaryLabel}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="app-hlive-cta app-hlive-cta-secondary"
              disabled={!sourceUrl || ctaSecondaryDisabled}
              onClick={onOpenResize}
            >
              <SmartIcon name="Crop" size={16} />
              <span>{ctaSecondaryLabel}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
