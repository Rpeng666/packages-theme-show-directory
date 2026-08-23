'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchSwitch block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchSwitch(props: any) {
  const Comp = resolveComponent('WorkbenchSwitch' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
