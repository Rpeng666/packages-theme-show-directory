'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default CardTitle block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CardTitle(props: any) {
  const Comp = resolveComponent('CardTitle' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
