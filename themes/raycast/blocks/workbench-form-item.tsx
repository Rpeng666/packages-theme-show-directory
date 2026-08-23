'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchFormItem block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchFormItem(props: any) {
  const Comp = resolveComponent('WorkbenchFormItem' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
