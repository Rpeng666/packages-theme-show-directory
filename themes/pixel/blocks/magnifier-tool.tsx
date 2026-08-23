'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel MagnifierTool block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function MagnifierTool(props: any) {
  const Comp = resolvePerler('MagnifierTool' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
