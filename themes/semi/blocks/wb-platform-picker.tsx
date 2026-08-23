'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbPlatformPicker block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbPlatformPicker(props: any) {
  const Comp = resolveSection('WbPlatformPicker' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
