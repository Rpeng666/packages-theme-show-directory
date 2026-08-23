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
    <div className="absolute inset-0 z-[15] flex items-center justify-center overflow-y-auto p-6">
      <WbNebulaGlow className="opacity-70" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_360px_at_50%_30%,rgba(252,114,90,0.1),transparent_70%)]" aria-hidden />

      <WbTargetingReticle className="absolute left-1/2 top-1/2 z-0 w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-70 drop-shadow-[0_0_18px_rgba(252,114,90,0.25)]" />

      <div className="relative z-[1] flex w-[min(560px,100%)] flex-col gap-4 rounded-[22px] border border-[#e9e6e1] bg-white p-[26px] shadow-[0_40px_90px_-24px_rgba(28,26,23,0.4)]">
        <div className="flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-[rgba(252,114,90,0.12)] px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] tabular-nums text-[#e5371d]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#fc725a]" />
            1280 × 720 · 16:9
          </span>
          <h2 className="m-0 text-[21px] font-bold tracking-[-0.01em] text-[#1c1a17]">{t("onboarding_title")}</h2>
          <p className="m-0 text-[13px] text-[#6b6760]">{t("onboarding_desc")}</p>
        </div>

        <div className="flex flex-col gap-3">
          <UploadZone
            isMounted
            onFile={onUpload}
            onDrop={() => {}}
            onDragOver={() => {}}
            onClick={() => {}}
            primaryText={t("upload_image")}
            clickLabel={t("or_click_browse")}
            formatHint={t("format_hint")}
            className="rounded-2xl"
          />

          <div className="flex items-center gap-2.5">
            <span className="h-px flex-1 bg-[#e9e6e1]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a09b94]">{t("or_click_browse")}</span>
            <span className="h-px flex-1 bg-[#e9e6e1]" />
          </div>

          <form className="flex gap-2" onSubmit={handleYouTube}>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[11px] border border-[#e9e6e1] bg-white px-3">
              <Youtube className="h-4 w-4 shrink-0 text-[#a09b94]" />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t("youtube_placeholder")}
                className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a09b94]"
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

        <div className="flex flex-col gap-2.5 rounded-2xl border border-[#e9e6e1] bg-[#f7f5f2] p-3.5">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6b6760]">
            <LayoutTemplate className="w-3.5 h-3.5" />
            {t("quick_templates")}
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {templatePreviews.map((tpl, i) => (
              <button
                key={tpl.labelKey}
                type="button"
                onClick={() => onTemplate(i)}
                title={t(tpl.labelKey)}
                className="relative aspect-video cursor-pointer overflow-hidden rounded-lg border border-[#e9e6e1] transition-all hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-[0_10px_22px_-10px_rgba(28,26,23,0.35)]"
                style={{ backgroundColor: tpl.bg }}
              >
                <span className="absolute inset-0 flex items-center justify-center px-1 text-center text-[8px] font-black leading-tight" style={{ color: tpl.textColor }}>
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
