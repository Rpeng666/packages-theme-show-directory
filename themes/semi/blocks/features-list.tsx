'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi FeaturesList block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FeaturesList(props: any) {
  const Comp = resolveSection('FeaturesList' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
