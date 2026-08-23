'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi PreviewConsole block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PreviewConsole(props: any) {
  const Comp = resolveComponent('PreviewConsole' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
