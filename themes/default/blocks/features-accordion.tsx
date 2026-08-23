'use client';

import { resolveSection } from '@template/ui';
import type { FeaturesAccordionProps } from '@template/ui';

/** Default features-accordion block — forwarder to the registered FeaturesAccordion section. */
export function FeaturesAccordion(props: FeaturesAccordionProps) {
  const Comp = resolveSection('FeaturesAccordion');
  return <Comp {...props} />;
}