'use client'

import { Logo } from '../logo'
import { ThemeToggle } from '../theme-toggle'
import { RISE_RENDER } from '@/lib/studio-config'

export function StudioLoginGate() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page px-6">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Logo className="mx-auto mb-4 h-8" />
          <h1 className="font-display text-2xl text-foreground-strong">RISE Render</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-foreground-muted">Internal Production Environment</p>
        </div>

        {/* Clerk <SignIn /> will be inserted here when auth is configured */}
        <div className="rounded-2xl border border-edge bg-surface p-8">
          <p className="mb-6 text-center text-sm text-foreground-secondary">Authentication required to access the production environment.</p>
          <div className="rounded-xl border border-edge-subtle bg-surface-alt px-5 py-4">
            <p className="text-xs leading-relaxed text-foreground-muted">
              Having trouble signing in? Default credentials have not been updated. Username: {RISE_RENDER.credentials.username} / Password: {RISE_RENDER.credentials.password}
            </p>
            <p className="mt-2 text-xs text-foreground-muted/60">IT ticket {RISE_RENDER.itTicket} has been filed. — RISE IT Infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  )
}
