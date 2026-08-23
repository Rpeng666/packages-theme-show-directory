'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi ColorPicker block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ColorPicker(props: any) {
  const Comp = resolveComponent('ColorPicker' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
