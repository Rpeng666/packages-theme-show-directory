'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import {
  PixelCard,
  PixelButton,
  PixelSegmented,
  PixelIconFrame,
} from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../../components/pixel-icon';
import { defaultDitherT, type DitherT } from './dither-i18n';

export type DitherExportScale = 1 | 2 | 4 | 8;

export interface DitherPreviewProps {
  /** Canvas ref the workbench draws the dithered result onto. */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** Source image data URL (for the original/result compare toggle). */
  originalSrc?: string | null;
  /** Result canvas dimensions in pixels (0 until an image is loaded). */
  width: number;
  height: number;
  /** Whether the dither pass is currently running (debounced). */
  isProcessing?: boolean;
  /** Show the original image instead of the dithered canvas. */
  showOriginal?: boolean;
  /** Toggle original/result. */
  onCompareToggle?: () => void;
  /** Current export scale (1×/2×/4×/8× nearest-neighbor upscale). */
  exportScale: DitherExportScale;
  /** Change the export scale. */
  onExportScaleChange?: (scale: DitherExportScale) => void;
  /** Trigger the PNG download at the current export scale. */
  onDownload?: () => void;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: DitherT;
  className?: string;
}

/**
 * Dither workbench preview — result canvas + original/result compare toggle +
 * export-scale segmented control + download button, plus the video "coming
 * soon" banner. Pure presentation; the workbench draws onto `canvasRef` and
 * owns the actions.
 */
export function DitherPreview({
  canvasRef,
  originalSrc,
  width,
  height,
  isProcessing = false,
  showOriginal = false,
  onCompareToggle,
  exportScale,
  onExportScaleChange,
  onDownload,
  t = defaultDitherT,
  className,
}: DitherPreviewProps) {
  const hasResult = width > 0 && height > 0;
  const scaleOptions = ([1, 2, 4, 8] as const).map((s) => ({
    value: String(s),
    label: `${s}×`,
  }));

  return (
    <PixelCard className={cn('border-foreground/15', className)}>
      <div className="flex items-center justify-between gap-3 border-b-2 border-foreground/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <PixelIconFrame size={48} tone="green" icon={<PixelIcon name="grid" size={20} />} />
          <h2 className="font-display text-foreground text-sm font-normal uppercase tracking-wider">
            {t('pvTitle')}
          </h2>
        </div>

        {hasResult && onCompareToggle && (
          <PixelSegmented
            value={showOriginal ? 'original' : 'result'}
            options={[
              { value: 'original', label: t('pvOriginal') },
              { value: 'result', label: t('pvResult') },
            ]}
            onChange={() => onCompareToggle()}
            tone="green"
            aria-label={t('pvCompare')}
          />
        )}
      </div>

      <div className="p-5">
        {/* Video placeholder banner */}
        <div className="mb-4 flex items-center gap-3 border-2 border-retro-gold/30 bg-retro-gold/10 px-4 py-3 pxl-corner-sm">
          <span className="font-mono text-lg text-retro-gold" aria-hidden>
            ▶
          </span>
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-retro-gold">
              {t('videoSoonTitle')}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">{t('videoSoonDesc')}</p>
          </div>
        </div>

        {/* Canvas area */}
        <div
          className={cn(
            'relative flex min-h-[260px] items-center justify-center overflow-auto border-2 border-foreground/10 bg-retro-bg p-3 pxl-corner-sm',
            !hasResult && 'min-h-[220px]',
          )}
        >
          {hasResult ? (
            <>
              {/* Original shown above the dithered canvas when comparing */}
              {showOriginal && originalSrc ? (
                <img
                  src={originalSrc}
                  alt={t('pvOriginalAlt')}
                  className="max-h-[560px] max-w-full object-contain pxl-corner-sm"
                />
              ) : (
                <canvas
                  ref={canvasRef}
                  width={width}
                  height={height}
                  className="max-h-[560px] max-w-full object-contain [image-rendering:pixelated] pxl-corner-sm"
                />
              )}
              {isProcessing && (
                <div className="absolute inset-0 grid place-items-center bg-retro-bg/60">
                  <span className="border-2 border-retro-cyan/50 bg-background px-4 py-2 font-mono text-sm text-retro-cyan pxl-corner-sm">
                    {t('pvProcessing')}
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground px-4 text-center font-mono text-sm">
              {t('pvEmpty')}
            </p>
          )}
        </div>

        {/* Export bar */}
        {hasResult && (
          <div className="mt-4 flex flex-col gap-3 border-t-2 border-foreground/10 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1.5">
              <PixelSegmented
                label={t('pvExportScale')}
                value={String(exportScale)}
                options={scaleOptions}
                onChange={(next) => onExportScaleChange?.(Number(next) as DitherExportScale)}
                tone="green"
              />
              <p className="text-muted-foreground text-[10px]">{t('pvExportHint')}</p>
            </div>

            <PixelButton
              tone="green"
              variant="solid"
              onClick={onDownload}
              iconLeft={<PixelIcon name="download" size={16} />}
            >
              {t('pvDownload')}
            </PixelButton>
          </div>
        )}
      </div>
    </PixelCard>
  );
}
