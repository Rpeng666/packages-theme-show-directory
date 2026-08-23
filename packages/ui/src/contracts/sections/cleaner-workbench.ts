import type { Section } from '../../types/landing'
import type { CleanerAnalyzeResult, ContextModeValue } from './cleaner-types'

export type CleanerMode =
  | 'humanize'
  | 'simplify'
  | 'professional'
  | 'academic'
  | 'marketing'
  | 'grammar'

export type CleanerTone = 'natural' | 'clear' | 'confident' | 'friendly'

export type CleanerLength = 'same' | 'shorter' | 'longer'

export type CleanerStrength = 'light' | 'standard' | 'strong'

export type CleanerOption =
  | 'removeHidden'
  | 'normalizeNbsp'
  | 'normalizeDashes'
  | 'normalizeQuotes'
  | 'convertEllipsis'
  | 'trimWhitespace'
  | 'removeAsterisks'
  | 'removeMarkdownHeadings'
  | 'convertLookalikes'
  | 'normalizeUnicode'

export interface CleanerWorkbenchProps {
  section: Section
  className?: string
  compact?: boolean
  wide?: boolean
  fullscreen?: boolean

  // --- State (from the app's useCleanerController) ---
  input: string
  onInputChange: (value: string) => void
  mode: CleanerMode
  onModeChange: (value: CleanerMode) => void
  tone: CleanerTone
  onToneChange: (value: CleanerTone) => void
  length: CleanerLength
  onLengthChange: (value: CleanerLength) => void
  strength: CleanerStrength
  onStrengthChange: (value: CleanerStrength) => void
  options: CleanerOption[]
  onOptionsChange: (value: CleanerOption[]) => void
  outputView: 'changes' | 'analyze'
  output: string
  inputCount: number
  outputCount: number
  error: string
  copied: boolean
  shareCopied: boolean
  busy: boolean
  showAiHint: boolean

  // --- Derived (app computes; package renders) ---
  activeDiffParts: Array<{ value: string; added?: boolean; removed?: boolean }>
  activeHasChanges: boolean
  analyzeResult: CleanerAnalyzeResult | null
  isRewriting: boolean
  fallbackNotice: boolean
  showAdvancedOptions: boolean
  onToggleAdvancedOptions: () => void
  contextMode: ContextModeValue
  detectedContextMode: string
  /** 类型/严重度标签映射（app 的 locale 注入） */
  typeLabels: Record<string, string>
  severityLabels: Record<string, string>

  // --- Actions (injected business) ---
  onClear: () => void
  onCopy: () => void
  onAnalyze: () => void
  onFixWithAi: (focusIssues?: string[]) => void
  onContextModeChange: (value: string) => void
  onExportMarkdown: () => void
  onExportPdf: () => void
  onShareLink: () => void

  // --- Labels (injected i18n) ---
  t: (key: string, values?: Record<string, string | number>) => string
  modeOptions: Array<{ value: string; label: string }>
  toneOptions: Array<{ value: string; label: string }>
  lengthOptions: Array<{ value: string; label: string }>
  strengthOptions: Array<{ value: string; label: string }>
  optionLabels: Record<string, string>
}
