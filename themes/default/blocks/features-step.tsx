'use client';

import { resolveSection } from '@template/ui';
import type { FeaturesStepProps } from '@template/ui';

/** Default features-step block — forwarder to the registered FeaturesStep section. */
export function FeaturesStep(props: FeaturesStepProps) {
  const Comp = resolveSection('FeaturesStep');
  return <Comp {...props} />;
}