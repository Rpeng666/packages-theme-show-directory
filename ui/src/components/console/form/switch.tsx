'use client';

import * as React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { Switch as SwitchComponent } from '../../../themes/default/switch';
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
  return (
    <>
      <SwitchComponent
        checked={Boolean(formField.value)}
        onCheckedChange={formField.onChange}
      />
    </>
  );
}
