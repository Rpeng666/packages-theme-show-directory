'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default Empty block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Empty(props: any) {
  const Comp = resolveComponent('Empty' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
