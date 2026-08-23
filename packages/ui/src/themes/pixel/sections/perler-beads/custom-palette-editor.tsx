'use client';

import * as React from 'react';

import type {
  PerlerPaletteColor,
  PerlerPaletteSelections,
  PerlerColorSystem,
} from '../../../../contracts/perler-beads/types';
import { defaultPerlerT, type PerlerT } from './i18n';

/** 对颜色进行分组的工具函数，按前缀分组 */
function groupColorsByPrefix(
  colors: PerlerPaletteColor[],
  selectedColorSystem: PerlerColorSystem,
  getDisplayColorKey: (hex: string, system: PerlerColorSystem) => string
): Record<string, PerlerPaletteColor[]> {
  const groups: Record<string, PerlerPaletteColor[]> = {};

  colors.forEach((color) => {
    const displayKey = getDisplayColorKey(color.hex, selectedColorSystem);

    let prefix: string;
    if (selectedColorSystem === '盼盼' || selectedColorSystem === '咪小窝') {
      // 对于纯数字的色号系统，按数字范围分组
      if (/^\d+$/.test(displayKey)) {
        const num = parseInt(displayKey, 10);
        if (num <= 20) {
          prefix = '1-20';
        } else if (num <= 50) {
          prefix = '21-50';
        } else if (num <= 100) {
          prefix = '51-100';
        } else if (num <= 200) {
          prefix = '101-200';
        } else {
          prefix = '200+';
        }
      } else {
        prefix = '其他';
      }
    } else {
      // 对于有字母前缀的色号系统，按字母前缀分组
      prefix = displayKey.match(/^[A-Z]+/)?.[0] || '其他';
    }

    if (!groups[prefix]) {
      groups[prefix] = [];
    }
    groups[prefix].push(color);
  });

  // 对每个组内的颜色按键进行排序
  Object.keys(groups).forEach((prefix) => {
    groups[prefix].sort((a, b) => {
      const displayKeyA = getDisplayColorKey(a.hex, selectedColorSystem);
      const displayKeyB = getDisplayColorKey(b.hex, selectedColorSystem);

      if (selectedColorSystem === '盼盼' || selectedColorSystem === '咪小窝') {
        // 对于纯数字色号，按数字大小排序
        const numA = parseInt(displayKeyA, 10) || 0;
        const numB = parseInt(displayKeyB, 10) || 0;
        return numA - numB;
      } else {
        // 对于有字母前缀的色号，按字母+数字排序
        const numA = parseInt(displayKeyA.replace(/^[A-Z]+/, ''), 10) || 0;
        const numB = parseInt(displayKeyB.replace(/^[A-Z]+/, ''), 10) || 0;
        return numA - numB;
      }
    });
  });

  return groups;
}

export interface PerlerCustomPaletteEditorProps {
  allColors: PerlerPaletteColor[];
  currentSelections: PerlerPaletteSelections;
  onSelectionChange: (key: string, isSelected: boolean) => void;
  onSaveCustomPalette: () => void;
  onClose: () => void;
  onExportCustomPalette: () => void;
  onImportCustomPalette: () => void;
  selectedColorSystem: PerlerColorSystem;
  /** 色号显示函数（app 注入：hex → 色号 key） */
  getDisplayColorKey?: (hex: string, system: PerlerColorSystem) => string;
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文） */
  t?: PerlerT;
}

/**
 * Perler-beads custom palette editor — pixel retro chrome. Owns only the
 * expand/search UI state; color data + selection + import/export callbacks
 * are injected by the app.
 */
