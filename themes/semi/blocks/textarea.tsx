'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi Textarea block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Textarea(props: any) {
  const Comp = resolveComponent('Textarea' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
