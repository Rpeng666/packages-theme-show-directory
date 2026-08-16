'use client'

import {
  PixelBadge,
  PixelBox,
  PixelButton,
  PixelCluster,
  PixelEmptyState,
  PixelScrollArea,
} from '@pxlkit/ui-kit'
import { motion } from 'framer-motion'
import { ScanLine, Sparkles } from 'lucide-react'

import { AnalyzePanel } from './analyze-panel'
import { countWords } from './lib/count-words'
import type {
  CleanerAnalyzeResult,
  CleanerDiffPart,
  CleanerOutputProps,
  CleanerOutputView,
  CleanerT,
  ContextModeValue,
} from './types'

const scoreTone = (score: number): 'red' | 'gold' | 'green' =>
  score >= 70 ? 'red' : score >= 40 ? 'gold' : 'green'

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
  const renderDiff = (
    parts: Array<{ value: string; added?: boolean; removed?: boolean }>
  ) => (
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
              className="bg-retro-green/18 rounded-sm px-0.5 font-medium text-retro-green no-underline"
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
              className="bg-retro-surface/50 rounded-sm px-0.5 text-retro-muted line-through decoration-retro-muted/50"
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

  return (
    <PixelBox
      variant="solid"
      tone="neutral"
      padding={fullscreen ? 'sm' : 'md'}
      radius="md"
      border
      shadow
      className="flex w-full min-w-0 flex-col gap-3 lg:min-h-0"
    >
      <PixelCluster justify="between" className="min-w-0">
        <span className="text-sm font-semibold text-retro-text">
          {t('output_label')}
          {outputView === 'changes' && analyzeResult && (
            <PixelBadge
              tone={scoreTone(analyzeResult.aiScore)}
              variant="soft"
              size="sm"
              className="ml-2"
            >
              {t('detect.ai_score')}: {analyzeResult.aiScore}
            </PixelBadge>
          )}
          {outputView === 'changes' && (
            <span className="ml-2 text-xs font-normal tabular-nums text-retro-muted">
              {t('character_count', { count: outputCount })} ·{' '}
              {t('word_count', { count: countWords(output) })}
            </span>
          )}
        </span>
      </PixelCluster>

      <PixelScrollArea
        variant="auto"
        bordered
        aria-label={t('output_label')}
        className={[
          'bg-retro-surface/30 min-w-0 flex-1 p-3 text-sm leading-relaxed sm:p-4 sm:text-base',
          // Fullscreen: bounded by the workbench grid — scroll internally.
          // Card layout: no fixed height — give a usable floor instead.
          fullscreen
            ? 'lg:min-h-0'
            : compact
              ? 'min-h-32'
              : 'min-h-48 sm:min-h-72',
        ].join(' ')}
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
            <PixelEmptyState
              title={t('analyze_empty_title')}
              description={t('analyze_empty_description')}
              icon={<ScanLine className="size-8" />}
              action={
                <PixelButton
                  type="button"
                  variant="outline"
                  tone="neutral"
                  size="sm"
                  iconLeft={<ScanLine className="size-3.5" />}
                  onClick={onAnalyze}
                >
                  {t('run_analysis')}
                </PixelButton>
              }
            />
          )
        ) : isRewriting ? (
          <p className="min-w-0 break-words whitespace-pre-wrap font-mono">
            {output}
          </p>
        ) : !activeHasChanges ? (
          // Engine produced no visible edits: show the actual text so Copy
          // always has something real to grab (and never a stale "no changes"
          // placeholder). Empty input → friendly empty state instead.
          output ? (
            <div className="flex h-full flex-col">
              {showAiHint && (
                <PixelBadge
                  tone="cyan"
                  size="sm"
                  iconLeft={<Sparkles className="size-3" />}
                  className="self-start"
                >
                  {t('ai_hint')}
                </PixelBadge>
              )}
              <p className="min-w-0 flex-1 break-words whitespace-pre-wrap">
                {output}
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              {showAiHint && (
                <PixelBadge
                  tone="cyan"
                  size="sm"
                  iconLeft={<Sparkles className="size-3" />}
                  className="self-start"
                >
                  {t('ai_hint')}
                </PixelBadge>
              )}
              <PixelEmptyState
                title={t('output_empty_title')}
                description={t('output_empty_description')}
                icon={<ScanLine className="size-8" />}
              />
            </div>
          )
        ) : (
          renderDiff(activeDiffParts)
        )}
      </PixelScrollArea>
    </PixelBox>
  )
}
