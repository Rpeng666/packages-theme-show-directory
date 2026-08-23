import type { ReactNode } from 'react'
import type { Pricing, PricingItem } from '../../types/pricing'

/**
 * Pricing section contract — business logic (payment/auth/i18n) is injected,
 * the component only renders. The app's pricing block composes `usePricing`
 * (app-side hook) and passes the results through these props.
 */
export interface PricingProps {
  section: Pricing
  className?: string
  /** 当前订阅（app 注入，section.data.currentSubscription）——窄型，只用 productId 高亮/初始化 */
  currentSubscription?: { productId?: string } | null
  /** 当前订阅的 productId（窄型，只用于高亮 + 初始化分组） */
  currentProductId?: string
  /** checkout 按钮加载态 */
  isLoading: boolean
  /** 当前正在 checkout 的 product_id（控制哪个按钮显示 loading） */
  productId: string | null
  /** 每 item 的货币选择 + 对应展示 item（货币 Select 渲染用） */
  itemCurrencies: Record<
    string,
    { selectedCurrency: string; displayedItem: PricingItem }
  >
  /** 货币切换回调（货币 Select 渲染用） */
  handleCurrencyChange: (productId: string, currency: string) => void
  /** 点击购买按钮触发（鉴权 + 打开 modal 或直接 checkout） */
  onPayment: (item: PricingItem) => void
  /** 注入 PaymentModal（ReactNode，已绑定 pricingItem/onCheckout，组件只放位置） */
  paymentModal: ReactNode
  /** 文案注入 — 当前计划 */
  tCurrentPlan: string
  /** 文案注入 — 处理中 */
  tProcessing: string
}
