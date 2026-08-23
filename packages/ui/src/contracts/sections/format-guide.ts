/**
 * FormatGuide — a "format deep-dive" block: the use case, best practices list
 * and the mistake creators most often make. Used by the image-size guide pages
 * (one block per format on the platform page, and on each format detail page).
 */
export interface FormatGuideProps {
  /** Format name (e.g. "Square Post") */
  name?: string
  /** Exact dimensions, e.g. "1080 × 1080 px" */
  dimensions?: string
  useCase?: string
  bestPractices?: string[]
  commonMistake?: string
  className?: string
}
