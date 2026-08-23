'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel ColorStatusBar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ColorStatusBar(props: any) {
  const Comp = resolvePerler('ColorStatusBar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
