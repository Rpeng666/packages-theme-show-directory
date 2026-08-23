'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default CompressWorkbench block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CompressWorkbench(props: any) {
  const Comp = resolveSection('CompressWorkbench' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
