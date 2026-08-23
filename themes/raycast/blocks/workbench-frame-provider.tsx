'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchFrameProvider block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchFrameProvider(props: any) {
  const Comp = resolveComponent('WorkbenchFrameProvider' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
