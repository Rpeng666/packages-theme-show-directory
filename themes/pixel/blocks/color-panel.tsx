'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel ColorPanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ColorPanel(props: any) {
  const Comp = resolvePerler('ColorPanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
