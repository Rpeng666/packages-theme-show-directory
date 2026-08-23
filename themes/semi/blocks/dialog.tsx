'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi Dialog block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Dialog(props: any) {
  const Comp = resolveComponent('Dialog' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
