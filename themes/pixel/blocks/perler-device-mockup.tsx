'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel PerlerDeviceMockup block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PerlerDeviceMockup(props: any) {
  const Comp = resolvePerler('PerlerDeviceMockup' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
