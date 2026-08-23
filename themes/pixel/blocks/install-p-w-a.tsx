'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel InstallPWA block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function InstallPWA(props: any) {
  const Comp = resolvePerler('InstallPWA' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
