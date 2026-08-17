/**
 * Cleaner section display types — shared with the default theme. Single source
 * of truth lives in contracts/sections/cleaner-types.ts; this module re-exports
 * it so existing pixel cluster imports (`./types`) keep working.
 */
export type {
  CleanerAnalyzeResult,
  CleanerDiffPart,
  CleanerIssue,
  CleanerOutputProps,
  CleanerOutputView,
  CleanerSeverity,
  CleanerT,
  ContextMode,
  ContextModeValue,
} from '../../../../contracts/sections/cleaner-types'
