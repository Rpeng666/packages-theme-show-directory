'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * default TooltipTrigger block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function TooltipTrigger(props: any) {
  const Comp = resolveComponent('TooltipTrigger' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
