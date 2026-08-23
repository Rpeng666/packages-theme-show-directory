'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi SectionHeader block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function SectionHeader(props: any) {
  const Comp = resolveSection('SectionHeader' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
