'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default FeaturesGrid block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FeaturesGrid(props: any) {
  const Comp = resolveSection('FeaturesGrid' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
