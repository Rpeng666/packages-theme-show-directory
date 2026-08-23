'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchControlItem block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchControlItem(props: any) {
  const Comp = resolveComponent('WorkbenchControlItem' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
