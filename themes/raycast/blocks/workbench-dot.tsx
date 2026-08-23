'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchDot block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchDot(props: any) {
  const Comp = resolveComponent('WorkbenchDot' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
