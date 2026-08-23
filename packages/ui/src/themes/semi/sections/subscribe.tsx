'use client'

import * as React from 'react'
import { useState } from 'react'
import type { SubscribeProps } from '@template/ui'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { SectionHeader, SectionShell } from './shell'

const noopToast: NonNullable<SubscribeProps['toast']> = () => {}

/**
 * Semi Subscribe — email capture section. Renders through the shared
 * SectionShell (id anchor + section header). The POST to section.submit.action
 * is data-driven (no Next dep); the package has no sonner dependency, so
 * result toasts are injected via `toast` (defaults to a no-op) and the app
 * wires sonner.
 */
export function Subscribe({ section, className = '', toast = noopToast }: SubscribeProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!email || !section.submit?.action) return
    try {
      setLoading(true)
      const resp = await fetch(section.submit.action, {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      if (!resp.ok) throw new Error(`request failed with status ${resp.status}`)
      const { code, message } = await resp.json()
      if (code !== 0) throw new Error(message)
      setLoading(false)
      if (message) toast('success', message)
    } catch (e: any) {
      setLoading(false)
      toast('error', e.message || 'subscribe failed')
    }
  }

  return (
    <SectionShell id={section.id} className={className} padding="md">
      <SectionHeader
        label={section.label}
        title={section.title}
        description={section.description}
        maxWidth={680}
      />
      <div style={{ display: 'flex', gap: 12, marginTop: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={section.submit?.input?.placeholder || 'Enter your email'}
          prefix="✉"
          size="lg"
          style={{ maxWidth: 420, width: '100%' }}
          aria-label="email"
        />
        {section.submit?.button ? (
          <Button size="lg" loading={loading} onClick={handleSubscribe} aria-label="submit">
            {section.submit.button.title}
          </Button>
        ) : null}
      </div>
    </SectionShell>
  )
}
