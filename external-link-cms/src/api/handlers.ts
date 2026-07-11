import { ZodError, z } from 'zod';

import type { ExternalLinkService } from '../service';
import type { AuthFn, AuthResult, RateLimitFn } from '../types';
import { EXTERNAL_LINK_PLACEMENTS } from '../types';
import { parseBadgeHtml } from '../badge-html';
import type { ExternalLinkPlacement, ExternalLinkStatus } from '../types';

export interface HandlerConfig {
  model: {
    findById: (id: string) => Promise<any>;
  };
  service: ExternalLinkService;
  auth?: AuthFn;
  rateLimit?: RateLimitFn;
}

function respData(data: any) {
  return Response.json({ code: 0, data });
}

function respErr(message: string, status = 400) {
  return Response.json({ code: -1, message }, { status });
}

function respOk() {
  return Response.json({ code: 0 });
}

function handleError(error: unknown) {
  if (error instanceof ZodError) {
    return respErr(error.issues[0]?.message || 'invalid params');
  }
  console.error('external-links api error:', error);
  return respErr(error instanceof Error ? error.message : 'request failed');
}

async function checkAuth(
  auth: AuthFn | undefined,
  request: Request,
  scope?: string
): Promise<Response | null> {
  if (!auth) return null;
  const result: AuthResult = await auth(request, scope);
  if (!result.ok) {
    return Response.json(
      { code: -1, message: result.message },
      { status: result.status }
    );
  }
  return null;
}

function applyRateLimit(
  rateLimit: RateLimitFn | undefined,
  request: Request,
  opts?: { intervalMs?: number; keyPrefix?: string }
): Response | null {
  if (!rateLimit) return null;
  return rateLimit(request, opts);
}

const createSchema = z.object({
  placement: z.enum(EXTERNAL_LINK_PLACEMENTS),
  targetUrl: z.string().url('Invalid target URL').optional(),
  anchorText: z.string().max(200).optional(),
  status: z.enum(['active', 'paused']).optional(),
  badgeUrl: z.string().url('Invalid badge URL').optional().or(z.literal('')),
  badgeAlt: z.string().max(200).optional(),
  badgeWidth: z.number().int().positive().optional(),
  badgeHeight: z.number().int().positive().optional(),
  badgeHtml: z.string().optional(),
  reciprocalUrl: z.string().url('Invalid reciprocal URL').optional().or(z.literal('')),
});

const updateSchema = z.object({
  placement: z.enum(EXTERNAL_LINK_PLACEMENTS).optional(),
  targetUrl: z.string().url('Invalid target URL').optional(),
  anchorText: z.string().max(200).optional(),
  status: z.enum(['active', 'paused']).optional(),
  badgeUrl: z.string().url('Invalid badge URL').optional().or(z.literal('')),
  badgeAlt: z.string().max(200).optional(),
  badgeWidth: z.number().int().positive().optional(),
  badgeHeight: z.number().int().positive().optional(),
  badgeHtml: z.string().optional(),
  reciprocalUrl: z.string().url('Invalid reciprocal URL').optional().or(z.literal('')),
});

const idSchema = z.object({
  id: z.string().uuid('Invalid link id'),
});

