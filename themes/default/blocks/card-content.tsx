'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default CardContent block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CardContent(props: any) {
  const Comp = resolveComponent('CardContent' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
