'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel Select block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Select(props: any) {
  const Comp = resolveComponent('Select' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
