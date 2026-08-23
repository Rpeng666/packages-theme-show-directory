'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbPropertiesPanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbPropertiesPanel(props: any) {
  const Comp = resolveSection('WbPropertiesPanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
