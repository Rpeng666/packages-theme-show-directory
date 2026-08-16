'use client';

import * as React from 'react';

import { cn } from '../../../../lib/utils';
import type {
  PerlerColorReplaceState,
  PerlerColorSystem,
} from '../../../../contracts/perler-beads/types';
import { defaultPerlerT, type PerlerT } from './i18n';

export interface PerlerSwatch {
  key: string;
  color: string;
  isExternal?: boolean;
}

export interface PerlerFloatingColorPaletteProps {
  colors: PerlerSwatch[];
  selectedColor: { key: string; color: string; isExternal?: boolean } | null;
  onColorSelect: (colorData: PerlerSwatch) => void;
  selectedColorSystem: PerlerColorSystem;
  isEraseMode: boolean;
  onEraseToggle: () => void;
  fullPaletteColors: PerlerSwatch[];
  showFullPalette: boolean;
  onToggleFullPalette: () => void;
  colorReplaceState: PerlerColorReplaceState;
  onColorReplaceToggle: () => void;
  onColorReplace: (sourceColor: PerlerSwatch, targetColor: PerlerSwatch) => void;
  onHighlightColor: (colorHex: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  isActive: boolean;
  onActivate: () => void;
  canUndo: boolean;
  onUndo: () => void;
  /** Redo stack available (enables the redo button). */
  canRedo?: boolean;
  /** Redo last undone edit. */
  onRedo?: () => void;
  /** 透明/橡皮擦 key（app 注入，通常为 'ERASE'） */
  transparentKey?: string;
  /** 色号显示函数（app 注入：hex → 色号 key） */
  getColorKeyByHex?: (hex: string, system: PerlerColorSystem) => string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads floating color palette — pixel retro chrome. Owns only the
 * drag/position UI state; color data + selection/replace/erase callbacks are
 * injected by the app.
 */
export function FloatingColorPalette({
  colors,
  selectedColor,
  onColorSelect,
  selectedColorSystem,
  isEraseMode,
  onEraseToggle,
  fullPaletteColors,
  showFullPalette,
  onToggleFullPalette,
  colorReplaceState,
  onColorReplaceToggle,
  onColorReplace,
  onHighlightColor,
  isOpen,
  onToggleOpen,
  isActive,
  onActivate,
  canUndo,
  onUndo,
  canRedo = false,
  onRedo,
  transparentKey = 'ERASE',
  getColorKeyByHex = defaultGetColorKeyByHex,
  t = defaultPerlerT,
}: PerlerFloatingColorPaletteProps) {
  // 计算初始位置，确保左边缘在屏幕内（小屏幕时右边缘可以超出）
  const getInitialPosition = () => ({
    x: Math.max(0, Math.min(20, window.innerWidth - 280)), // 确保左边缘至少是0
    y: Math.max(0, Math.min(100, window.innerHeight - 400)), // 确保上边缘至少是0
  });

  const [position, setPosition] = React.useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const paletteRef = React.useRef<HTMLDivElement>(null);

  // 处理拖拽开始
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (!paletteRef.current) return;

      onActivate(); // 激活调色板，置于最上层
      const rect = paletteRef.current.getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      e.preventDefault();
    },
    [onActivate]
  );

  // 处理触摸开始
  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      if (!paletteRef.current) return;

