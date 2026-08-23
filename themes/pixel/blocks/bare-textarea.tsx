'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel BareTextarea block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function BareTextarea(props: any) {
  const Comp = resolveComponent('BareTextarea' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
