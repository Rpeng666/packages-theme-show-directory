'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * semi CopyText block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function CopyText(props: any) {
  const Comp = resolveComponent('CopyText' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
