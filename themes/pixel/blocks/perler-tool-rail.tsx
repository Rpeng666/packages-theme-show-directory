'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerToolRail block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerToolRail(props: any) {
  const Comp = resolvePerler('PerlerToolRail' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
