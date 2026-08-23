'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchFrameContext block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchFrameContext(props: any) {
  const Comp = resolveComponent('WorkbenchFrameContext' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
