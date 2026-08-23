'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi FeaturesAccordion block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function FeaturesAccordion(props: any) {
  const Comp = resolveSection('FeaturesAccordion' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
