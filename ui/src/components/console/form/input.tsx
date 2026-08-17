'use client';

import { ControllerRenderProps } from 'react-hook-form';

import { Input as InputComponent } from '../../../themes/default/input';
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
  return (
    <InputComponent
      value={formField.value as string}
      onChange={formField.onChange}
      type={field.type || 'text'}
      placeholder={field.placeholder}
      className="bg-background placeholder:text-base-content/50 rounded-md"
      {...field.attributes}
    />
  );
}
