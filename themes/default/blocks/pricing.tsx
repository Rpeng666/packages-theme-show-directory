'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';
import type { PricingProps } from '@template/ui';

/**
 * Default pricing block — forwarder to the registered Pricing section.
 * The registry implementation is presentational; this demo block injects
 * no-op handlers so the section renders without an app payment layer.
 */
export function Pricing({ section, className, ...rest }: PricingProps) {
  const Comp = resolveSection('Pricing');
  const demoProps: Partial<PricingProps> = {
    isLoading: false,
    productId: null,
    itemCurrencies: {},
    handleCurrencyChange: () => {},
    onPayment: () => {},
    paymentModal: null,
    tCurrentPlan: 'Current plan',
    tProcessing: 'Processing…',
  };
  return <Comp section={section} className={className} {...demoProps} {...rest} />;
}