'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi Image block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Image(props: any) {
  const Comp = resolveComponent('Image' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
