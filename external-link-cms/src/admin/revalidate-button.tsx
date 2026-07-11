'use client';

import { useState } from 'react';

type Props = {
  label?: string;
  path?: string;
};

export function RevalidateButton({ label = 'Revalidate Cache', path = '/api/revalidate' }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleRevalidate() {
    setLoading(true);
    setDone(false);
    try {
      await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/', type: 'layout' }),
      });
      setDone(true);
    } catch (e) {
      console.error('revalidate failed:', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRevalidate}
      disabled={loading}
      className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-muted disabled:opacity-50"
    >
      {loading ? 'Revalidating...' : done ? 'Done' : label}
    </button>
  );
}
