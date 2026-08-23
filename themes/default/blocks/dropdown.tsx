'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default Dropdown block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Dropdown(props: any) {
  const Comp = resolveComponent('Dropdown' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
