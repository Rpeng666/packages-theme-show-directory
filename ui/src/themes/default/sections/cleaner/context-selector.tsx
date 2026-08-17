'use client'

import { cn } from '../../../../lib/utils'
import type {
  CleanerT,
  ContextMode,
  ContextModeValue,
} from '../../../../contracts/sections/cleaner-types'

const CONTEXT_MODES: Array<{ value: ContextModeValue; labelKey: string }> = [
  { value: 'auto', labelKey: 'context_auto' },
  { value: 'general', labelKey: 'context_general' },
  { value: 'technical', labelKey: 'context_technical' },
  { value: 'marketing', labelKey: 'context_marketing' },
  { value: 'personal', labelKey: 'context_personal' },
]

/**
 * Default context-mode selector — segmented pill buttons (single-select).
 * Stateless: value/onChange/t injected by the app; labels come from the
 * injected `t` (context_* keys), so the package owns no copy.
 */
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
    <div className="border-border bg-muted flex flex-wrap items-center gap-1.5 rounded-full border p-1">
      {CONTEXT_MODES.map(({ value: modeValue, labelKey }) => {
        const isActive = value === modeValue
        const isDetected = modeValue === 'auto'
        return (
          <button
            key={modeValue}
            type="button"
            onClick={() => onChange(modeValue)}
            className={cn(
              'relative rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
              isActive
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground dark:hover:text-white'
            )}
          >
            {t(labelKey)}
            {isDetected && value === 'auto' && (
              <span className="text-primary ml-1 text-[10px]">
                ({t(`context_${detectedValue}`)})
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
