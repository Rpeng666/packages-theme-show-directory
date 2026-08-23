'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'
import type { PixelationMode, ToolSettingsProps } from '../../contracts/tool-settings'

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

function defaultT(key: string, values?: Record<string, string | number>): string {
  let text = ZH[key] ?? key
  if (values) {
    for (const [k, v] of Object.entries(values)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
    }
  }
  return text
}

/** Small section heading with a step number. */
function StepHeading({
  n,
  title,
}: {
  n: string
  title: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono text-[11px] font-semibold text-muted-foreground">
        {n}
      </span>
      <h2 className="text-[13px] font-semibold tracking-tight">{title}</h2>
    </div>
  )
}

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
    <div
      {...rest}
      className={cn('w-full rounded-xl border bg-card p-5 sm:max-w-2xl', className)}
    >
      {/* Parameters */}
      <div>
        <StepHeading n="01" title={t('granularity')} />
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="granularityInput"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {t('granularity')}
            </label>
            <input
              type="number"
              id="granularityInput"
              value={granularityInput}
              onChange={onGranularityInputChange}
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              min="10"
              max="300"
            />
          </div>
          <div>
            <label
              htmlFor="similarityThresholdInput"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {t('threshold')}
            </label>
            <input
              type="number"
              id="similarityThresholdInput"
              value={similarityThresholdInput}
              onChange={onSimilarityThresholdInputChange}
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 border-t pt-5">
        <StepHeading n="02" title={t('mode')} />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onConfirmParameters}
            className="h-9 whitespace-nowrap rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t('apply')}
          </button>
          <button
            type="button"
            onClick={onAutoRemoveBackground}
            disabled={!canAutoRemoveBackground}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('removeBg')}
          </button>
          <button
            type="button"
            onClick={onUndoBgRemoval}
            disabled={!canUndoBgRemoval}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('undo')}
          </button>
        </div>
      </div>

      {/* Mode */}
      <div className="mt-6 border-t pt-5">
        <StepHeading n="03" title={t('mode')} />
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(
            [
              { value: 'dominant' as PixelationMode, label: t('modeCartoon') },
              { value: 'average' as PixelationMode, label: t('modeReal') },
            ]
          ).map((m) => {
            const active = pixelationMode === m.value
            return (
              <button
                key={m.value}
                type="button"
                onClick={() => onPixelationModeChange(m.value)}
                className={cn(
                  'rounded-lg border px-3 py-2.5 text-sm transition-colors',
                  active
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Color system */}
      <div className="mt-6 border-t pt-5">
        <StepHeading n="04" title={t('colorSystem')} />
        <div className="mt-3 flex flex-wrap gap-2">
          {colorSystemOptions.map((option) => {
            const isSelected = selectedColorSystem === option.key
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => onColorSystemSelect(option.key)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm transition-colors',
                  isSelected
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground hover:text-foreground',
                )}
              >
                {option.name}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={onOpenCustomPalette}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
          </svg>
          {t('managePalette', { count: customPaletteCount })}
        </button>
        {isCustomPalette && (
          <p className="mt-1.5 text-center text-xs text-muted-foreground">
            {t('customPaletteActive')}
          </p>
        )}
      </div>
    </div>
  )
}
