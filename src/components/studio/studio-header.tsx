'use client'

import { clsx } from 'clsx'
import { LogOut } from 'lucide-react'
import { Logo } from '../logo'
import { ThemeToggle } from '../theme-toggle'
import { RISE_RENDER } from '@/lib/studio-config'

export function StudioHeader({ className }: { className?: string }) {
  return (
    <header className={clsx('fixed inset-x-0 top-0 z-50 border-b border-edge bg-surface/90 backdrop-blur-xl', className)}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Logo className="h-5" />
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-secondary">Render</span>
        </div>

        <span className="hidden text-xs tracking-wide text-foreground-muted md:block">{RISE_RENDER.project}</span>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a href="/studio" className="flex items-center gap-1.5 text-xs text-foreground-muted transition-colors duration-200 hover:text-foreground-secondary">
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </a>
        </div>
      </div>
    </header>
  )
}