export function CustomPaletteEditor({
  allColors,
  currentSelections,
  onSelectionChange,
  onSaveCustomPalette,
  onClose,
  onExportCustomPalette,
  onImportCustomPalette,
  selectedColorSystem,
  getDisplayColorKey = defaultDisplayColorKey,
  t = defaultPerlerT,
}: PerlerCustomPaletteEditorProps) {
  // 用于跟踪当前展开的颜色组
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCount, setSelectedCount] = React.useState(0);

  // 计算已选择的颜色数量
  React.useEffect(() => {
    const count = Object.values(currentSelections).filter(Boolean).length;
    setSelectedCount(count);
  }, [currentSelections]);

  // 根据搜索词过滤颜色
  const filteredColors = searchTerm
    ? allColors.filter((color) => {
        const originalKey = color.key.toLowerCase();
        const displayKey = getDisplayColorKey(color.hex, selectedColorSystem).toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return originalKey.includes(searchLower) || displayKey.includes(searchLower);
      })
    : allColors;

  // 对过滤后的颜色进行分组
  const colorGroups = groupColorsByPrefix(filteredColors, selectedColorSystem, getDisplayColorKey);

  // 切换组展开状态
  const toggleGroup = (prefix: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [prefix]: !prev[prefix],
    }));
  };

  // 切换所有颜色的选择状态
  const toggleAllColors = (selected: boolean) => {
    allColors.forEach((color) => {
      onSelectionChange(color.hex.toUpperCase(), selected);
    });
  };

  // 切换一个组内所有颜色的选择状态
  const toggleGroupColors = (prefix: string, selected: boolean) => {
    colorGroups[prefix].forEach((color) => {
      onSelectionChange(color.hex.toUpperCase(), selected);
    });
  };

  return (
    <div className="flex h-full max-h-[calc(90vh-80px)] flex-col">
      {/* 头部 */}
      <div className="mb-3 flex items-center justify-between border-b-2 border-foreground/10 pb-3">
        <h2 className="flex items-center font-display text-lg uppercase tracking-wider text-foreground">
          <svg className="mr-2 size-5 text-retro-cyan" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
          </svg>
          {t('peTitle')} <span className="ml-2 text-sm text-retro-cyan">{t('peColorCount', { count: selectedCount })}</span>
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground/70 hover:text-foreground"
          aria-label={t('close')}
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 搜索框 */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('peSearch')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-2 border-foreground/20 bg-background py-2 pl-9 pr-4 font-mono text-sm text-foreground outline-none focus:border-retro-cyan pxl-corner-sm placeholder:text-muted-foreground/50"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="size-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 说明文本 */}
      <div className="mb-4 border-2 border-retro-cyan/30 bg-retro-cyan/10 p-2 pxl-corner-sm text-xs text-muted-foreground">
        <p className="flex items-start">
          <svg className="mr-1 mt-0.5 size-4 shrink-0 text-retro-cyan" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {t('peIntro')}
        </p>
      </div>

      {/* 快捷操作按钮 */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => toggleAllColors(true)}
          className="border-2 border-retro-green/40 bg-retro-green/10 px-3 py-1.5 text-xs text-retro-green pxl-corner-sm transition-all hover:bg-retro-green/20"
        >
          {t('peSelectAll')}
        </button>
        <button
          type="button"
          onClick={() => toggleAllColors(false)}
          className="border-2 border-retro-red/40 bg-retro-red/10 px-3 py-1.5 text-xs text-retro-red pxl-corner-sm transition-all hover:bg-retro-red/20"
        >
          {t('peSelectNone')}
        </button>
        <button
          type="button"
          onClick={onImportCustomPalette}
          className="flex items-center gap-1 border-2 border-retro-cyan/40 bg-retro-cyan/10 px-3 py-1.5 text-xs text-retro-cyan pxl-corner-sm transition-all hover:bg-retro-cyan/20"
        >
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {t('peImport')}
        </button>
        <button
          type="button"
          onClick={onExportCustomPalette}
          className="flex items-center gap-1 border-2 border-retro-gold/40 bg-retro-gold/10 px-3 py-1.5 text-xs text-retro-gold pxl-corner-sm transition-all hover:bg-retro-gold/20"
        >
          <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t('peExport')}
        </button>
      </div>

      {/* 颜色列表 */}
      <div className="flex-1 overflow-y-auto pr-1">
        {Object.keys(colorGroups)
          .sort()
          .map((prefix) => (
            <div key={prefix} className="mb-3 overflow-hidden border-2 border-foreground/15 pxl-corner-sm">
              {/* 组标题 */}
              <div
                className="flex cursor-pointer items-center justify-between bg-retro-surface/40 px-3 py-2 transition-colors hover:bg-retro-surface/60"
                onClick={() => toggleGroup(prefix)}
              >
                <div className="flex items-center">
                  <span className="font-mono text-sm font-semibold text-foreground">{t('peGroup', { prefix })}</span>
                  <span className="ml-2 text-xs text-muted-foreground/70">{t('peColorCount', { count: colorGroups[prefix].length })}</span>
                </div>

                <div className="flex items-center">
                  {/* 组操作按钮 */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGroupColors(prefix, true);
                    }}
                    className="mr-2 text-xs text-retro-green transition-colors hover:text-retro-green/70"
                  >
                    {t('peSelectAll')}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGroupColors(prefix, false);
                    }}
                    className="mr-2 text-xs text-retro-red transition-colors hover:text-retro-red/70"
                  >
                    {t('peSelectNone')}
                  </button>

                  {/* 展开/收起图标 */}
                  <svg
                    className={`size-4 text-muted-foreground/70 transition-transform ${expandedGroups[prefix] ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* 组内容 */}
              {expandedGroups[prefix] && (
                <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 md:grid-cols-4">
                  {colorGroups[prefix].map((color) => (
                    <label
                      key={color.key}
                      className="flex cursor-pointer items-center gap-2 rounded p-1.5 transition-colors hover:bg-retro-surface/40"
                    >
                      <input
                        type="checkbox"
                        checked={!!currentSelections[color.hex.toUpperCase()]}
                        onChange={(e) => onSelectionChange(color.hex.toUpperCase(), e.target.checked)}
                        className="size-4 border-2 border-foreground/30 accent-retro-cyan"
                      />
                      <div
                        className="size-6 shrink-0 rounded-sm border-2 border-foreground/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-mono text-sm text-foreground">{getDisplayColorKey(color.hex, selectedColorSystem)}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* 底部按钮 */}
      <div className="mt-4 flex justify-between border-t-2 border-foreground/10 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="border-2 border-foreground/20 bg-retro-surface/30 px-4 py-2 text-sm text-muted-foreground pxl-corner-sm transition-all hover:bg-retro-surface/50"
        >
          {t('cancel')}
        </button>
        <button
          type="button"
          onClick={onSaveCustomPalette}
          className="border-2 border-retro-green bg-retro-green/20 px-4 py-2 text-sm font-semibold text-retro-green pxl-corner-sm transition-all hover:bg-retro-green/30"
        >
          {t('peSave')}
        </button>
      </div>
    </div>
  );
}

const defaultDisplayColorKey: NonNullable<
  PerlerCustomPaletteEditorProps['getDisplayColorKey']
> = (hex: string) => hex.toUpperCase();
