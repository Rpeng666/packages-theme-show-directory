'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchColorInput block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchColorInput(props: any) {
  const Comp = resolveComponent('WorkbenchColorInput' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
