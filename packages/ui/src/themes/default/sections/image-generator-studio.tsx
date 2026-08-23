"use client";

import * as React from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { ConsoleLink } from "../../../components/console/bridge";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  ImageGeneratorStudioImage,
  ImageGeneratorStudioProps,
  ImageGeneratorStudioTab,
} from "../../../contracts/sections/image-generator-studio";

/**
 * Default ImageGeneratorStudio - shadcn-styled fallback of the AI image
 * studio section (see the Semi implementation for the full design notes).
 * Same contract: hero + credit wallet, prompt deck, gallery, live states.
 */

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

  return (
    <section
      className={cn("py-16 md:py-24", className)}
      data-registry={dataRegistry}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* hero — quiet header with a hairline rule */}
        <header className="border-b pb-8 mb-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              {eyebrow ? (
                <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {eyebrow}
                </div>
              ) : null}
              {title ? (
                <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {title}
                </h1>
              ) : null}
              {description ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              ) : null}
            </div>

            <aside className="w-full shrink-0 rounded-xl border bg-card p-5 md:w-64">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <SmartIcon name="Coins" size={14} />
                </span>
                {balanceLabel}
              </div>
              {signedIn ? (
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold tracking-tight text-foreground">{balanceValue}</span>
                  {balanceUnit ? (
                    <span className="text-sm text-muted-foreground">{balanceUnit}</span>
                  ) : null}
                </div>
              ) : (
                <div className="mt-3 text-sm text-muted-foreground">{signedInBalanceLabel}</div>
              )}
              {costChipLabel ? (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                  <SmartIcon name="Zap" size={12} />
                  {costChipLabel}
                </div>
              ) : null}
              {!signedIn && buyCreditsLabel && buyCreditsHref ? (
                <ConsoleLink
                  href={buyCreditsHref}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  {buyCreditsLabel}
                </ConsoleLink>
              ) : null}
            </aside>
          </div>
        </header>

        {/* workspace */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* prompt deck */}
          <section className="rounded-xl border bg-card p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <SmartIcon name="Sparkles" size={15} />
              </span>
              <h2 className="text-[15px] font-semibold tracking-tight text-foreground">{deckTitle}</h2>
            </div>

            {tabs.length > 1 ? (
              <div className="mb-6 inline-flex rounded-xl border bg-muted/60 p-1" role="tablist">
                {tabs.map((tab) => {
                  const active = tab.key === activeTab;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => onTabChange(tab.key)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <SmartIcon name={TAB_ICONS[tab.key] || "Sparkles"} size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{providerLabel}</label>
                <select
                  value={provider}
                  onChange={(e) => onProviderChange(e.target.value)}
                  className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  {!provider ? <option value="">{providerPlaceholder}</option> : null}
                  {providerOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{modelLabel}</label>
                <select
                  value={model}
                  onChange={(e) => onModelChange(e.target.value)}
                  className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  {!model ? <option value="">{modelPlaceholder}</option> : null}
                  {modelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {referenceSlot ? (
              <div className="mb-6 rounded-xl border bg-background/60 p-4">
                <div className="mb-3 flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <SmartIcon name="ImageIcon" size={13} />
                  {referenceTitle}
                </div>
                {referenceSlot}
                {referenceError ? (
                  <p className="mt-2 text-xs text-destructive">{referenceError}</p>
                ) : null}
              </div>
            ) : null}

            <div className="mb-2 space-y-1.5">
              <label htmlFor="imgstudio-prompt" className="text-sm font-medium text-foreground">
                {promptLabel}
              </label>
              <textarea
                id="imgstudio-prompt"
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder={promptPlaceholder}
                rows={6}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {prompt.length}
                  {promptMaxLength ? ` / ${promptMaxLength}` : ""}
                </span>
                {promptTooLong ? (
                  <span className="text-destructive">{promptTooLongLabel}</span>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              disabled={generateDisabled}
              onClick={onGenerate}
              className={cn(
                "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90",
                "hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
              )}
            >
              {busy ? (
                <SmartIcon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <SmartIcon name="Sparkles" size={16} />
              )}
              {actionLabel}
            </button>

            <div className="mt-4 flex items-center justify-between gap-3">
              {creditsCostLabel ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                  <SmartIcon name="Coins" size={12} />
                  {creditsCostLabel}
                </span>
              ) : null}
              {signedIn && creditsRemainingLabel ? (
                <span className="text-xs text-muted-foreground">{creditsRemainingLabel}</span>
              ) : null}
              {!signedIn && buyCreditsLabel && buyCreditsHref ? (
                <ConsoleLink
                  href={buyCreditsHref}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  {buyCreditsLabel}
                </ConsoleLink>
              ) : null}
            </div>

            {progressVisible ? (
              <div className="mt-6 rounded-xl border bg-background/60 p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-foreground">{progressLabel}</span>
                  <span className="font-medium text-foreground">{progress ?? 0}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress ?? 0}%` }}
                  />
                </div>
                {progressStatusLabel ? (
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {progressStatusLabel}
                  </p>
                ) : null}
              </div>
            ) : null}
          </section>

          {/* gallery */}
          <section className="rounded-xl border bg-card p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <SmartIcon name="ImageIcon" size={15} />
              </span>
              <h2 className="text-[15px] font-semibold tracking-tight text-foreground">{galleryTitle}</h2>
              {images.length > 0 ? (
                <span className="ml-auto inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-semibold text-primary">
                  {images.length}
                </span>
              ) : null}
            </div>

            {images.length > 0 ? (
              <div
                className={cn(
                  "grid gap-6",
                  images.length === 1 ? "grid-cols-1" : "sm:grid-cols-2"
                )}
              >
                {images.map((image: ImageGeneratorStudioImage) => (
                  <figure key={image.id} className="group space-y-2.5">
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-xl border bg-muted",
                        images.length === 1 ? "" : "aspect-square"
                      )}
                    >
                      <img
                        src={image.url}
                        alt={image.prompt || "Generated image"}
                        loading="lazy"
                        className={cn(
                          "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]",
                          images.length === 1 ? "h-auto" : ""
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      <button
                        type="button"
                        onClick={() => onDownload?.(image)}
                        disabled={downloadingId === image.id}
                        aria-label={downloadLabel}
                        title={downloadLabel}
                        className="absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-lg transition-all hover:bg-background group-hover:opacity-100 disabled:opacity-60"
                      >
                        {downloadingId === image.id ? (
                          <SmartIcon name="Loader2" size={16} className="animate-spin" />
                        ) : (
                          <SmartIcon name="Download" size={16} />
                        )}
                      </button>
                    </div>
                    <figcaption className="flex items-start justify-between gap-3">
                      {image.prompt ? (
                        <span className="line-clamp-2 flex-1 text-xs text-muted-foreground">
                          {image.prompt}
                        </span>
                      ) : null}
                      {image.model ? (
                        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {image.model}
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border bg-muted/50">
                  <SmartIcon name="ImageIcon" size={30} className="text-muted-foreground" />
                  {busy ? (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">
                  {busy ? galleryReadyLabel : galleryEmptyLabel}
                </p>
                {busy ? (
                  <div className="mt-4 h-1.5 w-48 animate-pulse overflow-hidden rounded-full bg-muted" />
                ) : null}
              </div>
            )}
          </section>
        </div>

        {footerHint ? (
          <p className="mt-8 text-center text-xs text-muted-foreground">{footerHint}</p>
        ) : null}
      </div>
    </section>
  );
}

export default ImageGeneratorStudio;
