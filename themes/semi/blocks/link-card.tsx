'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi LinkCard block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function LinkCard(props: any) {
  const Comp = resolveSection('LinkCard' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
