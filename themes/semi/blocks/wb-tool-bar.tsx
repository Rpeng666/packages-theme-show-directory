'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbToolBar block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbToolBar(props: any) {
  const Comp = resolveSection('WbToolBar' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
