/**
 * Cleaner section types — self-contained structural types used by the pixel
 * cleaner display components. Kept minimal (only what the UI reads); the app's
 * richer domain types (AnalysisResult, etc.) stay app-side and are passed in
 * as already-shaped data.
 */

export type ContextMode = 'general' | 'technical' | 'marketing' | 'personal'

export type ContextModeValue = ContextMode | 'auto'

export type CleanerOutputView = 'changes' | 'analyze'

export type CleanerSeverity = 'critical' | 'high' | 'medium' | 'low'

/** Issue row shape the analyze panel table renders. */
export interface CleanerIssue {
  type: string
  text: string
  severity: CleanerSeverity
  suggestion: string
}

/** Bayesian model breakdown (display only). */
export interface BayesianBreakdown {
  verdict: string
  charAiRate: number
  perModelBreakdown: Array<{ name: string; percent: number }>
  sentences: Array<{ text: string; isAi: boolean; models: string[] }>
  isReliable: boolean
  warning?: string
}

/** Analysis result the panel renders (display-only subset). */
export interface CleanerAnalyzeResult {
  aiScore: number
  readability: number
  wordCount: number
  classification: string
  confidence: string
  probabilities: { human: number; mixed: number; ai: number }
  issues: CleanerIssue[]
  normalizedText: string
  summary: string
  bayesian?: BayesianBreakdown | null
}

/**
 * Translation function the cleaner section receives. Loosely typed to accept
 * next-intl's useTranslations return (values may be string/number/Date); the
 * package never imports next-intl itself.
 */
export type CleanerT = (
  key: string,
  values?: Record<string, string | number | Date>
) => string

/** Diff part shape the output view renders. */
export interface CleanerDiffPart {
  value: string
  added?: boolean
  removed?: boolean
}

/**
 * Props for the standalone CleanerOutput display component (the "cleaned
 * result" panel). Kept in the types module so the component, its consumers,
 * and the registry can share the same shape.
 */
export interface CleanerOutputProps {
  outputView: CleanerOutputView
  outputCount: number
  output: string
  activeDiffParts: CleanerDiffPart[]
  activeHasChanges: boolean
  analyzeResult: CleanerAnalyzeResult | null
  isRewriting: boolean
  showAiHint?: boolean
  compact?: boolean
  fullscreen?: boolean
  typeLabels: Record<string, string>
  severityLabels: Record<string, string>
  onAnalyze: () => void
  onFixWithAi?: (focusIssues?: string[]) => void
  onExportMarkdown?: () => void
  onExportPdf?: () => void
  onShareLink?: () => void
  shareCopied: boolean
  contextMode: ContextModeValue
  detectedContextMode: string
  onContextModeChange: (value: ContextModeValue) => void
  t: CleanerT
}

