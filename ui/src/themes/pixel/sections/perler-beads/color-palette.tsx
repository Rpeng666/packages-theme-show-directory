'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import { useThemeComponent } from '../../../../context';

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
}: PerlerColorPaletteProps) {
  const Stack = useThemeComponent('Stack');
  const Cluster = useThemeComponent('Cluster');
  const Button = useThemeComponent('Button');
  const Badge = useThemeComponent('Badge');

  if (!colors || colors.length === 0) {
    return (
      <p className="text-center text-xs text-muted-foreground py-2">
        当前图纸无可用颜色。
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
            {showFullPalette ? '只显示图中颜色' : `展开完整色板 (${fullPaletteColors.length} 色)`}
          </Button>
        </div>
      )}

      {colorReplaceState?.isActive && (
        <div className="p-3 border-b-2 border-foreground/10 bg-retro-gold/15">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-retro-gold">
                颜色替换模式
              </span>
            </div>
            {colorReplaceState.step === 'select-source' ? (
              <p className="text-xs text-muted-foreground">
                步骤 1/2：点击图中要被替换的颜色
              </p>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>被替换：</span>
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
              背景擦除模式
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              点击图中任意颜色，删除整个颜色块（洪水填充）
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 p-2">
        {onEraseToggle && (
          <button
            type="button"
            onClick={onEraseToggle}
            title={isEraseMode ? '退出一键擦除模式' : '一键擦除 (洪水填充删除相同颜色)'}
            aria-label={isEraseMode ? '退出一键擦除模式' : '开启一键擦除模式'}
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
            title={colorReplaceState?.isActive ? '退出颜色替换模式' : '颜色替换 (将图中A颜色全部替换为B颜色)'}
            aria-label={colorReplaceState?.isActive ? '退出颜色替换模式' : '开启颜色替换模式'}
            className={cn(
              'flex size-12 shrink-0 items-center justify-center border-2 pxl-corner-sm transition-all',
              colorReplaceState?.isActive
                ? 'border-retro-purple bg-retro-purple/20 shadow-md'
                : 'border-retro-purple/40 bg-retro-purple/10 hover:border-retro-purple'
            )}
          >
            <svg className="size-5 text-retro-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
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
              title={isTransparent ? '橡皮擦' : `${displayKey} ${colorData.color}`}
              aria-label={isTransparent ? '橡皮擦' : `${displayKey}`}
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
