"use client";



import * as React from "react";

import { Select } from '../components/form';
import { Switch } from '../components/switch';
import { Textarea } from '../components/textarea';
import type { ReactNode } from "react";



import type {

  MusicGeneratorStudioMode,

  MusicGeneratorStudioOption,

  MusicGeneratorStudioProps,

  MusicGeneratorStudioSong,

} from "@template/ui";

import { ConsoleLink } from "@template/ui";



import { Button } from "../components/button";

import { SmartIcon } from "../icons";



/**

 * Semi MusicGeneratorStudio - a designer-grade AI music creation studio.

 *

 * Visual language shared with the image studio (ImageGeneratorStudio) and

 * the chat studios: a soft grid + brand glow hero with the credit wallet on

 * the right, then a two-panel "creative desk" workspace - the prompt deck

 * (segmented quick/custom mode tabs, provider/model selects, the custom

 * composer with title/style/lyrics/instrumental, prompt composer, generate

 * action and live progress) and the player (song cards with cover art,

 * play / pause with an equalizer animation, duration, style chips, download

 * and empty / ready states). The accent is violet to give each studio a

 * distinct, cohesive identity. All data + callbacks come from the app; this

 * section only renders.

 */



function cn(...parts: Array<string | false | null | undefined>) {

  return parts.filter(Boolean).join(" ");

}



