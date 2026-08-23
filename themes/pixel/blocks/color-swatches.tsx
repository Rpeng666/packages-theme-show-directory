'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel ColorSwatches block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ColorSwatches(props: any) {
  const Comp = resolvePerler('ColorSwatches' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
