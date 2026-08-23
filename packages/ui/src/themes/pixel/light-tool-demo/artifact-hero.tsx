/**
 * ArtifactHero - the "finished artifact first" hero for craft tool pages.
 *
 * The 3-second test: the first thing a visitor sees is a real, finished
 * pattern rendered in the craft they searched for (beads / cross-stitch /
 * diamond / bracelet), with size, color count, bead usage and a color
 * legend - plus the two actions that matter (switch pattern, upload photo).
 * Interactive params live below, not above.
 */

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PixelCraft, PixelPattern } from './patterns/pixel-library'
import { patternStats } from './patterns/pixel-library'
import { CraftEntryNav } from './craft-entry-nav'
import type { CraftEntryKind } from './craft-entry-nav'

export type ArtifactRenderStyle = 'bead' | 'stitch' | 'diamond' | 'bracelet' | 'grid'

const PATTERN_GALLERY_ID = 'craft-entry-pattern-gallery'

export interface ArtifactHeroProps {
  /** Selectable patterns (thumbnails + switcher). */
  patterns: PixelPattern[]
  /** id of the initially selected pattern. Defaults to patterns[0]. */
  defaultPatternId?: string
  /** Craft render style for the big canvas. */
  style?: ArtifactRenderStyle
  /** Fired when the user picks a photo - the app bridges to the workbench. */
  onUploadImage?: (dataUrl: string) => void
  /** Show the "type letters" on-ramp card (only letter-generating tools). */
  showLettersEntry?: boolean
  /** Scroll target id for the letter input that lives below (the demo). */
  lettersTargetId?: string
  /** i18n; falls back to zh-CN copy when absent. */
  t?: (key: string) => string
}

const FALLBACK = {
  artifactPick: '换个图案',
  artifactUpload: '传照片转图纸',
  artifactChart: '下载图纸 PNG',
  artifactCsv: '复制色号用量表',
  artifactColors: '色',
  artifactCells: '颗',
  copyDone: '已复制',
} as const

const STITCH_SYMBOLS = ['✕', '●', '■', '▲', '◆', '★', '◐', '▼', '✚', '▮', '❖', '⬟']

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
}

