'use client';

import * as React from 'react';
import { resolveDither } from '@template/ui';

/**
 * pixel DitherSettingsPanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function DitherSettingsPanel(props: any) {
  const Comp = resolveDither('DitherSettingsPanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
