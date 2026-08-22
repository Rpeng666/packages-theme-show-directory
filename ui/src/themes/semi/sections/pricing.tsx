'use client'

import * as React from 'react'
import { useState } from 'react'
import { RadioGroup, Radio, Select, Button as SemiButton, Tag } from '@douyinfe/semi-ui'
import { IconTick } from '@douyinfe/semi-icons'
import { SmartIcon } from '../icons'
import type { PricingProps } from '@template/ui'
import type { PricingItem } from '@template/ui'
import { CardSurface, SectionHeader, SectionShell } from './shell'

/**
 * Semi Pricing — pure presentational layer. Business logic (payment, auth,
 * i18n, currency persistence) lives in the app's usePricing hook; this
 * component receives the results as props and renders plan cards in a grid.
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
    <SectionShell id={section.id} className={className} padding="md">
      <SectionHeader
        label={section.label}
        title={section.sr_only_title ? undefined : section.title}
        description={section.description}
      />
      {section.sr_only_title ? <h1 className="sr-only">{section.sr_only_title}</h1> : null}

      {section.groups && section.groups.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 44 }}>
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
                  <Tag size="small" color="violet" style={{ marginLeft: 8 }}>
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
            <CardSurface
              key={idx}
              tone={item.is_featured ? 'featured' : 'interactive'}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                padding: 0,
                overflow: 'hidden',
              }}
            >
              {item.is_featured ? (
                <div
                  style={{
                    height: 4,
                    background: 'var(--app-brand-grad)',
                  }}
                />
              ) : null}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 26, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--semi-color-text-0)' }}>
                    {item.title}
                  </h3>
                  {item.label ? (
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        background: 'var(--app-brand-grad)',
                        color: '#fff',
                      }}
                    >
                      {item.label}
                    </span>
                  ) : null}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                  {displayedItem.original_price ? (
                    <span style={{ fontSize: 14, color: 'var(--semi-color-text-3)', textDecoration: 'line-through' }}>
                      {displayedItem.original_price}
                    </span>
                  ) : null}
                  <span
                    className={item.is_featured ? 'app-text-gradient' : undefined}
                    style={{
                      fontSize: 34,
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: item.is_featured ? undefined : 'var(--semi-color-text-0)',
                      lineHeight: 1.1,
                    }}
                  >
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
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--semi-color-text-2)' }}>
                    {item.description}
                  </p>
                ) : null}
                {item.tip ? (
                  <span style={{ fontSize: 12.5, color: 'var(--semi-color-text-3)' }}>{item.tip}</span>
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
                  <p style={{ margin: '8px 0 0', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--semi-color-text-2)' }}>
                    {item.features_title}
                  </p>
                ) : null}
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {item.features?.map((feat, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--semi-color-text-1)' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          width: 20,
                          height: 20,
                          flexShrink: 0,
                          marginTop: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 999,
                          background: 'var(--semi-color-primary-light-default)',
                          color: 'var(--semi-color-primary)',
                        }}
                      >
                        <IconTick size="extra-small" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </CardSurface>
          )
        })}
      </div>

      {paymentModal}
    </SectionShell>
  )
}
