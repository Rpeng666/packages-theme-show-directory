'use client';

import { useState } from 'react';
import { Upload, Link, Eye, Play, Shield, PenLine, Crop } from 'lucide-react';

import { Button } from '../../../themes/default/button';
import { cn } from '../../../lib/utils';
import type { HeroLiveProps } from '../../../contracts/sections/hero-live';

/**
 * Default theme HeroLive — Tailwind fallback for the interactive homepage
 * demo. The Semi theme ships the primary implementation; this keeps the
 * registry complete for default/pixel themes.
 */
export function HeroLive({
  className,
  eyebrow,
  title,
  description,
  dropPrimary,
  dropClick,
  dropHint,
  youtubeLabel,
  youtubePlaceholder,
  youtubeBusy,
  previewLabel,
  canvasLabel,
  sizeChipLabel,
  presets = [],
  activeWidth = 1280,
  activeHeight = 720,
  ctaPrimaryLabel,
  ctaPrimaryDisabled,
  ctaSecondaryLabel,
  ctaSecondaryDisabled,
  privacyTip,
  error,
  sourceUrl,
  onDropFile,
  onYouTubeSubmit,
  onSelectPreset,
  onOpenEditor,
  onOpenResize,
}: HeroLiveProps) {
  const [youtubeInput, setYoutubeInput] = useState('');
  const [dragging, setDragging] = useState(false);

  const triggerFile = () =>
    document.querySelector<HTMLInputElement>('#app-hlive-file')?.click();

  return (
    <section className={cn('relative overflow-hidden py-16 md:py-20', className)}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="bg-card border-border relative grid overflow-hidden rounded-2xl border shadow-sm lg:grid-cols-2">
          {/* Left */}
          <div className="border-border flex flex-col gap-4 border-b p-6 lg:border-b-0 lg:border-r lg:p-8">
            {eyebrow ? (
              <div className="bg-primary/10 text-primary inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                <span className="bg-primary size-1.5 rounded-full" />
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            ) : null}

            <div
              role="button"
              tabIndex={0}
              onClick={triggerFile}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file && onDropFile) onDropFile(file);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  triggerFile();
                }
              }}
              className={cn(
                'border-border hover:border-primary/50 bg-muted/40 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors',
                dragging && 'border-primary bg-primary/5'
              )}
            >
              <div className="bg-primary/10 text-primary rounded-xl p-3">
                <Upload className="size-6" />
              </div>
              <div className="text-foreground text-sm font-semibold">
                {dropPrimary}
              </div>
              <div className="text-muted-foreground text-xs">{dropClick}</div>
              {dropHint ? (
                <div className="text-muted-foreground text-xs">{dropHint}</div>
              ) : null}
            </div>
            <input
              id="app-hlive-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && onDropFile) onDropFile(file);
                e.target.value = '';
              }}
            />

            {youtubeLabel ? (
              <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                <span className="bg-border h-px flex-1" />
                {youtubeLabel}
                <span className="bg-border h-px flex-1" />
              </div>
            ) : null}

            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (youtubeInput.trim() && onYouTubeSubmit)
                  onYouTubeSubmit(youtubeInput.trim());
              }}
            >
              <div className="border-input bg-background flex flex-1 items-center gap-2 rounded-lg border px-3">
                <Link className="text-muted-foreground size-4" />
                <input
                  value={youtubeInput}
                  onChange={(e) => setYoutubeInput(e.target.value)}
                  placeholder={youtubePlaceholder}
                  className="bg-transparent h-10 flex-1 text-sm outline-none placeholder:text-xs"
                />
              </div>
              <Button
                type="submit"
                disabled={!youtubeInput.trim() || youtubeBusy}
                loading={youtubeBusy}
              >
                {youtubeBusy ? 'Fetching…' : 'Fetch'}
              </Button>
            </form>

            {error ? (
              <div className="text-destructive text-xs">{error}</div>
            ) : null}
            {privacyTip ? (
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Shield className="size-3.5" />
                {privacyTip}
              </div>
            ) : null}
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 p-6 lg:p-8">
            <div className="bg-card border-border rounded-xl border p-3">
              <div className="text-muted-foreground mb-2 flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <Eye className="size-3.5" />
                  {previewLabel}
                </span>
                <span className="bg-muted text-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold">
                  {activeWidth} × {activeHeight}
                </span>
              </div>
              <div
                className="bg-muted/60 relative w-full overflow-hidden rounded-lg bg-[repeating-conic-gradient(#00000014_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]"
                style={{ aspectRatio: `${activeWidth}/${activeHeight}` }}
              >
                {sourceUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sourceUrl}
                    alt={typeof canvasLabel === 'string' ? canvasLabel : ''}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-xs">
                    <Play className="text-primary size-8" />
                    {canvasLabel}
                  </div>
                )}
              </div>
            </div>

            {presets.length > 0 ? (
              <div className="space-y-2">
                {sizeChipLabel ? (
                  <div className="text-muted-foreground text-xs font-medium">
                    {sizeChipLabel}
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => {
                    const active =
                      preset.width === activeWidth &&
                      preset.height === activeHeight;
                    return (
                      <button
                        key={`${preset.width}x${preset.height}`}
                        type="button"
                        onClick={() =>
                          onSelectPreset?.(preset.width, preset.height)
                        }
                        className={cn(
                          'border-border bg-card text-muted-foreground hover:border-primary hover:text-primary flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors',
                          active &&
                            'border-primary bg-primary/10 text-primary font-semibold'
                        )}
                      >
                        {preset.label}
                        <span className="opacity-70">
                          {preset.width}×{preset.height}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-auto flex flex-col gap-2">
              <Button
                type="button"
                disabled={!sourceUrl || ctaPrimaryDisabled}
                onClick={onOpenEditor}
                className="w-full"
              >
                <PenLine className="size-4" />
                {ctaPrimaryLabel}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!sourceUrl || ctaSecondaryDisabled}
                onClick={onOpenResize}
                className="w-full"
              >
                <Crop className="size-4" />
                {ctaSecondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
