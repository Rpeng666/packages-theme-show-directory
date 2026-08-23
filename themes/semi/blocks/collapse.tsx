'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi Collapse block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Collapse(props: any) {
  const Comp = resolveComponent('Collapse' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
