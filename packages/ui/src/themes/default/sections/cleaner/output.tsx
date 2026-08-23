'use client'

import { motion } from 'framer-motion'
import { ScanLine, Sparkles } from 'lucide-react'

import { Button } from '../../button'
import { cn } from '../../../../lib/utils'
import { countWords } from './lib/count-words'
import { AnalyzePanel } from './analyze-panel'
import type {
  CleanerDiffPart,
  CleanerOutputProps,
} from '../../../../contracts/sections/cleaner-types'

/**
 * Default cleaner output panel — the "cleaned result" pane shared by the
 * fullscreen workbench and the card layout. Stateless: state/actions/labels
 * are injected via CleanerOutputProps (app owns the business layer).
 */
export function CleanerOutput({
  outputView,
  outputCount,
  output,
  activeDiffParts,
  activeHasChanges,
  analyzeResult,
  isRewriting,
  showAiHint,
  compact,
  fullscreen,
  typeLabels,
  severityLabels,
  onAnalyze,
  onFixWithAi,
  onExportMarkdown,
  onExportPdf,
  onShareLink,
  shareCopied,
  contextMode,
  detectedContextMode,
  onContextModeChange,
  t,
}: CleanerOutputProps) {
  const renderDiff = (parts: CleanerDiffPart[]) => (
    <motion.p
      className="min-w-0 break-words whitespace-pre-wrap"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.015 } } }}
    >
      {parts.map((part, index) => {
        const key = `${part.value}-${index}`
        if (part.added) {
          return (
            <motion.ins
              key={key}
              className="bg-accent text-accent-foreground rounded px-0.5 font-medium no-underline"
              variants={{
                hidden: { opacity: 0, y: 3, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {part.value}
            </motion.ins>
          )
        }
        if (part.removed) {
          return (
            <motion.del
              key={key}
              className="bg-muted text-muted-foreground rounded px-0.5 line-through decoration-muted-foreground/50"
              variants={{
                hidden: { opacity: 0, x: -3 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.2 }}
            >
              {part.value}
            </motion.del>
          )
        }
        return (
          <motion.span
            key={key}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.12 }}
          >
            {part.value}
          </motion.span>
        )
      })}
    </motion.p>
  )

  const scoreBadgeClass = (score: number) =>
    score >= 70
      ? 'bg-destructive/10 text-destructive'
      : score >= 40
        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
        : 'bg-green-500/10 text-green-600 dark:text-green-400'

  return (
    <div
      className={cn(
        'border-border bg-card flex w-full min-w-0 flex-col gap-3 rounded-xl border shadow-sm',
        fullscreen ? 'p-3 sm:p-4' : 'rounded-2xl p-3 sm:p-5'
      )}
    >
      <div
        className={cn(
          'flex min-w-0 items-center justify-between gap-3',
          fullscreen ? 'min-h-9' : 'flex-wrap'
        )}
      >
        <span className="text-foreground flex flex-wrap items-center gap-2 text-sm font-semibold">
          {t('output_label')}
          {outputView === 'changes' && analyzeResult && (
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-semibold',
                scoreBadgeClass(analyzeResult.aiScore)
              )}
            >
              {t('detect.ai_score')}: {analyzeResult.aiScore}
            </span>
          )}
          {outputView === 'changes' && (
            <span className="text-muted-foreground text-xs font-normal tabular-nums">
              {t('character_count', { count: outputCount })} ·{' '}
              {t('word_count', { count: countWords(output) })}
            </span>
          )}
        </span>
      </div>

      <div
        className={cn(
          'border-border bg-muted text-foreground min-w-0 flex-1 rounded-xl border p-3 text-sm leading-relaxed shadow-sm sm:p-4 sm:text-base',
          fullscreen ? 'overflow-y-auto lg:min-h-0' : 'overflow-x-auto',
          !fullscreen && (compact ? 'min-h-32' : 'min-h-48 sm:min-h-72')
        )}
      >
        {outputView === 'analyze' ? (
          analyzeResult ? (
            <AnalyzePanel
              result={analyzeResult}
              t={t}
              typeLabels={typeLabels}
              severityLabels={severityLabels}
              onFixWithAi={onFixWithAi}
              isRewriting={isRewriting}
              onExportMarkdown={onExportMarkdown}
              onExportPdf={onExportPdf}
              onShareLink={onShareLink}
              shareCopied={shareCopied}
              contextMode={contextMode}
              detectedContextMode={detectedContextMode}
              onContextModeChange={onContextModeChange}
            />
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-3 text-center">
              <ScanLine className="size-8 opacity-40" />
              <div>
                <p className="text-foreground font-medium">
                  {t('analyze_empty_title')}
                </p>
                <p className="text-sm">{t('analyze_empty_description')}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAnalyze}
                className="border-border bg-card text-foreground hover:bg-secondary rounded-full"
              >
                <ScanLine className="text-primary size-3.5" />
                {t('run_analysis')}
              </Button>
            </div>
          )
        ) : isRewriting ? (
          <p className="min-w-0 break-words whitespace-pre-wrap">{output}</p>
        ) : !activeHasChanges ? (
          // Engine produced no visible edits: show the actual text so Copy
          // always has something real to grab (and never a stale "no changes"
          // placeholder). Empty input → friendly empty state instead.
          output ? (
            <div className="flex h-full flex-col">
              {showAiHint && (
                <span className="border-border bg-card text-muted-foreground inline-flex items-center gap-1.5 self-start rounded-full border px-2 py-0.5 text-[11px]">
                  <Sparkles className="text-primary size-3" />
                  {t('ai_hint')}
                </span>
              )}
              <p className="min-w-0 flex-1 break-words whitespace-pre-wrap">
                {output}
              </p>
            </div>
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-3 text-center">
              {showAiHint && (
                <span className="border-border bg-card text-muted-foreground inline-flex items-center gap-1.5 self-start rounded-full border px-2 py-0.5 text-[11px]">
                  <Sparkles className="text-primary size-3" />
                  {t('ai_hint')}
                </span>
              )}
              <ScanLine className="size-8 opacity-40" />
              <div>
                <p className="text-foreground font-medium">
                  {t('output_empty_title')}
                </p>
                <p className="text-sm">{t('output_empty_description')}</p>
              </div>
            </div>
          )
        ) : (
          renderDiff(activeDiffParts)
        )}
      </div>
    </div>
  )
}
