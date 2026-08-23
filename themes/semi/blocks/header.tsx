'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi Header block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Header(props: any) {
  const Comp = resolveComponent('Header' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
