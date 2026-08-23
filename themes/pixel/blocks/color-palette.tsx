'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel ColorPalette block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ColorPalette(props: any) {
  const Comp = resolvePerler('ColorPalette' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
