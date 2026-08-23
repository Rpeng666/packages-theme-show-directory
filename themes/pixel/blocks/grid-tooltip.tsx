'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel GridTooltip block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function GridTooltip(props: any) {
  const Comp = resolvePerler('GridTooltip' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
