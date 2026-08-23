'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi SectionEyebrow block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function SectionEyebrow(props: any) {
  const Comp = resolveSection('SectionEyebrow' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
