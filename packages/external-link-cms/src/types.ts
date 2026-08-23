export const EXTERNAL_LINK_PLACEMENTS = ['home', 'partner', 'footer', 'all'] as const;
export type ExternalLinkPlacement = (typeof EXTERNAL_LINK_PLACEMENTS)[number];

export const EXTERNAL_LINK_STATUSES = ['active', 'paused'] as const;
export type ExternalLinkStatus = (typeof EXTERNAL_LINK_STATUSES)[number];

export const RECIPROCAL_STATUSES = ['unchecked', 'verified', 'broken'] as const;
export type ReciprocalStatus = (typeof RECIPROCAL_STATUSES)[number];

export const LINK_REL_TYPES = ['dofollow', 'nofollow', 'unknown'] as const;
export type LinkRel = (typeof LINK_REL_TYPES)[number];

export type ExternalLink = {
  id: string;
  placement: ExternalLinkPlacement;
  targetUrl: string;
  anchorText: string | null;
  status: ExternalLinkStatus;
  badgeUrl: string | null;
  badgeAlt: string | null;
  badgeWidth: number | null;
  badgeHeight: number | null;
  badgeHtml: string | null;
  reciprocalUrl: string | null;
  reciprocalStatus: string | null;
  linkRel: string | null;
  lastCheckedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NewExternalLink = {
  id: string;
  placement: ExternalLinkPlacement;
  targetUrl: string;
  anchorText?: string | null;
  status?: ExternalLinkStatus;
  badgeUrl?: string | null;
  badgeAlt?: string | null;
  badgeWidth?: number | null;
  badgeHeight?: number | null;
  badgeHtml?: string | null;
  reciprocalUrl?: string | null;
  reciprocalStatus?: string | null;
  linkRel?: string | null;
  lastCheckedAt?: Date | null;
};

export type UpdateExternalLink = Partial<Omit<NewExternalLink, 'id' | 'createdAt'>>;

export type ServiceConfig = {
  appUrl: string;
  locales: string[];
  defaultLocale: string;
  revalidatePath: (path: string, type?: 'page' | 'layout') => void;
};

export type AuthResult = { ok: true; user?: any } | { ok: false; status: number; message: string };
export type AuthFn = (request: Request, requiredScope?: string) => Promise<AuthResult>;
export type RateLimitFn = (request: Request, opts?: { intervalMs?: number; keyPrefix?: string }) => Response | null;
