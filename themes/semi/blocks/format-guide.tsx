'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi FormatGuide block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FormatGuide(props: any) {
  const Comp = resolveSection('FormatGuide' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
