'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel FloatingToolbar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FloatingToolbar(props: any) {
  const Comp = resolvePerler('FloatingToolbar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
