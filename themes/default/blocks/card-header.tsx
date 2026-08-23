'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default CardHeader block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CardHeader(props: any) {
  const Comp = resolveComponent('CardHeader' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
