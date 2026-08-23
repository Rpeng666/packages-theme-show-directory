import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names — conditional + conflict resolution.
 * Vendored from the app's @/shared/lib/utils so the package is self-contained.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
