'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi Workbench block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Workbench(props: any) {
  const Comp = resolveSection('Workbench' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
