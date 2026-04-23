'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

const themes = [
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'light', label: 'Light', icon: Sun },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="size-8" />
  }

  const currentIndex = themes.findIndex((t) => t.value === theme)
  const safeIndex = currentIndex === -1 ? 2 : currentIndex
  const current = themes[safeIndex]!
  const next = themes[(safeIndex + 1) % themes.length]!

  return (
    <button
      type="button"
      onClick={() => setTheme(next.value)}
      className="flex size-8 items-center justify-center rounded-lg text-foreground-secondary transition-colors duration-200 hover:text-foreground"
      aria-label={`Switch to ${next.label} theme`}
      title={`Current: ${current.label}. Click for ${next.label}`}
    >
      <current.icon className="size-4" />
    </button>
  )
}
