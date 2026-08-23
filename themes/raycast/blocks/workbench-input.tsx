'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchInput block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchInput(props: any) {
  const Comp = resolveComponent('WorkbenchInput' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
