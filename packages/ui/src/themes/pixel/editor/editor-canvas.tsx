'use client';

import * as React from 'react';

import { cn } from '../../../lib/utils';
import { PixelIconButton } from '@pxlkit/ui-kit';
import { PixelIcon } from '../../../components/pixel-icon';import type { EditorT } from './editor-i18n';
import { defaultEditorT } from './editor-i18n';

export interface EditorCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Canvas ref the app draws the result onto. */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** Result canvas dimensions in pixels (0 until an image is loaded). */
  width: number;
  height: number;
  /** Original image data URL (for the compare slider / empty state). */
  originalSrc?: string | null;
  /** Zoom ratio (1 = fit to screen, computed by the app). */
  zoom: number;
  /** Emit a new zoom ratio. */
  onZoomChange: (next: number) => void;
  /** Fit-to-screen action. */
  onFit?: () => void;
  /** Show the original (compare slider active). */
  showOriginal?: boolean;
  /** Compare slider position 0..1 (0 = left shows original). */
  comparePosition?: number;
  /** Update the compare slider position. */
  onCompareChange?: (next: number) => void;
  /** Backdrop color rendered behind the canvas (transparent pixels). */
  backdrop?: string;
  /** Backdrop pattern id ('none' | 'checker' | 'dots'), for preview only. */
  backdropPattern?: 'none' | 'checker' | 'dots';
  /** Processing overlay flag. */
  isProcessing?: boolean;
  t?: EditorT;
  className?: string;
}

/**
 * EditorCanvas — the center pane of an image editor.
 *
 * Hosts the result canvas (app draws onto `canvasRef`), a zoom control
 * (fit / out / in / 100%), an original↔result compare slider overlay, and a
 * backdrop color behind transparent pixels. Pure presentation.
 */
export function EditorCanvas({
  canvasRef,
  width,
  height,
  originalSrc,
  zoom,
  onZoomChange,
  onFit,
  showOriginal = false,
  comparePosition = 0.5,
  onCompareChange,
  backdrop = '#ffffff',
  backdropPattern = 'none',
  isProcessing = false,
  t = defaultEditorT,
  className,
  ...rest
}: EditorCanvasProps) {
  const hasResult = width > 0 && height > 0;

  const backdropStyle =
    backdropPattern === 'checker'
      ? {
          backgroundColor: backdrop,
          backgroundImage:
            'linear-gradient(45deg, rgba(0,0,0,0.06) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.06) 75%), linear-gradient(45deg, rgba(0,0,0,0.06) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.06) 75%)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 8px 8px',
        }
      : backdropPattern === 'dots'
        ? {
            backgroundColor: backdrop,
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }
        : { backgroundColor: backdrop };

  return (
    <div
      {...rest}
      className={cn(
        'relative flex h-full min-w-0 flex-1 flex-col overflow-hidden border-foreground/10 bg-retro-bg',
        className,
      )}
    >
      {/* Zoom / view controls */}
      {hasResult && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 border-2 border-foreground/10 bg-background/90 p-1 pxl-corner-sm">
          <PixelIconButton
            label={t('zoomOut')}
            size="sm"
            tone="neutral"
            icon={<PixelIcon name="search" size={13} />}
            onClick={() => onZoomChange(zoom * 0.8)}
          />
          <span className="w-10 text-center font-mono text-[10px] tabular-nums text-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <PixelIconButton
            label={t('zoomIn')}
            size="sm"
            tone="neutral"
            icon={<PixelIcon name="search" size={13} />}
            onClick={() => onZoomChange(zoom * 1.25)}
          />
          <PixelIconButton
            label={t('zoomFit')}
            size="sm"
            tone="neutral"
            icon={<PixelIcon name="grid" size={13} />}
            onClick={onFit}
          />
        </div>
      )}

      {/* Canvas / empty state */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        style={backdropStyle}
      >
        {hasResult ? (
          <>
            {/* Result canvas — the app draws onto it; scale via CSS transform */}
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              style={{
                transform: `scale(${zoom})`,
                imageRendering: 'pixelated',
              }}
              className="max-h-full max-w-full origin-center border-2 border-foreground/10 bg-retro-bg pxl-corner-sm"
            />

            {/* Compare slider overlay — clips the original image over the canvas */}
            {showOriginal && originalSrc && onCompareChange && (
              <div className="absolute inset-0 z-10">
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{ width: `${comparePosition * 100}%` }}
                >
                  <img
                    src={originalSrc}
                    alt={t('compareOriginal')}
                    className="block h-full w-full object-contain pxl-corner-sm"
                  />
                </div>
                {/* Vertical divider */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-retro-cyan/80"
                  style={{ left: `${comparePosition * 100}%` }}
                />
                {/* Drag handle */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(comparePosition * 100)}
                  onChange={(e) => onCompareChange(Number(e.target.value) / 100)}
                  aria-label={t('compareDrag')}
                  className="absolute inset-0 z-30 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
                />
              </div>
            )}
          </>
        ) : (
          <p className="text-muted-foreground max-w-xs px-4 text-center font-mono text-sm">
            {t('canvasEmpty')}
          </p>
        )}

        {isProcessing && (
          <div className="absolute inset-0 z-40 grid place-items-center bg-retro-bg/60">
            <span className="border-2 border-retro-cyan/50 bg-background px-4 py-2 font-mono text-sm text-retro-cyan pxl-corner-sm">
              …
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
