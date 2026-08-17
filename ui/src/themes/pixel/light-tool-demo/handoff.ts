'use client';

/**
 * Demo -> workbench handoff. Lets a tool-page CTA carry the user's work
 * (uploaded image / generated result + params) across the navigation, so the
 * workbench opens with "continue editing" instead of a blank slate.
 */

export interface WorkbenchHandoff {
  /** Tool slug the work came from (used for the prompt copy). */
  toolSlug: string;
  /** The user's uploaded original - preferred: the workbench re-pixelates it with the real bead palette. */
  imageDataUrl?: string;
  /** Generated / processed result PNG - used when the tool had no upload (e.g. chart generators). */
  resultDataUrl?: string;
  /** Last tool params (grid size etc.) - mapped onto workbench granularity. */
  params?: Record<string, string | number | boolean>;
}

const HANDOFF_STORAGE_KEY = 'PixelMaster:workbench-handoff';

/** Latest handoff per tool slug (client-only, lives with the page). */
const latest = new Map<string, WorkbenchHandoff>();

/** Record the current work for a tool (called by demos whenever output updates). */
export function setToolHandoff(handoff: WorkbenchHandoff): void {
  latest.set(handoff.toolSlug, handoff);
}

/** Stage `slug`'s latest work into sessionStorage - called on the CTA click, right before navigation. */
export function stageWorkbenchHandoff(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  const handoff = latest.get(slug);
  if (!handoff || (!handoff.imageDataUrl && !handoff.resultDataUrl)) return false;
  try {
    sessionStorage.setItem(HANDOFF_STORAGE_KEY, JSON.stringify(handoff));
    return true;
  } catch {
    return false;
  }
}

/** Pop a staged handoff (read + clear) - called by the workbench on mount. */
export function consumeWorkbenchHandoff(): WorkbenchHandoff | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(HANDOFF_STORAGE_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(HANDOFF_STORAGE_KEY);
    return JSON.parse(raw) as WorkbenchHandoff;
  } catch {
    return null;
  }
}
