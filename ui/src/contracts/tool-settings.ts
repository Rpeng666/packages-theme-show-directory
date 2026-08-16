/**
 * ToolSettings contract — a generic tool parameter/settings panel. Renders
 * two numeric inputs (granularity + similarity threshold), quick actions
 * (apply/removeBg/undo), a processing-mode select, a color-system selector and
 * a custom-palette entry button. Owns no state — all values + callbacks are
 * injected by the app. Labels are resolved through an optional `t` translation
 * function (keys below); when omitted the current Chinese defaults are used so
 * the package stays self-contained (behavior preserved).
 *
 * t() keys used: `granularity`, `threshold`, `apply`, `removeBg`, `undo`,
 * `mode`, `modeCartoon`, `modeReal`, `colorSystem`, `managePalette` ({count}),
 * `customPaletteActive`.
 * pixel → PixelToolSettings, default → shadcn-style.
 */
export type TranslationFn = (
  key: string,
  values?: Record<string, string | number>
) => string

/** 像素化处理模式（镜像 app 的 PixelationMode enum） */
export type PixelationMode = 'dominant' | 'average'

/** 色号系统选项（镜像 app 的 colorSystemOptions） */
export interface ColorSystemOption {
  key: string
  name: string
}

export interface ToolSettingsProps {
  granularityInput: string
  onGranularityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  similarityThresholdInput: string
  onSimilarityThresholdInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onConfirmParameters: () => void
  onAutoRemoveBackground: () => void
  onUndoBgRemoval: () => void
  canAutoRemoveBackground: boolean
  canUndoBgRemoval: boolean
  pixelationMode: PixelationMode
  onPixelationModeChange: (mode: PixelationMode) => void
  colorSystemOptions: ColorSystemOption[]
  selectedColorSystem: string
  onColorSystemSelect: (key: string) => void
  onOpenCustomPalette: () => void
  customPaletteCount: number
  isCustomPalette: boolean
  /** 文案翻译（app 用 useTranslations 注入；缺省为中文默认文案） */
  t?: TranslationFn
  className?: string
}
