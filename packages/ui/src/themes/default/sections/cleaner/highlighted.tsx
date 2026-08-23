'use client'

import { useMemo } from 'react'

import { Tooltip } from '../../../../tooltip'
import { cn } from '../../../../lib/utils'
import type { CleanerIssueForSpan } from './lib/highlight'
import { buildHighlightSpans, splitTextBySpans } from './lib/highlight'
import type { CleanerT } from '../../../../contracts/sections/cleaner-types'

/**
 * HighlightedText — sentence-level regions. Pure display; `regions` are
 * pre-computed app-side.
 */
export function HighlightedText({
  text,
  regions,
}: {
  text: string
  regions: Array<{ start: number; end: number; score: number }>
}) {
  const sorted = [...regions].sort((a, b) => a.start - b.start)
  const segments: Array<{
    type: 'plain' | 'highlight'
    text: string
    score?: number
  }> = []
  let position = 0

  for (const region of sorted) {
    if (region.start > position) {
      segments.push({
        type: 'plain',
        text: text.slice(position, region.start),
      })
    }
    segments.push({
      type: 'highlight',
      text: text.slice(Math.max(position, region.start), region.end),
      score: region.score,
    })
    position = Math.max(position, region.end)
  }
  if (position < text.length) {
    segments.push({ type: 'plain', text: text.slice(position) })
  }

  const highlightClass = (score?: number) => {
    if (score === undefined)
      return 'bg-amber-200/40 dark:bg-amber-800/20 text-amber-800 dark:text-amber-300'
    if (score >= 0.7) return 'bg-destructive/15 text-destructive'
    if (score >= 0.4) return 'bg-amber-400/25 text-amber-700 dark:text-amber-400'
    return 'bg-amber-200/40 dark:bg-amber-800/20 text-amber-800 dark:text-amber-300'
  }

  return (
    <div className="border-border bg-card max-h-48 overflow-auto rounded-xl border p-4 text-base leading-relaxed whitespace-pre-wrap">
      {segments.map((segment, index) =>
        segment.type === 'highlight' ? (
          <mark
            key={`h-${index}`}
            className={cn('rounded px-0.5', highlightClass(segment.score))}
          >
            {segment.text}
          </mark>
        ) : (
          <span key={`p-${index}`}>{segment.text}</span>
        )
      )}
    </div>
  )
}

/**
 * HighlightedWords — word-level tooltip highlights. `typeLabels` maps issue
 * type → display label (domain data, injected by the app so the package owns
 * no business vocabulary).
 */
export function HighlightedWords({
  text,
  issues,
  typeLabels,
  t,
}: {
  text: string
  issues: CleanerIssueForSpan[]
  typeLabels: Record<string, string>
  t: CleanerT
}) {
  const spans = useMemo(
    () => buildHighlightSpans(text, issues),
    [text, issues]
  )
  const segments = useMemo(() => splitTextBySpans(text, spans), [text, spans])

  const severityClass = (severity: CleanerIssueForSpan['severity']) => {
    if (severity === 'critical') return 'bg-destructive/20 text-destructive'
    if (severity === 'high') return 'bg-destructive/15 text-destructive'
    if (severity === 'medium')
      return 'bg-amber-400/25 text-amber-700 dark:text-amber-400'
    return 'bg-amber-200/40 dark:bg-amber-800/20 text-amber-800 dark:text-amber-300'
  }

  return (
    <div className="border-border bg-card max-h-48 overflow-auto rounded-xl border p-4 text-base leading-relaxed whitespace-pre-wrap">
      {segments.map((segment, index) =>
        segment.type === 'highlight' && segment.span ? (
          <Tooltip
            key={`hw-${index}`}
            content={
              <div className="space-y-1">
                <p className="text-xs font-semibold">
                  {segment.span.issues
                    .map((issue) => typeLabels[issue.type] ?? issue.type)
                    .join(', ')}
                </p>
                <p className="text-muted-foreground text-xs">
                  {segment.span.issues
                    .map((issue) => issue.suggestion)
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
            }
            side="top"
            className="max-w-xs"
          >
            <mark
              className={cn(
                'cursor-help rounded px-0.5',
                severityClass(segment.span.severity)
              )}
            >
              {segment.text}
            </mark>
          </Tooltip>
        ) : (
          <span key={`hp-${index}`}>{segment.text}</span>
        )
      )}
    </div>
  )
}
