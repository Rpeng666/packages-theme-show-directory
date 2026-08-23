'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default Showcases block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Showcases(props: any) {
  const Comp = resolveSection('Showcases' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
