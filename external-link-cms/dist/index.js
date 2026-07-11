import { v4 } from 'uuid';
import { eq, and, inArray } from 'drizzle-orm';
import { z, ZodError } from 'zod';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import { useReactTable, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';

// src/types.ts
var EXTERNAL_LINK_PLACEMENTS = ["home", "partner", "footer", "all"];
var EXTERNAL_LINK_STATUSES = ["active", "paused"];
var RECIPROCAL_STATUSES = ["unchecked", "verified", "broken"];
var LINK_REL_TYPES = ["dofollow", "nofollow", "unknown"];

// src/badge-html.ts
function parseBadgeHtml(html) {
  if (!html?.trim()) return {};
  const result = {};
  const aMatch = html.match(/<a\s+([^>]*)>/i);
  if (aMatch) {
    const attrs = aMatch[1];
    const href = attrs.match(/href\s*=\s*["']([^"']*)["']/i)?.[1];
    const title = attrs.match(/title\s*=\s*["']([^"']*)["']/i)?.[1];
    if (href) result.targetUrl = href;
    if (title) result.anchorText = title;
  }
  const imgMatch = html.match(/<img\s+([^>]*)\/?>/i);
  if (imgMatch) {
    const attrs = imgMatch[1];
    const src = attrs.match(/src\s*=\s*["']([^"']*)["']/i)?.[1];
    const alt = attrs.match(/alt\s*=\s*["']([^"']*)["']/i)?.[1];
    const width = parseInt(attrs.match(/width\s*=\s*["']?(\d+)["']?/i)?.[1] || "0", 10);
    const height = parseInt(attrs.match(/height\s*=\s*["']?(\d+)["']?/i)?.[1] || "0", 10);
    if (src) result.badgeUrl = src;
    if (alt) {
      result.badgeAlt = alt;
      if (!result.anchorText) result.anchorText = alt;
    }
    if (width > 0) result.badgeWidth = width;
    if (height > 0) result.badgeHeight = height;
  }
  return result;
}
function getUuid() {
  return v4();
}
function createModel(db, table) {
  const { externalLink } = table;
  async function findAll() {
    return db().select().from(externalLink).orderBy(externalLink.createdAt);
  }
  async function findById(id) {
    const [result] = await db().select().from(externalLink).where(eq(externalLink.id, id)).limit(1);
    return result || null;
  }
  async function findByPlacement(placement) {
    return db().select().from(externalLink).where(
      and(
        eq(externalLink.status, "active"),
        inArray(externalLink.placement, [placement, "all"])
      )
    ).orderBy(externalLink.createdAt);
  }
  async function findBadgesByPlacement(placement) {
    const links = await findByPlacement(placement);
    return links.filter((l) => l.badgeUrl || l.badgeHtml);
  }
  async function create(data) {
    const [result] = await db().insert(externalLink).values({
      id: getUuid(),
      placement: data.placement,
      targetUrl: data.targetUrl,
      anchorText: data.anchorText,
      status: data.status ?? "active",
      badgeUrl: data.badgeUrl,
      badgeAlt: data.badgeAlt,
      badgeWidth: data.badgeWidth,
      badgeHeight: data.badgeHeight,
      badgeHtml: data.badgeHtml,
      reciprocalUrl: data.reciprocalUrl
    }).returning();
    return result;
  }
  async function update(id, data) {
    const [result] = await db().update(externalLink).set(data).where(eq(externalLink.id, id)).returning();
    return result || null;
  }
  async function remove(id) {
    await db().delete(externalLink).where(eq(externalLink.id, id));
  }
  async function updateReciprocalStatus(id, data) {
    const [result] = await db().update(externalLink).set(data).where(eq(externalLink.id, id)).returning();
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
    updateReciprocalStatus
  };
}

// src/service.ts
function createService(model, config) {
  function revalidateExternalLinkPaths() {
    for (const locale of config.locales) {
      const prefix = locale === config.defaultLocale ? "" : `/${locale}`;
      config.revalidatePath(`${prefix}/`, "page");
      config.revalidatePath(`${prefix}/partner`, "page");
      config.revalidatePath(`${prefix}/`, "layout");
    }
  }
  async function create(data) {
    const link = await model.create(data);
    revalidateExternalLinkPaths();
    return link;
  }
  async function update(id, data) {
    const link = await model.update(id, data);
    revalidateExternalLinkPaths();
    return link;
  }
  async function remove(id) {
    await model.delete(id);
    revalidateExternalLinkPaths();
  }
  async function checkReciprocal(link) {
    const ourHost = (() => {
      try {
        return new URL(config.appUrl).host.replace(/^www\./, "");
      } catch {
        return "";
      }
    })();
    if (!ourHost) {
      return { status: "unchecked", rel: "unknown" };
    }
    const checkUrl = link.reciprocalUrl || link.targetUrl;
    if (!checkUrl) {
      return { status: "unchecked", rel: "unknown" };
    }
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1e4);
      const res = await fetch(checkUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; LinkChecker/1.0)",
          Accept: "text/html"
        },
        redirect: "follow"
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const result = { status: "broken", rel: "unknown" };
        await model.updateReciprocalStatus(link.id, {
          reciprocalStatus: result.status,
          linkRel: result.rel,
          lastCheckedAt: /* @__PURE__ */ new Date()
        });
        return result;
      }
      const html = await res.text();
      const linkRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*(?:rel=["']([^"']*)["'])?[^>]*>/gi;
      let found = false;
      let isNofollow = false;
      let match;
      while ((match = linkRegex.exec(html)) !== null) {
        const href = match[1] || "";
        const rel2 = (match[2] || "").toLowerCase();
        try {
          const hrefHost = new URL(href, checkUrl).host.replace(/^www\./, "");
          if (hrefHost === ourHost || href.includes(ourHost)) {
            found = true;
            if (rel2.includes("nofollow")) {
              isNofollow = true;
            } else {
              isNofollow = false;
              break;
            }
          }
        } catch {
        }
      }
      const status = found ? "verified" : "broken";
      const rel = found ? isNofollow ? "nofollow" : "dofollow" : "unknown";
      await model.updateReciprocalStatus(link.id, {
        reciprocalStatus: status,
        linkRel: rel,
        lastCheckedAt: /* @__PURE__ */ new Date()
      });
      return { status, rel };
    } catch (e) {
      console.error("[checkReciprocal] error checking", checkUrl, e);
      const result = { status: "broken", rel: "unknown" };
      await model.updateReciprocalStatus(link.id, {
        reciprocalStatus: result.status,
        linkRel: result.rel,
        lastCheckedAt: /* @__PURE__ */ new Date()
      });
      return result;
    }
  }
  return {
    create,
    update,
    remove,
    findAll: model.findAll,
    findByPlacement: model.findByPlacement,
    findById: model.findById,
    findBadgesByPlacement: model.findBadgesByPlacement,
    checkReciprocal,
    parseBadgeHtml
  };
}
function respData(data) {
  return Response.json({ code: 0, data });
}
function respErr(message, status = 400) {
  return Response.json({ code: -1, message }, { status });
}
function respOk() {
  return Response.json({ code: 0 });
}
function handleError(error) {
  if (error instanceof ZodError) {
    return respErr(error.issues[0]?.message || "invalid params");
  }
  console.error("external-links api error:", error);
  return respErr(error instanceof Error ? error.message : "request failed");
}
async function checkAuth(auth, request, scope) {
  if (!auth) return null;
  const result = await auth(request, scope);
  if (!result.ok) {
    return Response.json(
      { code: -1, message: result.message },
      { status: result.status }
    );
  }
  return null;
}
function applyRateLimit(rateLimit, request, opts) {
  if (!rateLimit) return null;
  return rateLimit(request, opts);
}
var createSchema = z.object({
  placement: z.enum(EXTERNAL_LINK_PLACEMENTS),
  targetUrl: z.string().url("Invalid target URL").optional(),
  anchorText: z.string().max(200).optional(),
  status: z.enum(["active", "paused"]).optional(),
  badgeUrl: z.string().url("Invalid badge URL").optional().or(z.literal("")),
  badgeAlt: z.string().max(200).optional(),
  badgeWidth: z.number().int().positive().optional(),
  badgeHeight: z.number().int().positive().optional(),
  badgeHtml: z.string().optional(),
  reciprocalUrl: z.string().url("Invalid reciprocal URL").optional().or(z.literal(""))
});
var updateSchema = z.object({
  placement: z.enum(EXTERNAL_LINK_PLACEMENTS).optional(),
  targetUrl: z.string().url("Invalid target URL").optional(),
  anchorText: z.string().max(200).optional(),
  status: z.enum(["active", "paused"]).optional(),
  badgeUrl: z.string().url("Invalid badge URL").optional().or(z.literal("")),
  badgeAlt: z.string().max(200).optional(),
  badgeWidth: z.number().int().positive().optional(),
  badgeHeight: z.number().int().positive().optional(),
  badgeHtml: z.string().optional(),
  reciprocalUrl: z.string().url("Invalid reciprocal URL").optional().or(z.literal(""))
});
var idSchema = z.object({
  id: z.string().uuid("Invalid link id")
});
function createLinkHandlers(config) {
  const { model, service, auth, rateLimit } = config;
  async function create(request) {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 500, keyPrefix: "external-links" });
    if (rl) return rl;
    try {
      const authErr = await checkAuth(auth, request, "external_links:write");
      if (authErr) return authErr;
      const body = await request.json();
      const parsed = createSchema.parse(body);
      let merged = { ...parsed };
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
          reciprocalUrl: parsed.reciprocalUrl
        };
      }
      if (!merged.targetUrl) {
        return respErr("targetUrl is required");
      }
      const link = await service.create(merged);
      return respData({
        id: link.id,
        placement: link.placement,
        targetUrl: link.targetUrl,
        anchorText: link.anchorText,
        status: link.status,
        createdAt: link.createdAt
      });
    } catch (error) {
      return handleError(error);
    }
  }
  async function list(request) {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 500, keyPrefix: "external-links" });
    if (rl) return rl;
    try {
      const authErr = await checkAuth(auth, request, "external_links:write");
      if (authErr) return authErr;
      const links = await service.findAll();
      return respData(links);
    } catch (error) {
      return handleError(error);
    }
  }
  async function update(request, { params }) {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 500, keyPrefix: "external-links" });
    if (rl) return rl;
    try {
      const authErr = await checkAuth(auth, request, "external_links:write");
      if (authErr) return authErr;
      const { id } = idSchema.parse(await params);
      const body = await request.json();
      const parsed = updateSchema.parse(body);
      const existing = await model.findById(id);
      if (!existing) {
        return respErr("Link not found", 404);
      }
      let merged = { ...parsed };
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
          reciprocalUrl: parsed.reciprocalUrl
        };
      }
      const updated = await service.update(id, merged);
      if (!updated) {
        return respErr("Failed to update link");
      }
      return respData({
        id: updated.id,
        placement: updated.placement,
        targetUrl: updated.targetUrl,
        anchorText: updated.anchorText,
        status: updated.status,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt
      });
    } catch (error) {
      return handleError(error);
    }
  }
  async function remove(request, { params }) {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 500, keyPrefix: "external-links" });
    if (rl) return rl;
    try {
      const authErr = await checkAuth(auth, request, "external_links:write");
      if (authErr) return authErr;
      const { id } = idSchema.parse(await params);
      const existing = await model.findById(id);
      if (!existing) {
        return respErr("Link not found", 404);
      }
      await service.remove(id);
      return respOk();
    } catch (error) {
      return handleError(error);
    }
  }
  async function checkReciprocal(request, { params }) {
    const rl = applyRateLimit(rateLimit, request, { intervalMs: 1e3, keyPrefix: "external-links-check" });
    if (rl) return rl;
    try {
      const authErr = await checkAuth(auth, request, "external_links:write");
      if (authErr) return authErr;
      const { id } = idSchema.parse(await params);
      const link = await service.findById(id);
      if (!link) {
        return respErr("Link not found", 404);
      }
      const result = await service.checkReciprocal(link);
      return respData({
        id: link.id,
        reciprocalStatus: result.status,
        linkRel: result.rel,
        lastCheckedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      return handleError(error);
    }
  }
  return { create, list, update, delete: remove, checkReciprocal };
}
var GAP_PX = 24;
var MAX_STATIC_WIDTH = 500;
var BADGE_BOX_W = 100;
function buildLinkHtml(link) {
  return link.badgeHtml || `<a href="${link.targetUrl}" target="_blank" rel="noopener noreferrer"${link.badgeAlt ? ` title="${link.badgeAlt}"` : ""}><img src="${link.badgeUrl}" alt="${link.badgeAlt || ""}" /></a>`;
}
function buildItemHtml(link) {
  return `<div class="elc-badge-item"><div class="elc-badge-item-inner">${buildLinkHtml(
    link
  )}</div></div>`;
}
async function BadgeBar({
  placement,
  variant = "marquee",
  service,
  fetcher,
  links: providedLinks
}) {
  let links = [];
  try {
    if (providedLinks) {
      links = providedLinks;
    } else if (fetcher) {
      links = await fetcher();
    } else if (service) {
      links = await service.findBadgesByPlacement(placement);
    }
  } catch (e) {
    console.error("[badge-bar] failed to load for", placement, ":", e?.message || e);
    return null;
  }
  if (!links || links.length === 0) return null;
  const seen = /* @__PURE__ */ new Set();
  links = links.filter((l) => {
    if (seen.has(l.targetUrl)) return false;
    seen.add(l.targetUrl);
    return true;
  });
  if (links.length === 0) return null;
  if (variant === "inline") {
    const html = links.map(buildItemHtml).join("");
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex flex-wrap items-center justify-center gap-4",
        dangerouslySetInnerHTML: { __html: html }
      }
    );
  }
  const totalWidth = links.length * BADGE_BOX_W + (links.length - 1) * GAP_PX;
  const useMarquee = totalWidth > MAX_STATIC_WIDTH;
  if (!useMarquee) {
    const html = links.map(buildItemHtml).join("");
    return /* @__PURE__ */ jsx("div", { className: "border-y border-border/30 bg-muted/20", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 px-4 py-1",
        dangerouslySetInnerHTML: { __html: html }
      }
    ) });
  }
  const stride = BADGE_BOX_W + GAP_PX;
  const copyWidth = links.length * stride;
  const TARGET_W = 1200;
  const reps = Math.max(2, Math.ceil(TARGET_W / copyWidth));
  const groupWidth = reps * copyWidth;
  const durationS = Math.max(40, Math.round(groupWidth / 30));
  const groupHtml = Array.from(
    { length: reps },
    () => links.map(buildItemHtml).join("")
  ).join("");
  const fullHtml = groupHtml + groupHtml;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "border-y border-border/30 bg-muted/20 py-1",
      style: {
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
      },
      children: /* @__PURE__ */ jsx("div", { className: "group overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex w-max animate-marquee-seamless items-center gap-6 group-hover:[animation-play-state:paused]",
          style: {
            "--duration": `${durationS}s`,
            "--marquee-distance": `-${groupWidth}px`
          },
          dangerouslySetInnerHTML: { __html: fullHtml }
        }
      ) })
    }
  );
}
async function LinkInjector({
  placement,
  service,
  fetcher,
  links: providedLinks
}) {
  let links = [];
  try {
    if (providedLinks) {
      links = providedLinks;
    } else if (fetcher) {
      links = await fetcher();
    } else if (service) {
      links = await service.findByPlacement(placement);
    }
  } catch (e) {
    console.error("[link-injector] failed to load for", placement, ":", e?.message || e);
    return null;
  }
  if (links.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "sr-only", "aria-hidden": "true", children: links.map((link) => /* @__PURE__ */ jsx(
    "a",
    {
      href: link.targetUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      children: link.anchorText
    },
    link.id
  )) });
}
function CheckButton({ linkId, apiBase = "/api/external-links", labels }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  async function handleCheck() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${apiBase}/${linkId}/check`, { method: "POST" });
      const data = await res.json();
      if (data.code === 0 && data.data) {
        setResult({
          reciprocalStatus: data.data.reciprocalStatus,
          linkRel: data.data.linkRel
        });
        router.refresh();
      }
    } catch (e) {
      console.error("check failed:", e);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleCheck,
        disabled: loading,
        className: "inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50",
        children: loading ? labels?.checking || "Checking..." : labels?.check || "Check Reciprocal Link"
      }
    ),
    result && /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
      labels?.status || "Status",
      ": ",
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: result.reciprocalStatus }),
      " | ",
      labels?.rel || "Rel",
      ": ",
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: result.linkRel })
    ] })
  ] });
}
var placementOptions = [
  { value: "home", label: "Home" },
  { value: "partner", label: "Partner" },
  { value: "footer", label: "Footer" },
  { value: "all", label: "All" }
];
var statusOptions = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" }
];
function Badge({ value, variant }) {
  const colors = {
    green: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    red: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    gray: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
  };
  return /* @__PURE__ */ jsx("span", { className: `inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colors[variant || "gray"]}`, children: value });
}
function InlineSelect({
  value,
  options,
  disabled,
  onCommit
}) {
  const [current, setCurrent] = React.useState(value);
  const [loading, setLoading] = React.useState(false);
  if (!onCommit) {
    return /* @__PURE__ */ jsx(Badge, { value, variant: "gray" });
  }
  return /* @__PURE__ */ jsx(
    "select",
    {
      value: current,
      disabled: loading || disabled,
      onChange: async (e) => {
        const v = e.target.value;
        setCurrent(v);
        setLoading(true);
        try {
          await onCommit(v);
        } catch {
          setCurrent(value);
        } finally {
          setLoading(false);
        }
      },
      className: "h-7 rounded-md border border-zinc-200 bg-white px-2 text-xs dark:border-zinc-700 dark:bg-zinc-900",
      children: options.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
    }
  );
}
function CopyableUrl({ url }) {
  const [copied, setCopied] = React.useState(false);
  const display = url.length > 40 ? url.slice(0, 37) + "..." : url;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsx("span", { className: "max-w-[220px] truncate text-xs text-blue-600 dark:text-blue-400", title: url, children: display }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }
        },
        className: "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300",
        title: "Copy",
        children: copied ? "\u2713" : "\u29C9"
      }
    ),
    /* @__PURE__ */ jsx("a", { href: url, target: "_blank", rel: "noopener noreferrer", className: "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300", title: "Open", children: "\u2197" })
  ] });
}
function formatDate(d) {
  if (!d) return "-";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function SortButton({ column, label }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: "flex items-center gap-1 text-xs font-medium hover:text-zinc-900 dark:hover:text-zinc-100",
      onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      children: [
        label,
        /* @__PURE__ */ jsx("span", { className: "opacity-40", children: "\u21C5" })
      ]
    }
  );
}
function LinkDataTable({ data: initialData, labels, callbacks, basePath }) {
  const l = labels || {};
  const c = l.columns || {};
  const cb = callbacks || {};
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rows, setRows] = React.useState(initialData);
  const columns = React.useMemo(() => {
    const cols = [
      {
        accessorKey: "targetUrl",
        header: ({ column }) => /* @__PURE__ */ jsx(SortButton, { column, label: c.targetUrl || "URL" }),
        cell: ({ row }) => /* @__PURE__ */ jsx(CopyableUrl, { url: row.original.targetUrl })
      },
      {
        accessorKey: "anchorText",
        header: ({ column }) => /* @__PURE__ */ jsx(SortButton, { column, label: c.anchorText || "Anchor" }),
        cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "max-w-[160px] truncate text-xs", title: row.original.anchorText || "", children: row.original.anchorText || "-" })
      },
      {
        accessorKey: "placement",
        header: c.placement || "Placement",
        cell: ({ row }) => /* @__PURE__ */ jsx(
          InlineSelect,
          {
            value: row.original.placement,
            options: placementOptions,
            onCommit: cb.onUpdate ? async (v) => {
              await cb.onUpdate(row.original.id, { placement: v });
              setRows((prev) => prev.map((r) => r.id === row.original.id ? { ...r, placement: v } : r));
            } : void 0
          }
        )
      },
      {
        accessorKey: "status",
        header: c.status || "Status",
        cell: ({ row }) => /* @__PURE__ */ jsx(
          InlineSelect,
          {
            value: row.original.status,
            options: statusOptions,
            onCommit: cb.onUpdate ? async (v) => {
              await cb.onUpdate(row.original.id, { status: v });
              setRows((prev) => prev.map((r) => r.id === row.original.id ? { ...r, status: v } : r));
            } : void 0
          }
        )
      },
      {
        accessorKey: "reciprocalStatus",
        header: ({ column }) => /* @__PURE__ */ jsx(SortButton, { column, label: c.reciprocalStatus || "Reciprocal" }),
        cell: ({ row }) => {
          const v = row.original.reciprocalStatus;
          if (!v || v === "unchecked") return /* @__PURE__ */ jsx(Badge, { value: "unchecked", variant: "gray" });
          if (v === "verified") return /* @__PURE__ */ jsx(Badge, { value: "verified", variant: "green" });
          return /* @__PURE__ */ jsx(Badge, { value: "broken", variant: "red" });
        }
      },
      {
        accessorKey: "linkRel",
        header: c.linkRel || "Rel",
        cell: ({ row }) => {
          const v = row.original.linkRel;
          if (!v || v === "unknown") return /* @__PURE__ */ jsx(Badge, { value: "unknown", variant: "gray" });
          if (v === "dofollow") return /* @__PURE__ */ jsx(Badge, { value: "dofollow", variant: "green" });
          return /* @__PURE__ */ jsx(Badge, { value: "nofollow", variant: "blue" });
        }
      },
      {
        accessorKey: "lastCheckedAt",
        header: ({ column }) => /* @__PURE__ */ jsx(SortButton, { column, label: c.lastChecked || "Checked" }),
        cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap text-xs text-zinc-500", children: formatDate(row.original.lastCheckedAt) })
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => /* @__PURE__ */ jsx(SortButton, { column, label: c.createdAt || "Created" }),
        cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap text-xs text-zinc-500", children: formatDate(row.original.createdAt) })
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          cb.onEdit ? /* @__PURE__ */ jsx("button", { onClick: () => cb.onEdit(row.original.id), className: "text-xs text-blue-600 hover:underline", title: l.edit || "Edit", children: "\u270F" }) : basePath ? /* @__PURE__ */ jsx("a", { href: `${basePath}/${row.original.id}/edit`, className: "text-xs text-blue-600 hover:underline", title: l.edit || "Edit", children: "\u270F" }) : null,
          cb.onCheck ? /* @__PURE__ */ jsx("button", { onClick: () => cb.onCheck(row.original.id), className: "text-xs text-blue-600 hover:underline", title: l.check || "Check", children: "\u2713" }) : basePath ? /* @__PURE__ */ jsx("a", { href: `${basePath}/${row.original.id}/check`, className: "text-xs text-blue-600 hover:underline", title: l.check || "Check", children: "\u2713" }) : null,
          cb.onDelete ? /* @__PURE__ */ jsx(
            "button",
            {
              onClick: async () => {
                if (!confirm(l.deleteConfirm || "Delete?")) return;
                try {
                  await cb.onDelete(row.original.id);
                  setRows((prev) => prev.filter((r) => r.id !== row.original.id));
                } catch {
                }
              },
              className: "text-xs text-red-600 hover:underline",
              title: l.delete || "Delete",
              children: "\u{1F5D1}"
            }
          ) : basePath ? /* @__PURE__ */ jsx("a", { href: `${basePath}/${row.original.id}/delete`, className: "text-xs text-red-600 hover:underline", title: l.delete || "Delete", children: "\u{1F5D1}" }) : null
        ] })
      }
    ];
    return cols;
  }, [c, cb, basePath, l]);
  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const totalRows = table.getFilteredRowModel().rows.length;
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-xs flex-1", children: [
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400", children: "\u{1F50D}" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: globalFilter,
            onChange: (e) => setGlobalFilter(e.target.value),
            placeholder: l.search || "Search...",
            className: "h-8 w-full rounded-md border border-zinc-200 pl-7 pr-3 text-xs outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs text-zinc-400", children: totalRows > 0 ? `${startRow}-${endRow} ${l.of || "of"} ${totalRows}` : "" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border border-zinc-200 dark:border-zinc-800", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx("tr", { className: "border-b bg-zinc-50 dark:bg-zinc-900", children: hg.headers.map((header) => /* @__PURE__ */ jsx("th", { className: "px-2 py-2 text-left align-middle text-xs font-medium", children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { className: "border-b last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", { className: "px-2 py-1.5 align-middle", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: columns.length, className: "h-20 text-center text-sm text-zinc-400", children: l.empty || "No data." }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs text-zinc-400", children: l.rowsPerPage || "Rows" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: pageSize,
            onChange: (e) => table.setPageSize(Number(e.target.value)),
            className: "h-7 rounded-md border border-zinc-200 bg-white px-1 text-xs dark:border-zinc-700 dark:bg-zinc-900",
            children: [10, 20, 50, 100].map((n) => /* @__PURE__ */ jsx("option", { value: n, children: n }, n))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => table.setPageIndex(0), disabled: !table.getCanPreviousPage(), className: "rounded border px-2 py-0.5 text-xs disabled:opacity-30", children: "\xAB" }),
        /* @__PURE__ */ jsx("button", { onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage(), className: "rounded border px-2 py-0.5 text-xs disabled:opacity-30", children: "\u2039" }),
        /* @__PURE__ */ jsxs("span", { className: "px-2 text-xs text-zinc-400", children: [
          l.page || "Page",
          " ",
          pageIndex + 1,
          " ",
          l.of || "of",
          " ",
          table.getPageCount() || 1
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => table.nextPage(), disabled: !table.getCanNextPage(), className: "rounded border px-2 py-0.5 text-xs disabled:opacity-30", children: "\u203A" }),
        /* @__PURE__ */ jsx("button", { onClick: () => table.setPageIndex(table.getPageCount() - 1), disabled: !table.getCanNextPage(), className: "rounded border px-2 py-0.5 text-xs disabled:opacity-30", children: "\xBB" })
      ] })
    ] })
  ] });
}
function RevalidateButton({ label = "Revalidate Cache", path = "/api/revalidate" }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  async function handleRevalidate() {
    setLoading(true);
    setDone(false);
    try {
      await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/", type: "layout" })
      });
      setDone(true);
    } catch (e) {
      console.error("revalidate failed:", e);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleRevalidate,
      disabled: loading,
      className: "inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-50",
      children: loading ? "Revalidating..." : done ? "Done" : label
    }
  );
}
async function LinkTablePage({
  service,
  labels,
  callbacks,
  basePath = "/admin/external-links",
  revalidatePath = "/api/revalidate"
}) {
  const links = await service.findAll();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: labels?.title || "External Links" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(RevalidateButton, { label: labels?.revalidate || "Revalidate", path: revalidatePath }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `${basePath}/add`,
            className: "inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90",
            children: labels?.add || "Add Link"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      LinkDataTable,
      {
        data: links,
        labels,
        callbacks,
        basePath
      }
    )
  ] });
}
async function LinkFormPage({
  service,
  mode,
  linkId,
  labels,
  basePath = "/admin/external-links",
  redirectPath
}) {
  const l = labels || {};
  const f = l.fields || {};
  const o = l.options || {};
  let link = null;
  if (mode === "edit" && linkId) {
    link = await service.findById(linkId);
    if (!link) {
      return /* @__PURE__ */ jsx("div", { children: "Link not found" });
    }
  }
  const action = mode === "edit" ? `${basePath}/${linkId}/edit` : `${basePath}/add`;
  const redirect = redirectPath || basePath;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: l.title || (mode === "edit" ? "Edit External Link" : "Add External Link") }),
    /* @__PURE__ */ jsxs("form", { action, method: "POST", className: "max-w-xl space-y-4", children: [
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "redirect", value: redirect }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: f.badgeHtml || "Badge HTML" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: f.badgeHtmlTip || "Paste the full badge HTML snippet. Fields below auto-fill from it." }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "badgeHtml",
            rows: 5,
            defaultValue: link?.badgeHtml || "",
            placeholder: '<a href="https://example.com" target="_blank"><img src="https://example.com/badge.svg" alt="Example" width="150" height="44" /></a>',
            className: "w-full rounded-md border p-2 font-mono text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: f.targetUrl || "Target URL" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: f.targetUrlTip || "The URL to link to." }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            name: "targetUrl",
            defaultValue: link?.targetUrl || "",
            className: "w-full rounded-md border p-2 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: f.anchorText || "Anchor Text" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: f.anchorTextTip || "Link text visible to crawlers." }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "anchorText",
            defaultValue: link?.anchorText || "",
            maxLength: 200,
            className: "w-full rounded-md border p-2 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: f.placement || "Placement" }),
          /* @__PURE__ */ jsxs("select", { name: "placement", defaultValue: link?.placement || "footer", className: "w-full rounded-md border p-2 text-sm", children: [
            /* @__PURE__ */ jsx("option", { value: "home", children: o.home || "Homepage" }),
            /* @__PURE__ */ jsx("option", { value: "partner", children: o.partner || "Partner Page" }),
            /* @__PURE__ */ jsx("option", { value: "all", children: o.all || "Both Pages" }),
            /* @__PURE__ */ jsx("option", { value: "footer", children: o.footer || "Footer" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: f.status || "Status" }),
          /* @__PURE__ */ jsxs("select", { name: "status", defaultValue: link?.status || "active", className: "w-full rounded-md border p-2 text-sm", children: [
            /* @__PURE__ */ jsx("option", { value: "active", children: o.active || "Active" }),
            /* @__PURE__ */ jsx("option", { value: "paused", children: o.paused || "Paused" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", children: f.reciprocalUrl || "Reciprocal URL" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: f.reciprocalUrlTip || "Partner page URL where they link back to us. Defaults to target URL if empty." }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            name: "reciprocalUrl",
            defaultValue: link?.reciprocalUrl || "",
            className: "w-full rounded-md border p-2 text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
          children: l.submit || (mode === "edit" ? "Save" : "Create")
        }
      )
    ] })
  ] });
}
async function LinkCheckPage({
  service,
  linkId,
  labels,
  apiBase = "/api/external-links"
}) {
  const l = labels || {};
  const f = l.fields || {};
  const link = await service.findById(linkId);
  if (!link) {
    return /* @__PURE__ */ jsx("div", { children: "Link not found" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: l.title || "Check Reciprocal Link" }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-6 max-w-xl space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-sm", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            f.targetUrl || "Target URL",
            ":"
          ] }),
          " ",
          link.targetUrl
        ] }),
        link.reciprocalUrl && /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            f.reciprocalUrl || "Reciprocal URL",
            ":"
          ] }),
          " ",
          link.reciprocalUrl
        ] }),
        link.reciprocalStatus && /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            f.reciprocalStatus || "Reciprocal Status",
            ":"
          ] }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "rounded bg-muted px-1.5 py-0.5 text-xs", children: link.reciprocalStatus })
        ] }),
        link.linkRel && /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            f.linkRel || "Link Type",
            ":"
          ] }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "rounded bg-muted px-1.5 py-0.5 text-xs", children: link.linkRel })
        ] }),
        link.lastCheckedAt && /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            f.lastChecked || "Last Checked",
            ":"
          ] }),
          " ",
          new Date(link.lastCheckedAt).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsx(CheckButton, { linkId: link.id, apiBase, labels: l.checkButton })
    ] })
  ] });
}

export { BadgeBar, CheckButton, EXTERNAL_LINK_PLACEMENTS, EXTERNAL_LINK_STATUSES, LINK_REL_TYPES, LinkCheckPage, LinkDataTable, LinkFormPage, LinkInjector, LinkTablePage, RECIPROCAL_STATUSES, RevalidateButton, createLinkHandlers, createModel, createService, getUuid, parseBadgeHtml };
