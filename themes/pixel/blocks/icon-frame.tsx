'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel IconFrame block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function IconFrame(props: any) {
  const Comp = resolveComponent('IconFrame' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
