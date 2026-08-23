import type { Section } from "@template/ui";
import * as React from "react";
import { pricingSection } from "../../default/mockdata/pricing";

/** Pixel Pricing demo — same contract as default, but needs demo handlers. */
export const props = {
  section: pricingSection,
  isLoading: false,
  productId: null,
  itemCurrencies: {},
  handleCurrencyChange: () => {},
  onPayment: () => {},
  paymentModal: null,
  tCurrentPlan: "Current plan",
  tProcessing: "Processing…",
};
