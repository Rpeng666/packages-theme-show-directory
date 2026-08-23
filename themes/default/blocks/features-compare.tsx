'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default FeaturesCompare block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FeaturesCompare(props: any) {
  const Comp = resolveSection('FeaturesCompare' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
