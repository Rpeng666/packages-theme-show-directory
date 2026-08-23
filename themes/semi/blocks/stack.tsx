'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi Stack block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Stack(props: any) {
  const Comp = resolveComponent('Stack' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
