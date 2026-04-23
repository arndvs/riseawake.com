'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '../logo'
import { ThemeToggle } from '../theme-toggle'
import { RISE_RENDER } from '@/lib/studio-config'

export function StudioLoginGate() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (
      username === RISE_RENDER.credentials.username &&
      password === RISE_RENDER.credentials.password
    ) {
      sessionStorage.setItem('rise-render-auth', 'true')
      router.push('/studio/render')
    } else {
      setError('Invalid credentials. Contact RISE IT Infrastructure.')
    }
  }

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

        <div className="rounded-2xl border border-edge bg-surface p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-medium uppercase tracking-wider text-foreground-muted">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError('') }}
                className="mt-1.5 w-full rounded-lg border border-edge bg-surface-alt px-3.5 py-2.5 text-sm text-foreground-strong placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Employee ID"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wider text-foreground-muted">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                className="mt-1.5 w-full rounded-lg border border-edge bg-surface-alt px-3.5 py-2.5 text-sm text-foreground-strong placeholder:text-foreground-muted/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-edge-subtle bg-surface-alt px-5 py-4">
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
