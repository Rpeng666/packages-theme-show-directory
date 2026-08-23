'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi Pricing block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Pricing(props: any) {
  const Comp = resolveSection('Pricing' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
