import type { ReactNode } from 'react'

/**
 * ChatWorkbench - the AI chat workbench (new-chat landing + active thread).
 * Registered as a section so each theme renders its own chat chrome while the
 * streaming message list and composer stay app-provided slots (they bind to
 * the AI SDK stream state).
 *
 * Designed as a calm, focused conversation surface: a gradient hero with
 * prompt suggestion chips for the empty state, and a glass header + composer
 * dock for an active conversation.
 */
export interface ChatSuggestionChip {
  /** Stable key for onSuggestionClick routing */
  key: string
  /** Chip title (the prompt itself) */
  title: string
  /** One-line helper under the title */
  description?: string
  /** SmartIcon name (e.g. "Sparkles", "Code", "Globe") */
  icon?: string
  /** Accent tone for the icon chip */
  tone?: 'blue' | 'purple' | 'green' | 'gold' | 'red' | 'neutral'
}

export interface ChatWorkbenchProps {
  /** 'empty' renders the new-chat hero; 'conversation' renders the thread chrome */
  mode?: 'empty' | 'conversation'
  // --- empty state ---
  /** Small brand eyebrow (e.g. "AI 聊天助手") */
  eyebrow?: string
  /** Big hero headline */
  title?: ReactNode
  /** Hero subtitle */
  subtitle?: string
  /** Prompt suggestion chips under the hero */
  suggestions?: ChatSuggestionChip[]
  /** Called when a suggestion chip is clicked */
  onSuggestionClick?: (key: string) => void
  // --- conversation header ---
  /** Chat title shown in the sticky header */
  chatTitle?: string
  /** Live status label (e.g. "Thinking…") */
  chatStatus?: string
  /** Model badge label */
  modelLabel?: string
  /** URL for the back control (chat history) */
  headerBackUrl?: string
  /** Extra header actions (right side) */
  headerActions?: ReactNode
  // --- slots ---
  /** Streaming message list (app-provided) */
  messages?: ReactNode
  /** Prompt composer (app-provided) */
  composer?: ReactNode
  /** Small hint under the composer */
  footerHint?: ReactNode
  className?: string
}
