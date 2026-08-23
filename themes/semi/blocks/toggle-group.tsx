'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi ToggleGroup block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ToggleGroup(props: any) {
  const Comp = resolveComponent('ToggleGroup' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
