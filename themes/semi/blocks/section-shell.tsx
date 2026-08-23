'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi SectionShell block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function SectionShell(props: any) {
  const Comp = resolveSection('SectionShell' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
