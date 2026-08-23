'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi List block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function List(props: any) {
  const Comp = resolveComponent('List' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
