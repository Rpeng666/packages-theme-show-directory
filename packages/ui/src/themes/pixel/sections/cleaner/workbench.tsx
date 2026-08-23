'use client'

import {
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  FileText,
  ListFilter,
  MessageSquareQuote,
  RotateCcw,
  ScanLine,
  Settings2,
  SlidersHorizontal,
  Smile,
  Sparkles,
} from 'lucide-react'
import { cn } from '../../../../lib/utils'
import type { CleanerWorkbenchProps } from '../../../../contracts/sections/cleaner-workbench'
import { useThemeComponent } from '../../../../context'
import { CleanerOutput } from './output'
import { countWords } from './lib/count-words'

const MODE_ICONS: Record<string, React.ReactNode> = {
  humanize: <Smile className="size-4 text-retro-cyan" />,
  simplify: <ListFilter className="size-4 text-retro-cyan" />,
  professional: <FileText className="size-4 text-retro-cyan" />,
  academic: <MessageSquareQuote className="size-4 text-retro-cyan" />,
  marketing: <Sparkles className="size-4 text-retro-cyan" />,
  grammar: <Check className="size-4 text-retro-cyan" />,
}

const TONE_ICON = <Smile className="size-4 text-retro-cyan" />
const LENGTH_ICON = <Settings2 className="size-4 text-retro-cyan" />

