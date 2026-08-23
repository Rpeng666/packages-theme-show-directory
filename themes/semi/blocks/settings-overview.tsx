'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi SettingsOverview block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function SettingsOverview(props: any) {
  const Comp = resolveSection('SettingsOverview' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
