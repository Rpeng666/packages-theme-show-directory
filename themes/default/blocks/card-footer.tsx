'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default CardFooter block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CardFooter(props: any) {
  const Comp = resolveComponent('CardFooter' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
