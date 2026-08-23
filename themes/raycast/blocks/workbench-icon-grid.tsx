'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchIconGrid block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchIconGrid(props: any) {
  const Comp = resolveComponent('WorkbenchIconGrid' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