export function createLinkHandlers(config: HandlerConfig) {
  const { model, service, auth, rateLimit } = config;

  async function create(request: Request): Promise<Response> {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 500, keyPrefix: 'external-links' });
    if (rl) return rl;

    try {
      const authErr = await checkAuth(auth, request, 'external_links:write');
      if (authErr) return authErr;

      const body = await request.json();
      const parsed = createSchema.parse(body);

      let merged: any = { ...parsed };
      if (parsed.badgeHtml) {
        const parsedBadge = parseBadgeHtml(parsed.badgeHtml);
        merged = {
          placement: parsed.placement,
          targetUrl: parsed.targetUrl || parsedBadge.targetUrl,
          anchorText: parsed.anchorText || parsedBadge.anchorText,
          status: parsed.status,
          badgeUrl: parsed.badgeUrl || parsedBadge.badgeUrl,
          badgeAlt: parsed.badgeAlt || parsedBadge.badgeAlt,
          badgeWidth: parsed.badgeWidth || parsedBadge.badgeWidth,
          badgeHeight: parsed.badgeHeight || parsedBadge.badgeHeight,
          badgeHtml: parsed.badgeHtml,
          reciprocalUrl: parsed.reciprocalUrl,
        };
      }
      if (!merged.targetUrl) {
        return respErr('targetUrl is required');
      }

      const link = await service.create(merged);
      return respData({
        id: link.id,
        placement: link.placement,
        targetUrl: link.targetUrl,
        anchorText: link.anchorText,
        status: link.status,
        createdAt: link.createdAt,
      });
    } catch (error) {
      return handleError(error);
    }
  }

  async function list(request: Request): Promise<Response> {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 500, keyPrefix: 'external-links' });
    if (rl) return rl;

    try {
      const authErr = await checkAuth(auth, request, 'external_links:write');
      if (authErr) return authErr;

      const links = await service.findAll();
      return respData(links);
    } catch (error) {
      return handleError(error);
    }
  }

  async function update(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<Response> {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 500, keyPrefix: 'external-links' });
    if (rl) return rl;

    try {
      const authErr = await checkAuth(auth, request, 'external_links:write');
      if (authErr) return authErr;

      const { id } = idSchema.parse(await params);
      const body = await request.json();
      const parsed = updateSchema.parse(body);

      const existing = await model.findById(id);
      if (!existing) {
        return respErr('Link not found', 404);
      }

      let merged: any = { ...parsed };
      if (parsed.badgeHtml) {
        const parsedBadge = parseBadgeHtml(parsed.badgeHtml);
        merged = {
          placement: parsed.placement,
          targetUrl: parsed.targetUrl || parsedBadge.targetUrl,
          anchorText: parsed.anchorText || parsedBadge.anchorText,
          status: parsed.status,
          badgeUrl: parsed.badgeUrl || parsedBadge.badgeUrl,
          badgeAlt: parsed.badgeAlt || parsedBadge.badgeAlt,
          badgeWidth: parsed.badgeWidth || parsedBadge.badgeWidth,
          badgeHeight: parsed.badgeHeight || parsedBadge.badgeHeight,
          badgeHtml: parsed.badgeHtml,
          reciprocalUrl: parsed.reciprocalUrl,
        };
      }

      const updated = await service.update(id, merged);
      if (!updated) {
        return respErr('Failed to update link');
      }

      return respData({
        id: updated.id,
        placement: updated.placement,
        targetUrl: updated.targetUrl,
        anchorText: updated.anchorText,
        status: updated.status,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      });
    } catch (error) {
      return handleError(error);
    }
  }

  async function remove(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<Response> {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 500, keyPrefix: 'external-links' });
    if (rl) return rl;

    try {
      const authErr = await checkAuth(auth, request, 'external_links:write');
      if (authErr) return authErr;

      const { id } = idSchema.parse(await params);

      const existing = await model.findById(id);
      if (!existing) {
        return respErr('Link not found', 404);
      }

      await service.remove(id);
      return respOk();
    } catch (error) {
      return handleError(error);
    }
  }

  async function checkReciprocal(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<Response> {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 1000, keyPrefix: 'external-links-check' });
    if (rl) return rl;

    try {
      const authErr = await checkAuth(auth, request, 'external_links:write');
      if (authErr) return authErr;

      const { id } = idSchema.parse(await params);

      const link = await service.findById(id);
      if (!link) {
        return respErr('Link not found', 404);
      }

      const result = await service.checkReciprocal(link);

      return respData({
        id: link.id,
        reciprocalStatus: result.status,
        linkRel: result.rel,
        lastCheckedAt: new Date().toISOString(),
      });
    } catch (error) {
      return handleError(error);
    }
  }

  return { create, list, update, delete: remove, checkReciprocal };
}
