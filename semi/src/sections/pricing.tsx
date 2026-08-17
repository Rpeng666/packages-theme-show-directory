'use client'

import * as React from 'react'
import { useState } from 'react'
import { RadioGroup, Radio, Card, Select, Tag, Button as SemiButton, Spin, Typography } from '@douyinfe/semi-ui'
import { IconTick } from '@douyinfe/semi-icons'
import { SmartIcon } from '../icons'
import type { PricingProps } from '@template/ui'
import type { PricingItem } from '@template/ui'

const { Title, Paragraph } = Typography

/**
 * Semi Pricing — pure presentational layer. Business logic (payment, auth,
 * i18n, currency persistence) lives in the app's usePricing hook; this
 * component receives the results as props and renders Semi Cards in a grid.
 * Group selection uses a Semi RadioGroup button, currency uses a Semi Select.
 */
export function Pricing({
  section,
  className = '',
  currentProductId,
  isLoading,
  productId,
  itemCurrencies,
  handleCurrencyChange,
  onPayment,
  paymentModal,
  tCurrentPlan,
  tProcessing,
}: PricingProps) {
  const [group, setGroup] = useState(() => {
    const currentItem = section.items?.find((i) => i.product_id === currentProductId)
    const featuredGroup = section.groups?.find((g) => g.is_featured)
    return currentItem?.group || featuredGroup?.name || section.groups?.[0]?.name
  })

  const getCurrencies = (item: PricingItem) => {
    const base = [
      {
        currency: item.currency,
        amount: item.amount,
        price: item.price || '',
        original_price: item.original_price || '',
      },
    ]
    return item.currencies?.length ? [...base, ...item.currencies] : base
  }

  const visibleItems = section.items?.filter((item) => !item.group || item.group === group) ?? []

  return (
    <section
      id={section.id}
      className={className}
      style={{ padding: '64px 0', background: 'var(--semi-color-bg-0)' }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          {section.sr_only_title ? <h1 className="sr-only">{section.sr_only_title}</h1> : null}
          <Title heading={2} style={{ marginBottom: 12 }}>
            {section.title}
          </Title>
          {section.description ? (
            <Paragraph type="tertiary" style={{ fontSize: 15, lineHeight: 1.7 }}>
              {section.description}
            </Paragraph>
          ) : null}
        </div>

        {section.groups && section.groups.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <RadioGroup
              type="button"
              buttonSize="large"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              {section.groups.map((item, i) => (
                <Radio key={i} value={item.name || ''}>
                  {item.title}
                  {item.label ? (
                    <Tag size="small" color="blue" style={{ marginLeft: 8 }}>
                      {item.label}
                    </Tag>
                  ) : null}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        ) : null}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(visibleItems.length, 3)}, minmax(0, 1fr))`,
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          {visibleItems.map((item: PricingItem, idx) => {
            const isCurrentPlan = currentProductId === item.product_id
            const currencyState = itemCurrencies[item.product_id]
            const displayedItem = currencyState?.displayedItem || item
            const selectedCurrency = currencyState?.selectedCurrency || item.currency
            const currencies = getCurrencies(item)

            return (
              <Card
                key={idx}
                className={item.is_featured ? 'semi-pricing-featured' : ''}
                style={{
                  height: '100%',
                  borderColor: item.is_featured ? 'var(--semi-color-primary)' : undefined,
                }}
                bodyStyle={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}
                shadows="hover"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.title}</h3>
                  {item.label ? <Tag color="violet">{item.label}</Tag> : null}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  {displayedItem.original_price ? (
                    <span style={{ fontSize: 14, color: 'var(--semi-color-text-2)', textDecoration: 'line-through' }}>
                      {displayedItem.original_price}
                    </span>
                  ) : null}
                  <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--semi-color-primary)' }}>
                    {displayedItem.price}
                  </span>
                  {displayedItem.unit ? (
                    <span style={{ fontSize: 13, color: 'var(--semi-color-text-2)' }}>{displayedItem.unit}</span>
                  ) : null}
                  {currencies.length > 1 ? (
                    <Select
                      size="small"
                      value={selectedCurrency}
                      onChange={(value) => handleCurrencyChange(item.product_id, String(value))}
                      optionList={currencies.map((c) => ({ value: c.currency, label: c.currency.toUpperCase(), otherKey: c.currency }))}
                      style={{ width: 72, marginLeft: 'auto' }}
                    />
                  ) : null}
                </div>

                {item.description ? (
                  <Paragraph type="tertiary" style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
                    {item.description}
                  </Paragraph>
                ) : null}
                {item.tip ? (
                  <span style={{ fontSize: 13, color: 'var(--semi-color-text-2)' }}>{item.tip}</span>
                ) : null}

                {isCurrentPlan ? (
                  <SemiButton theme="light" size="large" block disabled>
                    {tCurrentPlan}
                  </SemiButton>
                ) : (
                  <SemiButton
                    theme="solid"
                    size="large"
                    block
                    loading={isLoading && item.product_id === productId}
                    onClick={() => onPayment(item)}
                  >
                    {isLoading && item.product_id === productId ? (
                      tProcessing
                    ) : (
                      <>
                        {item.button?.icon ? <SmartIcon name={item.button.icon as string} size={16} /> : null}
                        {item.button?.title}
                      </>
                    )}
                  </SemiButton>
                )}

                {item.features_title ? (
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{item.features_title}</p>
                ) : null}
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {item.features?.map((feat, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'var(--semi-color-text-1)' }}>
                      <span style={{ color: 'var(--semi-color-success)', display: 'inline-flex', marginTop: 2 }}>
                        <IconTick size="small" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </div>

      {paymentModal}
    </section>
  )
}
