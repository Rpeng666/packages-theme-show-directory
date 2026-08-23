/**
 * Highlight span building — vendored from the app's avoid-ai-writing/highlight
 * (pure string algorithm, no business state). The package renders highlighted
 * text without importing app modules.
 */

export type CleanerIssueForSpan = {
  text: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: string
  suggestion: string
}

export interface HighlightSpan {
  start: number
  end: number
  text: string
  severity: CleanerIssueForSpan['severity']
  issues: CleanerIssueForSpan[]
}

export interface TextSegment {
  type: 'plain' | 'highlight'
  text: string
  span?: HighlightSpan
}

const SEVERITY_RANK: Record<CleanerIssueForSpan['severity'], number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

function isWordChar(char: string): boolean {
  return /[a-zA-Z0-9_]/.test(char)
}

function findOccurrences(
  text: string,
  needle: string
): Array<{ start: number; end: number }> {
  const occurrences: Array<{ start: number; end: number }> = []
  if (!needle) return occurrences

  const lowerText = text.toLowerCase()
  const lowerNeedle = needle.toLowerCase()
  const needleIsWord = /^[\w'-]+$/.test(needle)

  let idx = 0
  while ((idx = lowerText.indexOf(lowerNeedle, idx)) !== -1) {
    const end = idx + needle.length
    if (needleIsWord) {
      const charBefore = text[idx - 1]
      const charAfter = text[end]
      if (
        (charBefore && isWordChar(charBefore)) ||
        (charAfter && isWordChar(charAfter))
      ) {
        idx += 1
        continue
      }
    }
    occurrences.push({ start: idx, end })
    idx = end
  }
  return occurrences
}

/** Build merged highlight spans from detector issues (highest severity wins). */
export function buildHighlightSpans(
  text: string,
  issues: CleanerIssueForSpan[]
): HighlightSpan[] {
  const rawSpans: Array<{
    start: number
    end: number
    severity: CleanerIssueForSpan['severity']
    issue: CleanerIssueForSpan
  }> = []

  for (const issue of issues) {
    if (!issue.text) continue
    for (const occurrence of findOccurrences(text, issue.text)) {
      rawSpans.push({
        start: occurrence.start,
        end: occurrence.end,
        severity: issue.severity,
        issue,
      })
    }
  }

  rawSpans.sort((a, b) => a.start - b.start || a.end - b.end)

  const merged: HighlightSpan[] = []
  for (const span of rawSpans) {
    const last = merged[merged.length - 1]
    if (last && span.start < last.end) {
      last.end = Math.max(last.end, span.end)
      last.text = text.slice(last.start, last.end)
      last.issues.push(span.issue)
      if (SEVERITY_RANK[span.severity] > SEVERITY_RANK[last.severity]) {
        last.severity = span.severity
      }
    } else {
      merged.push({
        start: span.start,
        end: span.end,
        text: text.slice(span.start, span.end),
        severity: span.severity,
        issues: [span.issue],
      })
    }
  }
  return merged
}

/** Split text into plain + highlight segments for rendering. */
export function splitTextBySpans(
  text: string,
  spans: HighlightSpan[]
): TextSegment[] {
  const sorted = [...spans].sort((a, b) => a.start - b.start)
  const segments: TextSegment[] = []
  let position = 0

  for (const span of sorted) {
    if (span.start > position) {
      segments.push({ type: 'plain', text: text.slice(position, span.start) })
    }
    segments.push({
      type: 'highlight',
      text: text.slice(Math.max(position, span.start), span.end),
      span,
    })
    position = Math.max(position, span.end)
  }
  if (position < text.length) {
    segments.push({ type: 'plain', text: text.slice(position) })
  }
  return segments
}
