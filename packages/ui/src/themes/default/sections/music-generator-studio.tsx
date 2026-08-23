"use client";

import * as React from "react";
import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";
import { ConsoleLink } from "../../../components/console/bridge";
import { SmartIcon } from "../../../components/smart-icon";
import type {
  MusicGeneratorStudioMode,
  MusicGeneratorStudioProps,
  MusicGeneratorStudioSong,
} from "../../../contracts/sections/music-generator-studio";

/**
 * Default MusicGeneratorStudio — restrained editor style.
 *
 * Structural layout (not just a palette swap): a quiet hairline header, a
 * left generator deck (mode → provider/model → prompt/lyrics → generate),
 * and a right player column that leads with a mini player for the current
 * track (artwork + play/pause + a fake progress line) above the queue. Only
 * the semantic `primary` token is used for color.
 */

const MODE_ICONS: Record<MusicGeneratorStudioMode, string> = {
  quick: "Music",
  custom: "Sparkles",
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

export function MusicGeneratorStudio({
  className,
  "data-registry": dataRegistry,
  eyebrow,
  title,
  description,
  deckTitle,
  playerTitle,
  activeMode,
  modes,
  onModeChange,
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
  customTitleLabel,
  customTitlePlaceholder,
  customTitle,
  onCustomTitleChange,
  styleLabel,
  stylePlaceholder,
  style,
  onStyleChange,
  lyricsLabel,
  lyricsPlaceholder,
  lyrics,
  lyricsMaxLength,
  onLyricsChange,
  lyricsTooLong,
  lyricsTooLongLabel,
  instrumentalLabel,
  instrumentalHint,
  instrumental,
  onInstrumentalChange,
  customHint,
  promptLabel,
  promptPlaceholder,
  prompt,
  promptMaxLength,
  onPromptChange,
  promptTooLong,
  promptTooLongLabel,
  promptHint,
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
  songs,
  playerEmptyLabel,
  playerReadyLabel,
  playingId,
  loadingId,
  onTogglePlay,
  downloadLabel,
  downloadingId,
  onDownload,
  footerHint,
}: MusicGeneratorStudioProps) {
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

  const currentSong = songs.find((s) => s.id === playingId) ?? songs[0];

  return (
    <section
      className={cn("py-16 md:py-24", className)}
      data-registry={dataRegistry}
    >
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        {/* Header — quiet hairline rule */}
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
                  <span className="text-3xl font-semibold tracking-tight text-foreground">
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

        {/* Workspace — generator deck + player column */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Generator deck */}
          <section className="rounded-xl border bg-card p-6">
            <StepHeading n="01" title={deckTitle} />

            {modes.length > 1 ? (
              <div className="mt-5 inline-flex rounded-lg border bg-muted/60 p-1" role="tablist">
                {modes.map((mode) => {
                  const active = mode.key === activeMode;
                  return (
                    <button
                      key={mode.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => onModeChange(mode.key)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <SmartIcon
                        name={mode.icon || MODE_ICONS[mode.key] || "Music"}
                        size={14}
                      />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  {providerLabel}
                </label>
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
                <label className="text-sm font-medium text-foreground">
                  {modelLabel}
                </label>
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

            {activeMode === "custom" ? (
              <div className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="mstudio-title" className="text-sm font-medium text-foreground">
                      {customTitleLabel}
                    </label>
                    <input
                      id="mstudio-title"
                      value={customTitle}
                      onChange={(e) => onCustomTitleChange(e.target.value)}
                      placeholder={customTitlePlaceholder}
                      className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="mstudio-style" className="text-sm font-medium text-foreground">
                      {styleLabel}
                    </label>
                    <input
                      id="mstudio-style"
                      value={style}
                      onChange={(e) => onStyleChange(e.target.value)}
                      placeholder={stylePlaceholder}
                      className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="mstudio-lyrics" className="text-sm font-medium text-foreground">
                    {lyricsLabel}
                  </label>
                  <textarea
                    id="mstudio-lyrics"
                    value={lyrics}
                    onChange={(e) => onLyricsChange(e.target.value)}
                    placeholder={lyricsPlaceholder}
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {lyrics.length}
                      {lyricsMaxLength ? ` / ${lyricsMaxLength}` : ""}
                    </span>
                    {lyricsTooLong ? (
                      <span className="text-destructive">{lyricsTooLongLabel}</span>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {instrumentalLabel}
                    </div>
                    {instrumentalHint ? (
                      <div className="text-xs text-muted-foreground">
                        {instrumentalHint}
                      </div>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={instrumental}
                    onClick={() => onInstrumentalChange(!instrumental)}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
                      instrumental ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
                        instrumental ? "translate-x-[18px]" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>

                {customHint ? (
                  <p className="text-xs text-muted-foreground">{customHint}</p>
                ) : null}
              </div>
            ) : (
              <div className="mt-6 space-y-1.5">
                <label htmlFor="mstudio-prompt" className="text-sm font-medium text-foreground">
                  {promptLabel}
                </label>
                <textarea
                  id="mstudio-prompt"
                  value={prompt}
                  onChange={(e) => onPromptChange(e.target.value)}
                  placeholder={promptPlaceholder}
                  rows={6}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
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
                {promptHint ? (
                  <p className="text-xs text-muted-foreground">{promptHint}</p>
                ) : null}
              </div>
            )}

            <button
              type="button"
              disabled={generateDisabled}
              onClick={onGenerate}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-60"
            >
              {busy ? (
                <SmartIcon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <SmartIcon name="Music" size={16} />
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
                <span className="text-xs text-muted-foreground">
                  {creditsRemainingLabel}
                </span>
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
              <div className="mt-6 rounded-lg border bg-muted/30 p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-foreground">{progressLabel}</span>
                  <span className="font-medium text-foreground">
                    {progress ?? 0}%
                  </span>
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

          {/* Player column — mini player + queue */}
          <section className="flex flex-col">
            <StepHeading n="02" title={playerTitle} />

            {/* Mini player for the current track */}
            {currentSong ? (
              <div className="mt-4 rounded-xl border bg-card p-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {currentSong.imageUrl ? (
                      <img
                        src={currentSong.imageUrl}
                        alt={currentSong.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <SmartIcon name="Music" size={22} />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {currentSong.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {currentSong.artist}
                      {currentSong.style ? ` · ${currentSong.style}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onTogglePlay(currentSong)}
                    disabled={loadingId === currentSong.id}
                    aria-label="Play / pause"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {loadingId === currentSong.id ? (
                      <SmartIcon name="Loader2" size={16} className="animate-spin" />
                    ) : playingId === currentSong.id ? (
                      <SmartIcon name="Pause" size={16} />
                    ) : (
                      <SmartIcon name="Play" size={16} />
                    )}
                  </button>
                </div>
                {/* fake progress */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full w-1/3 rounded-full bg-primary"
                    style={playingId === currentSong.id ? undefined : { width: "0%" }}
                  />
                </div>
              </div>
            ) : null}

            {/* Queue */}
            <div className="mt-4 space-y-2">
              {songs.length > 0 ? (
                songs.map((song: MusicGeneratorStudioSong) => {
                  const isCurrent = playingId === song.id;
                  const isPlaying = isCurrent && loadingId !== song.id;
                  const isLoading = loadingId === song.id;
                  return (
                    <article
                      key={song.id}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                        isPlaying
                          ? "border-primary/40 bg-primary/5"
                          : "border-border bg-card"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => onTogglePlay(song)}
                        disabled={isLoading}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                          isPlaying
                            ? "bg-primary text-primary-foreground"
                            : "border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {isLoading ? (
                          <SmartIcon name="Loader2" size={13} className="animate-spin" />
                        ) : isPlaying ? (
                          <SmartIcon name="Pause" size={13} />
                        ) : (
                          <SmartIcon name="Play" size={13} />
                        )}
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-sm font-medium text-foreground">
                            {song.title}
                          </h3>
                          {song.durationLabel ? (
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {song.durationLabel}
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                          {song.artist ? <span>{song.artist}</span> : null}
                          {song.style ? (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px]">
                              {song.style}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDownload(song)}
                        disabled={downloadingId === song.id}
                        aria-label={
                          typeof downloadLabel === "string" ? downloadLabel : undefined
                        }
                        title={
                          typeof downloadLabel === "string" ? downloadLabel : undefined
                        }
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
                      >
                        {downloadingId === song.id ? (
                          <SmartIcon name="Loader2" size={14} className="animate-spin" />
                        ) : (
                          <SmartIcon name="Download" size={14} />
                        )}
                      </button>
                    </article>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl border bg-card text-muted-foreground">
                    <SmartIcon name="Disc" size={26} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {busy ? playerReadyLabel : playerEmptyLabel}
                  </p>
                </div>
              )}
            </div>
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

export default MusicGeneratorStudio;
