'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel ShareModal block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ShareModal(props: any) {
  const Comp = resolvePerler('ShareModal' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
