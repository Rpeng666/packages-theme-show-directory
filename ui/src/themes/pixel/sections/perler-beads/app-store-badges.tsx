'use client';

import React from 'react';

import { cn } from '../../../../lib/utils';
import type { PerlerT } from './i18n';
import { appDefaultPerlerT } from './app-landing-i18n';
import type { PerlerAppStoreLinks } from './app-landing';

/**
 * App store download badges — hand-rolled (no pxlkit brand icon exists).
 *
 * Renders two side-by-side `<a>` badges ("Get it on Google Play" / "Download
 * on the App Store") with inline brand SVGs (Apple silhouette + Google Play
 * triangle). Pixel chrome matches the rest of the perler retro system.
 * Links default to `#` when not supplied (app wires real store URLs).
 */

/** Apple logo (Font Awesome free, 0 0 384 512). */
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 384 512"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

/** Google Play triangle (four-color brand mark). */
function GooglePlayLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path
        fill="#00C4FF"
        d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
      />
      <path
        fill="#FF3D00"
        d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"
      />
      <path
        fill="#FFC400"
        d="M425.4 225.8l-100.1-53.1-62.4 62.3 62.4 62.3 100.1-53.1c18.3-10.3 18.3-60.4 0-70.8z"
      />
      <path
        fill="#00F076"
        d="M325.3 278.1L104.6 499.3l280.8-161.2-60.1-60z"
      />
    </svg>
  );
}

export interface PerlerStoreBadgeProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

/** Single store badge — `<a>` with brand icon + label. */
export function PerlerStoreBadge({ href, label, icon, className }: PerlerStoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'pxl-corner-sm inline-flex items-center gap-2.5 border-2 border-retro-border bg-retro-surface/60 px-4 py-2.5 shadow-sm transition-all',
        'hover:-translate-y-0.5 hover:border-retro-green/60 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-retro-green',
        className
      )}
    >
      <span className="text-retro-text">{icon}</span>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-retro-text">
        {label}
      </span>
    </a>
  );
}

export interface PerlerStoreButtonsProps {
  links?: PerlerAppStoreLinks;
  t?: PerlerT;
  className?: string;
}

/** The two parallel store badges (Google Play + App Store). */
export function PerlerStoreButtons({
  links,
  t: tProp,
  className,
}: PerlerStoreButtonsProps) {
  const t = tProp ?? appDefaultPerlerT;
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-3', className)}>
      <PerlerStoreBadge
        href={links?.googlePlay ?? '#'}
        label={t('apGetOnGooglePlay')}
        icon={<GooglePlayLogo className="size-5" />}
      />
      <PerlerStoreBadge
        href={links?.appStore ?? '#'}
        label={t('apDownloadOnAppStore')}
        icon={<AppleLogo className="size-5" />}
      />
    </div>
  );
}
