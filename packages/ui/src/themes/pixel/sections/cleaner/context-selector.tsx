'use client'

import { PixelToggle, PixelToggleGroup } from '@pxlkit/ui-kit'

import type { CleanerT, ContextModeValue } from './types'

const CONTEXT_MODES: Array<{ value: ContextModeValue; labelKey: string }> = [
  { value: 'auto', labelKey: 'context_auto' },
  { value: 'general', labelKey: 'context_general' },
  { value: 'technical', labelKey: 'context_technical' },
  { value: 'marketing', labelKey: 'context_marketing' },
  { value: 'personal', labelKey: 'context_personal' },
]

export function ContextModeSelector({
  value,
  detectedValue,
  onChange,
  t,
}: {
  value: ContextModeValue
  detectedValue: string
  onChange: (value: ContextModeValue) => void
  t: CleanerT
}) {
  return (
    <PixelToggleGroup
      type="single"
      value={value}
      onChange={(next) => onChange(next as ContextModeValue)}
      size="sm"
      variant="outline"
      className="flex-wrap"
      aria-label={t('context_auto')}
    >
      {CONTEXT_MODES.map(({ value: modeValue, labelKey }) => (
        <PixelToggle key={modeValue} value={modeValue}>
          {t(labelKey)}
          {modeValue === 'auto' && value === 'auto' && (
            <span className="ml-1 text-[10px] text-retro-cyan">
              ({t(`context_${detectedValue}`)})
            </span>
          )}
        </PixelToggle>
      ))}
    </PixelToggleGroup>
  )
}
