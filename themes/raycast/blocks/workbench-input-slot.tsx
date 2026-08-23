'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchInputSlot block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchInputSlot(props: any) {
  const Comp = resolveComponent('WorkbenchInputSlot' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
