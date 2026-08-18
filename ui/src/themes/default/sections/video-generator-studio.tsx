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
        {/* hero */}
        <header className="relative mb-10 overflow-hidden rounded-3xl border bg-gradient-to-br from-cyan-500/10 via-background to-background px-6 py-10 md:px-10 md:py-12">
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
            aria-hidden
          />
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              {eyebrow ? (
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
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
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
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
                  <SmartIcon name="Zap" size={12} className="text-cyan-500" />
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
          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                <SmartIcon name="Sparkles" size={15} />
              </span>
              <h2 className="text-lg font-semibold text-foreground">
                {deckTitle}
              </h2>
            </div>

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
                    className="text-cyan-500"
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
                "mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-600 disabled:opacity-55",
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
                  <SmartIcon name="Coins" size={12} className="text-cyan-500" />
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
                  className="ml-auto text-sm font-semibold text-cyan-500 hover:underline"
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
                  <span className="font-bold text-cyan-500">
                    {progress ?? 0}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-cyan-500 transition-all"
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

          {/* stage */}
          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                <SmartIcon name="Video" size={15} />
              </span>
              <h2 className="text-lg font-semibold text-foreground">
                {stageTitle}
              </h2>
              {videos.length > 0 ? (
                <span className="ml-auto inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-cyan-500/10 px-2 text-xs font-semibold text-cyan-500">
                  {videos.length}
                </span>
              ) : null}
            </div>

            {videos.length > 0 ? (
              <div
                className={cn(
                  "grid gap-6",
                  videos.length === 1 ? "grid-cols-1" : "sm:grid-cols-2",
                )}
              >
                {videos.map((video: VideoGeneratorStudioVideo) => (
                  <figure key={video.id} className="group space-y-2.5">
                    <div className="relative overflow-hidden rounded-xl border bg-muted">
                      <video
                        src={video.url}
                        controls
                        preload="metadata"
                        playsInline
                        className="h-auto w-full"
                      />
                      <button
                        type="button"
                        onClick={() => onDownload?.(video)}
                        disabled={downloadingId === video.id}
                        aria-label={downloadLabel}
                        title={downloadLabel}
                        className="absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-lg transition-all hover:bg-background group-hover:opacity-100 disabled:opacity-60"
                      >
                        {downloadingId === video.id ? (
                          <SmartIcon
                            name="Loader2"
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <SmartIcon name="Download" size={16} />
                        )}
                      </button>
                    </div>
                    <figcaption className="flex items-start justify-between gap-3">
                      {video.prompt ? (
                        <span className="line-clamp-2 flex-1 text-xs text-muted-foreground">
                          {video.prompt}
                        </span>
                      ) : null}
                      {video.model ? (
                        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {video.model}
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border bg-muted/50">
                  <SmartIcon
                    name="Video"
                    size={30}
                    className="text-muted-foreground"
                  />
                  {busy ? (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-500 opacity-60" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-500" />
                    </span>
                  ) : null}
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
