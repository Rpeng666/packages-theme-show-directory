"use client";

import * as React from "react";
import type { ReactNode } from "react";
import { Select as SemiSelect, TextArea as SemiTextArea } from "@douyinfe/semi-ui";
import type {
  ImageGeneratorStudioImage,
  ImageGeneratorStudioProps,
  ImageGeneratorStudioTab,
} from "@template/ui";
import { ConsoleLink } from "@template/ui";

import { Button } from "../components/button";
import { SmartIcon } from "../icons";

/**
 * Semi ImageGeneratorStudio - a designer-grade AI image creation studio.
 *
 * Visual language shared with the chat studio (ChatWorkbench / ChatHistory):
 * a soft grid + brand glow hero with the credit wallet on the right, then a
 * two-panel "creative desk" workspace - the prompt deck (segmented mode
 * tabs, provider/model selects, reference slot, prompt composer, generate
 * action, live progress) and the gallery (count badge, hover download
 * overlay, empty / ready states with a shimmer). All data + callbacks come
 * from the app; this section only renders.
 */

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const TAB_ICONS: Record<ImageGeneratorStudioTab, string> = {
  "text-to-image": "Sparkles",
  "image-to-image": "ImageIcon",
};

export function ImageGeneratorStudio({
  className,
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  deckTitle,
  galleryTitle,
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
  referenceTitle,
  referenceSlot,
  referenceError,
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
  images,
  galleryEmptyLabel,
  galleryReadyLabel,
  downloadLabel,
  downloadingId,
  onDownload,
  openInEditorLabel,
  onOpenInEditor,
  footerHint,
}: ImageGeneratorStudioProps) {
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

  const galleryHeading =
    images.length > 0 ? (
      <span className="imgstudio-panel-badge">{images.length}</span>
    ) : null;

  return (
    <section
      className={cn("imgstudio", className)}
      data-registry={dataRegistry}
    >
      <div className="imgstudio-shell">
        {/* ── Hero: brand strip + credit wallet ─────────────────────────── */}
        <header className="imgstudio-hero">
          <div className="imgstudio-hero-mesh" aria-hidden />
          <div className="imgstudio-hero-glow" aria-hidden />
          <div className="imgstudio-hero-inner">
            {eyebrow ? (
              <div className="imgstudio-eyebrow">
                <span className="imgstudio-eyebrow-dot" />
                <span>{eyebrow}</span>
              </div>
            ) : null}
            {title ? <h1 className="imgstudio-title">{title}</h1> : null}
            {description ? (
              <p className="imgstudio-desc">{description}</p>
            ) : null}
          </div>

          <aside className="imgstudio-wallet">
            <div className="imgstudio-wallet-card">
              <div className="imgstudio-wallet-head">
                <span className="imgstudio-wallet-icon">
                  <SmartIcon name="Coins" size={16} />
                </span>
                <span className="imgstudio-wallet-label">
                  {balanceLabel}
                </span>
              </div>
              {signedIn ? (
                <div className="imgstudio-wallet-value">
                  <span className="imgstudio-wallet-num">{balanceValue}</span>
                  {balanceUnit ? (
                    <span className="imgstudio-wallet-unit">{balanceUnit}</span>
                  ) : null}
                </div>
              ) : (
                <div className="imgstudio-wallet-signed-out">
                  {signedInBalanceLabel}
                </div>
              )}
              {costChipLabel ? (
                <div className="imgstudio-wallet-cost">
                  <SmartIcon name="Zap" size={13} />
                  <span>{costChipLabel}</span>
                </div>
              ) : null}
              {!signedIn && buyCreditsLabel && buyCreditsHref ? (
                <ConsoleLink href={buyCreditsHref} className="imgstudio-wallet-buy">
                  <Button variant="outline" size="sm" className="imgstudio-wallet-buy-btn">
                    {buyCreditsLabel}
                  </Button>
                </ConsoleLink>
              ) : null}
            </div>
          </aside>
        </header>

        {/* ── Workspace: prompt deck + gallery ──────────────────────────── */}
        <div className="imgstudio-workspace">
          {/* Left: prompt deck */}
          <section className="imgstudio-deck">
            <div className="imgstudio-panel-head">
              <span className="imgstudio-panel-icon">
                <SmartIcon name="Sparkles" size={15} />
              </span>
              <h2 className="imgstudio-panel-title">{deckTitle}</h2>
            </div>

            {/* segmented mode tabs */}
            {tabs.length > 1 ? (
              <div className="imgstudio-tabs" role="tablist">
                {tabs.map((tab) => {
                  const active = tab.key === activeTab;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={cn("imgstudio-tab", active && "imgstudio-tab-active")}
                      onClick={() => onTabChange(tab.key)}
                    >
                      <SmartIcon name={TAB_ICONS[tab.key] || "Sparkles"} size={14} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {/* provider / model */}
            <div className="imgstudio-fields">
              <div className="imgstudio-field">
                <label className="imgstudio-field-label">{providerLabel}</label>
                <SemiSelect
                  value={provider}
                  onChange={(value) => onProviderChange(String(value))}
                  optionList={providerOptions.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  placeholder={providerPlaceholder}
                  className="imgstudio-select"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="imgstudio-field">
                <label className="imgstudio-field-label">{modelLabel}</label>
                <SemiSelect
                  value={model}
                  onChange={(value) => onModelChange(String(value))}
                  optionList={modelOptions.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  placeholder={modelPlaceholder}
                  className="imgstudio-select"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            {/* reference images (image-to-image) */}
            {referenceSlot ? (
              <div className="imgstudio-reference">
                <div className="imgstudio-reference-head">
                  <span className="imgstudio-reference-icon">
                    <SmartIcon name="ImageIcon" size={13} />
                  </span>
                  <span>{referenceTitle}</span>
                </div>
                {referenceSlot}
                {referenceError ? (
                  <p className="imgstudio-reference-error">{referenceError}</p>
                ) : null}
              </div>
            ) : null}

            {/* prompt composer */}
            <div className="imgstudio-prompt">
              <label className="imgstudio-field-label" htmlFor="imgstudio-prompt">
                {promptLabel}
              </label>
              <SemiTextArea
                id="imgstudio-prompt"
                value={prompt}
                onChange={(value) => onPromptChange(value)}
                placeholder={promptPlaceholder}
                rows={6}
                className="imgstudio-prompt-area"
                style={{ width: "100%" }}
              />
              <div className="imgstudio-prompt-meta">
                <span className="imgstudio-prompt-count">
                  {prompt.length}
                  {promptMaxLength ? ` / ${promptMaxLength}` : ""}
                </span>
                {promptTooLong ? (
                  <span className="imgstudio-prompt-error">{promptTooLongLabel}</span>
                ) : null}
              </div>
            </div>

            {/* generate action */}
            <button
              type="button"
              className={cn("imgstudio-generate", busy && "imgstudio-generate-busy")}
              onClick={onGenerate}
              disabled={generateDisabled}
            >
              {busy ? (
                <SmartIcon name="Loader2" size={17} className="imgstudio-spin" />
              ) : (
                <SmartIcon name="Sparkles" size={17} />
              )}
              <span>{actionLabel}</span>
            </button>

            {/* credits row */}
            <div className="imgstudio-credits">
              {creditsCostLabel ? (
                <span className="imgstudio-credit-chip">
                  <SmartIcon name="Coins" size={13} />
                  {creditsCostLabel}
                </span>
              ) : null}
              {signedIn && creditsRemainingLabel ? (
                <span className="imgstudio-credit-remaining">
                  {creditsRemainingLabel}
                </span>
              ) : null}
              {!signedIn && buyCreditsLabel && buyCreditsHref ? (
                <ConsoleLink href={buyCreditsHref} className="imgstudio-credit-buy">
                  {buyCreditsLabel}
                </ConsoleLink>
              ) : null}
            </div>

            {/* live progress rail */}
            {progressVisible ? (
              <div className="imgstudio-progress">
                <div className="imgstudio-progress-head">
                  <span className="imgstudio-progress-label">{progressLabel}</span>
                  <span className="imgstudio-progress-value">{progress ?? 0}%</span>
                </div>
                <div className="imgstudio-progress-track">
                  <div
                    className="imgstudio-progress-fill"
                    style={{ width: `${progress ?? 0}%` }}
                  />
                </div>
                {progressStatusLabel ? (
                  <p className="imgstudio-progress-status">{progressStatusLabel}</p>
                ) : null}
              </div>
            ) : null}
          </section>

          {/* Right: gallery */}
          <section className="imgstudio-gallery">
            <div className="imgstudio-panel-head">
              <span className="imgstudio-panel-icon imgstudio-panel-icon-gallery">
                <SmartIcon name="ImageIcon" size={15} />
              </span>
              <h2 className="imgstudio-panel-title">{galleryTitle}</h2>
              {galleryHeading}
            </div>

            {images.length > 0 ? (
              <div
                className={cn(
                  "imgstudio-grid",
                  images.length === 1 && "imgstudio-grid-single",
                )}
              >
                {images.map((image: ImageGeneratorStudioImage) => (
                  <figure key={image.id} className="imgstudio-card">
                    <div className="imgstudio-card-media">
                      <img
                        src={image.url}
                        alt={image.prompt || "Generated image"}
                        loading="lazy"
                      />
                      <div className="imgstudio-card-shade" aria-hidden />
                      <button
                        type="button"
                        className="imgstudio-card-download"
                        onClick={() => onDownload?.(image)}
                        disabled={downloadingId === image.id}
                        aria-label={downloadLabel}
                        title={downloadLabel}
                      >
                        {downloadingId === image.id ? (
                          <SmartIcon name="Loader2" size={16} className="imgstudio-spin" />
                        ) : (
                          <SmartIcon name="Download" size={16} />
                        )}
                      </button>
                      {onOpenInEditor && openInEditorLabel ? (
                        <button
                          type="button"
                          className="imgstudio-card-edit"
                          onClick={() => onOpenInEditor(image)}
                          aria-label={openInEditorLabel}
                          title={openInEditorLabel}
                        >
                          <SmartIcon name="PenLine" size={16} />
                        </button>
                      ) : null}
                    </div>
                    <figcaption className="imgstudio-card-caption">
                      {image.prompt ? (
                        <span className="imgstudio-card-prompt">{image.prompt}</span>
                      ) : null}
                      {image.model ? (
                        <span className="imgstudio-card-model">{image.model}</span>
                      ) : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="imgstudio-empty">
                <div className="imgstudio-empty-frame">
                  <SmartIcon name="ImageIcon" size={30} />
                  {busy ? <span className="imgstudio-empty-pulse" aria-hidden /> : null}
                </div>
                <p className="imgstudio-empty-text">
                  {busy ? galleryReadyLabel : galleryEmptyLabel}
                </p>
                {busy ? <div className="imgstudio-empty-shimmer" aria-hidden /> : null}
              </div>
            )}
          </section>
        </div>

        {footerHint ? <p className="imgstudio-footer-hint">{footerHint}</p> : null}
      </div>
    </section>
  );
}

export default ImageGeneratorStudio;