/** Draw a pattern grid in a craft-specific style. Pure canvas, no DOM state. */
export function drawArtifactChart(
  ctx: CanvasRenderingContext2D,
  pattern: PixelPattern,
  cell: number,
  style: ArtifactRenderStyle,
): void {
  const { palette, grid } = pattern
  const rows = grid.length
  const cols = grid[0]?.length ?? 0
  const symbolByHex = new Map<string, string>()
  let next = 0
  for (const hex of new Set(Object.values(palette))) {
    symbolByHex.set(hex, STITCH_SYMBOLS[next % STITCH_SYMBOLS.length]!)
    next++
  }

  if (style === 'stitch') {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, cols * cell, rows * cell)
  } else {
    ctx.fillStyle = style === 'bead' ? '#26262e' : '#f3f0e8'
    ctx.fillRect(0, 0, cols * cell, rows * cell)
  }

  const half = cell / 2
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const ch = grid[y]![x]
      if (!ch || ch === '.' || ch === ' ') continue
      const hex = palette[ch]
      if (!hex) continue
      const px = x * cell
      const py = y * cell

      if (style === 'bead') {
        // rounded bead peg: solid square inset with a top-left highlight
        ctx.fillStyle = hex
        ctx.fillRect(px + 1, py + 1, cell - 2, cell - 2)
        ctx.fillStyle = 'rgba(255,255,255,0.30)'
        ctx.fillRect(px + 2, py + 2, Math.max(2, cell * 0.3), Math.max(2, cell * 0.3))
      } else if (style === 'diamond') {
        ctx.fillStyle = hex
        ctx.beginPath()
        ctx.arc(px + half, py + half, cell * 0.42, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.beginPath()
        ctx.arc(px + half - cell * 0.12, py + half - cell * 0.12, cell * 0.1, 0, Math.PI * 2)
        ctx.fill()
      } else if (style === 'bracelet') {
        // knots offset half a cell on odd rows, like a knotted band
        const off = y % 2 === 1 ? half : 0
        ctx.fillStyle = hex
        ctx.beginPath()
        ctx.arc(px + half + off - half * 0.0, py + half, cell * 0.45, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'rgba(0,0,0,0.18)'
        ctx.lineWidth = 1
        ctx.stroke()
      } else if (style === 'stitch') {
        ctx.fillStyle = hex
        ctx.fillRect(px, py, cell, cell)
        ctx.fillStyle = luminance(hex) > 0.55 ? '#1a1a1a' : '#ffffff'
        ctx.font = `bold ${Math.floor(cell * 0.72)}px ui-monospace, monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(symbolByHex.get(hex) ?? '✕', px + half, py + half + 1)
      } else {
        // grid / sprite: flat cell
        ctx.fillStyle = hex
        ctx.fillRect(px + 0.5, py + 0.5, cell - 1, cell - 1)
      }
    }
  }

  // chart furniture: cell grid + a bolder line every 5 cells + outer border
  const w = cols * cell
  const h = rows * cell
  ctx.strokeStyle = 'rgba(0,0,0,0.10)'
  ctx.lineWidth = 1
  for (let x = 0; x <= cols; x++) {
    ctx.beginPath()
    ctx.moveTo(x * cell + 0.5, 0)
    ctx.lineTo(x * cell + 0.5, h)
    ctx.stroke()
  }
  for (let y = 0; y <= rows; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * cell + 0.5)
    ctx.lineTo(w, y * cell + 0.5)
    ctx.stroke()
  }
  ctx.strokeStyle = 'rgba(0,0,0,0.35)'
  for (let x = 0; x <= cols; x += 5) {
    ctx.beginPath()
    ctx.moveTo(x * cell + 0.5, 0)
    ctx.lineTo(x * cell + 0.5, h)
    ctx.stroke()
  }
  for (let y = 0; y <= rows; y += 5) {
    ctx.beginPath()
    ctx.moveTo(0, y * cell + 0.5)
    ctx.lineTo(w, y * cell + 0.5)
    ctx.stroke()
  }
  ctx.strokeStyle = style === 'bead' ? '#5a5a6e' : '#1a1a1a'
  ctx.lineWidth = 2
  ctx.strokeRect(1, 1, w - 2, h - 2)
}

function MiniPattern({ pattern, size = 40 }: { pattern: PixelPattern; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const rows = pattern.grid.length
    const cols = pattern.grid[0]?.length ?? 0
    canvas.width = cols * 4
    canvas.height = rows * 4
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const ch = pattern.grid[y]![x]
        const hex = ch && ch !== '.' ? pattern.palette[ch] : undefined
        if (!hex) continue
        ctx.fillStyle = hex
        ctx.fillRect(x * 4, y * 4, 4, 4)
      }
    }
  }, [pattern])
  return (
    <canvas
      ref={ref}
      style={{ width: size, height: size, imageRendering: 'pixelated' }}
      aria-hidden
    />
  )
}

export function ArtifactHero({
  patterns,
  defaultPatternId,
  style = 'bead',
  onUploadImage,
  showLettersEntry = false,
  lettersTargetId,
  t,
}: ArtifactHeroProps) {
  const tr = useCallback(
    (key: keyof typeof FALLBACK) => {
      const viaT = t?.(key)
      return viaT && viaT !== key ? viaT : FALLBACK[key]
    },
    [t],
  )

  const [selectedId, setSelectedId] = useState(defaultPatternId ?? patterns[0]?.id ?? '')
  const pattern = useMemo(
    () => patterns.find((p) => p.id === selectedId) ?? patterns[0],
    [patterns, selectedId],
  )
  const stats = useMemo(() => (pattern ? patternStats(pattern) : null), [pattern])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [copied, setCopied] = useState(false)
  const [activeEntry, setActiveEntry] = useState<CraftEntryKind | null>(null)

  // The three on-ramps this tool offers. `letters` only on letter tools.
  const entries = useMemo<CraftEntryKind[]>(
    () => (showLettersEntry ? ['pattern', 'upload', 'letters'] : ['pattern', 'upload']),
    [showLettersEntry],
  )

  // Entry card → scroll target. Pattern = the gallery here; upload = the file
  // picker (direct open); letters = the text input down in the demo.
  const entryTargetId = useCallback(
    (kind: CraftEntryKind): string | undefined => {
      if (kind === 'pattern') return PATTERN_GALLERY_ID
      if (kind === 'letters') return lettersTargetId
      return undefined // upload handled imperatively; pattern stays on screen
    },
    [lettersTargetId],
  )

  const handleEntrySelect = useCallback(
    (kind: CraftEntryKind) => {
      setActiveEntry(kind)
      if (kind === 'upload') {
        fileRef.current?.click()
      } else {
        const id = entryTargetId(kind)
        if (id && typeof document !== 'undefined') {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    },
    [entryTargetId],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !pattern) return
    const rows = pattern.grid.length
    const cols = pattern.grid[0]?.length ?? 0
    // ≥ ~460px tall on desktop, capped so wide charts still fit the column
    const cell = Math.max(18, Math.min(34, Math.floor(470 / rows), Math.floor(560 / cols)))
    canvas.width = cols * cell
    canvas.height = rows * cell
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawArtifactChart(ctx, pattern, cell, style)
  }, [pattern, style])

  const downloadChart = useCallback(() => {
    if (!pattern) return
    const rows = pattern.grid.length
    const cols = pattern.grid[0]?.length ?? 0
    const cell = 32
    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = cols * cell
    exportCanvas.height = rows * cell
    const ctx = exportCanvas.getContext('2d')
    if (!ctx) return
    drawArtifactChart(ctx, pattern, cell, style)
    exportCanvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${pattern.id}-chart.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }, [pattern, style])

  const copyCsv = useCallback(() => {
    if (!pattern || !stats) return
    const csv = ['hex,count', ...stats.counts.map((c) => `${c.hex},${c.count}`)].join('\n')
    void navigator.clipboard?.writeText(csv).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [pattern, stats])

  const onFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') onUploadImage?.(reader.result)
      }
      reader.readAsDataURL(file)
      e.target.value = ''
    },
    [onUploadImage],
  )

  if (!pattern || !stats) return null

  return (
    <div className="not-prose flex flex-col gap-4">
      {/* three on-ramps: pick a design / use your photo / type letters */}
      <CraftEntryNav
        entries={entries}
        active={activeEntry ?? undefined}
        onSelect={handleEntrySelect}
        targetId={entryTargetId}
        t={t}
      />
      <div className="flex flex-col-reverse items-start gap-6 md:flex-row">
        {/* finished artifact - the star of the first screen */}
        <canvas
          ref={canvasRef}
          className="w-full max-w-[560px] rounded-md shadow-lg"
          style={{ imageRendering: 'auto' }}
          aria-label={pattern.name}
        />

        <div className="flex w-full flex-col gap-4 md:w-64 md:shrink-0">
          {/* stats bar */}
          <div className="rounded-md border-2 border-dashed border-neutral-400/60 bg-white/95 p-3 text-sm dark:border-neutral-600 dark:bg-neutral-900/95">
            <p className="font-mono text-lg font-bold leading-tight">
              {stats.cols}×{stats.rows}
            </p>
            <p className="mt-1 text-neutral-600 dark:text-neutral-300">
              {stats.counts.length} {tr('artifactColors')} · {stats.totalCells} {tr('artifactCells')}
            </p>
          </div>

          {/* color legend - always visible */}
          <div className="rounded-md border-2 border-dashed border-neutral-400/60 bg-white/95 p-3 dark:border-neutral-600 dark:bg-neutral-900/95">
            <ul className="flex flex-col gap-1.5 text-xs">
              {stats.counts.map((c) => (
                <li key={c.hex} className="flex items-center gap-2">
                  <span
                    className="inline-block h-4 w-4 rounded-sm border border-black/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="font-mono">{c.hex.toUpperCase()}</span>
                  <span className="ml-auto font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
                    ×{c.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* actions */}
          <div className="flex flex-col gap-2">
            {onUploadImage && (
              <>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full rounded-md bg-[var(--accent,#e53935)] px-4 py-2.5 text-sm font-bold text-white shadow transition hover:brightness-110"
                >
                  📷 {tr('artifactUpload')}
                </button>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
              </>
            )}
            <button
              type="button"
              onClick={downloadChart}
              className="w-full rounded-md border-2 border-current px-4 py-2 text-sm font-bold transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              ⬇ {tr('artifactChart')}
            </button>
            <button
              type="button"
              onClick={copyCsv}
              className="w-full rounded-md border-2 border-current px-4 py-2 text-sm font-bold transition hover:bg-black/5 dark:hover:bg-white/10"
            >
              {copied ? `✓ ${tr('copyDone')}` : `📋 ${tr('artifactCsv')}`}
            </button>
          </div>
        </div>
      </div>

      {/* pattern switcher */}
      {patterns.length > 1 && (
        <div id={PATTERN_GALLERY_ID} className="flex flex-wrap items-center gap-2 scroll-mt-24">
          <span className="text-xs font-bold uppercase tracking-wider opacity-70">
            {tr('artifactPick')}
          </span>
          {patterns.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              title={p.name}
              className={`rounded-md border-2 p-0.5 transition ${
                p.id === pattern.id
                  ? 'border-[var(--accent,#e53935)] ring-2 ring-[var(--accent,#e53935)]/40'
                  : 'border-neutral-300 hover:border-neutral-500 dark:border-neutral-700'
              }`}
            >
              <MiniPattern pattern={p} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
