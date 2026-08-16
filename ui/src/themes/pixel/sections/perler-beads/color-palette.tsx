'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { resolveComponent } from '../../../../registry';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerColorData {
  key: string;
  color: string;
  isExternal?: boolean;
}

export interface PerlerColorPaletteProps {
  colors: PerlerColorData[];
  selectedColor: PerlerColorData | null;
  onColorSelect: (color: PerlerColorData) => void;
  transparentKey?: string;
  selectedColorSystem?: string;
  isEraseMode?: boolean;
  onEraseToggle?: () => void;
  onHighlightColor?: (colorHex: string) => void;
  fullPaletteColors?: PerlerColorData[];
  showFullPalette?: boolean;
  onToggleFullPalette?: () => void;
  colorReplaceState?: {
    isActive: boolean;
    step: 'select-source' | 'select-target';
    sourceColor?: PerlerColorData;
  };
  onColorReplaceToggle?: () => void;
  onColorReplace?: (source: PerlerColorData, target: PerlerColorData) => void;
  /** 色号显示函数（app 注入：把 hex 转成色号 key） */
  displayColorKey?: (color: string) => string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads color palette — pixel retro chrome. Pure presentation; all
 * selection/replace/erase state is injected by the app as props + callbacks.
 */
export function ColorPalette({
  colors,
  selectedColor,
  onColorSelect,
  transparentKey,
  selectedColorSystem,
  isEraseMode,
  onEraseToggle,
  onHighlightColor,
  fullPaletteColors,
  showFullPalette,
  onToggleFullPalette,
  colorReplaceState,
  onColorReplaceToggle,
  onColorReplace,
  displayColorKey,
  t = defaultPerlerT,
}: PerlerColorPaletteProps) {
  const Stack = resolveComponent('Stack');
  const Cluster = resolveComponent('Cluster');
  const Button = resolveComponent('Button');
  const Badge = resolveComponent('Badge');

  if (!colors || colors.length === 0) {
    return (
      <p className="text-center text-xs text-muted-foreground py-2">
        {t('cpNoAvailable')}
      </p>
    );
  }

  const colorsToShow =
    showFullPalette && fullPaletteColors
      ? ([
          colors.find((c) => transparentKey && c.key === transparentKey),
          ...fullPaletteColors,
        ].filter(Boolean) as PerlerColorData[])
      : colors;

  const getContrastColor = (hex: string): string => {
    const rgb = {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    };
    const luma = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    return luma > 0.5 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className="bg-retro-surface/30 border-2 border-foreground/15 pxl-corner-md">
      {fullPaletteColors && fullPaletteColors.length > 0 && onToggleFullPalette && (
        <div className="flex justify-center p-2 border-b-2 border-foreground/10">
          <Button
            type="button"
            variant={showFullPalette ? 'default' : 'outline'}
            tone="neutral"
            size="sm"
            onClick={onToggleFullPalette}
          >
            {showFullPalette ? t('cpShowOnlyInImage') : t('cpExpandFull', { count: fullPaletteColors.length })}
          </Button>
        </div>
      )}

      {colorReplaceState?.isActive && (
        <div className="p-3 border-b-2 border-foreground/10 bg-retro-gold/15">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-retro-gold">
                {t('cpReplaceTitle')}
              </span>
            </div>
            {colorReplaceState.step === 'select-source' ? (
              <p className="text-xs text-muted-foreground">
                {t('cpReplaceStep1')}
              </p>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>{t('cpReplaced')}</span>
                <span
                  className="inline-block size-4 border-2 border-foreground/30"
                  style={{ backgroundColor: colorReplaceState.sourceColor?.color }}
                />
                <span className="font-mono">
                  {displayColorKey?.(colorReplaceState.sourceColor?.color || '') ||
                    colorReplaceState.sourceColor?.key}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {isEraseMode && (
        <div className="p-3 border-b-2 border-foreground/10 bg-retro-red/10">
          <div className="text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-retro-red">
              {t('cpEraseModeTitle')}
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              {t('cpEraseModeDesc')}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 p-2">
        {onEraseToggle && (
          <button
            type="button"
            onClick={onEraseToggle}
            title={isEraseMode ? t('cpEraseExit') : t('cpEraseFlood')}
            aria-label={isEraseMode ? t('cpEraseExit') : t('cpEraseTitle')}
            className={cn(
              'flex size-12 shrink-0 items-center justify-center border-2 pxl-corner-sm transition-all',
              isEraseMode
                ? 'border-retro-red bg-retro-red/20 shadow-md'
                : 'border-retro-gold/40 bg-retro-gold/10 hover:border-retro-gold'
            )}
          >
            <svg className={cn('size-5', isEraseMode ? 'text-retro-red' : 'text-retro-gold')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        {onColorReplaceToggle && (
          <button
            type="button"
            onClick={onColorReplaceToggle}
            title={colorReplaceState?.isActive ? t('cpReplaceExit') : t('cpReplaceDesc')}
            aria-label={colorReplaceState?.isActive ? t('cpReplaceExit') : t('cpReplaceOn')}
            className={cn(
              'flex size-12 shrink-0 items-center justify-center border-2 pxl-corner-sm transition-all',
              colorReplaceState?.isActive
                ? 'border-retro-cyan bg-retro-cyan/20 shadow-md'
                : 'border-retro-cyan/40 bg-retro-cyan/10 hover:border-retro-cyan'
            )}
          >
            <svg className="size-5 text-retro-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        )}

        {colorsToShow.map((colorData) => {
          const isTransparent = transparentKey && colorData.key === transparentKey;
          const isSelected = selectedColor?.key === colorData.key;
          const displayKey = isTransparent
            ? ''
            : displayColorKey?.(colorData.color) || colorData.key;

          return (
            <button
              key={colorData.key}
              type="button"
              onClick={() => {
                if (
                  colorReplaceState?.isActive &&
                  colorReplaceState.step === 'select-target' &&
                  !isTransparent &&
                  onColorReplace &&
                  colorReplaceState.sourceColor
                ) {
                  onColorReplace(colorReplaceState.sourceColor, colorData);
                  return;
                }
                onColorSelect(colorData);
                if (!isTransparent && onHighlightColor) {
                  onHighlightColor(colorData.color);
                }
              }}
              title={isTransparent ? t('cpErase') : `${displayKey} ${colorData.color}`}
              aria-label={isTransparent ? t('cpErase') : `${displayKey}`}
              className={cn(
                'relative flex size-12 shrink-0 items-center justify-center border-2 pxl-corner-sm transition-all',
                isSelected
                  ? 'border-foreground shadow-md scale-110'
                  : 'border-foreground/20 hover:border-foreground/50',
                isTransparent && 'bg-retro-bg'
              )}
              style={isTransparent ? {} : { backgroundColor: colorData.color }}
            >
              {!isTransparent && (
                <span
                  className="font-mono text-[8px] leading-none px-0.5"
                  style={{ color: getContrastColor(colorData.color) }}
                >
                  {displayKey}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
