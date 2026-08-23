'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi Tabs block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Tabs(props: any) {
  const Comp = resolveComponent('Tabs' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
