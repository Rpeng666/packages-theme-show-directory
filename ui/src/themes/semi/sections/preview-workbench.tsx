"use client";

import * as React from "react";
import type { ReactNode } from "react";
import type { PreviewWorkbenchProps } from "@template/ui";

import { SmartIcon } from "../icons";
import { PreviewConsole } from "../components/preview-console";
import { PreviewStage } from "../components/preview-stage";
import { PreviewTips } from "../components/preview-tips";

/**
 * Semi PreviewWorkbench — a designer-grade YouTube thumbnail inspect studio.
 *
 * Visual language shared with the other studios: an inspect hero, a
 * work-area console (single / A-B mode, upload slots, title + channel, dark
 * toggle, scene tabs), then a YouTube-context stage that simulates the four
 * places viewers meet a thumbnail (desktop feed / search results / mobile
 * feed / watch sidebar) plus a "what to check" tips rail. All data +
 * callbacks come from the app; this section only renders.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// ── Studio sub-components ─────────────────────────────────────────────────────
// The console / stage / tips blocks are shared studio kit in ../components/.
// The hero is preview-specific (the inspect hero), so it stays here.

function PreviewStudioHero({
  eyebrow,
  title,
  description,
  badges,
  meta,
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  badges?: Array<{ label: string; tone?: "free" | "pro" | "neutral" }>;
  meta?: Array<{ icon: string; text: string }>;
}) {
  // The page-level ToolHero already carries the title/description/badges;
  // hide this in-card promo header when no copy is provided.
  if (
    !eyebrow &&
    !title &&
    !description &&
    !(badges && badges.length > 0) &&
    !(meta && meta.length > 0)
  ) {
    return null;
  }
  return (
    <header className="relative overflow-hidden px-[22px] py-8">
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
            "radial-gradient(460px 320px at 22% 18%, rgba(var(--semi-cyan-5),0.16), transparent 70%), radial-gradient(520px 360px at 80% 26%, rgba(var(--semi-blue-4),0.12), transparent 70%)",
        }}
      />
      <div className="relative z-[1] max-w-[680px]">
        {eyebrow ? (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(var(--semi-cyan-1),0.7)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[rgb(var(--semi-cyan-7))]">
            <span className="h-[7px] w-[7px] rounded-full bg-[rgb(var(--semi-cyan-5))] animate-[pstudio-pulse_1.8s_ease-in-out_infinite]" />
            {eyebrow}
          </span>
        ) : null}
        {title ? (
          <h1 className="m-0 mt-0 mb-2.5 text-[27px] leading-[1.12] font-extrabold tracking-[-0.02em] text-[var(--semi-color-text-0)]">
            {title}
          </h1>
        ) : null}
        {description ? (
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--semi-color-text-2)]">
            {description}
          </p>
        ) : null}
        {badges && badges.length > 0 ? (
          <div className="mt-[18px] flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-[5px] text-xs font-bold",
                  badge.tone === "pro"
                    ? "bg-gradient-to-br from-[rgb(var(--semi-cyan-6))] to-[rgb(var(--semi-blue-6))] text-white"
                    : badge.tone === "neutral"
                      ? "bg-[var(--semi-color-fill-1)] text-[var(--semi-color-text-2)]"
                      : "bg-[rgba(var(--semi-cyan-1),0.65)] text-[rgb(var(--semi-cyan-7))]",
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>
        ) : null}
        {meta && meta.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.map((item) => (
              <span
                key={item.text}
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-[var(--semi-color-border)] bg-[var(--semi-color-bg-0)] px-3 py-1.5 text-xs font-semibold text-[var(--semi-color-text-1)]"
              >
                <SmartIcon name={item.icon} size={14} />
                {item.text}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function PreviewWorkbench({
  className,
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  badges,
  meta,
  mode = "single",
  onModeChange,
  singleLabel,
  abLabel,
  abHint,
  uploadTitle,
  uploadHint,
  uploadFormatHint,
  replaceLabel,
  uploadA,
  uploadB,
  onUploadA,
  onUploadB,
  titleLabel,
  titleValue,
  titlePlaceholder,
  onTitleChange,
  channelLabel,
  channelValue,
  channelPlaceholder,
  onChannelChange,
  dark = false,
  onToggleDark,
  darkLabel,
  lightLabel,
  foldLine = false,
  onToggleFoldLine,
  foldLineLabel,
  foldLineHideLabel,
  colorBlind = false,
  onToggleColorBlind,
  colorBlindLabel,
  colorBlindOffLabel,
  sceneLabel,
  scenes = [],
  scene = "feed",
  onSceneChange,
  aLabel,
  bLabel,
  yourVideoLabel,
  tipsTitle,
  tips,
  footerHint,
}: PreviewWorkbenchProps) {
  const activeScene = scenes.find((s) => s.id === scene) ?? scenes[0];

  const sceneProps = {
    a: uploadA,
    b: mode === "ab" ? uploadB : undefined,
    title: titleValue,
    channel: channelValue,
    aLabel,
    bLabel,
    yourVideoLabel,
  };

  return (
    <section className={cn("relative py-12 pb-[72px] overflow-hidden", className)} data-registry={dataRegistry}>
      <div className="relative z-[1] mx-auto w-full max-w-[1440px] px-6">
        <PreviewStudioHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          badges={badges}
          meta={meta}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_1fr]">
          <div className="min-w-0">
            <PreviewStage
              dark={dark}
              colorBlind={colorBlind}
              mode={mode}
              singleLabel={singleLabel}
              abLabel={abLabel}
              activeScene={activeScene}
              scene={scene}
              sceneProps={sceneProps}
              foldLine={foldLine}
              foldLineLabel={foldLineLabel}
            />
            {tips && tips.length > 0 ? (
              <PreviewTips
                tipsTitle={tipsTitle}
                tips={tips}
                scene={scene}
                onSceneChange={onSceneChange}
              />
            ) : null}
          </div>

          <PreviewConsole
            mode={mode}
            onModeChange={onModeChange}
            singleLabel={singleLabel}
            abLabel={abLabel}
            abHint={abHint}
            uploadTitle={uploadTitle}
            uploadHint={uploadHint}
            uploadFormatHint={uploadFormatHint}
            replaceLabel={replaceLabel}
            uploadA={uploadA}
            uploadB={uploadB}
            onUploadA={onUploadA}
            onUploadB={onUploadB}
            titleLabel={titleLabel}
            titleValue={titleValue}
            titlePlaceholder={titlePlaceholder}
            onTitleChange={onTitleChange}
            channelLabel={channelLabel}
            channelValue={channelValue}
            channelPlaceholder={channelPlaceholder}
            onChannelChange={onChannelChange}
            dark={dark}
            onToggleDark={onToggleDark}
            darkLabel={darkLabel}
            lightLabel={lightLabel}
            foldLine={foldLine}
            onToggleFoldLine={onToggleFoldLine}
            foldLineLabel={foldLineLabel}
            foldLineHideLabel={foldLineHideLabel}
            colorBlind={colorBlind}
            onToggleColorBlind={onToggleColorBlind}
            colorBlindLabel={colorBlindLabel}
            colorBlindOffLabel={colorBlindOffLabel}
            sceneLabel={sceneLabel}
            scenes={scenes}
            scene={scene}
            onSceneChange={onSceneChange}
            aLabel={aLabel}
            bLabel={bLabel}
          />
        </div>

        {footerHint ? (
          <p className="mt-[18px] text-center text-xs text-[var(--semi-color-text-2)]">
            {footerHint}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default PreviewWorkbench;
