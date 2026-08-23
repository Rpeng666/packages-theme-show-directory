'use client';

import * as React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { useThemeComponent } from '../../../context';
import { FormField } from '../../../contracts/features/form';

export function Switch({
  field,
  formField,
  data,
}: {
  field: FormField;
  formField: ControllerRenderProps<Record<string, unknown>, string>;
  data?: any;
}) {
  // Resolve the active theme's Switch (Semi under the semi theme, shadcn
  // under default) so schema-driven forms render the theme-native control.
  const SwitchComponent = useThemeComponent('Switch');

  return (
    <SwitchComponent
      checked={Boolean(formField.value)}
      onCheckedChange={formField.onChange}
    />
  );
}