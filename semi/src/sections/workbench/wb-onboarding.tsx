"use client";

import { useCallback, useState } from "react";
import { LayoutTemplate, Youtube } from "lucide-react";
import type { WorkbenchT, WorkbenchTemplate } from "@template/ui";

import { Button } from "../../components/button";
import { UploadZone } from "../../components/upload-zone";
import { WbNebulaGlow, WbTargetingReticle } from "./views";

/**
 * Empty-state invitation rendered INSIDE the canvas (not a modal that blocks
 * the screen). Upload, paste a YouTube link, or start from a template — the
 * canvas stays visible behind the glass card so the space feels alive.
 */
export function WbOnboardingOverlay({
  templates,
  onUpload,
  onTemplate,
  onYouTube,
  t,
}: {
  templates: WorkbenchTemplate[];
  onUpload: (file: File) => void;
  onTemplate: (templateIndex: number) => void;
  onYouTube?: (url: string) => void;
  t: WorkbenchT;
}) {
  const [url, setUrl] = useState("");
  const [fetching, setFetching] = useState(false);

  // Cards shown in the empty state — first six structured templates.
  const templatePreviews = templates.slice(0, 6).map((tpl) => ({
    labelKey: tpl.labelKey,
    bg: tpl.preview.bg,
    textColor: tpl.preview.textColor ?? "#fff",
    text: tpl.preview.text ?? "",
    accent: tpl.preview.accent,
  }));

  const handleYouTube = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = url.trim();
      if (!trimmed || !onYouTube) return;
      setFetching(true);
      try {
        await onYouTube(trimmed);
      } finally {
        setFetching(false);
      }
    },
    [url, onYouTube],
  );

  return (
    <div className="wb-empty">
      {/* Soft nebula glow behind the glass card */}
      <WbNebulaGlow className="opacity-70" />

      <div className="wb-empty-glow" aria-hidden />

      {/* Animated targeting reticle — "acquiring the thumbnail target" */}
      <WbTargetingReticle className="wb-empty-reticle" />

      <div className="wb-empty-card">
        {/* Heading */}
        <div className="wb-empty-head">
          <span className="wb-empty-eyebrow">
            <span className="wb-empty-eyebrow-dot" />
            1280 × 720 · 16:9
          </span>
          <h2 className="wb-empty-title">{t("onboarding_title")}</h2>
          <p className="wb-empty-desc">{t("onboarding_desc")}</p>
        </div>

        {/* Primary: upload + youtube */}
        <div className="wb-empty-primary">
          <UploadZone
            isMounted
            onFile={onUpload}
            onDrop={() => {}}
            onDragOver={() => {}}
            onClick={() => {}}
            primaryText={t("upload_image")}
            clickLabel={t("or_click_browse")}
            formatHint={t("format_hint")}
            className="wb-empty-upload"
          />

          <div className="wb-empty-or">
            <span className="wb-empty-or-line" />
            <span className="wb-empty-or-text">{t("or_click_browse")}</span>
            <span className="wb-empty-or-line" />
          </div>

          <form className="wb-empty-youtube" onSubmit={handleYouTube}>
            <div className="wb-empty-youtube-input">
              <Youtube className="w-4 h-4 text-[var(--semi-color-text-3)] shrink-0" />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t("youtube_placeholder")}
                className="bg-transparent flex-1 text-sm outline-none placeholder:text-[var(--semi-color-text-3)]"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              disabled={!url.trim() || fetching}
              loading={fetching}
            >
              {fetching ? t("ai_generating") : t("fetch_from_youtube")}
            </Button>
          </form>
        </div>

        {/* Templates */}
        <div className="wb-empty-templates">
          <div className="wb-empty-templates-head">
            <LayoutTemplate className="w-3.5 h-3.5" />
            {t("quick_templates")}
          </div>
          <div className="wb-empty-templates-grid">
            {templatePreviews.map((tpl, i) => (
              <button
                key={tpl.labelKey}
                type="button"
                onClick={() => onTemplate(i)}
                title={t(tpl.labelKey)}
                className="wb-empty-tpl"
                style={{ backgroundColor: tpl.bg }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-[8px] font-black leading-tight px-1 text-center"
                  style={{ color: tpl.textColor }}
                >
                  {tpl.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
