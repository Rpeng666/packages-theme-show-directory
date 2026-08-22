"use client";

import * as React from "react";
import type { ReactNode } from "react";
import type { PreviewWorkbenchProps } from "@template/ui";

import { SmartIcon } from "../icons";
import { PreviewConsole } from "../components/preview-console";
import { PreviewStage } from "../components/preview-stage";
import { PreviewTips } from "../components/preview-tips";

/**
 * Semi PreviewWorkbench - a designer-grade YouTube thumbnail inspect studio.
 *
 * Visual language shared with the other studios: a sky "inspect" hero, a
 * work-area console (single / A-B mode, upload slots, title + channel, dark
 * toggle, scene tabs), then a YouTube-context stage that simulates the four
 * places viewers meet a thumbnail (desktop feed / search results / mobile
 * feed / watch sidebar) plus a "what to check" tips rail. All data +
 * callbacks come from the app; this section only renders.
 *
 * The studio is split into reusable blocks that now live in ../components/:
 * preview-console (the narrow control rail), preview-stage (the
 * YouTube-context stage with its mock scenes) and preview-tips (the checklist
 * rail), so other tool workbenches can reuse the same studio kit.
 *
 * Layout is a two-column studio: the preview + tips rail on the left (4/5),
 * the console as a narrow control rail on the right (1/5). It collapses to a
 * single column on narrow screens with the preview first, console below.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// ── Studio sub-components ─────────────────────────────────────────────────────
// The console / stage / tips blocks are shared studio kit in ../components/.
// The hero is preview-specific (the sky inspect hero), so it stays here.

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
    <header className="pstudio-hero">
      <div className="pstudio-hero-mesh" />
      <div className="pstudio-hero-glow" />
      <div className="pstudio-hero-inner">
        {eyebrow ? (
          <span className="pstudio-eyebrow">
            <span className="pstudio-eyebrow-dot" />
            {eyebrow}
          </span>
        ) : null}
        {title ? <h1 className="pstudio-title">{title}</h1> : null}
        {description ? <p className="pstudio-desc">{description}</p> : null}
        {badges && badges.length > 0 ? (
          <div className="pstudio-hero-badges">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={cn(
                  "pstudio-badge",
                  badge.tone === "pro"
                    ? "pstudio-badge-pro"
                    : badge.tone === "neutral"
                      ? "pstudio-badge-neutral"
                      : "pstudio-badge-free",
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>
        ) : null}
        {meta && meta.length > 0 ? (
          <div className="pstudio-hero-meta">
            {meta.map((item) => (
              <span key={item.text} className="pstudio-meta-chip">
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
    <section className={cn("pstudio", className)} data-registry={dataRegistry}>
      <div className="pstudio-shell">
        <PreviewStudioHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          badges={badges}
          meta={meta}
        />

        <div className="pstudio-layout">
          <div className="pstudio-main">
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
          <p className="pstudio-footer-hint">{footerHint}</p>
        ) : null}
      </div>
    </section>
  );
}

export default PreviewWorkbench;
