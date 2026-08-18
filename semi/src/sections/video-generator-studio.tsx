"use client";

import * as React from "react";
import type { ReactNode } from "react";
import {
  Select as SemiSelect,
  TextArea as SemiTextArea,
} from "@douyinfe/semi-ui";
import type {
  VideoGeneratorStudioProps,
  VideoGeneratorStudioTab,
  VideoGeneratorStudioVideo,
} from "@template/ui";
import { ConsoleLink } from "@template/ui";

import { Button } from "../components/button";
import { SmartIcon } from "../icons";

/**
 * Semi VideoGeneratorStudio - a designer-grade AI video creation studio.
 *
 * Visual language shared with the image studio (ImageGeneratorStudio) and
 * the music studio (MusicGeneratorStudio): a soft grid + brand glow hero
 * with the credit wallet on the right, then a two-panel "creative desk"
 * workspace - the prompt deck (segmented text/image/video mode tabs,
 * provider/model selects, the mode-specific reference slot, prompt
 * composer, generate action and live progress) and the stage (video cards
 * with native players, a model chip, download overlay and empty / ready
 * states with a shimmer). The accent is a cinematic cyan/indigo to give
 * each studio a distinct, cohesive identity. All data + callbacks come
 * from the app; this section only renders.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const TAB_ICONS: Record<VideoGeneratorStudioTab, string> = {
  "text-to-video": "Sparkles",
  "image-to-video": "ImageIcon",
  "video-to-video": "Video",
};

export function VideoGeneratorStudio({
  className,
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  deckTitle,
  stageTitle,
  activeTab,
  tabs,
  onTabChange,
  providerLabel,
  providerPlaceholder,
  providerOptions,
  provider,
  onProviderChange,
  modelLabel,
  modelPlaceholder,
  modelOptions,
  model,
  onModelChange,
  referenceImageTitle,
  referenceImageSlot,
  referenceImageError,
  referenceVideoLabel,
  referenceVideoPlaceholder,
  referenceVideo,
  onReferenceVideoChange,
  referenceVideoError,
  promptLabel,
  promptPlaceholder,
  prompt,
  promptMaxLength,
  onPromptChange,
  promptTooLong,
  promptTooLongLabel,
  balanceLabel,
  balanceValue,
  balanceUnit,
  signedInBalanceLabel,
  costChipLabel,
  buyCreditsLabel,
  buyCreditsHref,
  signedIn,
  checking,
  mounted,
  isGenerating,
  canGenerate,
  generateLabel,
  generatingLabel,
  checkingLabel,
  loadingLabel,
  signInLabel,
  onGenerate,
  creditsCostLabel,
  creditsRemainingLabel,
  progressVisible,
  progress,
  progressLabel,
  progressStatusLabel,
  videos,
  stageEmptyLabel,
  stageReadyLabel,
  downloadLabel,
  downloadingId,
  onDownload,
  footerHint,
}: VideoGeneratorStudioProps) {
  const busy = isGenerating;
  const generateDisabled =
    busy || canGenerate === false || !mounted || Boolean(checking);

  const actionLabel = !mounted
    ? loadingLabel
    : checking
      ? checkingLabel
      : !signedIn
        ? signInLabel
        : busy
          ? generatingLabel
          : generateLabel;

  const stageHeading =
    videos.length > 0 ? (
      <span className="vstudio-panel-badge">{videos.length}</span>
    ) : null;

  const hasReferenceSlot =
    Boolean(referenceImageSlot) || Boolean(referenceVideoLabel);

  return (
    <section className={cn("vstudio", className)} data-registry={dataRegistry}>
      <div className="vstudio-shell">
        {/* ── Hero: brand strip + credit wallet ─────────────────────────── */}
        <header className="vstudio-hero">
          <div className="vstudio-hero-mesh" aria-hidden />
          <div className="vstudio-hero-glow" aria-hidden />
          <div className="vstudio-hero-inner">
            {eyebrow ? (
              <div className="vstudio-eyebrow">
                <span className="vstudio-eyebrow-dot" />
                <span>{eyebrow}</span>
              </div>
            ) : null}
            {title ? <h1 className="vstudio-title">{title}</h1> : null}
            {description ? <p className="vstudio-desc">{description}</p> : null}
          </div>

          <aside className="vstudio-wallet">
            <div className="vstudio-wallet-card">
              <div className="vstudio-wallet-head">
                <span className="vstudio-wallet-icon">
                  <SmartIcon name="Coins" size={16} />
                </span>
                <span className="vstudio-wallet-label">{balanceLabel}</span>
              </div>
              {signedIn ? (
                <div className="vstudio-wallet-value">
                  <span className="vstudio-wallet-num">{balanceValue}</span>
                  {balanceUnit ? (
                    <span className="vstudio-wallet-unit">{balanceUnit}</span>
                  ) : null}
                </div>
              ) : (
                <div className="vstudio-wallet-signed-out">
                  {signedInBalanceLabel}
                </div>
              )}
              {costChipLabel ? (
                <div className="vstudio-wallet-cost">
                  <SmartIcon name="Zap" size={13} />
                  <span>{costChipLabel}</span>
                </div>
              ) : null}
              {!signedIn && buyCreditsLabel && buyCreditsHref ? (
                <ConsoleLink
                  href={buyCreditsHref}
                  className="vstudio-wallet-buy"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="vstudio-wallet-buy-btn"
                  >
                    {buyCreditsLabel}
                  </Button>
                </ConsoleLink>
              ) : null}
            </div>
          </aside>
        </header>

        {/* ── Workspace: prompt deck + stage ────────────────────────────── */}
        <div className="vstudio-workspace">
          {/* Left: prompt deck */}
          <section className="vstudio-deck">
            <div className="vstudio-panel-head">
              <span className="vstudio-panel-icon">
                <SmartIcon name="Sparkles" size={15} />
              </span>
              <h2 className="vstudio-panel-title">{deckTitle}</h2>
            </div>

            {/* segmented mode tabs */}
            {tabs.length > 1 ? (
              <div className="vstudio-tabs" role="tablist">
                {tabs.map((tab) => {
                  const active = tab.key === activeTab;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={cn(
                        "vstudio-tab",
                        active && "vstudio-tab-active",
                      )}
                      onClick={() => onTabChange(tab.key)}
                    >
                      <SmartIcon
                        name={TAB_ICONS[tab.key] || "Sparkles"}
                        size={14}
                      />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {/* provider / model */}
            <div className="vstudio-fields">
              <div className="vstudio-field">
                <label className="vstudio-field-label">{providerLabel}</label>
                <SemiSelect
                  value={provider}
                  onChange={(value) => onProviderChange(String(value))}
                  optionList={providerOptions.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  placeholder={providerPlaceholder}
                  className="vstudio-select"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="vstudio-field">
                <label className="vstudio-field-label">{modelLabel}</label>
                <SemiSelect
                  value={model}
                  onChange={(value) => onModelChange(String(value))}
                  optionList={modelOptions.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  placeholder={modelPlaceholder}
                  className="vstudio-select"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            {/* mode-specific reference slot */}
            {hasReferenceSlot ? (
              <div className="vstudio-reference">
                <div className="vstudio-reference-head">
                  <span className="vstudio-reference-icon">
                    <SmartIcon
                      name={referenceImageSlot ? "ImageIcon" : "Link"}
                      size={13}
                    />
                  </span>
                  <span>
                    {referenceImageSlot
                      ? referenceImageTitle
                      : referenceVideoLabel}
                  </span>
                </div>

                {referenceImageSlot ? (
                  <>
                    {referenceImageSlot}
                    {referenceImageError ? (
                      <p className="vstudio-reference-error">
                        {referenceImageError}
                      </p>
                    ) : null}
                  </>
                ) : null}

                {referenceVideoLabel ? (
                  <>
                    <SemiTextArea
                      value={referenceVideo ?? ""}
                      onChange={(value) => onReferenceVideoChange?.(value)}
                      placeholder={referenceVideoPlaceholder}
                      rows={3}
                      className="vstudio-reference-video"
                      style={{ width: "100%" }}
                    />
                    {referenceVideoError ? (
                      <p className="vstudio-reference-error">
                        {referenceVideoError}
                      </p>
                    ) : null}
                  </>
                ) : null}
              </div>
            ) : null}

            {/* prompt composer */}
            <div className="vstudio-prompt">
              <label className="vstudio-field-label" htmlFor="vstudio-prompt">
                {promptLabel}
              </label>
              <SemiTextArea
                id="vstudio-prompt"
                value={prompt}
                onChange={(value) => onPromptChange(value)}
                placeholder={promptPlaceholder}
                rows={6}
                className="vstudio-prompt-area"
                style={{ width: "100%" }}
              />
              <div className="vstudio-prompt-meta">
                <span className="vstudio-prompt-count">
                  {prompt.length}
                  {promptMaxLength ? ` / ${promptMaxLength}` : ""}
                </span>
                {promptTooLong ? (
                  <span className="vstudio-prompt-error">
                    {promptTooLongLabel}
                  </span>
                ) : null}
              </div>
            </div>

            {/* generate action */}
            <button
              type="button"
              className={cn(
                "vstudio-generate",
                busy && "vstudio-generate-busy",
              )}
              onClick={onGenerate}
              disabled={generateDisabled}
            >
              {busy ? (
                <SmartIcon name="Loader2" size={17} className="vstudio-spin" />
              ) : (
                <SmartIcon name="Video" size={17} />
              )}
              <span>{actionLabel}</span>
            </button>

            {/* credits row */}
            <div className="vstudio-credits">
              {creditsCostLabel ? (
                <span className="vstudio-credit-chip">
                  <SmartIcon name="Coins" size={13} />
                  {creditsCostLabel}
                </span>
              ) : null}
              {signedIn && creditsRemainingLabel ? (
                <span className="vstudio-credit-remaining">
                  {creditsRemainingLabel}
                </span>
              ) : null}
              {!signedIn && buyCreditsLabel && buyCreditsHref ? (
                <ConsoleLink
                  href={buyCreditsHref}
                  className="vstudio-credit-buy"
                >
                  {buyCreditsLabel}
                </ConsoleLink>
              ) : null}
            </div>

            {/* live progress rail */}
            {progressVisible ? (
              <div className="vstudio-progress">
                <div className="vstudio-progress-head">
                  <span className="vstudio-progress-label">
                    {progressLabel}
                  </span>
                  <span className="vstudio-progress-value">
                    {progress ?? 0}%
                  </span>
                </div>
                <div className="vstudio-progress-track">
                  <div
                    className="vstudio-progress-fill"
                    style={{ width: `${progress ?? 0}%` }}
                  />
                </div>
                {progressStatusLabel ? (
                  <p className="vstudio-progress-status">
                    {progressStatusLabel}
                  </p>
                ) : null}
              </div>
            ) : null}
          </section>

          {/* Right: stage */}
          <section className="vstudio-stage">
            <div className="vstudio-panel-head">
              <span className="vstudio-panel-icon vstudio-panel-icon-stage">
                <SmartIcon name="Video" size={15} />
              </span>
              <h2 className="vstudio-panel-title">{stageTitle}</h2>
              {stageHeading}
            </div>

            {videos.length > 0 ? (
              <div className="vstudio-grid">
                {videos.map((video: VideoGeneratorStudioVideo) => (
                  <figure key={video.id} className="vstudio-card">
                    <div className="vstudio-card-media">
                      <video
                        src={video.url}
                        controls
                        preload="metadata"
                        playsInline
                      />
                      <div className="vstudio-card-shade" aria-hidden />
                      <button
                        type="button"
                        className="vstudio-card-download"
                        onClick={() => onDownload?.(video)}
                        disabled={downloadingId === video.id}
                        aria-label={downloadLabel}
                        title={downloadLabel}
                      >
                        {downloadingId === video.id ? (
                          <SmartIcon
                            name="Loader2"
                            size={16}
                            className="vstudio-spin"
                          />
                        ) : (
                          <SmartIcon name="Download" size={16} />
                        )}
                      </button>
                    </div>
                    <figcaption className="vstudio-card-caption">
                      {video.prompt ? (
                        <span className="vstudio-card-prompt">
                          {video.prompt}
                        </span>
                      ) : null}
                      {video.model ? (
                        <span className="vstudio-card-model">
                          {video.model}
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="vstudio-empty">
                <div className="vstudio-empty-frame">
                  <SmartIcon name="Video" size={30} />
                  {busy ? (
                    <span className="vstudio-empty-pulse" aria-hidden />
                  ) : null}
                </div>
                <p className="vstudio-empty-text">
                  {busy ? stageReadyLabel : stageEmptyLabel}
                </p>
                {busy ? (
                  <div className="vstudio-empty-shimmer" aria-hidden />
                ) : null}
              </div>
            )}
          </section>
        </div>

        {footerHint ? (
          <p className="vstudio-footer-hint">{footerHint}</p>
        ) : null}
      </div>
    </section>
  );
}

export default VideoGeneratorStudio;
