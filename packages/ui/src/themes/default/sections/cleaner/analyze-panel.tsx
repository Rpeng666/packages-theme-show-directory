'use client'

import {
  AlertTriangle,
  FileDown,
  FileText,
  Loader2,
  ScanLine,
  Share2,
  Sparkles,
} from 'lucide-react'

import { Button } from '../../button'
import { Dropdown } from '../../dropdown'
import { cn } from '../../../../lib/utils'
import type {
  CleanerAnalyzeResult,
  CleanerSeverity,
  CleanerT,
  ContextModeValue,
} from '../../../../contracts/sections/cleaner-types'
import { ContextModeSelector } from './context-selector'
import { HighlightedWords } from './highlighted'

/**
 * Default analyze panel — detection report rendered inside the output pane.
 * Stateless: result/t/typeLabels/severityLabels/actions all injected. Issue
 * severity renders through the injected `severityLabels` map (falls back to
 * the raw key) so the package owns no domain vocabulary.
 */
export function AnalyzePanel({
  result,
  t,
  typeLabels,
  severityLabels,
  onFixWithAi,
  isRewriting,
  onExportMarkdown,
  onExportPdf,
  onShareLink,
  shareCopied,
  contextMode,
  detectedContextMode,
  onContextModeChange,
}: {
  result: CleanerAnalyzeResult
  t: CleanerT
  typeLabels: Record<string, string>
  severityLabels: Record<string, string>
  onFixWithAi?: (focusIssues?: string[]) => void
  isRewriting: boolean
  onExportMarkdown?: () => void
  onExportPdf?: () => void
  onShareLink?: () => void
  shareCopied: boolean
  contextMode: ContextModeValue
  detectedContextMode: string
  onContextModeChange: (value: ContextModeValue) => void
}) {
  const scoreColor = (score: number) => {
    if (score >= 70) return 'text-destructive'
    if (score >= 40) return 'text-amber-600 dark:text-amber-400'
    return 'text-green-600 dark:text-green-400'
  }

  const severityColor = (severity: CleanerSeverity) => {
    if (severity === 'critical' || severity === 'high')
      return 'bg-destructive/10 text-destructive'
    if (severity === 'medium')
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
    return 'bg-accent text-accent-foreground'
  }

  const classificationColor = (c: string) => {
    if (c === 'HUMAN_ONLY') return 'text-green-600 dark:text-green-400'
    if (c === 'AI_ONLY') return 'text-destructive'
    return 'text-amber-600 dark:text-amber-400'
  }

  const verdictBadgeClass = (v: string) => {
    if (v === 'human')
      return 'bg-green-500/10 text-green-600 dark:text-green-400'
    if (v === 'maybe-human')
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
    return 'bg-destructive/10 text-destructive'
  }

  const verdictLabel = (v: string) => {
    if (v === 'human') return t('detect.verdict_human')
    if (v === 'maybe-human') return t('detect.verdict_maybe_human')
    return t('detect.verdict_maybe_ai')
  }

  const aiHighlightClass = (modelCount: number) => {
    if (modelCount >= 4) return 'bg-destructive/15'
    if (modelCount === 3) return 'bg-amber-400/25'
    if (modelCount === 2) return 'bg-amber-200/20 dark:bg-amber-800/20'
    return ''
  }

  const { human, mixed, ai } = result.probabilities

  return (
    <div className="flex h-full min-w-0 flex-col gap-4">
      {/* Context mode selector */}
      <ContextModeSelector
        value={contextMode}
        detectedValue={detectedContextMode}
        onChange={onContextModeChange}
        t={t}
      />

      {/* Score cards */}
      <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-3 md:grid-cols-[repeat(4,minmax(0,1fr))]">
        <div className="border-border bg-card rounded-xl border p-3 text-center">
          <p className="text-muted-foreground text-xs">{t('detect.ai_score')}</p>
          <p
            className={cn(
              'text-2xl font-bold tabular-nums',
              scoreColor(result.aiScore)
            )}
          >
            {result.aiScore}
          </p>
        </div>
        <div className="border-border bg-card rounded-xl border p-3 text-center">
          <p className="text-muted-foreground text-xs">{t('readability')}</p>
          <p className="text-green-600 dark:text-green-400 text-2xl font-bold tabular-nums">
            {Math.round(result.readability)}
          </p>
        </div>
        <div className="border-border bg-card rounded-xl border p-3 text-center">
          <p className="text-muted-foreground text-xs">
            {t('detect.classification')}
          </p>
          <p
            className={cn(
              'text-lg font-bold',
              classificationColor(result.classification)
            )}
          >
            {result.classification}
          </p>
        </div>
        <div className="border-border bg-card rounded-xl border p-3 text-center">
          <p className="text-muted-foreground text-xs">
            {t('detect.confidence')}
          </p>
          <p className="text-foreground text-lg font-bold capitalize">
            {result.confidence}
          </p>
        </div>
      </div>

      {/* Probability distribution */}
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-3">
        <div className="border-border bg-card rounded-xl border p-3 text-center">
          <p className="text-muted-foreground text-xs">
            {t('detect.probability_human')}
          </p>
          <p className="text-green-600 dark:text-green-400 text-lg font-bold tabular-nums">
            {(human * 100).toFixed(1)}%
          </p>
        </div>
        <div className="border-border bg-card rounded-xl border p-3 text-center">
          <p className="text-muted-foreground text-xs">
            {t('detect.probability_mixed')}
          </p>
          <p className="text-amber-600 dark:text-amber-400 text-lg font-bold tabular-nums">
            {(mixed * 100).toFixed(1)}%
          </p>
        </div>
        <div className="border-border bg-card rounded-xl border p-3 text-center">
          <p className="text-muted-foreground text-xs">
            {t('detect.probability_ai')}
          </p>
          <p className="text-destructive text-lg font-bold tabular-nums">
            {(ai * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Summary */}
      {result.summary && (
        <p className="text-muted-foreground text-sm">{result.summary}</p>
      )}

      {/* Bayesian unavailable warning */}
      {result.bayesian === null && (
        <div className="border-amber-500/30 bg-amber-500/10 flex items-center gap-2 rounded-xl border px-4 py-3 text-xs text-amber-600 dark:text-amber-400">
          <AlertTriangle className="size-4 shrink-0" />
          <span>{t('bayesian_unavailable')}</span>
        </div>
      )}

      {/* Bayesian model breakdown */}
      {result.bayesian && (
        <div className="border-border bg-card flex flex-col gap-3 rounded-xl border p-4">
          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
            {t('detect.model_based_title')}
          </p>
          {result.bayesian.warning && (
            <div className="border-amber-500/30 bg-amber-500/10 rounded-lg border px-3 py-2 text-xs text-amber-600 dark:text-amber-400">
              {result.bayesian.warning}
            </div>
          )}
          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-3">
            <div className="border-border bg-muted rounded-lg border p-3 text-center">
              <p className="text-muted-foreground text-xs">{t('detect.verdict')}</p>
              <span
                className={cn(
                  'inline-block rounded-full px-2.5 py-0.5 text-xs font-bold',
                  verdictBadgeClass(result.bayesian.verdict)
                )}
              >
                {verdictLabel(result.bayesian.verdict)}
              </span>
            </div>
            <div className="border-border bg-muted rounded-lg border p-3 text-center">
              <p className="text-muted-foreground text-xs">{t('detect.ai_chars')}</p>
              <p
                className={cn(
                  'text-lg font-bold tabular-nums',
                  scoreColor(result.bayesian.charAiRate)
                )}
              >
                {result.bayesian.charAiRate.toFixed(1)}%
              </p>
            </div>
          </div>
          {result.bayesian.perModelBreakdown.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground text-xs">{t('detect.by_model')}</p>
              <div className="flex flex-wrap gap-2">
                {result.bayesian.perModelBreakdown.map((model) => (
                  <div
                    key={model.name}
                    className="border-border bg-muted rounded-full border px-2.5 py-1 text-xs"
                  >
                    <span className="text-foreground font-medium">{model.name}</span>
                    <span className="text-muted-foreground ml-1">
                      {model.percent.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {result.bayesian.sentences.some((s) => s.isAi) && (
            <div className="border-border bg-muted max-h-48 overflow-auto rounded-lg border p-3 text-sm leading-relaxed">
              {result.bayesian.sentences.map((sentence, index) => (
                <span
                  key={index}
                  className={cn('rounded', aiHighlightClass(sentence.models.length))}
                  title={
                    sentence.models.length > 0
                      ? `Flagged by: ${sentence.models.join(', ')}`
                      : undefined
                  }
                >
                  {sentence.text}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Export/share */}
      <div className="no-print flex items-center justify-end gap-2">
        <Dropdown
          align="end"
          trigger={
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-border bg-card text-foreground hover:bg-secondary gap-2 rounded-full"
            >
              <FileDown className="size-4" />
              {t('export')}
            </Button>
          }
          items={[
            ...(onExportMarkdown
              ? [
                  {
                    value: 'md',
                    children: (
                      <span className="flex items-center gap-2">
                        <FileDown className="size-4" />
                        {t('export_markdown')}
                      </span>
                    ),
                    onSelect: onExportMarkdown,
                  },
                ]
              : []),
            ...(onExportPdf
              ? [
                  {
                    value: 'pdf',
                    children: (
                      <span className="flex items-center gap-2">
                        <FileText className="size-4" />
                        {t('export_pdf')}
                      </span>
                    ),
                    onSelect: onExportPdf,
                  },
                ]
              : []),
            ...(onShareLink
              ? [
                  {
                    value: 'share',
                    children: (
                      <span className="flex items-center gap-2">
                        <Share2 className="size-4" />
                        {shareCopied ? t('copied') : t('export_share')}
                      </span>
                    ),
                    onSelect: onShareLink,
                  },
                ]
              : []),
          ]}
        />
      </div>

      {/* Word-level highlighting */}
      {result.normalizedText && result.issues.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
            {t('detect.highlighted_text')}
          </p>
          <HighlightedWords
            text={result.normalizedText}
            issues={result.issues.map((i) => ({
              type: i.type,
              text: i.text,
              severity: i.severity,
              suggestion: i.suggestion,
            }))}
            typeLabels={typeLabels}
            t={t}
          />
        </div>
      )}

      {/* Issue list with AI fix */}
      {result.issues.length > 0 && (
        <div className="flex flex-1 flex-col gap-2 overflow-auto">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
              {t('detect.issues_label')}
            </p>
            {onFixWithAi && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isRewriting}
                onClick={() =>
                  onFixWithAi(result.issues.map((issue) => issue.type))
                }
                className="border-primary/30 bg-card text-primary hover:bg-primary/5 h-7 gap-1 rounded-full px-2.5 text-xs"
              >
                {isRewriting ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  <Sparkles className="size-3" />
                )}
                {t('fix_all_with_ai')}
              </Button>
            )}
          </div>
          {result.issues.map((issue, index) => (
            <div
              key={`${issue.type}:${issue.text}:${index}`}
              className="border-border bg-card rounded-xl border p-3"
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-medium uppercase',
                      severityColor(issue.severity)
                    )}
                  >
                    {severityLabels[issue.severity] ?? issue.severity}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {typeLabels[issue.type] ?? issue.type}
                  </span>
                </div>
                {onFixWithAi && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isRewriting}
                    onClick={() => onFixWithAi([issue.type])}
                    className="text-primary hover:bg-primary/5 h-6 gap-1 px-1.5 text-xs"
                  >
                    {isRewriting ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <Sparkles className="size-3" />
                    )}
                    {t('fix_with_ai')}
                  </Button>
                )}
              </div>
              <p className="text-foreground mb-1 text-sm font-medium">
                {issue.text}
              </p>
              {issue.suggestion && (
                <p className="text-muted-foreground text-xs">{issue.suggestion}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
