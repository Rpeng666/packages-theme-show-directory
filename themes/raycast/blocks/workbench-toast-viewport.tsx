'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchToastViewport block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchToastViewport(props: any) {
  const Comp = resolveComponent('WorkbenchToastViewport' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