/**
 * Pixel cleaner workbench — the full tool UI. Stateless: all state, actions,
 * and labels are injected as props by the app (which owns the business logic
 * via useCleanerController + next-intl). This component only assembles the
 * visual chrome from registered primitives + the CleanerOutput section.
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

  const Box = useThemeComponent('Box')
  const Badge = useThemeComponent('Badge')
  const Button = useThemeComponent('Button')
  const Cluster = useThemeComponent('Cluster')
  const Divider = useThemeComponent('Divider')
  const Grid = useThemeComponent('Grid')
  const Stack = useThemeComponent('Stack')
  const Select = useThemeComponent('Select')
  const Toggle = useThemeComponent('Toggle')
  const ToggleGroup = useThemeComponent('ToggleGroup')
  const BareTextarea = useThemeComponent('BareTextarea')

  const handleInputChange = (value: string) => onInputChange(value)

  if (fullscreen) {
    return (
      <section
        id="cleaner"
        className="flex w-full flex-col min-h-[calc(100svh-3.5rem)] lg:h-[calc(100svh-5rem)] lg:min-h-0"
        data-compact={compact}
      >
        <Box
          variant="solid"
          tone="neutral"
          padding="none"
          radius="none"
          border={false}
          shadow={false}
          className="relative min-h-0 w-full flex-1 overflow-hidden"
        >
          <Stack direction="col" gap={3} className="h-full min-h-0 px-4 py-4 sm:px-5 md:px-6 lg:px-8 lg:pb-10">
            {/* WORKBENCH TOOLBAR: mode pills + actions */}
            <Box
              variant="soft"
              tone="neutral"
              padding="sm"
              radius="sm"
              border
              shadow
              className="flex flex-wrap items-center justify-between gap-2"
            >
              <Cluster gap={2} className="min-w-0 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">
                  {t('mode_label')}
                </span>
                <ToggleGroup
                  type="single"
                  value={mode}
                  onChange={(value) => onModeChange(value as typeof mode)}
                  size="sm"
                  variant="outline"
                  className="flex-wrap"
                  aria-label={t('mode_label')}
                >
                  {modeOptions.map((opt) => (
                    <Toggle key={opt.value} value={opt.value}>
                      {MODE_ICONS[opt.value]}
                      {opt.label}
                    </Toggle>
                  ))}
                </ToggleGroup>
              </Cluster>

              <Cluster gap={2}>
                <Button
                  type="button"
                  variant="outline"
                  tone="neutral"
                  size="sm"
                  iconLeft={<RotateCcw className="size-4" />}
                  onClick={onClear}
                >
                  {t('clear')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  tone="neutral"
                  size="sm"
                  disabled={!output && outputView !== 'analyze'}
                  iconLeft={copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  onClick={onCopy}
                >
                  {copied ? t('copied') : t('copy')}
                </Button>
                <Button
                  type="button"
                  variant="solid"
                  tone="green"
                  size="sm"
                  disabled={!input.trim() || busy}
                  loading={busy}
                  iconLeft={busy ? undefined : <ScanLine className="size-4" />}
                  onClick={onAnalyze}
                >
                  {t('run_analysis')}
                </Button>
              </Cluster>
            </Box>

            {/* BODY: left options sidebar + right side-by-side panes */}
            <Stack direction="row" gap={4} className="min-h-0 flex-1">
              {/* LEFT: options */}
              <Box
                as="aside"
                variant="soft"
                tone="neutral"
                padding="sm"
                radius="sm"
                border
                shadow
                aria-label={t('options_label')}
                className="w-full shrink-0 scrollbar-hide lg:h-full lg:w-72 lg:min-h-0 lg:overflow-y-auto"
              >
                <Stack direction="col" gap={3} className="h-full">
                  <Cluster gap={2}>
                    <SlidersHorizontal className="size-3.5 text-retro-muted" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">
                      {t('options_label')}
                    </p>
                  </Cluster>

                  {/* Tone */}
                  <Stack direction="col" gap={2}>
                    <p className="text-xs font-medium text-retro-muted">{t('tone_label')}</p>
                    <ToggleGroup
                      type="single"
                      value={tone}
                      onChange={(value) => onToneChange(value as typeof tone)}
                      size="sm"
                      variant="outline"
                      className="flex-wrap"
                    >
                      {toneOptions.map((opt) => (
                        <Toggle key={opt.value} value={opt.value} className="whitespace-nowrap">
                          {tone === opt.value && <Check className="size-3" />}
                          {opt.label}
                        </Toggle>
                      ))}
                    </ToggleGroup>
                  </Stack>
                  <Divider spacing="none" />

                  {/* Length */}
                  <Stack direction="col" gap={2}>
                    <p className="text-xs font-medium text-retro-muted">{t('length_label')}</p>
                    <ToggleGroup
                      type="single"
                      value={length}
                      onChange={(value) => onLengthChange(value as typeof length)}
                      size="sm"
                      variant="outline"
                      className="flex-wrap"
                    >
                      {lengthOptions.map((opt) => (
                        <Toggle key={opt.value} value={opt.value} className="whitespace-nowrap">
                          {length === opt.value && <Check className="size-3" />}
                          {opt.label}
                        </Toggle>
                      ))}
                    </ToggleGroup>
                  </Stack>
                  <Divider spacing="none" />

                  {/* Strength */}
                  <Stack direction="col" gap={2}>
                    <p className="text-xs font-medium text-retro-muted">{t('strength_label')}</p>
                    <ToggleGroup
                      type="single"
                      value={strength}
                      onChange={(value) => onStrengthChange(value as typeof strength)}
                      size="sm"
                      variant="outline"
                      className="flex-wrap"
                    >
                      {strengthOptions.map((opt) => (
                        <Toggle key={opt.value} value={opt.value} className="whitespace-nowrap">
                          {strength === opt.value && <Check className="size-3" />}
                          {opt.label}
                        </Toggle>
                      ))}
                    </ToggleGroup>
                  </Stack>
                  <Divider spacing="none" />

                  {/* Cleaning options */}
                  <Stack direction="col" gap={2} className="flex-1">
                    <p className="text-xs font-medium text-retro-muted">{t('cleaning_options')}</p>
                    <ToggleGroup
                      type="multiple"
                      value={options}
                      onChange={(next) => onOptionsChange(next as typeof options)}
                      size="sm"
                      variant="outline"
                      className="flex-wrap"
                    >
                      {Object.entries(optionLabels).map(([value, label]) => (
                        <Toggle key={value} value={value} className="whitespace-nowrap">
                          {options.includes(value as typeof options[number]) && <Check className="size-3" />}
                          {label}
                        </Toggle>
                      ))}
                    </ToggleGroup>
                  </Stack>
                </Stack>
              </Box>

              {/* RIGHT: input | output */}
              <Grid cols={{ base: 1, lg: 2 }} gap={3} className="min-h-0 flex-1 lg:min-w-0 lg:grid-rows-[minmax(0,1fr)]">
                {/* Input */}
                <Box
                  variant="solid"
                  tone="neutral"
                  padding="sm"
                  radius="md"
                  border
                  shadow
                  className="flex w-full min-w-0 flex-col gap-3 lg:min-h-0"
                >
                  <Cluster justify="between" className="min-w-0">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-retro-text">
                      <span className="inline-block size-1.5 bg-retro-green" />
                      {t('input_label')}
                    </span>
                    <Cluster gap={2} className="min-w-0">
                      <Badge tone="green" size="sm">
                        <span className="relative inline-flex size-1.5">
                          <span className="bg-retro-green absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                          <span className="bg-retro-green relative inline-flex size-1.5 rounded-full" />
                        </span>
                        {t('auto_convert')}
                      </Badge>
                      <span className="shrink-0 text-xs tabular-nums text-retro-muted">
                        {t('character_count', { count: inputCount })} ·{' '}
                        {t('word_count', { count: countWords(input) })}
                      </span>
                    </Cluster>
                  </Cluster>
                  <BareTextarea
                    value={input}
                    maxLength={6000}
                    onChange={(event) => {
                      handleInputChange(event.target.value)
                    }}
                    placeholder={t('input_placeholder')}
                    className="min-h-48 sm:min-h-72 lg:min-h-0 min-w-0 flex-1 resize-none bg-transparent p-0 font-mono text-base leading-relaxed text-retro-text placeholder:text-retro-muted/50 focus:ring-0"
                  />
                </Box>

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
              </Grid>
            </Stack>

            {/* Footer note */}
            <p className="absolute bottom-2 left-8 font-mono text-[10px] leading-none text-retro-muted/70">
              {error
                ? error
                : fallbackNotice
                  ? t('fallback_notice')
                  : t('security_note')}
            </p>
          </Stack>
        </Box>
      </section>
    )
  }

  return (
    <section
      id={section.id || 'cleaner'}
      className={cn(
        'relative bg-background',
        compact ? 'h-full' : 'py-8 md:py-12',
        section.className,
        className
      )}
      data-compact={compact}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 scanlines" aria-hidden="true" />

      <div className={cn('relative mx-auto w-full px-4 md:px-8', wide ? 'max-w-7xl' : 'max-w-6xl')}>
        <Box variant="solid" tone="neutral" radius="md" padding="none" border shadow className="w-full overflow-hidden">
          <Stack direction="col" gap={4} className="bg-retro-surface/20 p-3 sm:p-5 md:p-8">
            {/* Top controls */}
            <Grid cols={{ base: 1, md: 3 }} gap={3} className="w-full">
              <Box variant="soft" tone="neutral" radius="sm" padding="sm" className="flex items-center gap-3">
                <div>{MODE_ICONS[mode]}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-retro-muted">{t('mode_label')}</p>
                  <Select
                    value={mode}
                    onChange={(value) => onModeChange(value as typeof mode)}
                    options={modeOptions}
                    size="sm"
                    tone="neutral"
                  />
                </div>
              </Box>
              <Box variant="soft" tone="neutral" radius="sm" padding="sm" className="flex items-center gap-3">
                <div>{TONE_ICON}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-retro-muted">{t('tone_label')}</p>
                  <Select
                    value={tone}
                    onChange={(value) => onToneChange(value as typeof tone)}
                    options={toneOptions}
                    size="sm"
                    tone="neutral"
                  />
                </div>
              </Box>
              <Box variant="soft" tone="neutral" radius="sm" padding="sm" className="flex items-center gap-3">
                <div>{LENGTH_ICON}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-retro-muted">{t('length_label')}</p>
                  <Select
                    value={length}
                    onChange={(value) => onLengthChange(value as typeof length)}
                    options={lengthOptions}
                    size="sm"
                    tone="neutral"
                  />
                </div>
              </Box>
            </Grid>

            {/* Editor: input | arrow | output */}
            <div className="grid w-full gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4">
              <Box variant="solid" tone="neutral" radius="md" padding="sm" border shadow className="flex w-full min-w-0 flex-col gap-3">
                <Cluster justify="between" className="min-w-0">
                  <span className="text-sm font-semibold text-retro-text">{t('input_label')}</span>
                  <span className="shrink-0 text-xs tabular-nums text-retro-muted">
                    {t('character_count', { count: inputCount })} ·{' '}
                    {t('word_count', { count: countWords(input) })}
                  </span>
                </Cluster>
                <BareTextarea
                  value={input}
                  maxLength={6000}
                  onChange={(event) => handleInputChange(event.target.value)}
                  placeholder={t('input_placeholder')}
                  className={cn(
                    'min-w-0 flex-1 resize-none bg-transparent p-0 font-mono text-base leading-relaxed text-retro-text placeholder:text-retro-muted/50 focus:ring-0',
                    compact ? 'min-h-32' : 'min-h-48 sm:min-h-72'
                  )}
                />
              </Box>

              <Cluster justify="center" className="py-1 md:px-1 md:py-0">
                <Button
                  type="button"
                  variant="solid"
                  tone="green"
                  size="md"
                  onClick={onAnalyze}
                  disabled={!input.trim() || busy}
                  loading={busy}
                  iconLeft={busy ? undefined : <ArrowRight className="size-5" />}
                  aria-label={t('run_analysis')}
                />
              </Cluster>

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
            <Box variant="solid" tone="neutral" radius="md" padding="sm" border shadow className="flex w-full flex-col gap-4">
              <Cluster justify="between" className="flex-wrap">
                <Button
                  type="button"
                  variant="ghost"
                  tone="neutral"
                  size="sm"
                  iconLeft={<Settings2 className="size-4 text-retro-cyan" />}
                  iconRight={
                    <ChevronDown
                      className={cn('size-4 transition-transform', showAdvancedOptions && 'rotate-180')}
                    />
                  }
                  onClick={onToggleAdvancedOptions}
                >
                  {t('advanced_options')}
                </Button>

                <Cluster gap={2}>
                  <Button type="button" variant="outline" tone="neutral" size="sm" iconLeft={<RotateCcw className="size-4" />} onClick={onClear}>
                    {t('clear')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    tone="neutral"
                    size="sm"
                    disabled={!output && outputView !== 'analyze'}
                    iconLeft={copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    onClick={onCopy}
                  >
                    {copied ? t('copied') : t('copy')}
                  </Button>
                </Cluster>
              </Cluster>

              {showAdvancedOptions && (
                <Box variant="soft" tone="neutral" radius="md" padding="sm" className="grid w-full gap-4">
                  <Stack direction="col" gap={2}>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">{t('strength_label')}</p>
                    <ToggleGroup
                      type="single"
                      value={strength}
                      onChange={(value) => onStrengthChange(value as typeof strength)}
                      size="sm"
                      variant="outline"
                      className="flex-wrap"
                    >
                      {strengthOptions.map((opt) => (
                        <Toggle key={opt.value} value={opt.value}>
                          {strength === opt.value && <Check className="size-3" />}
                          {opt.label}
                        </Toggle>
                      ))}
                    </ToggleGroup>
                  </Stack>
                  <Stack direction="col" gap={2}>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-retro-muted">{t('options_label')}</p>
                    <ToggleGroup
                      type="multiple"
                      value={options}
                      onChange={(next) => onOptionsChange(next as typeof options)}
                      size="sm"
                      variant="outline"
                      className="flex-wrap"
                    >
                      {Object.entries(optionLabels).map(([value, label]) => (
                        <Toggle key={value} value={value} className="whitespace-nowrap">
                          {options.includes(value as typeof options[number]) && <Check className="size-3" />}
                          {label}
                        </Toggle>
                      ))}
                    </ToggleGroup>
                  </Stack>
                </Box>
              )}
            </Box>

            <p className="text-center font-mono text-xs text-retro-muted">
              {error ? error : fallbackNotice ? t('fallback_notice') : t('security_note')}
            </p>
          </Stack>
        </Box>
      </div>
    </section>
  )
}
