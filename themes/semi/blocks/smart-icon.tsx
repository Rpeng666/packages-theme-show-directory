'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi SmartIcon block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function SmartIcon(props: any) {
  const Comp = resolveComponent('SmartIcon' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
