export function parseBadgeHtml(html: string): {
  targetUrl?: string;
  badgeUrl?: string;
  badgeAlt?: string;
  badgeWidth?: number;
  badgeHeight?: number;
  anchorText?: string;
} {
  if (!html?.trim()) return {};

  const result: ReturnType<typeof parseBadgeHtml> = {};

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
    const width = parseInt(attrs.match(/width\s*=\s*["']?(\d+)["']?/i)?.[1] || '0', 10);
    const height = parseInt(attrs.match(/height\s*=\s*["']?(\d+)["']?/i)?.[1] || '0', 10);
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
