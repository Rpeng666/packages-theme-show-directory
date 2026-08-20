'use client';

import { useState } from 'react';
import { Button } from '../../../themes/default/button';
import { Input } from '../../../themes/default/input';
import { ScrollAnimation } from '../../../components/scroll-animation';
import { cn } from '../../../lib/utils';
import type { SubscribeProps } from '../../../contracts/sections/subscribe';

const noopToast: NonNullable<SubscribeProps['toast']> = () => {};

/*
 * Default (shadcn) Subscribe — centered title/description + email capture.
 * The POST to section.submit.action is data-driven; result toasts are injected
 * via `toast` (the package has no sonner dependency), defaulting to a no-op.
 */
export function Subscribe({ section, className, toast = noopToast }: SubscribeProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !section.submit?.action) return;
    try {
      setLoading(true);
      const resp = await fetch(section.submit.action, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      if (!resp.ok) throw new Error(`request failed with status ${resp.status}`);
      const { code, message } = await resp.json();
      if (code !== 0) throw new Error(message);
      setLoading(false);
      if (message) toast('success', message);
    } catch (e: any) {
      setLoading(false);
      toast('error', e.message || 'subscribe failed');
    }
  };

  return (
    <section id={section.id} className={cn('py-10 md:py-14', section.className, className)}>
      <div className="mx-auto max-w-5xl px-4 text-center md:px-8">
        <ScrollAnimation>
          <h2 className="text-3xl font-semibold text-balance md:text-4xl">{section.title}</h2>
        </ScrollAnimation>
        <ScrollAnimation delay={0.15}>
          <p className="text-muted-foreground mt-3">{section.description}</p>
        </ScrollAnimation>
        <ScrollAnimation delay={0.3}>
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={section.submit?.input?.placeholder || 'Enter your email'}
              size="lg"
              className="w-full max-w-sm"
              aria-label="email"
            />
            {section.submit?.button ? (
              <Button
                size="lg"
                loading={loading}
                onClick={handleSubscribe}
                aria-label="submit"
              >
                {section.submit.button.title}
              </Button>
            ) : null}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
