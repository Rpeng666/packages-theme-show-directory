'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default Steps block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Steps(props: any) {
  const Comp = resolveComponent('Steps' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
