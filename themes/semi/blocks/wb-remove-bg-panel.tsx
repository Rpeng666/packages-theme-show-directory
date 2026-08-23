'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbRemoveBgPanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbRemoveBgPanel(props: any) {
  const Comp = resolveSection('WbRemoveBgPanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
