'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi FeaturesFlow block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FeaturesFlow(props: any) {
  const Comp = resolveSection('FeaturesFlow' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
