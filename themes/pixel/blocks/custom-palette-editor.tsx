'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel CustomPaletteEditor block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CustomPaletteEditor(props: any) {
  const Comp = resolvePerler('CustomPaletteEditor' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
