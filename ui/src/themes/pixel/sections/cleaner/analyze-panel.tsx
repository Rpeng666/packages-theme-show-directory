'use client'

import {
  PixelBadge,
  PixelBarChart,
  PixelBox,
  PixelButton,
  PixelCluster,
  PixelDataTable,
  PixelDropdown,
  PixelGrid,
  PixelProgress,
  PixelScrollArea,
  PixelStack,
  PixelStatCard,
  PixelStatGroup,
  PixelStepper,
  createColumnHelper,
} from '@pxlkit/ui-kit'
import {
  AlertTriangle,
  FileDown,
  FileText,
  ScanLine,
  Share2,
  Sparkles,
} from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'

import { ContextModeSelector } from './context-selector'
import { HighlightedWords } from './highlighted'
import type {
  CleanerAnalyzeResult,
  CleanerSeverity,
  CleanerT,
  ContextModeValue,
} from './types'

const scoreTone = (score: number): 'red' | 'gold' | 'green' =>
  score >= 70 ? 'red' : score >= 40 ? 'gold' : 'green'

const classificationTone = (c: string): 'red' | 'gold' | 'green' =>
  c === 'HUMAN_ONLY' ? 'green' : c === 'AI_ONLY' ? 'red' : 'gold'

const verdictTone = (v: string): 'red' | 'gold' | 'green' =>
  v === 'human' ? 'green' : v === 'maybe-human' ? 'gold' : 'red'

const severityTone = (s: CleanerSeverity): 'red' | 'gold' | 'neutral' =>
  s === 'critical' || s === 'high'
    ? 'red'
    : s === 'medium'
      ? 'gold'
      : 'neutral'

const aiHighlightClass = (modelCount: number) => {
  if (modelCount >= 4) return 'bg-retro-red/15'
  if (modelCount === 3) return 'bg-retro-gold/30'
  if (modelCount === 2) return 'bg-retro-gold/20'
  return ''
}

/** Sortable table rows — one row per detected issue. */
type IssueRow = {
  severity: CleanerSeverity
  type: string
  typeLabel: string
  text: string
  suggestion: string
}

const issueColumnHelper = createColumnHelper<IssueRow>()

