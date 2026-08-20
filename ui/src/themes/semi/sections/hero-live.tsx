"use client";

import * as React from "react";
import { useState } from "react";
import { Input as SemiInput } from "@douyinfe/semi-ui";
import type { HeroLiveProps } from "@template/ui";

import { SmartIcon } from "../icons";
import { SectionShell, SectionEyebrow } from "./shell";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Semi HeroLive — interactive first-viewport thumbnail demo that sits right
 * below the hero, in the hero's visual language.
 *
 * Mirrors the Hero's two-column skeleton: left = eyebrow + display title +
 * description + guided dropzone / YouTube input; right = a live 16:9 preview
 * card (same chrome as the hero's product mockup: radius 20, deep shadow) with
 * size presets and editor CTAs. All copy + state + callbacks are injected by
 * the app. Interaction (drag/drop, input, presets) is unchanged.
 */
export function HeroLive({
  section,
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

  const hasSource = Boolean(sourceUrl);

  return (
    <SectionShell
      id={section.id}
      className={cn(className)}
      data-registry={dataRegistry}
      padding="lg"
      style={{ overflow: "hidden" }}
    >
      <style>{`
        .semi-hlive-input .semi-input-wrapper {
          height: 46px;
          border-radius: 12px;
        }
      `}</style>
      {/* decorative layers — same as the Hero */}
      <div className="app-hero-glow" aria-hidden />
      <div className="app-grid-pattern" aria-hidden />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 56,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Left: copy + input ─────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}

          {title ? (
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(30px, 4.5vw, 42px)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontWeight: 750,
                color: "var(--semi-color-text-0)",
                textWrap: "balance",
              }}
            >
              {title}
            </h2>
          ) : null}

          {description ? (
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: "var(--semi-color-text-2)" }}>
              {description}
            </p>
          ) : null}

          {/* Dropzone — solid card surface, brand-red on drag */}
          <div
            className="semi-hlive-dropzone"
            role="button"
            tabIndex={0}
            onClick={() => document.querySelector<HTMLInputElement>("#semi-hlive-file")?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                document.querySelector<HTMLInputElement>("#semi-hlive-file")?.click();
              }
            }}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "28px 24px",
              borderRadius: 14,
              background: "var(--semi-color-bg-2)",
              border: dragging
                ? "1px solid var(--semi-color-primary)"
                : "1px solid var(--semi-color-border)",
              boxShadow: dragging
                ? "0 0 0 3px rgba(var(--semi-red-5), 0.18)"
                : "0 1px 2px rgba(var(--semi-grey-9), 0.04)",
              cursor: "pointer",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--semi-color-primary-light-default)",
                color: "var(--semi-color-primary)",
              }}
            >
              <SmartIcon name="Upload" size={22} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--semi-color-text-0)" }}>
              {dropPrimary}
            </div>
            <div style={{ fontSize: 13, color: "var(--semi-color-text-2)" }}>{dropClick}</div>
            {dropHint ? (
              <div style={{ fontSize: 12, color: "var(--semi-color-text-2)" }}>{dropHint}</div>
            ) : null}
          </div>
          <input
            id="semi-hlive-file"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && onDropFile) onDropFile(file);
              e.target.value = "";
            }}
          />

          {youtubeLabel ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
              <span style={{ flex: 1, height: 1, background: "var(--semi-color-border)" }} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--semi-color-text-2)",
                }}
              >
                {youtubeLabel}
              </span>
              <span style={{ flex: 1, height: 1, background: "var(--semi-color-border)" }} />
            </div>
          ) : null}

          <form
            style={{ display: "flex", gap: 10, width: "100%" }}
            onSubmit={handleSubmit}
          >
            <SemiInput
              value={youtubeInput}
              onChange={(value) => setYoutubeInput(value)}
              placeholder={youtubePlaceholder}
              prefix={<SmartIcon name="Link" size={14} />}
              className="semi-hlive-input"
            />
            <button
              type="submit"
              disabled={!youtubeInput.trim() || Boolean(youtubeBusy)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                height: 46,
                padding: "0 20px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                border: "none",
                background: "var(--app-brand-grad)",
                color: "#fff",
                boxShadow: "0 10px 22px -10px rgba(var(--semi-red-5), 0.7)",
                cursor: "pointer",
                opacity: !youtubeInput.trim() || Boolean(youtubeBusy) ? 0.5 : 1,
              }}
            >
              {youtubeBusy ? "Fetching…" : "Fetch"}
            </button>
          </form>

          {error ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--semi-color-danger)" }}>
              <SmartIcon name="AlertTriangle" size={14} />
              <span>{error}</span>
            </div>
          ) : null}

          {privacyTip ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--semi-color-text-2)" }}>
              <SmartIcon name="Shield" size={14} />
              <span>{privacyTip}</span>
            </div>
          ) : null}
        </div>

        {/* ── Right: live preview card (hero mockup chrome) ──────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid var(--semi-color-border)",
              background: "var(--semi-color-bg-1)",
              boxShadow: "0 40px 80px -32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Preview head */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                padding: "10px 14px",
                borderBottom: "1px solid var(--semi-color-border)",
                background: "var(--semi-color-bg-2)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--semi-color-text-2)" }}>
                <SmartIcon name="EyeOpened" size={14} />
                <span>{previewLabel}</span>
              </span>
              <span
                style={{
                  padding: "2px 10px",
                  borderRadius: 999,
                  background: "var(--semi-color-primary-light-default)",
                  color: "var(--semi-color-primary)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {activeWidth} × {activeHeight}
              </span>
            </div>

            {/* Canvas */}
            <div style={{ aspectRatio: String(ratio), background: "#111" }}>
              {hasSource ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sourceUrl ?? undefined}
                  alt={canvasLabel as string}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    background: "linear-gradient(135deg, rgba(var(--semi-red-4),0.85), rgba(var(--semi-red-6),0.9))",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  <SmartIcon name="Play" size={34} />
                  <span>{canvasLabel}</span>
                </div>
              )}
            </div>
          </div>

          {presets.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sizeChipLabel ? (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--semi-color-text-2)",
                  }}
                >
                  {sizeChipLabel}
                </span>
              ) : null}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {presets.map((preset, index) => {
                  const active =
                    preset.width === activeWidth && preset.height === activeHeight;
                  return (
                    <button
                      key={`${preset.width}x${preset.height}`}
                      type="button"
                      onClick={() => onSelectPreset?.(preset.width, preset.height)}
                      style={{
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 2,
                        padding: "8px 14px",
                        borderRadius: 10,
                        border: active
                          ? "1px solid var(--semi-color-primary)"
                          : "1px solid var(--semi-color-border)",
                        background: active
                          ? "var(--semi-color-primary-light-default)"
                          : "var(--semi-color-bg-1)",
                        color: active ? "var(--semi-color-primary)" : "var(--semi-color-text-1)",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "border-color 0.2s ease, background-color 0.2s ease",
                      }}
                    >
                      {preset.label}
                      <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.7 }}>
                        {preset.width}×{preset.height}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <button
              type="button"
              disabled={!hasSource || ctaPrimaryDisabled}
              onClick={onOpenEditor}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 46,
                padding: "0 22px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                border: "none",
                background: "var(--app-brand-grad)",
                color: "#fff",
                boxShadow: "0 12px 28px -10px rgba(var(--semi-red-5), 0.7)",
                cursor: !hasSource || ctaPrimaryDisabled ? "default" : "pointer",
                opacity: !hasSource || ctaPrimaryDisabled ? 0.5 : 1,
              }}
            >
              <SmartIcon name="PenLine" size={16} />
              <span>{ctaPrimaryLabel}</span>
            </button>
            <button
              type="button"
              disabled={!hasSource || ctaSecondaryDisabled}
              onClick={onOpenResize}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 46,
                padding: "0 22px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                background: "var(--semi-color-bg-1)",
                color: "var(--semi-color-text-0)",
                border: "1px solid var(--semi-color-border)",
                cursor: !hasSource || ctaSecondaryDisabled ? "default" : "pointer",
                opacity: !hasSource || ctaSecondaryDisabled ? 0.5 : 1,
              }}
            >
              <SmartIcon name="Crop" size={16} />
              <span>{ctaSecondaryLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
