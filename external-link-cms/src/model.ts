import { and, eq, inArray } from 'drizzle-orm';

import type {
  ExternalLink,
  ExternalLinkPlacement,
  ExternalLinkStatus,
  UpdateExternalLink,
} from './types';
import { getUuid } from './utils';

export interface ModelTable {
  externalLink: any;
}

export function createModel(db: any, table: ModelTable) {
  const { externalLink } = table;

  async function findAll(): Promise<ExternalLink[]> {
    return db().select().from(externalLink).orderBy(externalLink.createdAt);
  }

  async function findById(id: string): Promise<ExternalLink | null> {
    const [result] = await db()
      .select()
      .from(externalLink)
      .where(eq(externalLink.id, id))
      .limit(1);
    return result || null;
  }

  async function findByPlacement(
    placement: ExternalLinkPlacement
  ): Promise<ExternalLink[]> {
    return db()
      .select()
      .from(externalLink)
      .where(
        and(
          eq(externalLink.status, 'active'),
          inArray(externalLink.placement, [placement, 'all'])
        )
      )
      .orderBy(externalLink.createdAt);
  }

  async function findBadgesByPlacement(
    placement: ExternalLinkPlacement
  ): Promise<ExternalLink[]> {
    const links = await findByPlacement(placement);
    return links.filter((l: ExternalLink) => l.badgeUrl || l.badgeHtml);
  }

  async function create(data: {
    placement: ExternalLinkPlacement;
    targetUrl: string;
    anchorText?: string;
    status?: ExternalLinkStatus;
    badgeUrl?: string;
    badgeAlt?: string;
    badgeWidth?: number;
    badgeHeight?: number;
    badgeHtml?: string;
    reciprocalUrl?: string;
  }): Promise<ExternalLink> {
    const [result] = await db()
      .insert(externalLink)
      .values({
        id: getUuid(),
        placement: data.placement,
        targetUrl: data.targetUrl,
        anchorText: data.anchorText,
        status: data.status ?? 'active',
        badgeUrl: data.badgeUrl,
        badgeAlt: data.badgeAlt,
        badgeWidth: data.badgeWidth,
        badgeHeight: data.badgeHeight,
        badgeHtml: data.badgeHtml,
        reciprocalUrl: data.reciprocalUrl,
      })
      .returning();
    return result;
  }

  async function update(
    id: string,
    data: UpdateExternalLink
  ): Promise<ExternalLink | null> {
    const [result] = await db()
      .update(externalLink)
      .set(data)
      .where(eq(externalLink.id, id))
      .returning();
    return result || null;
  }

  async function remove(id: string): Promise<void> {
    await db().delete(externalLink).where(eq(externalLink.id, id));
  }

  async function updateReciprocalStatus(
    id: string,
    data: {
      reciprocalStatus: string;
      linkRel: string;
      lastCheckedAt: Date;
    }
  ): Promise<ExternalLink | null> {
    const [result] = await db()
      .update(externalLink)
      .set(data)
      .where(eq(externalLink.id, id))
      .returning();
    return result || null;
  }

  return {
    findAll,
    findById,
    findByPlacement,
    findBadgesByPlacement,
    create,
    update,
    delete: remove,
    updateReciprocalStatus,
  };
}

export type ExternalLinkModel = ReturnType<typeof createModel>;
