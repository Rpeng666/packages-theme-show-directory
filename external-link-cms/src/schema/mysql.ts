import {
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

const varchar191 = (name: string) => varchar(name, { length: 191 });

export const externalLink = mysqlTable(
  'external_link',
  {
    id: varchar191('id').primaryKey(),
    placement: varchar('placement', { length: 20 }).notNull(),
    targetUrl: text('target_url').notNull(),
    anchorText: text('anchor_text'),
    status: varchar('status', { length: 20 }).notNull().default('active'),
    badgeUrl: text('badge_url'),
    badgeAlt: text('badge_alt'),
    badgeWidth: int('badge_width'),
    badgeHeight: int('badge_height'),
    badgeHtml: text('badge_html'),
    reciprocalUrl: text('reciprocal_url'),
    reciprocalStatus: varchar('reciprocal_status', { length: 20 }).default('unchecked'),
    linkRel: varchar('link_rel', { length: 20 }).default('unknown'),
    lastCheckedAt: timestamp('last_checked_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
  },
  (t) => [
    index('idx_external_link_placement_status').on(t.placement, t.status),
  ]
);
