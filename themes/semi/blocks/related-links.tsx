'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi RelatedLinks block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function RelatedLinks(props: any) {
  const Comp = resolveSection('RelatedLinks' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
