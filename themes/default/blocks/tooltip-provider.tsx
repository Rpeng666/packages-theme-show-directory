'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default TooltipProvider block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function TooltipProvider(props: any) {
  const Comp = resolveComponent('TooltipProvider' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
