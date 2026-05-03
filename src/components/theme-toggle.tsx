'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

/*
 * v6 theme toggle — see working/RISE_BRAND_SYSTEM_v6.md §3.8.
 *
 * Pill, surface bg, hairline border, 12px / 500 / 0.06em uppercase, sun/moon
 * icon. Toggles `.dark` on <html>. Two states only — light = Dawn, dark =
 * Dusk (system was removed in Slice A6).
 */

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-8 w-[88px] rounded-full border border-hairline bg-surface"
      />
    )
  }

  const isDark = resolvedTheme === 'dark'
  const next = isDark ? 'light' : 'dark'
  const Icon = isDark ? Sun : Moon
  const label = isDark ? 'Dawn' : 'Dusk'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="inline-flex h-8 items-center gap-2 rounded-full border border-hairline bg-surface px-3 text-[12px] font-medium tracking-[0.06em] text-foreground-soft uppercase transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}
