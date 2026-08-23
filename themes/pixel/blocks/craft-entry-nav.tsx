'use client';

import * as React from 'react';
import { resolveLightDemo } from '@template/ui';

/**
 * pixel CraftEntryNav block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CraftEntryNav(props: any) {
  const Comp = resolveLightDemo('CraftEntryNav' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
