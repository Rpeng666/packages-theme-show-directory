"use client";

import * as React from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { ConsoleLink } from "../../../components/console/bridge";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  VideoGeneratorStudioProps,
  VideoGeneratorStudioTab,
  VideoGeneratorStudioVideo,
} from "../../../contracts/sections/video-generator-studio";

/**
 * Default VideoGeneratorStudio - shadcn-styled fallback of the AI video
 * studio section (see the Semi implementation for the full design notes).
 * Same contract: hero + credit wallet, prompt deck, stage, live states.
 */

const TAB_ICONS: Record<VideoGeneratorStudioTab, string> = {
  "text-to-video": "Sparkles",
  "image-to-video": "ImageIcon",
  "video-to-video": "Video",
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

  const hasReferenceSlot =
    Boolean(referenceImageSlot) || Boolean(referenceVideoLabel);

  return (
    <section
      className={cn("py-16 md:py-24", className)}
      data-registry={dataRegistry}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Header — quiet hairline rule */}
        <header className="border-b pb-8 mb-10">
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              {eyebrow ? (
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  {eyebrow}
                </div>
              ) : null}
              {title ? (
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {title}
                </h1>
              ) : null}
              {description ? (
                <p className="mt-3 text-muted-foreground">{description}</p>
              ) : null}
            </div>

            <aside className="w-full shrink-0 rounded-2xl border bg-card p-5 shadow-sm md:w-64">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <SmartIcon name="Coins" size={14} />
                </span>
                {balanceLabel}
              </div>
              {signedIn ? (
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-foreground">
                    {balanceValue}
                  </span>
                  {balanceUnit ? (
                    <span className="text-sm text-muted-foreground">
                      {balanceUnit}
                    </span>
                  ) : null}
                </div>
              ) : (
                <div className="mt-3 text-sm text-muted-foreground">
                  {signedInBalanceLabel}
                </div>
              )}
              {costChipLabel ? (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                  <SmartIcon name="Zap" size={12} className="text-primary" />
                  {costChipLabel}
                </div>
              ) : null}
              {!signedIn && buyCreditsLabel && buyCreditsHref ? (
                <ConsoleLink href={buyCreditsHref}>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    {buyCreditsLabel}
                  </button>
                </ConsoleLink>
              ) : null}
            </aside>
          </div>
        </header>

        {/* workspace */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* deck */}
          <section className="rounded-xl border bg-card p-6">
            <StepHeading n="01" title={deckTitle} />

            {tabs.length > 1 ? (
              <div className="mb-5 flex gap-1 rounded-xl border bg-muted/60 p-1">
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
                        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        active
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
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

            <div className="mb-5 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {providerLabel}
                </label>
                <select
                  value={provider}
                  onChange={(e) => onProviderChange(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                >
                  {providerOptions.length === 0 ? (
                    <option value="" disabled>
                      {providerPlaceholder}
                    </option>
                  ) : null}
                  {providerOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {modelLabel}
                </label>
                <select
                  value={model}
                  onChange={(e) => onModelChange(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                >
                  {modelOptions.length === 0 ? (
                    <option value="" disabled>
                      {modelPlaceholder}
                    </option>
                  ) : null}
                  {modelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {hasReferenceSlot ? (
              <div className="mb-5 space-y-2 rounded-xl border border-dashed bg-muted/40 p-4">
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <SmartIcon
                    name={referenceImageSlot ? "ImageIcon" : "Link"}
                    size={13}
                    className="text-primary"
                  />
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
                      <p className="text-xs text-destructive">
                        {referenceImageError}
                      </p>
                    ) : null}
                  </>
                ) : null}
                {referenceVideoLabel ? (
                  <>
                    <textarea
                      value={referenceVideo ?? ""}
                      onChange={(e) => onReferenceVideoChange?.(e.target.value)}
                      placeholder={referenceVideoPlaceholder}
                      rows={3}
                      className="min-h-20 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                    {referenceVideoError ? (
                      <p className="text-xs text-destructive">
                        {referenceVideoError}
                      </p>
                    ) : null}
                  </>
                ) : null}
              </div>
            ) : null}

            <div className="space-y-2">
              <label
                htmlFor="vstudio-default-prompt"
                className="text-sm font-medium text-foreground"
              >
                {promptLabel}
              </label>
              <textarea
                id="vstudio-default-prompt"
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder={promptPlaceholder}
                rows={6}
                className="min-h-32 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
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
              onClick={onGenerate}
              disabled={generateDisabled}
              className={cn(
                "mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-55",
                busy && "animate-pulse",
              )}
            >
              {busy ? (
                <SmartIcon name="Loader2" size={17} className="animate-spin" />
              ) : (
                <SmartIcon name="Video" size={17} />
              )}
              <span>{actionLabel}</span>
            </button>

            <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-2">
              {creditsCostLabel ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-foreground">
                  <SmartIcon name="Coins" size={12} className="text-primary" />
                  {creditsCostLabel}
                </span>
              ) : null}
              {signedIn && creditsRemainingLabel ? (
                <span className="ml-auto text-xs text-muted-foreground">
                  {creditsRemainingLabel}
                </span>
              ) : null}
              {!signedIn && buyCreditsLabel && buyCreditsHref ? (
                <ConsoleLink
                  href={buyCreditsHref}
                  className="ml-auto text-sm font-semibold text-primary hover:underline"
                >
                  {buyCreditsLabel}
                </ConsoleLink>
              ) : null}
            </div>

            {progressVisible ? (
              <div className="mt-4 rounded-xl border bg-muted/40 p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {progressLabel}
                  </span>
                  <span className="font-bold text-primary">
                    {progress ?? 0}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
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

          {/* stage — latest video preview + thumbnail grid */}
          <section className="flex flex-col">
            <StepHeading
              n="02"
              title={stageTitle}
              right={
                videos.length > 0 ? (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {videos.length}
                  </span>
                ) : null
              }
            />

            {videos.length > 0 ? (
              <>
                {/* latest video — large preview */}
                <figure className="group mt-4 rounded-xl border bg-card p-4">
                  <div className="relative overflow-hidden rounded-lg border bg-muted">
                    <video
                      src={videos[0].url}
                      controls
                      preload="metadata"
                      playsInline
                      className="h-auto w-full"
                    />
                    <button
                      type="button"
                      onClick={() => onDownload?.(videos[0])}
                      disabled={downloadingId === videos[0].id}
                      aria-label={downloadLabel}
                      title={downloadLabel}
                      className="absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-lg transition-all hover:bg-background group-hover:opacity-100 disabled:opacity-60"
                    >
                      {downloadingId === videos[0].id ? (
                        <SmartIcon name="Loader2" size={16} className="animate-spin" />
                      ) : (
                        <SmartIcon name="Download" size={16} />
                      )}
                    </button>
                  </div>
                  <figcaption className="mt-2.5 flex items-start justify-between gap-3">
                    {videos[0].prompt ? (
                      <span className="line-clamp-2 flex-1 text-xs text-muted-foreground">
                        {videos[0].prompt}
                      </span>
                    ) : null}
                    {videos[0].model ? (
                      <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {videos[0].model}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>

                {/* thumbnail grid for the rest */}
                {videos.length > 1 ? (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {videos.slice(1).map((video: VideoGeneratorStudioVideo) => (
                      <figure key={video.id} className="group">
                        <div className="relative aspect-video overflow-hidden rounded-md border bg-muted">
                          <video
                            src={video.url}
                            preload="metadata"
                            playsInline
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => onDownload?.(video)}
                            disabled={downloadingId === video.id}
                            aria-label={downloadLabel}
                            title={downloadLabel}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
                          >
                            {downloadingId === video.id ? (
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
                  <SmartIcon name="Video" size={26} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {busy ? stageReadyLabel : stageEmptyLabel}
                </p>
                {busy ? (
                  <div className="mt-4 h-1.5 w-48 animate-pulse overflow-hidden rounded-full bg-muted" />
                ) : null}
              </div>
            )}
          </section>

        </div>

        {footerHint ? (
          <p className="mt-8 text-center text-xs text-muted-foreground">
            {footerHint}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default VideoGeneratorStudio;
