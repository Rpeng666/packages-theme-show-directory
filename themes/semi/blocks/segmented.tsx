'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi Segmented block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Segmented(props: any) {
  const Comp = resolveSection('Segmented' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
