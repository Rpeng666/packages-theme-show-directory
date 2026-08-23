'use client';

import * as React from 'react';
import { resolveEditor } from '@template/ui';

/**
 * pixel PresetGrid block — forwarder. Resolves the registered section/component
 * through the registry and forwards props. No hand-rolled markup.
 */
export function PresetGrid(props: any) {
  const Comp = resolveEditor('PresetGrid' as never) as React.ComponentType<any>;
  return <Comp {...props} />;
}
