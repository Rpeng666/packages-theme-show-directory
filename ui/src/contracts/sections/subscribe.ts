import type { Section } from '../../types/landing'

/** 注入的订阅结果通知。package 不依赖 sonner，app 把 sonner 传进来 */
export type SubscribeToast = (type: 'success' | 'error', message?: string) => void

export interface SubscribeProps {
  section: Section
  className?: string
  /** 可选注入：订阅结果 toast。不提供时静默（无 UI 副作用） */
  toast?: SubscribeToast
}
