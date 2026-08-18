'use client';

import { ControllerRenderProps } from 'react-hook-form';

import { useThemeComponent } from '../../../context';
import { FormField } from '../../../contracts/features/form';

export function Input({
  field,
  formField,
  data,
}: {
  field: FormField;
  formField: ControllerRenderProps<Record<string, unknown>, string>;
  data?: any;
}) {
  // Resolve the active theme's Input (Semi under the semi theme, shadcn
  // under default) so schema-driven forms render the theme-native control.
  const InputComponent = useThemeComponent('Input');

  return (
    <InputComponent
      value={formField.value as string}
      onChange={formField.onChange}
      type={field.type || 'text'}
      placeholder={field.placeholder}
      {...field.attributes}
    />
  );
}