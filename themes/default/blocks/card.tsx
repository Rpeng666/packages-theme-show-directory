'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default Card block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Card(props: any) {
  const Comp = resolveComponent('Card' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
