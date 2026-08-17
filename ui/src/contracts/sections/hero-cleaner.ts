import type { Section } from '../../types/landing'

export interface HeroCleanerProps {
  section: Section
  className?: string
  /** 可选注入：信任行文案（如 "Free · No signup · 100% private"，app 翻译注入） */
  trustText?: string
}
