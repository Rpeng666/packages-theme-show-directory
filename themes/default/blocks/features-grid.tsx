'use client';

import { resolveSection } from '@template/ui';
import type { FeaturesGridProps } from '@template/ui';

/** Default features-grid block — forwarder to the registered FeaturesGrid section. */
export function FeaturesGrid(props: FeaturesGridProps) {
  const Comp = resolveSection('FeaturesGrid');
  return <Comp {...props} />;
}