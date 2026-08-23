'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi ConsoleLayout block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ConsoleLayout(props: any) {
  const Comp = resolveComponent('ConsoleLayout' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
