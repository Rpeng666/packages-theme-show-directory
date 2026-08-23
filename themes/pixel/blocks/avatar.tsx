'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel Avatar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Avatar(props: any) {
  const Comp = resolveComponent('Avatar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
