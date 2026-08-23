'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default Faq block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Faq(props: any) {
  const Comp = resolveSection('Faq' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
