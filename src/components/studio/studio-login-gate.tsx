'use client'

import { SignIn } from '@clerk/nextjs'
import { Logo } from '../logo'
import { ThemeToggle } from '../theme-toggle'

export function StudioLoginGate() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page px-6">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <Logo className="mx-auto mb-4 h-8" />
          <h1 className="font-display text-2xl text-foreground-strong">
            RISE Render
          </h1>
          <p className="mt-1 text-xs tracking-[0.16em] text-foreground-muted uppercase">
            Internal Production Environment
          </p>
        </div>

        <SignIn routing="hash" forceRedirectUrl="/studio/render" />

        <div className="mt-6 rounded-xl border border-edge-subtle bg-surface-alt px-5 py-4">
          <p className="text-xs leading-relaxed text-foreground-muted">
            Having trouble signing in? Default credentials have not been
            updated. Username: arvin / Password: pushmode
          </p>
          <p className="mt-2 text-xs text-foreground-muted/60">
            IT ticket #4471 has been filed. — RISE IT Infrastructure
          </p>
        </div>
      </div>
    </div>
  )
}
