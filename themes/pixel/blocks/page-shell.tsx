'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel PageShell block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PageShell(props: any) {
  const Comp = resolveComponent('PageShell' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
