'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * default Testimonials block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function Testimonials(props: any) {
  const Comp = resolveSection('Testimonials' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
