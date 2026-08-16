'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { PixelationMode, ToolSettingsProps } from '../../contracts/tool-settings'

/** 默认中文文案表（与改造前硬编码一致；app 通常通过 `t` 注入） */
const ZH: Record<string, string> = {
  granularity: '横轴切割数量 (10-300):',
  threshold: '颜色合并阈值 (0-100):',
  apply: '应用数字',
  removeBg: '一键去背景',
  undo: '回撤上一步',
  mode: '处理模式:',
  modeCartoon: '卡通 (主色)',
  modeReal: '真实 (平均)',
  colorSystem: '色号系统:',
  managePalette: '管理色板 ({count} 色)',
  customPaletteActive: '当前使用自定义色板',
}

/** 默认文案解析器 —— 未注入 `t` 时用中文默认文案，保证包自包含（行为不变） */
function defaultT(key: string, values?: Record<string, string | number>): string {
  let text = ZH[key] ?? key
  if (values) {
    for (const [k, v] of Object.entries(values)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
    }
  }
  return text
}

/**
 * ToolSettings — a generic tool parameter/settings panel with pixel retro
 * chrome. Owns no state; all values + callbacks are injected by the app.
 * Renders granularity/threshold inputs, quick actions (apply/removeBg/undo),
 * processing mode, color-system selector and the custom-palette entry button.
 * Labels are resolved through `t` (fallback: neutral-English defaults).
 */
export function ToolSettings({ granularityInput,
  onGranularityInputChange,
  similarityThresholdInput,
  onSimilarityThresholdInputChange,
  onConfirmParameters,
  onAutoRemoveBackground,
  onUndoBgRemoval,
  canAutoRemoveBackground,
  canUndoBgRemoval,
  pixelationMode,
  onPixelationModeChange,
  colorSystemOptions,
  selectedColorSystem,
  onColorSystemSelect,
  onOpenCustomPalette,
  customPaletteCount,
  isCustomPalette,
  t = defaultT,
  className, ...rest }: ToolSettingsProps) {
  return (
    <div {...rest} className={cn('grid w-full gap-4 border-2 border-foreground/15 bg-retro-surface/40 p-4 pxl-corner-md shadow-md sm:max-w-2xl sm:grid-cols-2 sm:p-5', className)}>
      {/* 横轴切割数量 */}
      <div className="flex-1">
        <label
          htmlFor="granularityInput"
          className="mb-1.5 block font-mono text-xs font-medium text-muted-foreground sm:mb-2 sm:text-sm"
        >
          {t('granularity')}
        </label>
        <input
          type="number"
          id="granularityInput"
          value={granularityInput}
          onChange={onGranularityInputChange}
          className="h-9 w-full border-2 border-foreground/20 bg-background p-1.5 font-mono text-sm text-foreground shadow-sm outline-none focus:border-retro-cyan pxl-corner-sm placeholder:text-muted-foreground/50"
          min="10"
          max="300"
        />
      </div>

      {/* 颜色合并阈值 */}
      <div className="flex-1">
        <label
          htmlFor="similarityThresholdInput"
          className="mb-1.5 block font-mono text-xs font-medium text-muted-foreground sm:mb-2 sm:text-sm"
        >
          {t('threshold')}
        </label>
        <input
          type="number"
          id="similarityThresholdInput"
          value={similarityThresholdInput}
          onChange={onSimilarityThresholdInputChange}
          className="h-9 w-full border-2 border-foreground/20 bg-background p-1.5 font-mono text-sm text-foreground shadow-sm outline-none focus:border-retro-cyan pxl-corner-sm placeholder:text-muted-foreground/50"
          min="0"
          max="100"
        />
      </div>

      {/* 快捷按钮 */}
      <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
        <button
          type="button"
          onClick={onConfirmParameters}
          className="h-9 whitespace-nowrap border-2 border-retro-cyan bg-retro-cyan/15 px-3 font-mono text-sm text-retro-cyan pxl-corner-sm shadow-sm transition-colors duration-200 hover:bg-retro-cyan/25"
        >
          {t('apply')}
        </button>
        <button
          type="button"
          onClick={onAutoRemoveBackground}
          disabled={!canAutoRemoveBackground}
          className="inline-flex h-9 items-center justify-center whitespace-nowrap border-2 border-retro-green/40 bg-retro-green/10 px-3 font-mono text-sm text-retro-green pxl-corner-sm transition-colors duration-200 hover:bg-retro-green/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t('removeBg')}
        </button>
        <button
          type="button"
          onClick={onUndoBgRemoval}
          disabled={!canUndoBgRemoval}
          className="inline-flex h-9 items-center justify-center whitespace-nowrap border-2 border-foreground/20 bg-retro-surface/30 px-3 font-mono text-sm text-muted-foreground pxl-corner-sm transition-colors duration-200 hover:bg-retro-surface/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t('undo')}
        </button>
      </div>

      {/* 处理模式 */}
      <div className="sm:col-span-2">
        <label
          htmlFor="pixelationModeSelect"
          className="mb-1.5 block font-mono text-xs font-medium text-muted-foreground sm:mb-2 sm:text-sm"
        >
          {t('mode')}
        </label>
        <select
          id="pixelationModeSelect"
          value={pixelationMode}
          onChange={(e) => onPixelationModeChange(e.target.value as PixelationMode)}
          className="h-9 w-full border-2 border-foreground/20 bg-background p-1.5 font-mono text-sm text-foreground shadow-sm outline-none focus:border-retro-cyan pxl-corner-sm"
        >
          <option value="dominant" className="bg-background text-foreground">
            {t('modeCartoon')}
          </option>
          <option value="average" className="bg-background text-foreground">
            {t('modeReal')}
          </option>
        </select>
      </div>

      {/* 色号系统选择器 */}
      <div className="sm:col-span-2">
        <label className="mb-1.5 block font-mono text-xs font-medium text-muted-foreground sm:mb-2 sm:text-sm">
          {t('colorSystem')}
        </label>
        <div className="flex flex-wrap gap-2">
          {colorSystemOptions.map((option) => {
            const isSelected = selectedColorSystem === option.key
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => onColorSystemSelect(option.key)}
                className={cn(
                  'flex-shrink-0 border-2 px-3 py-2 font-mono text-sm pxl-corner-sm transition-all duration-200',
                  isSelected
                    ? 'border-retro-cyan bg-retro-cyan/20 text-retro-cyan shadow-md'
                    : 'border-foreground/20 bg-retro-surface/30 text-muted-foreground hover:border-retro-cyan/50 hover:bg-retro-cyan/5'
                )}
              >
                {option.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* 自定义色板按钮 */}
      <div className="mt-3 sm:col-span-2">
        <button
          type="button"
          onClick={onOpenCustomPalette}
          className="flex w-full items-center justify-center gap-2 border-2 border-retro-gold/40 bg-retro-gold/10 px-3 py-2.5 font-mono text-sm text-retro-gold pxl-corner-sm shadow-sm transition-all duration-200 hover:bg-retro-gold/20 hover:shadow-md"
        >
          <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
          </svg>
          {t('managePalette', { count: customPaletteCount })}
        </button>
        {isCustomPalette && (
          <p className="mt-1.5 text-center font-mono text-xs text-retro-gold">
            {t('customPaletteActive')}
          </p>
        )}
      </div>
    </div>
  )
}
