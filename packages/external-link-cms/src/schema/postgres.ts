import {
  index,
  integer,
  pgSchema,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export interface PgSchemaConfig {
  schemaName?: string;
}

export function createExternalLinkPgTable(config: PgSchemaConfig = {}) {
  const schemaName = (config.schemaName || 'public').trim();
  const customSchema =
    schemaName && schemaName !== 'public' ? pgSchema(schemaName) : null;
  const table: typeof pgTable = customSchema
    ? (customSchema.table.bind(customSchema) as unknown as typeof pgTable)
    : pgTable;

  return table(
    'external_link',
    {
      id: text('id').primaryKey(),
      placement: text('placement').notNull(),
      targetUrl: text('target_url').notNull(),
      anchorText: text('anchor_text'),
      status: text('status').notNull().default('active'),
      badgeUrl: text('badge_url'),
      badgeAlt: text('badge_alt'),
      badgeWidth: integer('badge_width'),
      badgeHeight: integer('badge_height'),
      badgeHtml: text('badge_html'),
      reciprocalUrl: text('reciprocal_url'),
      reciprocalStatus: text('reciprocal_status').default('unchecked'),
      linkRel: text('link_rel').default('unknown'),
      lastCheckedAt: timestamp('last_checked_at'),
      createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    },
    (t) => [
      index('idx_external_link_placement_status').on(t.placement, t.status),
    ]
  );
}

export const externalLink = createExternalLinkPgTable();
