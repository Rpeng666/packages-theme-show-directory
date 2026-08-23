'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel Badge block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Badge(props: any) {
  const Comp = resolveComponent('Badge' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
