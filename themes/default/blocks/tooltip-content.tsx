'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default TooltipContent block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function TooltipContent(props: any) {
  const Comp = resolveComponent('TooltipContent' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
