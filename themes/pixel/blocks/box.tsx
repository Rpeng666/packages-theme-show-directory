'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel Box block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Box(props: any) {
  const Comp = resolveComponent('Box' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
