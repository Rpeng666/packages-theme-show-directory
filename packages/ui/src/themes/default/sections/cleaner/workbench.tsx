'use client'

import {
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  FileText,
  ListFilter,
  Loader2,
  MessageSquareQuote,
  RotateCcw,
  ScanLine,
  Settings2,
  SlidersHorizontal,
  Smile,
  Sparkles,
} from 'lucide-react'

import { Button } from '../../button'
import { Textarea } from '../../textarea'
import { Select } from '../../form'
import { cn } from '../../../../lib/utils'
import type { CleanerWorkbenchProps } from '../../../../contracts/sections/cleaner-workbench'
import { countWords } from './lib/count-words'
import { CleanerOutput } from './output'

const MODE_ICONS: Record<string, React.ReactNode> = {
  humanize: <Smile className="text-primary size-5" />,
  simplify: <ListFilter className="text-primary size-5" />,
  professional: <FileText className="text-primary size-5" />,
  academic: <MessageSquareQuote className="text-primary size-5" />,
  marketing: <Sparkles className="text-primary size-5" />,
  grammar: <Check className="text-primary size-5" />,
}

const TONE_ICON = <Smile className="text-primary size-5" />
const LENGTH_ICON = <Settings2 className="text-primary size-5" />

/**
 * Default cleaner workbench — the full tool UI. Stateless: all state, actions,
 * and labels are injected as props by the app (which owns the business logic
 * via useCleanerController + next-intl). This component only assembles the
 * default-theme chrome from registered primitives + the CleanerOutput section.
 */
