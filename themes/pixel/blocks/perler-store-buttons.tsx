'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerStoreButtons block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerStoreButtons(props: any) {
  const Comp = resolvePerler('PerlerStoreButtons' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
