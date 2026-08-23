'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel FocusCanvas block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FocusCanvas(props: any) {
  const Comp = resolvePerler('FocusCanvas' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
