'use client';

import * as React from 'react';
import { resolvePerler } from '@template/ui';

/**
 * pixel DonationModal block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function DonationModal(props: any) {
  const Comp = resolvePerler('DonationModal' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
