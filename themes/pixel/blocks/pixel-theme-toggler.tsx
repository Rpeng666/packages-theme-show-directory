'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * pixel PixelThemeToggler block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PixelThemeToggler(props: any) {
  const Comp = resolveComponent('PixelThemeToggler' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
