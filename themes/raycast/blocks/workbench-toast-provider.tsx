'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchToastProvider block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchToastProvider(props: any) {
  const Comp = resolveComponent('WorkbenchToastProvider' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
