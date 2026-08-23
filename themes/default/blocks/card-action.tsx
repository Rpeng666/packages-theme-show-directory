'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default CardAction block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CardAction(props: any) {
  const Comp = resolveComponent('CardAction' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
