'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerAppLanding block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerAppLanding(props: any) {
  const Comp = resolvePerler('PerlerAppLanding' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
