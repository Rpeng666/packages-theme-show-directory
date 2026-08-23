'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbElementsPanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbElementsPanel(props: any) {
  const Comp = resolveSection('WbElementsPanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