      onActivate(); // 激活调色板，置于最上层
      const rect = paletteRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setIsDragging(true);
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      e.preventDefault();
    },
    [onActivate]
  );

  // 处理移动
  React.useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;

      // 移除边界限制，允许自由拖动到任何位置
      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      // 恢复页面滚动
      document.body.style.overflow = '';
    };

    if (isDragging) {
      // 阻止页面滚动
      document.body.style.overflow = 'hidden';

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
        // 清理时恢复滚动
        document.body.style.overflow = '';
      };
    }
  }, [isDragging, dragOffset]);

  // 移除窗口大小变化时的边界调整，允许调色盘保持在任何位置

  // 每次打开调色盘时重置位置到屏幕内
  React.useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      setPosition(getInitialPosition());
    }
  }, [isOpen]);

  // 处理颜色点击
  const handleColorClick = (colorData: PerlerSwatch) => {
    if (
      colorReplaceState.isActive &&
      colorReplaceState.step === 'select-target' &&
      colorReplaceState.sourceColor
    ) {
      // 执行颜色替换
      onColorReplace(colorReplaceState.sourceColor, colorData);
    } else {
      // 高亮颜色
      onHighlightColor(colorData.color);
      // 选择颜色
      onColorSelect(colorData);
    }
  };

  const displayColors = showFullPalette ? fullPaletteColors : colors;

  // 如果调色盘关闭，完全不渲染
  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={paletteRef}
      className={cn(
        'fixed select-none border-2 border-foreground/15 bg-retro-surface/30 pxl-corner-md shadow-2xl backdrop-blur-sm',
        isActive ? 'z-[60]' : 'z-[50]'
      )}
      style={{
        left: position.x,
        top: position.y,
        width: '280px',
        maxHeight: '400px',
      }}
      onClick={onActivate}
    >
      {/* 标题栏和控制按钮 */}
      <div
        className="flex cursor-move items-center justify-between border-b-2 border-foreground/10 bg-retro-surface/40 p-3 pxl-corner-t-md"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center gap-2">
          <svg className="size-4 text-retro-cyan" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
          </svg>
          <span className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">{t('cpPalette')}</span>
        </div>

        <div className="flex items-center gap-1">
          {/* 关闭按钮 */}
          <button
            type="button"
            onClick={onToggleOpen}
            className="p-1 rounded transition-colors hover:bg-foreground/10"
            title={t('cpClosePalette')}
            aria-label={t('cpClosePalette')}
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-h-80 overflow-y-auto p-3">
        {/* 模式状态指示器 */}
        {colorReplaceState.isActive && (
          <div className="mb-3 border-2 border-retro-gold/30 bg-retro-gold/10 p-2 pxl-corner-sm text-xs">
            <div className="flex items-center gap-1 text-retro-gold">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span>
                {colorReplaceState.step === 'select-source'
                  ? t('cpClickCanvasToPick')
                  : t('cpReplaceTarget')}
              </span>
            </div>
          </div>
        )}

        {/* 工具按钮行 */}
        <div className="mb-3 flex gap-2">
          {/* 撤回按钮 */}
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className="flex items-center justify-center border-2 border-foreground/20 bg-retro-surface/40 p-2 pxl-corner-sm text-xs text-muted-foreground transition-all duration-200 hover:bg-retro-surface/60 disabled:cursor-not-allowed disabled:opacity-40"
            title={t('undo')}
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2M3 10l4-4M3 10l4 4" />
            </svg>
          </button>

          {/* 重做按钮 */}
          {onRedo ? (
            <button
              type="button"
              onClick={onRedo}
              disabled={!canRedo}
              className="flex items-center justify-center border-2 border-foreground/20 bg-retro-surface/40 p-2 pxl-corner-sm text-xs text-muted-foreground transition-all duration-200 hover:bg-retro-surface/60 disabled:cursor-not-allowed disabled:opacity-40"
              title={t('redo')}
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a5 5 0 00-5 5v2M21 10l-4-4M21 10l-4 4" />
              </svg>
            </button>
          ) : null}

          {/* 橡皮擦按钮 */}
          <button
            type="button"
            onClick={() => handleColorClick({ key: transparentKey, color: '#FFFFFF' })}
            className={cn(
              'flex flex-1 items-center justify-center gap-1 border-2 p-2 pxl-corner-sm text-xs transition-all duration-200',
              selectedColor?.key === transparentKey
                ? 'border-retro-red bg-retro-red/30 text-retro-red'
                : 'border-foreground/20 bg-retro-surface/40 text-muted-foreground hover:bg-retro-red/10'
            )}
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {t('cpErase')}
          </button>

          {/* 一键擦除按钮 */}
          <button
            type="button"
            onClick={onEraseToggle}
            className={cn(
              'flex flex-1 items-center justify-center gap-1 border-2 p-2 pxl-corner-sm text-xs transition-all duration-200',
              isEraseMode
                ? 'border-retro-gold bg-retro-gold/30 text-retro-gold'
                : 'border-foreground/20 bg-retro-surface/40 text-muted-foreground hover:bg-retro-gold/10'
            )}
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t('cpAreaErase')}
          </button>

          {/* 颜色替换按钮 */}
          <button
            type="button"
            onClick={onColorReplaceToggle}
            className={cn(
              'flex flex-1 items-center justify-center gap-1 border-2 p-2 pxl-corner-sm text-xs transition-all duration-200',
              colorReplaceState.isActive
                ? 'border-retro-cyan bg-retro-cyan/30 text-retro-cyan'
                : 'border-foreground/20 bg-retro-surface/40 text-muted-foreground hover:bg-retro-cyan/10'
            )}
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            {t('cpBatchReplace')}
          </button>
        </div>

        {/* 色板切换 */}
        <div className="mb-3 flex gap-2">
          <button
            type="button"
            onClick={onToggleFullPalette}
            className="w-full border-2 border-foreground/20 bg-retro-surface/40 px-3 py-2 pxl-corner-sm text-xs text-muted-foreground transition-colors hover:bg-retro-surface/60"
          >
            {showFullPalette ? t('cpCurrentPalette', { count: colors.length }) : t('cpFullPalette', { count: fullPaletteColors.length })}
          </button>
        </div>

        {/* 颜色网格 */}
        <div className="grid grid-cols-6 gap-1.5">
          {displayColors.map((colorData) => {
            const isSelected =
              selectedColor?.key === colorData.key && selectedColor?.color === colorData.color;
            const displayKey = getColorKeyByHex(colorData.color, selectedColorSystem);

            return (
              <button
                key={`${colorData.key}-${colorData.color}`}
                type="button"
                onClick={() => handleColorClick(colorData)}
                className={cn(
                  'group relative aspect-square border-2 pxl-corner-sm transition-all duration-200 hover:scale-110',
                  isSelected
                    ? 'scale-110 border-retro-cyan ring-2 ring-retro-cyan/40'
                    : 'border-foreground/20 hover:border-foreground/50'
                )}
                style={{ backgroundColor: colorData.color }}
                title={`${displayKey} (${colorData.color})`}
              >
                {/* 选中指示器 */}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-2 rounded-full bg-white shadow-lg" />
                  </div>
                )}

                {/* 悬停时显示色号 */}
                <div className="pointer-events-none absolute -top-8 left-1/2 z-10 whitespace-nowrap rounded bg-foreground px-2 py-1 font-mono text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                  {displayKey}
                </div>
              </button>
            );
          })}
        </div>

        {/* 当前选中颜色信息 */}
        {selectedColor && selectedColor.key !== transparentKey && (
          <div className="mt-3 bg-retro-surface/40 p-2 pxl-corner-sm">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div
                className="size-4 rounded-sm border-2 border-foreground/30"
                style={{ backgroundColor: selectedColor.color }}
              />
              <span className="font-mono">
                {t('cpCurrent', { key: getColorKeyByHex(selectedColor.color, selectedColorSystem) })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const defaultGetColorKeyByHex: NonNullable<
  PerlerFloatingColorPaletteProps['getColorKeyByHex']
> = (hex: string) => hex.toUpperCase();
