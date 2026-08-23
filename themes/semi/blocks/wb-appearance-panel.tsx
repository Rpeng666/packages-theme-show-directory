'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbAppearancePanel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbAppearancePanel(props: any) {
  const Comp = resolveSection('WbAppearancePanel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
