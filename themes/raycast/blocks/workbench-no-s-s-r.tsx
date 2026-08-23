'use client';

import * as React from 'react';
import { resolveComponent } from '@template/ui';

/**
 * raycast WorkbenchNoSSR block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WorkbenchNoSSR(props: any) {
  const Comp = resolveComponent('WorkbenchNoSSR' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