/** Build table columns — `severityLabels`/`typeLabels` injected (app domain). */
function buildIssueColumns(
  severityLabels: Record<string, string>,
  typeLabels: Record<string, string>
): ColumnDef<IssueRow, unknown>[] {
  return [
    issueColumnHelper.accessor('severity', {
      header: 'Severity',
      cell: (info) => {
        const s = info.getValue()
        return (
          <PixelBadge tone={severityTone(s)} variant="soft" size="sm">
            {severityLabels[s] ?? s}
          </PixelBadge>
        )
      },
    }) as ColumnDef<IssueRow, unknown>,
    issueColumnHelper.accessor('typeLabel', {
      header: 'Type',
      cell: (info) => info.getValue(),
    }) as ColumnDef<IssueRow, unknown>,
    issueColumnHelper.accessor('text', {
      header: 'Issue',
      cell: (info) => (
        <span className="font-mono text-xs text-retro-text">
          {info.getValue()}
        </span>
      ),
    }) as ColumnDef<IssueRow, unknown>,
    issueColumnHelper.accessor('suggestion', {
      header: 'Suggestion',
      cell: (info) => (
        <span className="text-xs text-retro-muted">{info.getValue()}</span>
      ),
    }) as ColumnDef<IssueRow, unknown>,
  ]
}

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
  const verdictLabel = (v: string) => {
    if (v === 'human') return t('detect.verdict_human')
    if (v === 'maybe-human') return t('detect.verdict_maybe_human')
    return t('detect.verdict_maybe_ai')
  }

  const { human, mixed, ai } = result.probabilities

  // Issue-type distribution for the bar chart (top 6 by count).
  const byType = result.issues.reduce<Record<string, number>>((acc, i) => {
    const label = typeLabels[i.type] ?? i.type
    acc[label] = (acc[label] ?? 0) + 1
    return acc
  }, {})
  const typeChartData = Object.entries(byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, count]) => ({ x: label, y: count }))

  const issueRows: IssueRow[] = result.issues.map((i) => ({
    severity: i.severity,
    type: i.type,
    typeLabel: typeLabels[i.type] ?? i.type,
    text: i.text,
    suggestion: i.suggestion,
  }))

  // Engine pipeline status: Bayesian runs best-effort and may be null.
  const bayesianRan = result.bayesian !== null
  const bayesianReliable = result.bayesian?.isReliable ?? false

  const ISSUE_COLUMNS = buildIssueColumns(severityLabels, typeLabels)

  return (
    <PixelStack direction="col" gap={4} className="min-w-0">
      {/* Context mode selector */}
      <ContextModeSelector
        value={contextMode}
        detectedValue={detectedContextMode}
        onChange={onContextModeChange}
        t={t}
      />

      {/* Row 1 — headline score cards */}
      <PixelStatGroup layout="grid" columns={4} gap={3} aria-label="Detection metrics">
        <PixelStatCard
          label={t('detect.ai_score')}
          value={String(result.aiScore)}
          tone={scoreTone(result.aiScore)}
          valueTone
          align="center"
          size="sm"
        />
        <PixelStatCard
          label={t('readability')}
          value={String(Math.round(result.readability))}
          tone="green"
          valueTone
          align="center"
          size="sm"
        />
        <PixelStatCard
          label={t('detect.classification')}
          value={result.classification}
          tone={classificationTone(result.classification)}
          valueTone
          align="center"
          size="sm"
        />
        <PixelStatCard
          label={t('detect.confidence')}
          value={result.confidence}
          tone="cyan"
          valueTone
          align="center"
          size="sm"
        />
      </PixelStatGroup>

      {/* Row 2 — probability distribution as pixel progress bars + summary */}
      <PixelGrid cols={{ base: 1, md: 2 }} gap={3}>
        <PixelBox
          variant="solid"
          tone="neutral"
          radius="md"
          padding="md"
          border
          className="flex flex-col gap-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            {t('detect.probability_distribution')}
          </p>
          <PixelProgress
            label={t('detect.probability_human')}
            value={Math.round(human * 100)}
            tone="green"
          />
          <PixelProgress
            label={t('detect.probability_mixed')}
            value={Math.round(mixed * 100)}
            tone="gold"
          />
          <PixelProgress
            label={t('detect.probability_ai')}
            value={Math.round(ai * 100)}
            tone="red"
          />
        </PixelBox>

        <PixelBox
          variant="solid"
          tone="neutral"
          radius="md"
          padding="md"
          border
          className="flex flex-col gap-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            {t('summary')}
          </p>
          <p className="text-sm leading-relaxed text-retro-text">
            {result.summary || t('detect.summary_fallback')}
          </p>
          {result.issues.length > 0 && (
            <PixelCluster gap={2} className="flex-wrap">
              <PixelBadge tone={severityTone('high')} variant="soft" size="sm">
                {result.issues.length} {t('detect.issues_label')}
              </PixelBadge>
            </PixelCluster>
          )}
        </PixelBox>
      </PixelGrid>

      {/* Row 3 — engine pipeline stepper + issue-type bar chart */}
      <PixelGrid cols={{ base: 1, md: 2 }} gap={3}>
        {/* Engine pipeline */}
        <PixelBox
          variant="solid"
          tone="neutral"
          radius="md"
          padding="md"
          border
          className="flex flex-col gap-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            {t('detect.engine_pipeline')}
          </p>
          <PixelStepper active={1} orientation="vertical">
            <PixelStepper.Step
              label={t('detect.engine_heuristic')}
              description={t('detect.engine_heuristic_desc')}
              completed
            />
            <PixelStepper.Step
              label={t('detect.engine_rules')}
              description={t('detect.engine_rules_desc')}
              completed
            />
            <PixelStepper.Step
              label={t('detect.engine_bayesian')}
              description={
                bayesianRan
                  ? bayesianReliable
                    ? t('detect.engine_bayesian_reliable')
                    : t('detect.engine_bayesian_unreliable')
                  : t('detect.engine_bayesian_skipped')
              }
              completed={bayesianRan && bayesianReliable}
              error={bayesianRan && !bayesianReliable}
            />
          </PixelStepper>
        </PixelBox>

        {/* Issue-type bar chart (Revenue-by-plan style) */}
        <PixelBox
          variant="solid"
          tone="neutral"
          radius="md"
          padding="md"
          border
          className="flex flex-col gap-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            {t('detect.issues_by_type')}
          </p>
          {typeChartData.length > 0 ? (
            <>
              <div className="w-full overflow-x-auto" role="img">
                <PixelBarChart
                  data={typeChartData}
                  tone="gold"
                  orientation="vertical"
                  showValues
                  className="min-w-[280px]"
                />
              </div>
              <p className="text-xs text-retro-muted">
                {t('detect.issues_by_type_hint')}
              </p>
            </>
          ) : (
            <PixelBox
              variant="soft"
              tone="neutral"
              radius="sm"
              padding="sm"
              className="text-sm text-retro-muted"
            >
              {t('detect.no_issues')}
            </PixelBox>
          )}
        </PixelBox>
      </PixelGrid>

      {/* Bayesian unavailable warning */}
      {result.bayesian === null && (
        <PixelBox
          variant="soft"
          tone="gold"
          radius="sm"
          padding="sm"
          className="flex items-center gap-2 text-xs text-retro-gold"
        >
          <AlertTriangle className="size-4 shrink-0" />
          <span>{t('bayesian_unavailable')}</span>
        </PixelBox>
      )}

      {/* Bayesian model breakdown */}
      {result.bayesian && (
        <PixelBox
          variant="solid"
          tone="neutral"
          radius="md"
          padding="md"
          className="flex flex-col gap-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">
            {t('detect.model_based_title')}
          </p>
          {result.bayesian.warning && (
            <PixelBox
              variant="soft"
              tone="gold"
              radius="sm"
              padding="sm"
              className="text-xs text-retro-gold"
            >
              {result.bayesian.warning}
            </PixelBox>
          )}
          <PixelGrid cols={{ base: 2 }} gap={3}>
            <PixelBox
              variant="soft"
              tone="neutral"
              radius="sm"
              padding="sm"
              className="flex flex-col items-center gap-1"
            >
              <p className="text-xs text-retro-muted">{t('detect.verdict')}</p>
              <PixelBadge
                tone={verdictTone(result.bayesian.verdict)}
                variant="soft"
              >
                {verdictLabel(result.bayesian.verdict)}
              </PixelBadge>
            </PixelBox>
            <PixelBox
              variant="soft"
              tone="neutral"
              radius="sm"
              padding="sm"
              className="flex flex-col items-center gap-1"
            >
              <p className="text-xs text-retro-muted">{t('detect.ai_chars')}</p>
              <p
                className={`text-lg font-bold tabular-nums ${
                  scoreTone(result.bayesian.charAiRate) === 'red'
                    ? 'text-retro-red'
                    : scoreTone(result.bayesian.charAiRate) === 'gold'
                      ? 'text-retro-gold'
                      : 'text-retro-green'
                }`}
              >
                {result.bayesian.charAiRate.toFixed(1)}%
              </p>
            </PixelBox>
          </PixelGrid>
          {result.bayesian.perModelBreakdown.length > 0 && (
            <PixelStack direction="col" gap={2}>
              <p className="text-xs text-retro-muted">{t('detect.by_model')}</p>
              <PixelCluster gap={2} className="flex-wrap">
                {result.bayesian.perModelBreakdown.map((model) => (
                  <PixelBadge
                    key={model.name}
                    variant="soft"
                    tone="neutral"
                    size="sm"
                  >
                    <span className="font-medium">{model.name}</span>
                    <span className="ml-1 opacity-70">
                      {model.percent.toFixed(1)}%
                    </span>
                  </PixelBadge>
                ))}
              </PixelCluster>
            </PixelStack>
          )}
          {result.bayesian.sentences.some((s) => s.isAi) && (
            <PixelScrollArea
              variant="auto"
              maxHeight={192}
              className="bg-retro-surface/40 rounded-sm p-3 text-sm leading-relaxed"
            >
              {result.bayesian.sentences.map((sentence, index) => (
                <span
                  key={index}
                  className={`rounded ${aiHighlightClass(sentence.models.length)}`}
                  title={
                    sentence.models.length > 0
                      ? `Flagged by: ${sentence.models.join(', ')}`
                      : undefined
                  }
                >
                  {sentence.text}
                </span>
              ))}
            </PixelScrollArea>
          )}
        </PixelBox>
      )}

      {/* Export/share */}
      <PixelCluster justify="end" className="no-print">
        <PixelDropdown
          label={t('export')}
          tone="neutral"
          icon={<FileDown className="size-4" />}
          items={[
            ...(onExportMarkdown
              ? [
                  {
                    value: 'md',
                    label: t('export_markdown'),
                    icon: <FileDown className="size-4" />,
                  },
                ]
              : []),
            ...(onExportPdf
              ? [
                  {
                    value: 'pdf',
                    label: t('export_pdf'),
                    icon: <FileText className="size-4" />,
                  },
                ]
              : []),
            ...(onShareLink
              ? [
                  {
                    value: 'share',
                    label: shareCopied ? t('copied') : t('export_share'),
                    icon: <Share2 className="size-4" />,
                  },
                ]
              : []),
          ]}
          onSelect={(v) => {
            if (v === 'md') onExportMarkdown?.()
            if (v === 'pdf') onExportPdf?.()
            if (v === 'share') onShareLink?.()
          }}
        />
      </PixelCluster>

      {/* Word-level highlighting */}
      {result.normalizedText && result.issues.length > 0 && (
        <PixelStack direction="col" gap={2}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">
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
        </PixelStack>
      )}

      {/* Issue list — sortable table */}
      {result.issues.length > 0 && (
        <PixelStack direction="col" gap={2} className="flex-1">
          <PixelCluster justify="between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">
              {t('detect.issues_label')}
            </p>
            {onFixWithAi && (
              <PixelButton
                type="button"
                variant="outline"
                tone="cyan"
                size="sm"
                disabled={isRewriting}
                loading={isRewriting}
                iconLeft={
                  isRewriting ? undefined : <Sparkles className="size-3" />
                }
                onClick={() =>
                  onFixWithAi(result.issues.map((issue) => issue.type))
                }
              >
                {t('fix_all_with_ai')}
              </PixelButton>
            )}
          </PixelCluster>
          <PixelDataTable<IssueRow>
            data={issueRows}
            columns={ISSUE_COLUMNS}
            density="compact"
            stickyHeader
            emptyState={
              <PixelEmptyStateTable
                title={t('detect.no_issues')}
                description={t('detect.no_issues_desc')}
                icon={<ScanLine className="size-8" />}
              />
            }
          />
        </PixelStack>
      )}
    </PixelStack>
  )
}

function PixelEmptyStateTable({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="text-retro-cyan">{icon}</div>
      <p className="text-sm font-semibold text-retro-text">{title}</p>
      <p className="text-sm text-retro-muted">{description}</p>
    </div>
  )
}
