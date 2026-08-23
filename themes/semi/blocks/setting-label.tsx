'use client';

import * as React from 'react';
import { resolveSection } from '@template/ui';

/**
 * semi SettingLabel block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function SettingLabel(props: any) {
  const Comp = resolveSection('SettingLabel' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
