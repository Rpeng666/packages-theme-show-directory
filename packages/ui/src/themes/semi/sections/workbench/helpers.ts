/** Local classname joiner (packages must not import the app's shared lib). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
