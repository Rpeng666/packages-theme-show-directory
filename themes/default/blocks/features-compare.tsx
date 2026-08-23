'use client';

import { resolveSection } from '@template/ui';
import type { FeaturesCompareProps } from '@template/ui';

/** Default features-compare block — forwarder to the registered FeaturesCompare section. */
export function FeaturesCompare(props: FeaturesCompareProps) {
  const Comp = resolveSection('FeaturesCompare');
  return <Comp {...props} />;
}