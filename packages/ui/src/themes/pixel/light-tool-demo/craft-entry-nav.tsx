/**
 * CraftEntryNav - the "3 ways to make your chart" entry cards that open a
 * craft tool page. Replaces the flat slider+upload layout with three explicit,
 * parallel on-ramps the visitor can choose from before touching any control.
 *
 *   [ 选图案 ]  [ 传照片 ]  [ 打字 ]
 *   pick a design  use your photo  type letters
 *
 * The active entry scrolls to (and pulse-highlights) the matching input below:
 * pattern gallery / photo upload / text→glyph. Card availability per tool:
 * `letters` is only shown on letter-tools (bead-letters, banner-letters).
 */

'use client'

import { useCallback, useState } from 'react'
import { cn } from '../../../lib/utils'
import { PixelIcon } from '../../../components/pixel-icon'

export type CraftEntryKind = 'pattern' | 'upload' | 'letters'

export interface CraftEntryNavProps {
  /** Which on-ramps this tool offers. pattern+upload are default; letters optional. */
  entries?: CraftEntryKind[]
  active?: CraftEntryKind
  onSelect?: (kind: CraftEntryKind) => void
  /** Scroll target ids the nav scrolls to on click. Defaults to data-craft-entry ids. */
  targetId?: (kind: CraftEntryKind) => string | undefined
  /** i18n; falls back to zh copy. */
  t?: (key: string) => string
  /** Determines active state + pulse, e.g. the currently-focused input. */
  className?: string
}

const FALLBACK: Record<CraftEntryKind, { label: string; hint: string; icon: string }> = {
  pattern: { label: '选图案', hint: '从成品库挑一个设计', icon: 'grid' },
  upload: { label: '传照片', hint: '用自己的照片转图纸', icon: 'upload' },
  letters: { label: '打字', hint: '把文字做成字母珠', icon: 'pencil' },
}

function EntranceCard({
  kind,
  label,
  hint,
  icon,
  active,
  onClick,
}: {
  kind: CraftEntryKind
  label: string
  hint: string
  icon: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'group flex flex-1 items-center gap-3 border-2 bg-retro-surface/20 px-4 py-3.5 text-left transition-all pxl-corner-md',
        active
          ? 'border-retro-cyan/70 bg-retro-cyan/10 shadow-[0_0_0_3px_rgba(124,214,255,0.15)]'
          : 'border-foreground/15 hover:border-retro-cyan/40 hover:-translate-y-0.5',
      )}
    >
      <span
        className={cn(
          'flex size-11 shrink-0 items-center justify-center border-2 pxl-corner-sm',
          active ? 'border-retro-cyan/70 bg-retro-cyan/15 text-retro-cyan' : 'border-foreground/15 bg-secondary text-secondary-foreground',
        )}
      >
        <PixelIcon name={icon} size={20} />
      </span>
      <span className="min-w-0">
        <span className="font-display block text-sm font-bold uppercase tracking-wider text-foreground">
          {label}
        </span>
        <span className="block truncate text-xs text-muted-foreground">{hint}</span>
      </span>
      <PixelIcon
        name="arrow-right"
        size={14}
        className={cn('ml-auto shrink-0 transition-transform group-hover:translate-x-0.5', active ? 'text-retro-cyan' : 'text-muted-foreground')}
      />
    </button>
  )
}

export function CraftEntryNav({
  entries = ['pattern', 'upload', 'letters'],
  active,
  onSelect,
  targetId,
  t,
  className,
}: CraftEntryNavProps) {
  const labelOf = useCallback(
    (kind: CraftEntryKind) => {
      const via = t?.(`entryLabel_${kind}`) ?? t?.(`craftEntry_${kind}`)
      // next-intl returns the key when a key is missing - treat it as undefined.
      return via && via !== `entryLabel_${kind}` && via !== `craftEntry_${kind}` ? via : undefined
    },
    [t],
  )

  const handleSelect = useCallback(
    (kind: CraftEntryKind) => {
      onSelect?.(kind)
      const id = targetId?.(kind)
      if (id && typeof document !== 'undefined') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    },
    [onSelect, targetId],
  )

  return (
    <div className={cn('flex w-full flex-col gap-2 sm:flex-row sm:gap-3', className)}>
      {entries.map((kind) => {
        const meta = FALLBACK[kind]
        return (
          <EntranceCard
            key={kind}
            kind={kind}
            label={labelOf(kind) ?? meta.label}
            hint={meta.hint}
            icon={meta.icon}
            active={active === kind}
            onClick={() => handleSelect(kind)}
          />
        )
      })}
    </div>
  )
}