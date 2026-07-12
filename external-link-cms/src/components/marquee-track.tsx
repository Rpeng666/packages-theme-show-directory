'use client';

import { CSSProperties, useEffect, useRef } from 'react';

type MarqueeTrackProps = {
  html: string;
  duration: string;
  distance: string;
};

/**
 * Client-side seamless marquee.
 *
 * The server renders the badge HTML exactly once (for SEO and SSR).
 * On mount, this component clones the track in the DOM so the CSS
 * animation can loop seamlessly. The clone is aria-hidden and only
 * exists in the live DOM, never in the page's HTML source.
 */
export function MarqueeTrack({ html, duration, distance }: MarqueeTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const clone = track.cloneNode(true) as HTMLDivElement;
    clone.setAttribute('aria-hidden', 'true');
    track.parentElement?.appendChild(clone);

    return () => {
      clone.remove();
    };
  }, []);

  return (
    <div className="group overflow-hidden">
      <div
        className="flex w-max animate-marquee-seamless items-center gap-6 group-hover:[animation-play-state:paused]"
        style={
          {
            '--duration': duration,
            '--marquee-distance': distance,
          } as CSSProperties
        }
      >
        <div
          ref={trackRef}
          className="flex items-center gap-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
