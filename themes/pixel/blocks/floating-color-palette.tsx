'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel FloatingColorPalette block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FloatingColorPalette(props: any) {
  const Comp = resolvePerler('FloatingColorPalette' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
