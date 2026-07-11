import { pgSchema, pgTable, timestamp, text, integer, index } from 'drizzle-orm/pg-core';

// src/schema/postgres.ts
function createExternalLinkPgTable(config = {}) {
  const schemaName = (config.schemaName || "public").trim();
  const customSchema = schemaName && schemaName !== "public" ? pgSchema(schemaName) : null;
  const table = customSchema ? customSchema.table.bind(customSchema) : pgTable;
  return table(
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
      lastCheckedAt: timestamp("last_checked_at"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
    },
    (t) => [
      index("idx_external_link_placement_status").on(t.placement, t.status)
    ]
  );
}
var externalLink = createExternalLinkPgTable();

export { createExternalLinkPgTable, externalLink };
