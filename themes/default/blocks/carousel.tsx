'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default Carousel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Carousel(props: any) {
  const Comp = resolveComponent('Carousel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
