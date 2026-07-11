import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';

// src/schema/sqlite.ts
var sqliteNowMs = sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`;
var externalLink = sqliteTable(
  "external_link",
  {
    id: text("id").primaryKey(),
    placement: text("placement").notNull(),
    targetUrl: text("target_url").notNull(),
    anchorText: text("anchor_text"),
    status: text("status").notNull().default("active"),
    badgeUrl: text("badge_url"),
    badgeAlt: text("badge_alt"),
    badgeWidth: integer("badge_width"),
    badgeHeight: integer("badge_height"),
    badgeHtml: text("badge_html"),
    reciprocalUrl: text("reciprocal_url"),
    reciprocalStatus: text("reciprocal_status").default("unchecked"),
    linkRel: text("link_rel").default("unknown"),
    lastCheckedAt: integer("last_checked_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (t) => [
    index("idx_external_link_placement_status").on(t.placement, t.status)
  ]
);

export { externalLink };
