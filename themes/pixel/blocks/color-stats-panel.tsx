'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel ColorStatsPanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ColorStatsPanel(props: any) {
  const Comp = resolvePerler('ColorStatsPanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
