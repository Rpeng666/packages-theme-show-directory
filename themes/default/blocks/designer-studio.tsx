'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default DesignerStudio block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function DesignerStudio(props: any) {
  const Comp = resolveSection('DesignerStudio' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
