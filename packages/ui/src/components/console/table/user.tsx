'use client';

import { ConsoleLink } from '../bridge';
import moment from 'moment';


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/avatar';
import { cn } from '../../../lib/utils';
/** Structural user shape for the user cell (host User models satisfy this). */
type UserType = {
  name?: string;
  email?: string;
  image?: string;
};

export function User({
  value,
  placeholder,
  metadata,
  className,
}: {
  value: UserType;
  placeholder?: string;
  metadata?: Record<string, any>;
  className?: string;
}) {
  if (!value) {
    if (placeholder) {
      return <div className={className}>{placeholder}</div>;
    }

    return null;
  }

  return (
    <ConsoleLink
      href={`/admin/users?email=${value.email}`}
      target="_blank"
      className={cn('flex items-center gap-2', className)}
    >
      <Avatar className={className}>
        <AvatarImage src={value.image || ''} alt={value.name} />
        <AvatarFallback>{value.name?.charAt(0) || 'U'}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">{value.name}</div>
    </ConsoleLink>
  );
}
