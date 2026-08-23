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
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* prompt deck */}
          <section className="rounded-xl border bg-card p-6">
            <StepHeading n="01" title={deckTitle} />

            {tabs.length > 1 ? (
              <div className="mt-5 inline-flex rounded-lg border bg-muted/60 p-1" role="tablist">
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

          {/* gallery — preview of the latest image + thumbnail grid */}
          <section className="flex flex-col">
            <StepHeading
              n="02"
              title={galleryTitle}
              right={
                images.length > 0 ? (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {images.length}
                  </span>
                ) : null
              }
            />

            {images.length > 0 ? (
              <>
                {/* latest image — large preview */}
                <figure className="group mt-4 rounded-xl border bg-card p-4">
                  <div className="relative overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={images[0].url}
                      alt={images[0].prompt || "Generated image"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <button
                      type="button"
                      onClick={() => onDownload?.(images[0])}
                      disabled={downloadingId === images[0].id}
                      aria-label={downloadLabel}
                      title={downloadLabel}
                      className="absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-lg transition-all hover:bg-background group-hover:opacity-100 disabled:opacity-60"
                    >
                      {downloadingId === images[0].id ? (
                        <SmartIcon name="Loader2" size={16} className="animate-spin" />
                      ) : (
                        <SmartIcon name="Download" size={16} />
                      )}
                    </button>
                  </div>
                  <figcaption className="mt-2.5 flex items-start justify-between gap-3">
                    {images[0].prompt ? (
                      <span className="line-clamp-2 flex-1 text-xs text-muted-foreground">
                        {images[0].prompt}
                      </span>
                    ) : null}
                    {images[0].model ? (
                      <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {images[0].model}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>

                {/* thumbnail grid for the rest */}
                {images.length > 1 ? (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {images.slice(1).map((image: ImageGeneratorStudioImage) => (
                      <figure key={image.id} className="group">
                        <div className="relative aspect-square overflow-hidden rounded-md border bg-muted">
                          <img
                            src={image.url}
                            alt={image.prompt || "Generated image"}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                          />
                          <button
                            type="button"
                            onClick={() => onDownload?.(image)}
                            disabled={downloadingId === image.id}
                            aria-label={downloadLabel}
                            title={downloadLabel}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
                          >
                            {downloadingId === image.id ? (
                              <SmartIcon name="Loader2" size={14} className="animate-spin" />
                            ) : (
                              <SmartIcon name="Download" size={14} />
                            )}
                          </button>
                        </div>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl border bg-card text-muted-foreground">
                  <SmartIcon name="ImageIcon" size={26} />
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