export function CleanerWorkbench(props: CleanerWorkbenchProps) {
  const {
    section,
    className,
    compact = false,
    wide = false,
    fullscreen = false,
    input,
    onInputChange,
    mode,
    onModeChange,
    tone,
    onToneChange,
    length,
    onLengthChange,
    strength,
    onStrengthChange,
    options,
    onOptionsChange,
    outputView,
    output,
    inputCount,
    outputCount,
    error,
    copied,
    shareCopied,
    busy,
    showAiHint,
    activeDiffParts,
    activeHasChanges,
    analyzeResult,
    isRewriting,
    fallbackNotice,
    showAdvancedOptions,
    onToggleAdvancedOptions,
    contextMode,
    detectedContextMode,
    typeLabels,
    severityLabels,
    onClear,
    onCopy,
    onAnalyze,
    onFixWithAi,
    onContextModeChange,
    onExportMarkdown,
    onExportPdf,
    onShareLink,
    t,
    modeOptions,
    toneOptions,
    lengthOptions,
    strengthOptions,
    optionLabels,
  } = props

  const handleInputChange = (value: string) => onInputChange(value)

  if (fullscreen) {
    return (
      <section
        id="cleaner"
        className="flex w-full flex-col min-h-[calc(100svh-3.5rem)] lg:h-[calc(100svh-5rem)] lg:min-h-0"
        data-compact={compact}
      >
        <div className="flex w-full flex-col lg:h-full">
          <div className="border-border bg-card relative w-full min-h-0 flex-1 overflow-hidden rounded-none border-0 shadow-none lg:border-b">
            <div className="flex min-h-0 flex-col gap-3 p-4 sm:p-5 md:p-6 lg:h-full lg:gap-3 lg:px-8 lg:py-4 lg:pb-10">
              {/* WORKBENCH TOOLBAR: mode chips + actions, styled as an editor
                  toolbar strip distinct from the panes below. */}
              <div className="border-border bg-muted/40 flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <span className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wide">
                    {t('mode_label')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {modeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          onModeChange(opt.value as typeof mode)
                        }
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                          mode === opt.value
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-card text-foreground hover:bg-secondary'
                        )}
                      >
                        {MODE_ICONS[opt.value]}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onClear}
                    className="border-border bg-card text-foreground hover:bg-secondary rounded-full dark:text-white"
                  >
                    <RotateCcw className="size-4" />
                    {t('clear')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onCopy}
                    disabled={!output && outputView !== 'analyze'}
                    className="border-border bg-card text-foreground hover:bg-secondary rounded-full dark:text-white"
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied ? t('copied') : t('copy')}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={onAnalyze}
                    disabled={!input.trim() || busy}
                    className="gap-2 px-5"
                  >
                    {busy ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <ScanLine className="size-4" />
                    )}
                    {t('run_analysis')}
                  </Button>
                </div>
              </div>

              {/* BODY: left options sidebar + right side-by-side panes */}
              <div className="flex min-h-0 flex-col gap-3 lg:flex-1 lg:flex-row lg:gap-4">
                {/* LEFT: options */}
                <aside className="flex w-full flex-col lg:w-72 lg:min-h-0 lg:shrink lg:overflow-y-auto scrollbar-hide">
                  {/* Options panel — a single workbench settings card with
                      grouped, labeled controls separated by hairlines. */}
                  <div className="border-border bg-muted/40 rounded-xl border p-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="text-muted-foreground size-3.5" />
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                        {t('options_label')}
                      </p>
                    </div>

                    {/* Tone */}
                    <div className="mt-3 flex flex-col gap-2">
                      <p className="text-muted-foreground text-xs font-medium">
                        {t('tone_label')}
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {toneOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              onToneChange(opt.value as typeof tone)
                            }
                            className={cn(
                              'inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors',
                              tone === opt.value
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-card text-foreground hover:bg-secondary'
                            )}
                          >
                            {tone === opt.value && <Check className="size-3" />}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Length */}
                    <div className="mt-3 flex flex-col gap-2 border-t pt-3">
                      <p className="text-muted-foreground text-xs font-medium">
                        {t('length_label')}
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {lengthOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              onLengthChange(opt.value as typeof length)
                            }
                            className={cn(
                              'inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors',
                              length === opt.value
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-card text-foreground hover:bg-secondary'
                            )}
                          >
                            {length === opt.value && <Check className="size-3" />}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Strength */}
                    <div className="mt-3 flex flex-col gap-2 border-t pt-3">
                      <p className="text-muted-foreground text-xs font-medium">
                        {t('strength_label')}
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {strengthOptions.map((opt) => {
                          const active = strength === opt.value
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                onStrengthChange(opt.value as typeof strength)
                              }
                              className={cn(
                                'inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors',
                                active
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border bg-card text-foreground hover:bg-secondary'
                              )}
                            >
                              {active && <Check className="size-3" />}
                              {opt.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Cleaning options */}
                    <div className="mt-3 flex flex-col gap-2 border-t pt-3">
                      <p className="text-muted-foreground text-xs font-medium">
                        {t('cleaning_options')}
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {Object.entries(optionLabels).map(([value, label]) => {
                          const active = options.includes(
                            value as typeof options[number]
                          )
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() =>
                                onOptionsChange(
                                  active
                                    ? options.filter((o) => o !== value)
                                    : [...options, value as typeof options[number]]
                                )
                              }
                              className={cn(
                                'inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors',
                                active
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-border bg-card text-foreground hover:bg-secondary'
                              )}
                            >
                              {active && <Check className="size-3" />}
                              {label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </aside>

                {/* RIGHT: input | output side by side */}
                <div className="grid min-h-0 grid-cols-1 gap-3 lg:min-w-0 lg:flex-1 lg:grid-rows-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-4">
                  {/* Input */}
                  <div className="border-border bg-card flex w-full min-w-0 flex-col gap-3 rounded-xl border p-3 sm:p-4 shadow-sm">
                    <div className="flex min-h-9 min-w-0 items-center justify-between gap-3">
                      <span className="text-foreground flex items-center gap-1.5 text-sm font-semibold">
                        <span className="bg-primary inline-block size-1.5 rounded-full" />
                        {t('input_label')}
                      </span>
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="border-border bg-muted text-muted-foreground inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                          <span className="relative inline-flex size-1.5">
                            <span className="bg-green-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                            <span className="bg-green-500 relative inline-flex size-1.5 rounded-full" />
                          </span>
                          {t('auto_convert')}
                        </span>
                        <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                          {t('character_count', { count: inputCount })} ·{' '}
                          {t('word_count', { count: countWords(input) })}
                        </span>
                      </div>
                    </div>
                    <Textarea
                      value={input}
                      maxLength={6000}
                      onChange={(event) => handleInputChange(event.target.value)}
                      placeholder={t('input_placeholder')}
                      className={cn(
                        'text-foreground placeholder:text-muted-foreground min-w-0 flex-1 resize-none border-0 bg-transparent p-0 text-base leading-relaxed focus:ring-0',
                        'min-h-48 sm:min-h-72 lg:min-h-0'
                      )}
                    />
                  </div>

                  {/* Output */}
                  <CleanerOutput
                    outputView={outputView}
                    outputCount={outputCount}
                    output={output}
                    activeDiffParts={activeDiffParts}
                    activeHasChanges={activeHasChanges}
                    analyzeResult={analyzeResult as never}
                    isRewriting={isRewriting}
                    showAiHint={showAiHint}
                    compact={compact}
                    fullscreen
                    typeLabels={typeLabels}
                    severityLabels={severityLabels}
                    onAnalyze={onAnalyze}
                    onFixWithAi={onFixWithAi}
                    contextMode={contextMode as never}
                    detectedContextMode={detectedContextMode}
                    onContextModeChange={onContextModeChange}
                    onExportMarkdown={onExportMarkdown}
                    onExportPdf={onExportPdf}
                    onShareLink={onShareLink}
                    shareCopied={shareCopied}
                    t={t as never}
                  />
                </div>
              </div>

              {/* Footer note: absolutely positioned in the card's bottom-left
                  corner so it never steals vertical space from the panes. */}
              <p className="text-muted-foreground/70 absolute bottom-2 left-8 text-[10px] leading-none">
                {error
                  ? error
                  : fallbackNotice
                    ? t('fallback_notice')
                    : t('security_note')}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id={section.id || 'cleaner'}
      className={cn(compact ? 'h-full' : className || 'py-8 md:py-12')}
      data-compact={compact}
    >
      <div
        className={cn(
          'mx-auto w-full px-4 md:px-8',
          wide ? 'max-w-7xl' : 'max-w-6xl'
        )}
      >
        <div className="border-border bg-card w-full overflow-hidden rounded-3xl border shadow-lg">
          <div className="bg-muted w-full p-3 sm:p-5 md:p-8">
            {/* Top controls */}
            <div className="grid gap-3 md:gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
              <div className="border-border bg-card hover:border-primary/30 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm transition-colors hover:shadow-md">
                <div>{MODE_ICONS[mode]}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-xs">
                    {t('mode_label')}
                  </p>
                  <Select
                    value={mode}
                    onChange={(value) =>
                      onModeChange(value as typeof mode)
                    }
                    options={modeOptions}
                    className="text-foreground h-auto w-full rounded-none border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="border-border bg-card hover:border-primary/30 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm transition-colors hover:shadow-md">
                <div>{TONE_ICON}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-xs">
                    {t('tone_label')}
                  </p>
                  <Select
                    value={tone}
                    onChange={(value) =>
                      onToneChange(value as typeof tone)
                    }
                    options={toneOptions}
                    className="text-foreground h-auto w-full rounded-none border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="border-border bg-card hover:border-primary/30 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm transition-colors hover:shadow-md">
                <div>{LENGTH_ICON}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-xs">
                    {t('length_label')}
                  </p>
                  <Select
                    value={length}
                    onChange={(value) =>
                      onLengthChange(value as typeof length)
                    }
                    options={lengthOptions}
                    className="text-foreground h-auto w-full rounded-none border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Editor */}
            <div className="mt-4 grid w-full gap-3 md:mt-6 md:gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
              {/* Input */}
              <div className="border-border bg-card flex w-full min-w-0 flex-col gap-3 rounded-2xl border p-3 sm:p-5 shadow-sm">
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <span className="text-foreground text-sm font-semibold">
                    {t('input_label')}
                  </span>
                  <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                    {t('character_count', { count: inputCount })} ·{' '}
                    {t('word_count', { count: countWords(input) })}
                  </span>
                </div>
                <Textarea
                  value={input}
                  maxLength={6000}
                  onChange={(event) => handleInputChange(event.target.value)}
                  placeholder={t('input_placeholder')}
                  className={cn(
                    'text-foreground placeholder:text-muted-foreground min-w-0 flex-1 resize-none border-0 bg-transparent p-0 text-base leading-relaxed focus:ring-0',
                    compact ? 'min-h-32' : 'min-h-48 sm:min-h-72'
                  )}
                />
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center py-1 md:px-1 md:py-0">
                <button
                  type="button"
                  onClick={onAnalyze}
                  disabled={!input.trim() || busy}
                  className="bg-primary flex size-10 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-50 md:size-12"
                >
                  {busy ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <ArrowRight className="size-5" />
                  )}
                </button>
              </div>

              {/* Output */}
              <CleanerOutput
                outputView={outputView}
                outputCount={outputCount}
                output={output}
                activeDiffParts={activeDiffParts}
                activeHasChanges={activeHasChanges}
                analyzeResult={analyzeResult as never}
                isRewriting={isRewriting}
                compact={compact}
                typeLabels={typeLabels}
                severityLabels={severityLabels}
                onAnalyze={onAnalyze}
                onFixWithAi={onFixWithAi}
                contextMode={contextMode as never}
                detectedContextMode={detectedContextMode}
                onContextModeChange={onContextModeChange}
                onExportMarkdown={onExportMarkdown}
                onExportPdf={onExportPdf}
                onShareLink={onShareLink}
                shareCopied={shareCopied}
                t={t as never}
              />
            </div>

            {/* Bottom controls */}
            <div className="border-border bg-card mt-4 flex flex-col gap-4 rounded-2xl border p-3 sm:p-5 md:mt-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onToggleAdvancedOptions}
                  className="text-muted-foreground hover:bg-secondary gap-2"
                >
                  <Settings2 className="text-primary size-4" />
                  {t('advanced_options')}
                  <ChevronDown
                    className={cn(
                      'size-4 transition-transform',
                      showAdvancedOptions && 'rotate-180'
                    )}
                  />
                </Button>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onClear}
                      className="border-border bg-card text-foreground hover:bg-secondary rounded-full dark:text-white"
                    >
                      <RotateCcw className="size-4" />
                      {t('clear')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onCopy}
                      disabled={!output && outputView !== 'analyze'}
                      className="border-border bg-card text-foreground hover:bg-secondary rounded-full dark:text-white"
                    >
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      {copied ? t('copied') : t('copy')}
                    </Button>
                  </div>
                </div>
              </div>

              {showAdvancedOptions && (
                <div className="border-border bg-muted grid gap-4 rounded-2xl border p-3 sm:p-4">
                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wide">
                      {t('strength_label')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {strengthOptions.map((opt) => {
                        const active = strength === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              onStrengthChange(opt.value as typeof strength)
                            }
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                              active
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-card text-foreground hover:bg-secondary'
                            )}
                          >
                            {active && <Check className="size-3" />}
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wide">
                      {t('options_label')}
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                      {Object.entries(optionLabels).map(([value, label]) => {
                        const active = options.includes(
                          value as typeof options[number]
                        )
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              onOptionsChange(
                                active
                                  ? options.filter((o) => o !== value)
                                  : [...options, value as typeof options[number]]
                              )
                            }
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                              active
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-card text-foreground hover:bg-secondary'
                            )}
                          >
                            {active && <Check className="size-3" />}
                            {label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-muted-foreground mt-3 text-center text-xs">
              {error
                ? error
                : fallbackNotice
                  ? t('fallback_notice')
                  : t('security_note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