const MODE_ICONS: Record<MusicGeneratorStudioMode, string> = {

  quick: "Music",

  custom: "Sparkles",

};



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



  const playerHeading =

    songs.length > 0 ? (

      <span className="mstudio-panel-badge">{songs.length}</span>

    ) : null;



  return (

    <section

      className={cn("mstudio", className)}

      data-registry={dataRegistry}

    >

      <div className="mstudio-shell">

        {/* ── Hero: brand strip + credit wallet ─────────────────────────── */}

        <header className="mstudio-hero">

          <div className="mstudio-hero-mesh" aria-hidden />

          <div className="mstudio-hero-glow" aria-hidden />

          <div className="mstudio-hero-inner">

            {eyebrow ? (

              <div className="mstudio-eyebrow">

                <span className="mstudio-eyebrow-dot" />

                <span>{eyebrow}</span>

              </div>

            ) : null}

            {title ? <h1 className="mstudio-title">{title}</h1> : null}

            {description ? (

              <p className="mstudio-desc">{description}</p>

            ) : null}

          </div>



          <aside className="mstudio-wallet">

            <div className="mstudio-wallet-card">

              <div className="mstudio-wallet-head">

                <span className="mstudio-wallet-icon">

                  <SmartIcon name="Coins" size={16} />

                </span>

                <span className="mstudio-wallet-label">{balanceLabel}</span>

              </div>

              {signedIn ? (

                <div className="mstudio-wallet-value">

                  <span className="mstudio-wallet-num">{balanceValue}</span>

                  {balanceUnit ? (

                    <span className="mstudio-wallet-unit">{balanceUnit}</span>

                  ) : null}

                </div>

              ) : (

                <div className="mstudio-wallet-signed-out">

                  {signedInBalanceLabel}

                </div>

              )}

              {costChipLabel ? (

                <div className="mstudio-wallet-cost">

                  <SmartIcon name="Zap" size={13} />

                  <span>{costChipLabel}</span>

                </div>

              ) : null}

              {!signedIn && buyCreditsLabel && buyCreditsHref ? (

                <ConsoleLink href={buyCreditsHref} className="mstudio-wallet-buy">

                  <Button

                    variant="outline"

                    size="sm"

                    className="mstudio-wallet-buy-btn"

                  >

                    {buyCreditsLabel}

                  </Button>

                </ConsoleLink>

              ) : null}

            </div>

          </aside>

        </header>



        {/* ── Workspace: prompt deck + player ───────────────────────────── */}

        <div className="mstudio-workspace">

          {/* Left: prompt deck */}

          <section className="mstudio-deck">

            <div className="mstudio-panel-head">

              <span className="mstudio-panel-icon">

                <SmartIcon name="Music" size={15} />

              </span>

              <h2 className="mstudio-panel-title">{deckTitle}</h2>

            </div>



            {/* segmented mode tabs */}

            {modes.length > 1 ? (

              <div className="mstudio-tabs" role="tablist">

                {modes.map((mode) => {

                  const active = mode.key === activeMode;

                  return (

                    <button

                      key={mode.key}

                      type="button"

                      role="tab"

                      aria-selected={active}

                      className={cn("mstudio-tab", active && "mstudio-tab-active")}

                      onClick={() => onModeChange(mode.key)}

                    >

                      <SmartIcon

                        name={mode.icon || MODE_ICONS[mode.key] || "Music"}

                        size={14}

                      />

                      <span>{mode.label}</span>

                    </button>

                  );

                })}

              </div>

            ) : null}



            {/* provider / model */}

            <div className="mstudio-fields">

              <div className="mstudio-field">

                <label className="mstudio-field-label">{providerLabel}</label>

                <Select

                  value={provider}

                  onChange={(value) => onProviderChange(String(value))}

                  options={providerOptions.map((option) => ({

                    label: option.label,

                    value: option.value,

                  }))}

                  placeholder={providerPlaceholder}

                  className="mstudio-select"

                  

                />

              </div>

              <div className="mstudio-field">

                <label className="mstudio-field-label">{modelLabel}</label>

                <Select

                  value={model}

                  onChange={(value) => onModelChange(String(value))}

                  options={modelOptions.map((option) => ({

                    label: option.label,

                    value: option.value,

                  }))}

                  placeholder={modelPlaceholder}

                  className="mstudio-select"

                  

                />

              </div>

            </div>



            {/* custom composer (custom mode) */}

            {activeMode === "custom" ? (

              <div className="mstudio-composer">

                <div className="mstudio-composer-row">

                  <div className="mstudio-field mstudio-field-half">

                    <label className="mstudio-field-label" htmlFor="mstudio-title">

                      {customTitleLabel}

                    </label>

                    <input

                      id="mstudio-title"

                      className="mstudio-input"

                      value={customTitle}

                      onChange={(event) => onCustomTitleChange(event.target.value)}

                      placeholder={customTitlePlaceholder}

                    />

                  </div>

                  <div className="mstudio-field mstudio-field-half">

                    <label className="mstudio-field-label" htmlFor="mstudio-style">

                      {styleLabel}

                    </label>

                    <input

                      id="mstudio-style"

                      className="mstudio-input"

                      value={style}

                      onChange={(event) => onStyleChange(event.target.value)}

                      placeholder={stylePlaceholder}

                    />

                  </div>

                </div>



                <div className="mstudio-prompt">

                  <label className="mstudio-field-label" htmlFor="mstudio-lyrics">

                    {lyricsLabel}

                  </label>

                  <Textarea

                    id="mstudio-lyrics"

                    value={lyrics}

                    onChange={(e) => onLyricsChange(e.target.value)}

                    placeholder={lyricsPlaceholder}

                    rows={4}

                    className="mstudio-prompt-area"

                    

                  />

                  <div className="mstudio-prompt-meta">

                    <span className="mstudio-prompt-count">

                      {lyrics.length}

                      {lyricsMaxLength ? ` / ${lyricsMaxLength}` : ""}

                    </span>

                    {lyricsTooLong ? (

                      <span className="mstudio-prompt-error">

                        {lyricsTooLongLabel}

                      </span>

                    ) : null}

                  </div>

                </div>



                <div className="mstudio-instrumental">

                  <div className="mstudio-instrumental-text">

                    <span className="mstudio-instrumental-label">

                      {instrumentalLabel}

                    </span>

                    {instrumentalHint ? (

                      <span className="mstudio-instrumental-hint">

                        {instrumentalHint}

                      </span>

                    ) : null}

                  </div>

                  <Switch

                    checked={instrumental}

                    onCheckedChange={(next) => onInstrumentalChange(Boolean(next))}

                    aria-label={typeof instrumentalLabel === "string" ? instrumentalLabel : "instrumental"}

                  />

                </div>



                {customHint ? (

                  <p className="mstudio-custom-hint">{customHint}</p>

                ) : null}

              </div>

            ) : (

              /* quick prompt composer */

              <div className="mstudio-prompt">

                <label className="mstudio-field-label" htmlFor="mstudio-prompt">

                  {promptLabel}

                </label>

                <Textarea

                  id="mstudio-prompt"

                  value={prompt}

                  onChange={(e) => onPromptChange(e.target.value)}

                  placeholder={promptPlaceholder}

                  rows={6}

                  className="mstudio-prompt-area"

                  

                />

                <div className="mstudio-prompt-meta">

                  <span className="mstudio-prompt-count">

                    {prompt.length}

                    {promptMaxLength ? ` / ${promptMaxLength}` : ""}

                  </span>

                  {promptTooLong ? (

                    <span className="mstudio-prompt-error">

                      {promptTooLongLabel}

                    </span>

                  ) : null}

                </div>

                {promptHint ? (

                  <p className="mstudio-custom-hint">{promptHint}</p>

                ) : null}

              </div>

            )}



            {/* generate action */}

            <button

              type="button"

              className={cn("mstudio-generate", busy && "mstudio-generate-busy")}

              onClick={onGenerate}

              disabled={generateDisabled}

            >

              {busy ? (

                <SmartIcon name="Loader2" size={17} className="mstudio-spin" />

              ) : (

                <SmartIcon name="Music" size={17} />

              )}

              <span>{actionLabel}</span>

            </button>



            {/* credits row */}

            <div className="mstudio-credits">

              {creditsCostLabel ? (

                <span className="mstudio-credit-chip">

                  <SmartIcon name="Coins" size={13} />

                  {creditsCostLabel}

                </span>

              ) : null}

              {signedIn && creditsRemainingLabel ? (

                <span className="mstudio-credit-remaining">

                  {creditsRemainingLabel}

                </span>

              ) : null}

              {!signedIn && buyCreditsLabel && buyCreditsHref ? (

                <ConsoleLink href={buyCreditsHref} className="mstudio-credit-buy">

                  {buyCreditsLabel}

                </ConsoleLink>

              ) : null}

            </div>



            {/* live progress rail */}

            {progressVisible ? (

              <div className="mstudio-progress">

                <div className="mstudio-progress-head">

                  <span className="mstudio-progress-label">{progressLabel}</span>

                  <span className="mstudio-progress-value">{progress ?? 0}%</span>

                </div>

                <div className="mstudio-progress-track">

                  <div

                    className="mstudio-progress-fill"

                    style={{ width: `${progress ?? 0}%` }}

                  />

                </div>

                {progressStatusLabel ? (

                  <p className="mstudio-progress-status">{progressStatusLabel}</p>

                ) : null}

              </div>

            ) : null}

          </section>



          {/* Right: player */}

          <section className="mstudio-player">

            <div className="mstudio-panel-head">

              <span className="mstudio-panel-icon mstudio-panel-icon-player">

                <SmartIcon name="Disc" size={15} />

              </span>

              <h2 className="mstudio-panel-title">{playerTitle}</h2>

              {playerHeading}

            </div>



            {songs.length > 0 ? (

              <div className="mstudio-list">

                {songs.map((song: MusicGeneratorStudioSong) => {

                  const isCurrent = playingId === song.id;

                  const isPlaying = isCurrent && playingId != null && loadingId !== song.id;

                  const isLoading = loadingId === song.id;

                  return (

                    <article key={song.id} className="mstudio-song">

                      <div className="mstudio-song-cover">

                        {song.imageUrl ? (

                          <img src={song.imageUrl} alt={song.title} loading="lazy" />

                        ) : (

                          <span className="mstudio-song-cover-fallback">

                            <SmartIcon name="Music" size={22} />

                          </span>

                        )}

                        {song.audioUrl ? (

                          <button

                            type="button"

                            className={cn(

                              "mstudio-song-play",

                              isPlaying && "mstudio-song-play-active",

                            )}

                            onClick={() => onTogglePlay(song)}

                            disabled={isLoading}

                            aria-label={isPlaying ? "Pause" : "Play"}

                          >

                            {isLoading ? (

                              <SmartIcon name="Loader2" size={16} className="mstudio-spin" />

                            ) : isPlaying ? (

                              <SmartIcon name="Pause" size={14} />

                            ) : (

                              <SmartIcon name="Play" size={14} />

                            )}

                          </button>

                        ) : null}

                        {isPlaying ? (

                          <span className="mstudio-eq" aria-hidden>

                            <i />

                            <i />

                            <i />

                            <i />

                          </span>

                        ) : null}

                      </div>



                      <div className="mstudio-song-body">

                        <div className="mstudio-song-head">

                          <h3 className="mstudio-song-title">{song.title}</h3>

                          {song.durationLabel ? (

                            <span className="mstudio-song-duration">

                              {song.durationLabel}

                            </span>

                          ) : null}

                        </div>

                        <div className="mstudio-song-meta">

                          {song.artist ? (

                            <span className="mstudio-song-artist">

                              <SmartIcon name="User" size={12} />

                              {song.artist}

                            </span>

                          ) : null}

                          {song.style ? (

                            <span className="mstudio-song-style">{song.style}</span>

                          ) : null}

                        </div>

                        {song.prompt ? (

                          <p className="mstudio-song-prompt">{song.prompt}</p>

                        ) : null}

                      </div>



                      {song.audioUrl ? (

                        <button

                          type="button"

                          className="mstudio-song-download"

                          onClick={() => onDownload(song)}

                          disabled={downloadingId === song.id}

                          aria-label={typeof downloadLabel === "string" ? downloadLabel : undefined}

                          title={typeof downloadLabel === "string" ? downloadLabel : undefined}

                        >

                          {downloadingId === song.id ? (

                            <SmartIcon name="Loader2" size={15} className="mstudio-spin" />

                          ) : (

                            <SmartIcon name="Download" size={15} />

                          )}

                        </button>

                      ) : null}

                    </article>

                  );

                })}

              </div>

            ) : (

              <div className="mstudio-empty">

                <div className="mstudio-empty-frame">

                  <SmartIcon name="Disc" size={30} />

                  {busy ? <span className="mstudio-empty-pulse" aria-hidden /> : null}

                </div>

                <p className="mstudio-empty-text">

                  {busy ? playerReadyLabel : playerEmptyLabel}

                </p>

                {busy ? <div className="mstudio-empty-shimmer" aria-hidden /> : null}

              </div>

            )}

          </section>

        </div>



        {footerHint ? <p className="mstudio-footer-hint">{footerHint}</p> : null}

      </div>

    </section>

  );

}



export default MusicGeneratorStudio;

