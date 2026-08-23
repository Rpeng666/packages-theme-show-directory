'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi WbOnboardingOverlay block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function WbOnboardingOverlay(props: any) {
  const Comp = resolveSection('WbOnboardingOverlay' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
