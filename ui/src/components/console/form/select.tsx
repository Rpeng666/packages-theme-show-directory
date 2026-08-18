'use client';

import * as React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { useThemeComponent } from '../../../context';
import { FormField } from '../../../contracts/features/form';

export function Select({
  field,
  formField,
  data,
}: {
  field: FormField;
  formField: ControllerRenderProps<Record<string, unknown>, string>;
  data?: any;
}) {
  // Resolve the active theme's Select (Semi under the semi theme, shadcn
  // under default) so schema-driven forms render the theme-native control.
  const SelectComponent = useThemeComponent('Select');

  return (
    <SelectComponent
      value={formField.value as string}
      onChange={formField.onChange}
      options={(field.options || []).map((option) => ({
        value: option.value,
        label: option.title,
      }))}
      placeholder={field.placeholder}
      disabled={field.attributes?.disabled}
    />
  );
}