'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi ContentHeader block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function ContentHeader(props: any) {
  const Comp = resolveSection('ContentHeader' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
